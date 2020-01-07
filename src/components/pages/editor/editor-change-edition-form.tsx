import * as React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { setArticleEditionRequest } from "store/editor/actions";
import { ApplicationState } from "store/root";
import { getEditionsRequest } from "store/unauthenticated/actions";
import { Edition } from "store/unauthenticated/types";

interface EditorChangeEditionFormProps {
    articleId: string;
    articleEdition?: number;
}

interface PropsFromState {
    loading: boolean;
    error?: string;
    editions: Edition[];
}

interface PropsFromDispatch {
    getEditionsRequest: typeof getEditionsRequest;
    setArticleEditionRequest: typeof setArticleEditionRequest;
}

type AllProps = EditorChangeEditionFormProps & PropsFromState & PropsFromDispatch;

interface EditorSendToReviewerState {
    selectedEditionNumber?: number;
}

class EditorChangeEditionForm extends React.Component<AllProps, EditorSendToReviewerState> {

    componentDidMount() {
        this.props.getEditionsRequest();
    }

    render() {
        return <>
            <Form onSubmit={(formEvent: React.FormEvent<HTMLFormElement>) => {
                formEvent.preventDefault();

                const form = formEvent.currentTarget;
                if (!form.checkValidity()) {
                    formEvent.stopPropagation();
                    return;
                }

                this.props.setArticleEditionRequest(this.props.articleId, this.state.selectedEditionNumber);
            }}>
                <span>Současné číslo vydání: {this.props.articleEdition}</span>
                <Form.Group as={Row} controlId="articleEdition.change">
                    <Form.Label column sm={2}>Změna čísla vydání:</Form.Label>
                    <Col sm={6}>
                        <Form.Control as="select"
                            onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) =>
                                this.setState({ selectedEditionNumber: parseInt(changeEvent.currentTarget.value, 10) })}>
                                    <option value={-1}>Žádné číslo vydání</option>;
                                    {this.props.editions.map((edition, index) => {
                                        return <option key={index} value={edition.id}>{edition.id} - {edition.description}</option>;
                                    })}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Změnit
                </Button>
            </Form>
        </>;
    }

}

const mapStateToProps = ({ editor, unauthenticated }: ApplicationState) => ({
    loading: editor.getReviewers.loading,
    error: editor.getReviewers.error,
    editions: unauthenticated.getEditionsState.editions,
});

const mapDispatchToProps = {
    getEditionsRequest,
    setArticleEditionRequest,
};

export default connect<PropsFromState, PropsFromDispatch, EditorChangeEditionFormProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(EditorChangeEditionForm);
