import LoginForm from "components/pages/login/login-form";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authRequest } from "store/auth/actions";
import { ApplicationState } from "store/root";
import { TITLE_BASE } from "utils/constants";

interface PropsFromState {
    loading: boolean;
    authenticated: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    authRequest: typeof authRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

interface LoginPageState {
    username: string;
    password: string;
}

class LoginPage extends React.Component<AllProps, LoginPageState> {

    constructor(props: Readonly<AllProps>) {
        super(props);
        document.title = TITLE_BASE + "Login";
    }

    render() {
        const { loading, errors, authenticated } = this.props;

        if (authenticated) {
            return <Redirect to="/" />;
        }

        return <div className="login-box">
            <div className="login-box-inner">
                <h1 className="text-center">Redact</h1>
                <LoginForm loading={loading} errors={errors} login={(username, password) => {
                    this.props.authRequest({username, password});
                }} />
            </div>
        </div>;
    }

}

const mapStateToProps = ({ auth }: ApplicationState) => ({
    loading: auth.loading,
    authenticated: auth.authToken.length > 0,
    errors: auth.errors,
});

const mapDispatchToProps = {
    authRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
