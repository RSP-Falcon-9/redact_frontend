import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { authRequest, logout } from "store/auth/actions";
import { ApplicationState } from "store/root";

interface PropsFromState {
    loading: boolean;
    authenticated: boolean;
    userName: string;
    error?: string;
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

    render() {
        const { loading, error } = this.props;

        let componentToShow = !this.props.authenticated ? (
            <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
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
            }}>
                <Row noGutters={true}>
                    <Col className="mr-3">
                        <Form.Control
                            id="usernameField"
                            required
                            type="text"
                            placeholder="Uživatelské jméno"
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                this.setState({
                                    username: event.currentTarget.value!,
                                });
                            }}
                        />
                    </Col>
                    <Col className="mr-3">
                        <Form.Control
                            id="passwordField"
                            required
                            type="password"
                            placeholder="Heslo"
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                this.setState({
                                    password: event.currentTarget.value!,
                                });
                            }}
                        />
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit" className="mb-3" block>
                            Přihlásit se
                        </Button>
                    </Col>
                </Row>
            </Form>) : (
                <div className="text-right" >
                    <span className="mr-3">Přihlášen jako <b>{this.props.userName}</b></span>
                    <Button variant="primary" size="sm" onClick={() => {
                            this.props.logout();
                        }}>
                            <FontAwesomeIcon icon="door-open" className={"mr-1"} /> Odhlásit se
                    </Button>
                </div>
            );

        return <>
            {componentToShow}
            {(loading || error) && <Row>
                {loading && (<Col><Spinner animation="border" variant="primary" className="mb-3 mx-auto" /></Col>)}
                {error && (<Col><Alert variant="danger" className="mx-auto flex-grow-1">Nelze se přihlásit!</Alert></Col>)}
            </Row>}
        </>;
    }

}

const mapStateToProps = ({ auth }: ApplicationState) => ({
    loading: auth.loading,
    authenticated: auth.authToken.length > 0,
    userName: auth.userName,
    error: auth.error,
});

const mapDispatchToProps = {
    authRequest,
    logout,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
