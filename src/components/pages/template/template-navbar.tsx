import style from "components/pages/template/template-navbar-style.module.scss";
import * as React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Path } from "store/navigation/types";
import { ApplicationState } from "store/root";
import { RolesMapping } from "utils/constants";
import { HOME_URL } from "utils/navigation";

interface PropsFromState {
    authRoles: string[];
    rolePaths: Record<string, Path[]>;
}

class TemplateNavbar extends React.Component<PropsFromState> {

    render() {
        return (
            <Navbar variant="dark" className={style.app_navbar} expand="lg">
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mr-auto">
                        <Nav.Link href={HOME_URL}>Domů</Nav.Link>
                        {Object.entries(this.props.rolePaths).map(([role, paths], index) => {
                            if (!this.props.authRoles.includes(role)) {
                                return null;
                            }

                            return <NavDropdown key={index} title={RolesMapping[role]} id="basic-nav-dropdown">
                                {paths.map((path, index2) => {
                                    return <NavDropdown.Item key={index2} href={path.path}>{path.name}</NavDropdown.Item>;
                                })}
                            </NavDropdown>;
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

const mapStateToProps = ({ auth, navigation }: ApplicationState) => ({
    authRoles: auth.roles,
    rolePaths: navigation.rolePaths,
});

export default connect<PropsFromState, {}, {}, ApplicationState>(
    mapStateToProps,
)(TemplateNavbar);
