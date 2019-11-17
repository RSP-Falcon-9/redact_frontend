import * as React from "react";
import { Alert, Button, Col, Container, Form, FormControlProps, Row, Spinner } from "react-bootstrap";
import { RolesMapping } from "utils/constants";

interface AdminAddNewUserFormProps {}

interface AdminAddNewUserFormState {
    editedEvent: Event;
}

export default class AdminAddNewUserForm extends React.Component<AdminAddNewUserFormProps, AdminAddNewUserFormState> {

    constructor(props: Readonly<AdminAddNewUserFormProps>) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // this.state = { ...this.state, editedEvent: this.props.eventState.event };
    }

    /*componentDidUpdate(oldProps: AdminAddNewUserFormProps) {
        if (oldProps.eventState.event !== this.props.eventState.event) {
            this.setState({ editedEvent: this.props.eventState.event });
        }
    }*/

    handleChange(formEvent: React.FormEvent<FormControlProps>) {
        switch (formEvent.currentTarget.id) {
            case "nameField": {
                break;
            }
            case "passwordField": {
                break;
            }
            default: {
                break;
            }
        }
    }

    handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
        formEvent.preventDefault();

        const form = formEvent.currentTarget;
        if (!form.checkValidity()) {
            formEvent.stopPropagation();
            return;
        }
    }

    render() {
        // const { loading, errors } = this.props.eventState;

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
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Heslo</Form.Label>
                                    <Form.Control
                                        id="passwordField"
                                        required
                                        type="password"
                                        placeholder="Heslo"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Práva</Form.Label>
                                    {Object.entries(RolesMapping).map((role, index) => {
                                        return <Form.Check key={index} type="checkbox" label={role[1]} value={role[0]} />;
                                    })}
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit" className="mb-3 float-right">Přidat nového uživatele</Button>
                            {false && (<Spinner animation="border" variant="primary" />)}
                            {false && (<Alert variant="danger">Momentálně nelze přidat uživatele.</Alert>)}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>;
    }

}
