import { Breadcrumb, Layout, theme } from 'antd';
import HeaderFlexxus from './components/HeaderFlexxus'

const { Content } = Layout;
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <HeaderFlexxus />
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Usuarios' }, { title: 'Listado de Usuarios' }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
    </>
  );
};
export default App;