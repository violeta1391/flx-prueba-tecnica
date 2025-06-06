import { useState } from 'react';

const useNotifications = () => {
    const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
    const [notificationModalConfig, setNotificationModalConfig] = useState({
        type: 'success',
        title: '',
        message: '',
    });

    const showNotification = (type, title, message) => {
        setNotificationModalConfig({ type, title, message });
        setIsNotificationModalVisible(true);
    };

    const closeNotification = () => {
        setIsNotificationModalVisible(false);
    };

    return {
        isNotificationModalVisible,
        notificationModalConfig,
        showNotification,
        closeNotification,
    };
};

export default useNotifications;