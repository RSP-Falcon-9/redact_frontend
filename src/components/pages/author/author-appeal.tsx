import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { appealReviewRequest } from "store/author/actions";
import { ApplicationState } from "store/root";

interface UpdateArticleProps {
    reviewId: string;
    onSendAppeal: (() => void);
}

interface PropsFromState {
    loading: boolean;
    message: string;
    errors?: string;
}

interface PropsFromDispatch {
    appealReviewRequest: typeof appealReviewRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & UpdateArticleProps;

interface NewArticleFormState {
    text: string;
}

class AuthorAppeal extends React.Component<AllProps, NewArticleFormState> {

    render() {
        return <>
            <Form>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            this.setState({
                                text: event.currentTarget.value,
                            });
                        }} />
                </Form.Group>
                <Button variant="success" className="mt-3 mb-3" onClick={() => this.onAppealClick()}>
                    Odeslat námitku
                </Button>
            </Form>
        </>;
    }

    onAppealClick() {
        this.props.appealReviewRequest(this.props.reviewId, { appeal: this.state.text });
        this.props.onSendAppeal();
    }

}

const mapStateToProps = ({ author }: ApplicationState) => ({
    loading: author.appealReview.loading,
    message: author.appealReview.message,
    errors: author.appealReview.error,
});

const mapDispatchToProps = {
    appealReviewRequest,
};

export default connect<PropsFromState, PropsFromDispatch, UpdateArticleProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorAppeal);
