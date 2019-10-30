import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Button, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "store/auth/actions";
import { ApplicationState } from "store/root";

interface PropsFromDispatch {
    logout: typeof logout;
}

type AllProps = PropsFromDispatch;

class MainNavbar extends React.Component<AllProps> {

    render() {
        return (
            <Navbar bg="dark" variant="dark" className="mb-3" expand="lg">
                <Navbar.Brand href="#">Redact</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">DUMMY</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="logout-tooltip">Logout</Tooltip>
                            }>
                                <Button variant="primary" size="sm" onClick={() => {
                                    this.props.logout();
                                }}>
                                    <FontAwesomeIcon icon="door-open" />
                                </Button>
                            </OverlayTrigger>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

const mapDispatchToProps = {
    logout,
};

export default connect<{}, PropsFromDispatch, {}, ApplicationState>(
    null,
    mapDispatchToProps,
)(MainNavbar);
