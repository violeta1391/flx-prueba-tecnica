import { Modal, Button, Typography } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const iconStyle = { fontSize: '24px', marginRight: '16px' };

function NotificationModal({
    visible,
    type, 
    title,
    message,
    onClose,
    buttonText = "Aceptar",
}) {
    let IconComponent;
    let iconColor;

    switch (type) {
        case 'success':
            IconComponent = CheckCircleFilled;
            iconColor = '#52c41a'; 
            break;
        case 'error':
            IconComponent = CloseCircleFilled;
            iconColor = '#ff4d4f'; 
            break;
        case 'warning': 
            IconComponent = ExclamationCircleFilled;
            iconColor = '#faad14'; // Naranja de advertencia, futuras implementaciones
            break;
        default:
            IconComponent = CheckCircleFilled; 
            iconColor = '#52c41a';
    }

    return (
        <Modal
            open={visible}
            title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {IconComponent && <IconComponent style={{ ...iconStyle, color: iconColor }} />}
                    <Title level={4} style={{ marginBottom: 0, color: iconColor }}>{title}</Title>
                </div>
            }
            onCancel={onClose} 
            footer={[
                <Button key="ok" type="primary" onClick={onClose}>
                    {buttonText}
                </Button>,
            ]}
            centered 
        >
            <Paragraph>{message}</Paragraph>
        </Modal>
    );
}

export default NotificationModal;