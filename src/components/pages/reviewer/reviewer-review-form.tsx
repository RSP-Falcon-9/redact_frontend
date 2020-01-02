import * as React from "react";
import { Badge, Button, Form, Alert, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { reviewArticleRequest } from "store/reviewer/actions";
import { ArticleReviewStatus } from "store/reviewer/types";
import { ApplicationState } from "store/root";
import { Redirect } from "react-router";

interface ReviewerReviewProps {
    id: string;
    status: ArticleReviewStatus;
}

interface PropsFromState {
    loading: boolean;
    message: string;
    error?: string;
}

interface PropsFromDispatch {
    reviewArticleRequest: typeof reviewArticleRequest;
}

type AllProps = ReviewerReviewProps & PropsFromState & PropsFromDispatch;

interface ReviewerReviewFormState {
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

class ReviewerReviewForm extends React.Component<AllProps, ReviewerReviewFormState> {

    render() {
        const { loading, message, error } = this.props;

        let appealBadge: JSX.Element;
        switch (this.props.status) {
            case ArticleReviewStatus.NEW:
                appealBadge = <Badge variant="info">Nový</Badge>;
                break;
            case ArticleReviewStatus.REVIEWED:
                appealBadge = <Badge variant="info">Zrecenzováno</Badge>;
                break;
            case ArticleReviewStatus.APPEAL:
                appealBadge = <Badge variant="info">Autor se odvolal</Badge>;
                break;
            default:
                appealBadge = <Badge variant="info">Neznámý stav</Badge>;
                break;
        }

        return <>
            <h3>
                <span className="mr-3">Recenze</span>
                {appealBadge}
            </h3>
            <p> Nápověda: 1-nejhorší, 5-nejlepší </p>
            <Form onSubmit={(formEvent: React.FormEvent<HTMLFormElement>) => {
                formEvent.preventDefault();

                const form = formEvent.currentTarget;
                if (!form.checkValidity()) {
                    formEvent.stopPropagation();
                    return;
                }

                this.props.reviewArticleRequest(this.props.id, {
                    interest: this.state.interest,
                    originality: this.state.originality,
                    specializationLevel: this.state.specializationLevel,
                    languageLevel: this.state.languageLevel,
                    comment: this.state.comment,
                });
            }}>
                {this.radioGroup("Aktuálnost, zajímavost a přínosnost", "uptodate")}
                {this.radioGroup("Originalita", "originality")}
                {this.radioGroup("Odborná úroveň", "technicality")}
                {this.radioGroup("Jazyková a stylistická úroveň", "language")}

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Komentář</Form.Label>
                    <Form.Control as="textarea" rows="3"
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            this.setState({
                                comment: event.currentTarget.value,
                            });
                        }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Odeslat recenzi
                </Button>
                {loading && (<Spinner animation="border" variant="primary" />)}
                {error && (<Alert variant="danger">Nelze zrecenzovat článek!</Alert>)}
                {!error && message && (<Redirect to="/reviewer/articles" />)}
            </Form>
        </>;
    }

    radioGroup(label: string, name: string): JSX.Element {
        return <>
                <Form.Group className="row">
                    <Form.Label className="legend" column md={4}>
                        {label}
                    </Form.Label>

                    {[...Array(5)].map((_x, i) =>
                        this.radioGroupBtn(name, i + 1),
                    )}
                </Form.Group>
            </>;
    }

    radioGroupBtn(name: string, index: number): JSX.Element {
        return <Form.Check
            key={name + index}
            inline
            type="radio"
            label={index}
            value={index}
            name={name}
            id={name + index}
            onChange={() => {
                this.onChangeRadioButton(name, index);
            }} />;
    }

    onChangeRadioButton(groupName: string, value: number) {
        switch (groupName) {
            case "uptodate": {
                this.setState({
                    interest: value,
                });
                break;
            }
            case "originality": {
                this.setState({
                    originality: value,
                });
                break;
            }
            case "technicality": {
                this.setState({
                    specializationLevel: value,
                });
                break;
            }
            case "language": {
                this.setState({
                    languageLevel: value,
                });
                break;
            }
            default: {
                break;
            }
        }
    }

}

const mapStateToProps = ({ reviewer }: ApplicationState) => ({
    loading: reviewer.reviewArticle.loading,
    message: reviewer.reviewArticle.message,
    error: reviewer.reviewArticle.error,
});

const mapDispatchToProps = {
    reviewArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewerReviewForm);
