import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { getReviewersRequest, setReviewerToArticleRequest } from "store/editor/actions";
import { Reviewer } from "store/editor/types";
import { ApplicationState } from "store/root";

interface EditorSendToReviewerProps {
    articleId: string;
    version: number;
    onAddClick: () => void;
}

interface PropsFromState {
    loading: boolean;
    error?: string;
    reviewers: Reviewer[];
}

interface PropsFromDispatch {
    getReviewersRequest: typeof getReviewersRequest;
    setReviewerToArticleRequest: typeof setReviewerToArticleRequest;
}

type AllProps = EditorSendToReviewerProps & PropsFromState & PropsFromDispatch;

interface EditorSendToReviewerState {
    selectedReviewerId: string;
}

class EditorSendToReviewer extends React.Component<AllProps, EditorSendToReviewerState> {

    componentDidMount() {
        this.props.getReviewersRequest();
    }

    componentDidUpdate(oldProps: Readonly<AllProps>) {
        if (this.props.reviewers.length !== oldProps.reviewers.length && this.props.reviewers.length > 0) {
            this.setState({
                selectedReviewerId: this.props.reviewers[0].userName,
            });
        }

        if (this.state === null && this.props.reviewers.length > 0) {
            this.setState({
                selectedReviewerId: this.props.reviewers[0].userName,
            });
        }
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

                this.props.setReviewerToArticleRequest(this.props.articleId, this.props.version, {
                    reviewerId: this.state.selectedReviewerId,
                });

                this.props.onAddClick();
            }}>
                <Form.Group controlId="reviewRequest.reviewerPick">
                    <Form.Label>Výběr recenzenta:</Form.Label>
                    <Form.Control as="select" onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) =>
                        this.setState({ selectedReviewerId: changeEvent.currentTarget.value })}>
                            {this.props.reviewers.map((reviewer, index) => {
                                return <option key={index} value={reviewer.userName}>{reviewer.userName}</option>;
                            })}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Odeslat
                </Button>
            </Form>
        </>;
    }

}

const mapStateToProps = ({ editor }: ApplicationState) => ({
    loading: editor.getReviewers.loading,
    error: editor.getReviewers.error,
    reviewers: editor.getReviewers.reviewers,
});

const mapDispatchToProps = {
    getReviewersRequest,
    setReviewerToArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(EditorSendToReviewer);
