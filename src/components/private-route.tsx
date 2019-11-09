import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AUTH_URL } from "utils/constants";
import { ApplicationState } from "store/root";
import { connect } from "react-redux";

interface PropsFromState {
    authenticated: boolean;
}

type AllProps = PropsFromState & RouteProps;

class PrivateRoute extends Route<AllProps> {
    render() {
        const { authenticated } = this.props;

        if (!authenticated) {
            return <Route {...this.props} component={() => (<Redirect to={AUTH_URL} />)} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }

 }

const mapStateToProps = ({ auth }: ApplicationState) => ({
    authenticated: auth.authToken.length > 0,
});

export default connect(
    mapStateToProps,
)(PrivateRoute);
