import * as React from "react";
import { Alert, Button, Col, Container, Form, FormControlProps, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { createUserRequest } from "store/admin/actions";
import { ApplicationState } from "store/root";
import { RolesMapping } from "utils/constants";

interface PropsFromState {
    loading: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    createUserRequest: typeof createUserRequest;
}

interface AdminAddNewUserFormState {
    userName: string;
    password: string;
    roles: string[];
}

type AllProps = PropsFromState & PropsFromDispatch;

class AdminAddNewUserForm extends React.Component<AllProps, AdminAddNewUserFormState> {

    constructor(props: Readonly<AllProps>) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            userName: "",
            password: "",
            roles: [],
        };
    }

    handleChange(formEvent: React.FormEvent<FormControlProps>) {
        switch (formEvent.currentTarget.id) {
            case "usernameField": {
                this.setState({
                    userName: formEvent.currentTarget.value!,
                });
                break;
            }
            case "passwordField": {
                this.setState({
                    password: formEvent.currentTarget.value!,
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    handleRoleChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        const checked = changeEvent.currentTarget.checked;
        const value = changeEvent.currentTarget.value!;

        this.setState(oldState => {
            // add role if checkbox is checked else remove
            if (checked) {
                if (!oldState.roles.includes(value)) {
                    return {
                        roles: [...oldState.roles, value],
                    };
                }
            } else {
                if (oldState.roles.includes(value)) {
                    return {
                        roles: oldState.roles.filter(role => role !== value),
                    };
                }
            }

            return null;
        });
    }

    handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
        formEvent.preventDefault();

        const form = formEvent.currentTarget;
        if (!form.checkValidity()) {
            formEvent.stopPropagation();
            return;
        }

        this.props.createUserRequest(this.state.userName, {
            password: this.state.password,
            roles: this.state.roles,
        });
    }

    render() {
        const { loading, errors } = this.props;

        return <>
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Uživatelské jméno</Form.Label>
                                    <Form.Control
                                        id="usernameField"
                                        required
                                        type="text"
                                        placeholder="Uživatelské jméno"
                                        onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Heslo</Form.Label>
                                    <Form.Control
                                        id="passwordField"
                                        required
                                        type="password"
                                        placeholder="Heslo"
                                        onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Role</Form.Label>
                                    {Object.entries(RolesMapping).map((role, index) => {
                                        return <Form.Check
                                            id={"rolesField_" + role[0]}
                                            key={index}
                                            type="checkbox"
                                            label={role[1]}
                                            value={role[0]}
                                            checked={role[0] === "ROLE_USER"}
                                            onChange={this.handleRoleChange} />;
                                    })}
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit" className="mb-3 float-right">Přidat nového uživatele</Button>
                            {loading && (<Spinner animation="border" variant="primary" />)}
                            {errors && (<Alert variant="danger">Momentálně nelze přidat uživatele.</Alert>)}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>;
    }

}

const mapStateToProps = ({ admin }: ApplicationState) => ({
    loading: admin.getAllUsers.loading,
    errors: admin.getAllUsers.errors,
});

const mapDispatchToProps = {
    createUserRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AdminAddNewUserForm);
