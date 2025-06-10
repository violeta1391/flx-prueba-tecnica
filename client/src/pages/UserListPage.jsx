import { Suspense } from 'react';
import { Spin, Alert } from 'antd';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import UserActions from '../components/user/UserActions';
import UserTable from '../components/user/UserTable';
import UserFormModal from '../components/user/UserFormModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import NotificationModal from '../components/ui/NotificationModal';
import { useUser } from '../context/UserContext'; 

function UsersDataContent() {
  const {
    searchTerm,
    statusFilter,
    isFiltering,
    isModalOpen,
    editingUser,
    isConfirmDeleteModalVisible,
    userToDelete,
    isDeleting,
    isNotificationModalVisible,
    notificationModalConfig,
    displayedUsers,
    handleSearchChange,
    handleStatusChange,
    handleAddUserClick,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
    handleCancelDelete,
    handleUserSubmit,
    closeUserFormModal,
    closeNotificationModal,
  } = useUser(); 

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
        onClose={closeUserFormModal}
        onUserSaved={handleUserSubmit}
        existingUser={editingUser}
      />
      {userToDelete && (
        <ConfirmationModal
          visible={isConfirmDeleteModalVisible}
          title="Eliminar Usuario"
          content={
            <span>
              ¿Estás seguro de que deseas eliminar a{' '}
              <span style={{ color: '#E23336', fontWeight: 'bold' }}>{userToDelete.name}</span>?
            </span>
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Eliminar"
          loading={isDeleting}
          confirmButtonProps={{
            type: "primary",
            danger: true,
            style: { backgroundColor: '#E23336', borderColor: '#E23336' }
          }}
        />
      )}
      <NotificationModal
        visible={isNotificationModalVisible}
        type={notificationModalConfig.type}
        title={notificationModalConfig.title}
        message={notificationModalConfig.message}
        onClose={closeNotificationModal}
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