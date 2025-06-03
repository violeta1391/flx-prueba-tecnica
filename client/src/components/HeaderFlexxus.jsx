import { Layout } from 'antd';
import logo from '../assets/flexxus-logo-sidebar.png';
import '../App.css';

const { Header } = Layout;

export default function HeaderFlexxus() {
  return (
    <Header className="header-flexxus">
      <img src={logo} alt="Logo" className="header-logo" />
    </Header>
  );
}
