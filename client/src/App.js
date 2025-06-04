import { Breadcrumb, Layout} from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import HeaderFlexxus from './components/HeaderFlexxus';
import UserListPage from './pages/UserListPage';

const { Content } = Layout;

function BreadcrumbNav() {
  const location = useLocation();
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to="/usuarios/listado">
          Usuarios
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link
          to="/usuarios/listado"
          style={{ fontWeight: location.pathname === '/usuarios/listado' ? 'bold' : 'normal' }}
        >
          Listado de Usuarios
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default function App() {
  return (
    <Router>
      <HeaderFlexxus />
      <Content style={{ padding: '0 48px' }}>
        <BreadcrumbNav />
          <Routes>
            <Route path="/" element={<Navigate to="/usuarios/listado" replace />} />
            <Route path="/usuarios" element={<Navigate to="/usuarios/listado" replace />} />
            <Route path="/usuarios/listado" element={<UserListPage />} />
          </Routes>    
      </Content>
    </Router>
  );
}
