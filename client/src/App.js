import { Breadcrumb, Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import HeaderFlexxus from './components/HeaderFlexxus';
import UserListPage from './pages/UserListPage';
import { UserProvider } from './context/UserContext';

const { Content } = Layout;

const appRoutes = [
  {
    path: '/',
    exact: true,
    redirect: '/usuarios/listado',
  },
  {
    path: '/usuarios',
    exact: true,
    redirect: '/usuarios/listado',
  },
  {
    path: '/usuarios/listado',
    component: UserListPage,
    name: 'Listado de Usuarios',
    parent: 'Usuarios',
  },
];

function BreadcrumbNav() {
  const location = useLocation();
  const currentRoute = appRoutes.find(route => route.path === location.pathname);

  return (
    <Breadcrumb style={{ margin: '1.5rem' }}>
      <Breadcrumb.Item>
        <Link to="/usuarios/listado">
          Usuarios
        </Link>
      </Breadcrumb.Item>
      {currentRoute && currentRoute.name && (
        <Breadcrumb.Item>
          <Link
            to={currentRoute.path}
            style={{ fontWeight: 'bold' }}
          >
            {currentRoute.name}
          </Link>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

function AppLayout({ children }) {
  return (
    <Layout>
      <HeaderFlexxus />
      <Content style={{ padding: '2rem', background: 'white', }}>
        <BreadcrumbNav />
        <div
          className="site-layout-content"
          style={{
            padding: '1.5rem',
            overflowX: 'auto',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/usuarios/listado">Volver al inicio</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <UserProvider>
        <AppLayout>
          <Routes>
            {appRoutes.map((route, index) => (
              route.redirect ? (
                <Route
                  key={index}
                  path={route.path}
                  element={<Navigate to={route.redirect} replace />}
                />
              ) : (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              )
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </UserProvider>
    </Router>
  );
}