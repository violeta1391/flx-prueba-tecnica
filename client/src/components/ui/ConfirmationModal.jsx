import { Modal, Button } from 'antd';

function ConfirmationModal({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonProps = { type: "primary", danger: true },
  cancelButtonProps = {},
  loading = false,
}) {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} {...cancelButtonProps}>
          {cancelText}
        </Button>,
        <Button
          key="submit"
          onClick={onConfirm}
          loading={loading}
          {...confirmButtonProps}
        >
          {confirmText}
        </Button>,
      ]}
    >
      {typeof content === 'string' ? <p>{content}</p> : content}
    </Modal>
  );
}

export default ConfirmationModal;