import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { navigationAddUrl } from "store/navigation/actions";
import { ApplicationState } from "store/root";
import { HOME_URL } from "utils/constants";

interface PrivilegedRouteProps {
    role: string;
    name: string;
}

interface PropsFromState {
    authenticated: boolean;
    roles: string[];
}

interface PropsFromDispatch {
    navigationAddUrl: typeof navigationAddUrl;
}

type AllProps = PrivilegedRouteProps & PropsFromState & PropsFromDispatch & RouteProps;

class PrivilegedRoute extends Route<AllProps> {

    constructor(props: Readonly<AllProps>) {
        super(props);

        const path = (this.props.path == undefined ? "" : this.props.path) as string;

        this.props.navigationAddUrl({ role: this.props.role, name: name, path: path });
    }

    render() {
        const { authenticated, roles } = this.props;

        if (!authenticated || !roles.includes(this.props.role)) {
            return <Route {...this.props} component={() => (<Redirect to={HOME_URL} />)} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }

 }

const mapStateToProps = ({ auth }: ApplicationState) => ({
    authenticated: auth.authToken.length > 0,
    roles: auth.roles,
});

const mapDispatchToProps = {
    navigationAddUrl,
};

export default connect<PropsFromState, PropsFromDispatch, PrivilegedRouteProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(PrivilegedRoute);
