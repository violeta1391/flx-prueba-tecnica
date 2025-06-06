import { Input, Select, Button, Row, Col, Space } from 'antd';

const { Search } = Input;
const { Option } = Select;

function UserActions({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onAddUserClick,
  loading, 
}) {
  return (
    <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
      <Col>
        <Space>
          <Search
            placeholder="Buscar por nombre, apellido o ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onSearch={(value) => onSearchChange(value)} 
            style={{ width: 250 }}
            loading={loading}   
            allowClear
          />
          <Select
            value={statusFilter}
            onChange={onStatusChange}
            style={{ width: 150 }}
            disabled={loading} 
          >
            <Option value="all">Todos los estados</Option>
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Space>
      </Col>
      <Col>
        <Button type="primary" onClick={onAddUserClick} disabled={loading}>
          Agregar Usuario
        </Button>
      </Col>
    </Row>
  );
}

export default UserActions;