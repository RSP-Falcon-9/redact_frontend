import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllUsersRequest } from "store/admin/actions";
import { User } from "store/admin/types";
import { ApplicationState } from "store/root";
import AdminAddUserModal from "./admin-add-user-modal";

interface PropsFromState {
    currentUserName: string;
    loading: boolean; // TODO: Move deeper into state.
    users: User[];
    errors?: string;
}

interface PropsFromDispatch {
    getAllUsersRequest: typeof getAllUsersRequest;
}

interface AdminUsersFormState {
    addUserModalActive: boolean;
}

type AllProps = PropsFromState & PropsFromDispatch;

class AdminUsersTable extends React.Component<AllProps, AdminUsersFormState> {

    constructor(props: AllProps) {
        super(props);

        this.state = {
            addUserModalActive: false,
        };

        this.onOpenAddUserModalClick = this.onOpenAddUserModalClick.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsersRequest();
    }

    onOpenAddUserModalClick() {
        this.setState({ addUserModalActive: true });
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" className="mb-3 mx-auto" />;
        } else if (this.props.errors) {
            return <Alert variant="danger" className="mx-auto flex-grow-1">Nelze načíst uživatele!</Alert>;
        }

        return <>
            <Button variant="primary" className="mt-3 mb-3" onClick={this.onOpenAddUserModalClick}>
                <FontAwesomeIcon icon="plus" />
            </Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Uživatelské jméno</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.users.map((user, index) => {
                        return <tr key={index}>
                            <td>{user.userName}</td>
                            <td>
                                <Button variant="info" className="mr-3">
                                    <FontAwesomeIcon icon="info" />
                                </Button>
                                <Button variant="danger" disabled={user.userName === this.props.currentUserName}>
                                    <FontAwesomeIcon icon="trash" />
                                </Button>
                            </td>
                        </tr>;
                    })}
                </tbody>
            </Table>
            <AdminAddUserModal show={this.state.addUserModalActive}
                onModalClose={() => {
                    this.setState({ addUserModalActive: false });
                }} />
        </>;
    }

}

const mapStateToProps = ({ auth, admin }: ApplicationState) => ({
    currentUserName: auth.userName,
    loading: admin.loading,
    users: admin.users,
    errors: admin.errors,
});

const mapDispatchToProps = {
    getAllUsersRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AdminUsersTable);
