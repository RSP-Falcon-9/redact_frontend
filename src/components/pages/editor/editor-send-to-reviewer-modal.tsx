import * as React from "react";
import { Modal } from "react-bootstrap";
import EditorSendToReviewer from "./editor-send-to-reviewer-form";

interface AdminAddUserModalProps {
    show: boolean;
    articleId: string;
    version: number;
    onModalClose: (() => void);
}

export default class EditorSendToReviewerModal extends React.Component<AdminAddUserModalProps> {

    render() {
        return <>
            <Modal
                show={this.props.show}
                size="lg"
                centered
                onHide={this.props.onModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Zaslání žádosti o posudek
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditorSendToReviewer articleId={this.props.articleId} version={this.props.version}
                        onAddClick={() => this.props.onModalClose() } />
                </Modal.Body>
            </Modal>
        </>;
    }

}
