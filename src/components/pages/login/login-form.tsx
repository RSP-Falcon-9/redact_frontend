import * as React from "react";
import { Alert, Button, Container, Form, FormControlProps, FormGroup, Row, Spinner } from "react-bootstrap";

interface LoginFormProps {
    loading: boolean;
    errors?: string;
    login: ((username: string, password: string) => void);
}

interface LoginFormState {
    username: string;
    password: string;
}

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    constructor(props: Readonly<LoginFormProps>) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.FormEvent<FormControlProps>) {
        switch (event.currentTarget.id) {
            case "usernameField": {
                this.setState({username: event.currentTarget.value!});
                break;
            }
            case "passwordField": {
                this.setState({password: event.currentTarget.value!});
                break;
            }
            default: {
                break;
            }
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            return;
        }

        this.props.login(this.state.username, this.state.password);
    }

    render() {
        const { loading, errors } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Form.Control
                        id="usernameField"
                        required
                        type="text"
                        placeholder="Username"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Control
                        id="passwordField"
                        required
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button variant="primary" type="submit" className="mb-3" size="lg" block>
                    SIGN IN
                </Button>
                <Container>
                    <Row>
                        {loading && (<Spinner animation="border" variant="primary" className="mb-3 mx-auto" />)}
                        {errors && (<Alert variant="danger" className="mx-auto flex-grow-1">Cannot authenticate!</Alert>)}
                    </Row>
                </Container>
            </Form>
        );
    }

}
