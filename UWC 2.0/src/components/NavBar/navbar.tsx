import React from "react";
import { Nav, Navbar, Container} from "react-bootstrap";

interface MenuProps {
    id: number;
    name: string;
    path: string;
}
  
const menu = [
    { id: 1, name: "Progress of Tasks", path: "/meets" },
    { id: 2, name: "Task Assignment", path: "/contacts" },
];

export function NavBar() {
    return (
        <Navbar id="sidebar" collapseOnSelect expand="md" className="flex-column">
            <Container className="flex-column">
                <Navbar.Brand href="/" className="flex-column">UWC 2.0</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="flex-column"/>
                <Navbar.Collapse id="responsive-navbar-nav" className="flex-column">
                    <Nav as="ul" className="flex-column">
                        {menu.map((menu: MenuProps) => (
                            <Nav.Item key={menu.id} as="li">
                                <Nav.Link href={`${menu.path}`}>{menu.name}</Nav.Link>
                            </Nav.Item>
                        ))}
                        <Nav.Item as="li">
                            <Nav.Link href="/">User Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link href="/login">Log out</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;