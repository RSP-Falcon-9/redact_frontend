import * as React from "react";
import { Modal } from "react-bootstrap";
import AuthorAppeal from "./author-appeal";

interface AdminAddUserModalProps {
    show: boolean;
    reviewId: string;
    onModalClose: (() => void);
}

export default class AuthorAppealModal extends React.Component<AdminAddUserModalProps> {

    render() {
        return <>
            <Modal
                show={this.props.show}
                size="lg"
                centered
                onHide={this.props.onModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Zaslání žádosti o námitku
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AuthorAppeal reviewId={this.props.reviewId} onSendAppeal={this.props.onModalClose} />
                </Modal.Body>
            </Modal>
        </>;
    }

}
