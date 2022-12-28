import { Container, Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import Logo from '../assets/Logo.svg.png';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

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
              <NavDropdown title={user.fullname} id="fullname">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
