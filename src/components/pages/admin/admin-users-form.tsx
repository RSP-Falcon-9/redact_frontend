import * as React from "react";
import { Table, Alert, Spinner } from "react-bootstrap";
import { User } from "store/admin/types";
import { ApplicationState } from "store/root";
import { connect } from "react-redux";
import { getAllUsersRequest } from "store/admin/actions";

interface PropsFromState {
    loading: boolean;
    users: User[];
    errors?: string;
}

interface PropsFromDispatch {
    getAllUsersRequest: typeof getAllUsersRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

class AdminUsersForm extends React.Component<AllProps> {

    componentDidMount() {
        this.props.getAllUsersRequest();
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" className="mb-3 mx-auto" />;
        } else if (this.props.errors) {
            return <Alert variant="danger" className="mx-auto flex-grow-1">Nelze načíst uživatele!</Alert>;
        }

        return <Table striped bordered hover>
            <thead>
            <tr>
                <th>Uživatelské jméno</th>
            </tr>
            </thead>
            <tbody>
                {this.props.users.map((user, index) => {
                    return <tr key={index}>
                        <td>{user.userName}</td>
                    </tr>;
                })}
            </tbody>
        </Table>;
    }

}

const mapStateToProps = ({ admin }: ApplicationState) => ({
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
)(AdminUsersForm);
