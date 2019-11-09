import style from "components/pages/template/template-navbar-style.module.scss";
import * as React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Path } from "store/navigation/types";
import { ApplicationState } from "store/root";
import { HOME_URL, RolesMapping } from "utils/constants";

interface PropsFromState {
    rolePaths: Record<string, Path[]>;
}

class TemplateNavbar extends React.Component<PropsFromState> {

    render() {
        return (
            <Navbar variant="dark" className={style.app_navbar} expand="lg">
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mr-auto">
                        <Nav.Link href={HOME_URL}>Home</Nav.Link>
                        {Object.entries(this.props.rolePaths).map(([role, paths]) => {
                            return <NavDropdown title={RolesMapping[role]} id="basic-nav-dropdown">
                                {paths.map(path => {
                                    return <NavDropdown.Item href={path.path}>{path.name}</NavDropdown.Item>;
                                })}
                            </NavDropdown>;
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

const mapStateToProps = ({ navigation }: ApplicationState) => ({
    rolePaths: navigation.rolePaths,
});

export default connect<PropsFromState, {}, {}, ApplicationState>(
    mapStateToProps,
)(TemplateNavbar);
