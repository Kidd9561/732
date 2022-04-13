import { Layout } from 'antd';
import ContentElement from './Homepage/ContentElement';
import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";
import HeaderElement from './components/HeaderElement';
import FooterElement from './components/FooterElement';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Header>
          <HeaderElement/>
        </Header>
        <Content>
          <ContentElement/>
        </Content>
        <Footer  className='footer'>
          <FooterElement/>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
