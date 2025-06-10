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
    <Row
      justify="space-between"
      align="middle"
      wrap={true}
      style={{ marginBottom: '2.5rem' }}
      gutter={[16, 16]}
    >
      <Col
        xs={24} 
        sm={16}
        md={14}
        lg={12}
      >
        <Space
          wrap={true}
          justify="start"
          style={{ width: '100%' }}
        >
          <Search
            placeholder="Buscar por nombre, apellido o ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onSearch={(value) => onSearchChange(value)}
            style={{ flexGrow: 1, minWidth: '200px' }}
            loading={loading}
            allowClear
          />
          <Select
            value={statusFilter}
            onChange={onStatusChange}
            disabled={loading}
            style={{ maxWidth: '180px', width: '100%' }} 
          >
            <Option value="all">Filtrar por estado</Option>
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Space>
      </Col>
      <Col
        xs={24} 
        sm={8}
        md={10}
        lg={12}
        style={{
          textAlign: 'right', 
        }}
      >
        <Button
          type="primary"
          onClick={onAddUserClick}
          disabled={loading}
          style={{
            width: '100%',
            maxWidth: '200px', 
          }}
        >
          Agregar Usuario
        </Button>
      </Col>
    </Row>
  );
}

export default UserActions;