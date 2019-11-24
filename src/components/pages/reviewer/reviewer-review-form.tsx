import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { ApplicationState } from "store/root";
import { connect } from "react-redux";
import { reviewArticleRequest } from "store/reviewer/actions";

interface ReviewerReviewFormProps {
    id: string;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

interface PropsFromState {
    loading: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    reviewArticleRequest: typeof reviewArticleRequest;
}

type AllProps = ReviewerReviewFormProps & PropsFromState & PropsFromDispatch;

interface ReviewerReviewFormState {
    selectedReviewerId: string;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

class ReviewerReviewForm extends React.Component<AllProps, ReviewerReviewFormState> {

    render() {
        return <>
            <Form>
                {this.radioGroup("Aktuálnost, zajímavost a přínosnost", "uptodate")}
                {this.radioGroup("Originalita", "originality")}
                {this.radioGroup("Odborná úroveň", "technicality")}
                {this.radioGroup("Jazyková a stylistická úroveň", "language")}

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Odpověď autorovi</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Odeslat
                </Button>
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
        return <>
            <Form.Check
                key={index}
                inline
                type="radio"
                label={index}
                name={name + index}
                id={name + index} />
        </>;
    }

}

const mapStateToProps = ({ reviewer }: ApplicationState) => ({
    loading: reviewer.reviewArticle.loading,
    errors: reviewer.reviewArticle.errors,
});

const mapDispatchToProps = {
    reviewArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewerReviewForm);
