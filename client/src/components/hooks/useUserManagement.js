import { useState, useEffect, useMemo, useCallback } from 'react';
import { readAllUsers, performFetchAllUsers, deleteUser } from '../../services/userService';
import useNotifications from './useNotifications';

const useUserManagement = () => {
    const allUsersData = readAllUsers();
    const [users, setUsers] = useState(allUsersData);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isFiltering, setIsFiltering] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { isNotificationModalVisible, notificationModalConfig, showNotification, closeNotification } = useNotifications();

    useEffect(() => {
        setUsers(allUsersData);
    }, [allUsersData]);

    // Lógica de filtrado y búsqueda
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

    // Manejo del estado de filtrado (debounce)
    useEffect(() => {
        if (isFiltering) {
            const timer = setTimeout(() => {
                setIsFiltering(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [searchTerm, statusFilter, isFiltering]);

    const handleSearchChange = useCallback((value) => {
        setIsFiltering(true);
        setSearchTerm(value);
    }, []);

    const handleStatusChange = useCallback((value) => {
        setIsFiltering(true);
        setStatusFilter(value);
    }, []);

    const handleAddUserClick = useCallback(() => {
        setEditingUser(null);
        setIsModalOpen(true);
    }, []);

    const handleEditUser = useCallback((user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    }, []);

    const handleDeleteUser = useCallback((user) => {
        setUserToDelete(user);
        setIsConfirmDeleteModalVisible(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
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
    }, [userToDelete, showNotification]);

    const handleCancelDelete = useCallback(() => {
        setIsConfirmDeleteModalVisible(false);
        setUserToDelete(null);
    }, []);

    const handleUserSubmit = useCallback(async (userData) => {
        try {
            if (editingUser) {
                showNotification(
                    'success',
                    'Actualización Exitosa',
                    `Se ha actualizado ${userData.name || editingUser.name}`
                );
            } else {
                showNotification(
                    'success',
                    'Creación Exitosa',
                    `${userData.name} ha sido creado correctamente.`
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
    }, [editingUser, showNotification]);

    return {
        // Estados
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
        // Funciones
        handleSearchChange,
        handleStatusChange,
        handleAddUserClick,
        handleEditUser,
        handleDeleteUser,
        handleConfirmDelete,
        handleCancelDelete,
        handleUserSubmit,
        closeUserFormModal: () => setIsModalOpen(false),
        closeNotificationModal: closeNotification,
    };
};

export default useUserManagement;