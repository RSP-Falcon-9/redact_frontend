import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getReviewersRequest } from "store/editor/actions";
import { Reviewer } from "store/editor/types";
import { ApplicationState } from "store/root";

interface RouteProps {
    id: string;
    version: number;
}

interface PropsFromState {
    loading: boolean;
    errors?: string;
    reviewers: Reviewer[];
}

interface PropsFromDispatch {
    getReviewersRequest: typeof getReviewersRequest;
}

type AllProps<T> = PropsFromState & PropsFromDispatch & RouteComponentProps<T>;

class EditorSendToReviewer extends React.Component<AllProps<RouteProps>> {

    componentDidMount() {
        this.props.getReviewersRequest();
    }

    content(): JSX.Element {
        return <>
            <h2>Zaslání žádosti o posudek</h2>
            <Form>
                <Form.Group controlId="reviewRequest.reviewerPick">
                    <Form.Label>Výběr reviewera</Form.Label>
                    <Form.Control as="select">
                        {this.props.reviewers.map((reviewer, index) => {
                            return <option key={index}>{reviewer.userName}</option>;
                        })}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Odeslat
                </Button>
            </Form>
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}

const mapStateToProps = ({ editor }: ApplicationState) => ({
    loading: editor.getReviewers.loading,
    errors: editor.getReviewers.errors,
    reviewers: editor.getReviewers.reviewers,
});

const mapDispatchToProps = {
    getReviewersRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(EditorSendToReviewer);
