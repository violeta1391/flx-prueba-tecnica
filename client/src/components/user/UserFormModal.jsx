import { useEffect } from 'react';
import { Modal, Form, Input, Select, message, InputNumber, Button, Row, Col, Tooltip } from 'antd';
import { createUser, updateUser, isEmailDuplicate } from '../../services/userService';
import { v4 as uuidv4 } from 'uuid';
import { CloseOutlined } from '@ant-design/icons';
import '../../App.css';

const { Option } = Select;

const STATUS_MAP_TO_DB = {
    'activo': 'active',
    'inactivo': 'inactive',
};

const STATUS_MAP_FROM_DB = {
    'active': 'activo',
    'inactive': 'inactivo',
};

function UserFormModal({
    visible,
    onClose,
    onUserSaved,
    existingUser,
}) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (existingUser) {
                form.setFieldsValue({
                    ...existingUser,
                    status: STATUS_MAP_FROM_DB[existingUser.status] || 'activo'
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ status: 'activo' });
            }
        }
    }, [existingUser, form, visible]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const values = await form.validateFields();

            const duplicate = await isEmailDuplicate(values.email, existingUser?.id);
            if (duplicate) {
                form.setFields([{ name: 'email', errors: ['Este email ya está en uso.'] }]);
                return;
            }

            const statusForDB = STATUS_MAP_TO_DB[values.status];
            if (!statusForDB) {
                message.error('Estado inválido.');
                return;
            }

            if (existingUser) {
                const userEdit = await updateUser(existingUser.id, {
                    ...existingUser,
                    ...values,
                    status: statusForDB,
                });
                message.success('Usuario actualizado con éxito');
                onUserSaved(userEdit);
            } else {
                const newUser = {
                    id: uuidv4(),
                    ...values,
                    status: statusForDB,
                };
                const userCreated = await createUser(newUser);
                message.success('Usuario creado con éxito');
                onUserSaved(userCreated);
            }

            form.resetFields();
            onClose();
        } catch (err) {
            console.error('Error al guardar usuario:', err);
            if (!err.errorFields) {
                message.error('Hubo un error al procesar la solicitud.');
            }
        }
    };

    const modalTitle = existingUser ? 'Editar Usuario' : 'Agregar Usuario';
    const submitButtonText = existingUser ? 'Editar Usuario' : 'Agregar Usuario';

    return (
        <Modal
            title={modalTitle}
            open={visible}
            onCancel={onClose}
            closeIcon={<CloseOutlined onClick={() => {
                form.resetFields();
                onClose();
            }} />}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                >
                    {submitButtonText}
                </Button>,
            ]}
            destroyOnHidden
            width={572}
            style={{ borderRadius: '8px' }}
        >
            <Form form={form} layout="vertical" style={{ paddingTop: '1rem' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Usuario"
                            name="username"
                            rules={[
                                { required: true, message: 'El nombre de usuario es obligatorio' },
                                { pattern: /^\S+$/, message: 'No debe contener espacios' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Nombre"
                            name="name"
                            rules={[
                                { required: true, message: 'El nombre es obligatorio' },
                                { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'El nombre es inválido' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Tooltip
                            title={!existingUser ? "El estado debe ser activo" : ""}
                            getPopupContainer={trigger => trigger.parentNode}
                        >
                            <Form.Item
                                label="Estado"
                                name="status"
                                rules={[{ required: true, message: 'Seleccione un estado' }]}
                            >
                                <Select disabled={!existingUser}>
                                    <Option value="activo">Activo</Option>
                                    <Option value="inactivo">Inactivo</Option>
                                </Select>
                            </Form.Item>
                        </Tooltip>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Ingrese un email' }, { type: 'email', message: 'Email inválido' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Apellido"
                            name="lastname"
                            rules={[
                                { required: true, message: 'El apellido es obligatorio' },
                                { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'El apellido es inválido' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Edad"
                            name="age"
                            rules={[
                                { required: true, message: 'La edad es obligatoria' },
                                {
                                    type: 'number',
                                    min: 18,
                                    max: 100,
                                    message: 'La edad debe estar entre 18 y 100',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default UserFormModal;