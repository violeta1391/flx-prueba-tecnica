import { useEffect } from 'react';
import { Modal, Form, Input, Select, message, InputNumber } from 'antd';
import { createUser, updateUser, isEmailDuplicate } from '../services/userService';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

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
                form.setFieldsValue(existingUser);
            } else {
                form.resetFields();
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

            if (existingUser) {
                const userEdit = await updateUser(existingUser.id, { ...existingUser, ...values });
                message.success('Usuario actualizado con éxito');
                onUserSaved(userEdit); // Notificar que hubo actualización
            } else {
                values.status = 'active';
                // Generar ID único con uuid
                const newUser = {
                    id: uuidv4(),
                    ...values,
                };
                const userCreated = await createUser(newUser);
                message.success('Usuario creado con éxito');
                onUserSaved(userCreated); // Notificar que hubo creación
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

    return (
        <Modal
            title={existingUser ? 'Editar Usuario' : 'Agregar Usuario'}
            open={visible}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            onOk={handleSubmit}
            destroyOnHidden
        >
            <Form form={form} layout="vertical">
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
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Ingrese un email' }, { type: 'email', message: 'Email inválido' }]}
                >
                    <Input />
                </Form.Item>
                {existingUser && (
                    <Form.Item
                        label="Estado"
                        name="status"
                        rules={[{ required: true, message: 'Seleccione un estado' }]}
                    >
                        <Select>
                            <Option value="active">Activo</Option>
                            <Option value="inactive">Inactivo</Option>
                        </Select>
                    </Form.Item>
                )}
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
                    <InputNumber  />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UserFormModal;
