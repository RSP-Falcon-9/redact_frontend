import * as React from "react";
import { Modal } from "react-bootstrap";
import AuthorUpdateArticle from "./author-update-article";

interface AuthorUpdateArticleModalProps {
    show: boolean;
    articleId: string;
    articleName: string;
    onModalClose: (() => void);
}

export default class AuthorUpdateArticleModal extends React.Component<AuthorUpdateArticleModalProps> {

    render() {
        return <>
            <Modal
                show={this.props.show}
                size="lg"
                centered
                onHide={this.props.onModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Aktualizovat článek <i>{this.props.articleName}</i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AuthorUpdateArticle
                        articleId={this.props.articleId}
                        onUploadNewArticle={() => this.props.onModalClose()} />
                </Modal.Body>
            </Modal>
        </>;
    }

}
