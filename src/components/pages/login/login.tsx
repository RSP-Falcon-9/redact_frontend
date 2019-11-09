import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Alert, Button, Col, Form, FormControlProps, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { authRequest, logout } from "store/auth/actions";
import { ApplicationState } from "store/root";

interface PropsFromState {
    loading: boolean;
    authenticated: boolean;
    userName: string;
    errors?: string;
}

interface PropsFromDispatch {
    authRequest: typeof authRequest;
    logout: typeof logout;
}

type AllProps = PropsFromState & PropsFromDispatch;

interface LoginState {
    username: string;
    password: string;
}

class Login extends React.Component<AllProps, LoginState> {

    constructor(props: Readonly<AllProps>) {
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

        this.props.authRequest({
            userName: this.state.username,
            password: this.state.password,
        });
    }

    render() {
        const { loading, errors } = this.props;

        let componentToShow = !this.props.authenticated ? (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Control
                            id="usernameField"
                            required
                            type="text"
                            placeholder="Username"
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            id="passwordField"
                            required
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit" className="mb-3" block>
                            SIGN IN
                        </Button>
                    </Col>
                </Row>
            </Form>) : (
                <Row>
                    <Col>Vítejte, {this.props.userName}</Col>
                    <Col>
                        <Button variant="primary" size="sm" onClick={() => {
                                this.props.logout();
                            }}>
                                <FontAwesomeIcon icon="door-open" />
                        </Button>
                    </Col>
                </Row>
            );

        return <>
            {componentToShow}
            <Row>
                {loading && (<Col><Spinner animation="border" variant="primary" className="mb-3 mx-auto" /></Col>)}
                {errors && (<Col><Alert variant="danger" className="mx-auto flex-grow-1">Cannot authenticate!</Alert></Col>)}
            </Row>
        </>;
    }

}

const mapStateToProps = ({ auth }: ApplicationState) => ({
    loading: auth.loading,
    authenticated: auth.authToken.length > 0,
    userName: auth.userName,
    errors: auth.errors,
});

const mapDispatchToProps = {
    authRequest,
    logout,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
