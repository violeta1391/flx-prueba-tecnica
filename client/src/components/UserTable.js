import { Table, Tag, Space, Button } from 'antd';

function UserTable({
  users,
  onEditUser,
  onDeleteUser,
  loading,
}) {
  const columns = [
    {
      title: 'Usuario (ID)',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'active' ? 'green' : 'red';
        const text = status === 'active' ? 'Activo' : 'Inactivo';
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEditUser(record)} style={{ padding: 0 }}>
            Editar
          </Button>
          <Button type="link" onClick={() => onDeleteUser(record)} style={{ padding: 0 }}>
            Eliminar
          </Button>
        </Space>
      ),
    }
  ];
  const customEmptyText = (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>No se encontraron usuarios para los filtros actuales.</p>
      <p>Intenta ajustar tus filtros de búsqueda o crea un nuevo usuario.</p>
    </div>
  );

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey={record => record.id}
      loading={loading}
      locale={{ emptyText: customEmptyText }}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} usuarios`,
      }}
    />
  );
}

export default UserTable;
