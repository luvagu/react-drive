import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar bg="light" expand="all">
            <Navbar.Brand as={Link} to="/"> 
                RLV Drive
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/profile">
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header
