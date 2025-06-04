import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { Alert, Spin } from 'antd';
import UserActions from '../components/UserActions';
import UserTable from '../components/UserTable';
import UserFormModal from '../components/UserFormModal';
import { readAllUsers } from '../services/userService';
import { performFetchAllUsers } from '../services/userService';
import { deleteUser } from '../services/userService';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationModal from '../components/NotificationModal';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Alert
          message="Error"
          description={this.state.error?.message || "Ocurrió un error al cargar los datos."}
          type="error"
          showIcon
          style={{ margin: '20px 0' }}
        />
      );
    }
    return this.props.children;
  }
}

function UsersDataContent() {
  const allUsers = readAllUsers();
  const [users, setUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [notificationModalConfig, setNotificationModalConfig] = useState({
    type: 'success', 
    title: '',
    message: '',
  });


  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const displayedUsers = useMemo(() => {
    let usersToDisplay = [...users];
    if (statusFilter !== 'all') {
      usersToDisplay = usersToDisplay.filter(user => user.status === statusFilter);
    }
    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      usersToDisplay = usersToDisplay.filter(user =>
        (user.name && user.name.toLowerCase().includes(lowerSearchTerm)) ||
        (user.lastname && user.lastname.toLowerCase().includes(lowerSearchTerm)) ||
        (user.id && user.id.toString().toLowerCase().includes(lowerSearchTerm))
      );
    }
    return usersToDisplay;
  }, [users, searchTerm, statusFilter]);

  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, statusFilter, isFiltering]);

  const handleSearchChange = (value) => {
    setIsFiltering(true);
    setSearchTerm(value);
  };

  const handleStatusChange = (value) => {
    setIsFiltering(true);
    setStatusFilter(value);
  };

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const showNotification = (type, title, message) => {
    setNotificationModalConfig({ type, title, message });
    setIsNotificationModalVisible(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user); 
    setIsConfirmDeleteModalVisible(true); 
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true); 
    try {
      await deleteUser(userToDelete.id);
      const freshUsers = await performFetchAllUsers();
      setUsers(freshUsers);
      setIsConfirmDeleteModalVisible(false);
      showNotification(
        'success',
        'Eliminación Exitosa',
        `El usuario ${userToDelete.name} ha sido eliminado correctamente.`
      );
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      setIsConfirmDeleteModalVisible(false);
      showNotification(
        'error',
        'Error al Eliminar',
        `No se pudo eliminar el usuario ${userToDelete.name}. Detalles: ${err.message}`
      );
    } finally {
      setIsConfirmDeleteModalVisible(false);
      setUserToDelete(null);
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteModalVisible(false);
    setUserToDelete(null);
  };

  const handleUserSubmit = async (userData) => {
    try {
      if (editingUser) {
        showNotification(
          'success',
          'Actualización Exitosa',
          `El usuario ${userData.name || editingUser.name} ha sido actualizado correctamente.`
        );
      } else {
        showNotification(
          'success',
          'Creación Exitosa',
          `El usuario ${userData.name} ha sido creado correctamente.`
        );
      }
      const freshUsers = await performFetchAllUsers();
      setUsers(freshUsers);
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error('Error guardando usuario:', err);
      showNotification(
        'error',
        'Error al Guardar',
        `Hubo un error al guardar el usuario. ${err.message}`
      );
    }
  };

  return (
    <>
      <UserActions
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onAddUserClick={handleAddUserClick}
        loading={isFiltering}
      />
      <UserTable
        users={displayedUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser} 
        loading={isFiltering}
      />
      <UserFormModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserSaved={handleUserSubmit}
        existingUser={editingUser}
      />
      {userToDelete && ( 
        <ConfirmationModal
          visible={isConfirmDeleteModalVisible}
          title="Confirmar Eliminación"
          content={`¿Estás seguro de que deseas eliminar a ${userToDelete.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Eliminar"
          loading={isDeleting} 
        />
      )}
      <NotificationModal
        visible={isNotificationModalVisible}
        type={notificationModalConfig.type}
        title={notificationModalConfig.title}
        message={notificationModalConfig.message}
        onClose={() => setIsNotificationModalVisible(false)}
      />
    </>
  );
}

function UserListPage() {
  return (
    <ErrorBoundary
      fallback={
        <Alert
          message="Error Crítico"
          description="No se pudieron cargar los usuarios. Intenta recargar la página."
          type="error"
          showIcon
          style={{ margin: '20px' }}
        />
      }
    >
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        }
      >
        <UsersDataContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default UserListPage;