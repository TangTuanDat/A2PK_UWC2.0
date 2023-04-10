import React from "react";
import { Nav, Navbar, Container} from "react-bootstrap";
import { useAuthContext, AuthContextType } from "../auth/context";
import "./navbar.css"
interface MenuProps {
    id: number;
    name: string;
    path: string;
}
  
const menu = [
    { id: 1, name: "Progress of Tasks", path: "/progress" },
    { id: 2, name: "Task Assignment", path: "/assignTask" },
];

const NavBar = () => {
    const { logout } = useAuthContext() as AuthContextType;
    return (
        <Navbar id="sidebar" collapseOnSelect expand="md" className="flex-column">
            <Container className="flex-column">
                <Navbar.Brand href="/">UWC 2.0</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" className="flex-column">
                    <Nav as="ul" className="flex-column">
                        {menu.map((menu: MenuProps) => (
                            <Nav.Item key={menu.id} as="li">
                                <Nav.Link href={`${menu.path}`}>{menu.name}</Nav.Link>
                            </Nav.Item>
                        ))}
                        <Nav.Item as="li">
                            <Nav.Link href="/profile">User Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link onClick={logout} href="/login" >Log out</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;