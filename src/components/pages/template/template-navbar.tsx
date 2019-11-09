import style from "components/pages/template/template-navbar-style.module.scss";
import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default class TemplateNavbar extends React.Component<{}> {

    render() {
        return (
            <Navbar variant="dark" className={"mb-3 " + style.app_navbar} expand="lg">
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">DUM1MY</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}
