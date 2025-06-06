import { Modal, Button, Typography } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const baseIconStyle = { fontSize: '28px', marginRight: '12px' };

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
            iconColor = '#faad14';
            break;
        default:
            IconComponent = CheckCircleFilled;
            iconColor = '#52c41a';
    }

    return (
        <Modal
            open={visible}
            title={null}
            onCancel={onClose}
            footer={
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button key="ok" type="primary" onClick={onClose}>
                        {buttonText}
                    </Button>
                </div>
            }
            centered
            width={400}
            closable={false}
            style={{ paddingBottom: 0 }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '16px',
            }}>
                {IconComponent && (
                    <IconComponent style={{ ...baseIconStyle, color: iconColor }} />
                )}
                <Title level={4} style={{ marginTop: '16px', marginBottom: '8px', color: iconColor }}>
                    {title}
                </Title>
                <Paragraph style={{ marginBottom: '24px', color: '#595959' }}>
                    {message}
                </Paragraph>
            </div>
        </Modal>
    );
}

export default NotificationModal;