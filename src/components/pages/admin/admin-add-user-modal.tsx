import * as React from "react";
import { Modal } from "react-bootstrap";
import AdminAddNewUserForm from "./admin-add-user-form";

interface AdminAddUserModalProps {
    show: boolean;
    onModalClose: (() => void);
}

export default class AdminAddUserModal extends React.Component<AdminAddUserModalProps> {

    render() {
        return <>
            <Modal
                show={this.props.show}
                size="lg"
                centered
                onHide={this.props.onModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Přidat uživatele
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdminAddNewUserForm />
                </Modal.Body>
            </Modal>
        </>;
    }

}
