import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import Logo from '../assets/Logo.svg.png';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="md" className="p-1">
        <Container>
          <Navbar.Brand href="#home">
            <Image src={Logo} alt="logo" fluid="true" width={250} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">S'inscrire</Nav.Link>
              <Nav.Link href="#link">S'identifier</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
