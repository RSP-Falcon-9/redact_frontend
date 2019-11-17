import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { ApplicationState } from "store/root";
import { HOME_URL } from "utils/navigation";

interface PrivilegedRouteProps {
    role: string;
}

interface PropsFromState {
    authenticated: boolean;
    roles: string[];
}

type AllProps = PrivilegedRouteProps & PropsFromState & RouteProps;

class PrivilegedRoute extends Route<AllProps> {

    render() {
        const { authenticated, roles } = this.props;

        if (!authenticated || !roles.includes(this.props.role)) {
            // return <Route {...this.props} component={() => (<Redirect to={HOME_URL} />)} render={undefined} />;
            return <Redirect to={HOME_URL} />;
        } else {
            return <Route {...this.props} />;
        }
    }

}

const mapStateToProps = ({ auth }: ApplicationState) => ({
    authenticated: auth.authToken.length > 0,
    roles: auth.roles,
});

export default connect<PropsFromState, {}, PrivilegedRouteProps, ApplicationState>(
    mapStateToProps,
)(PrivilegedRoute);
