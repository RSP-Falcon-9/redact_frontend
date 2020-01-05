import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "store/root";
import { getArticleFileRequest } from "store/articles/actions";
import { getEditorArticleDetailRequest, setReviewVisibilityRequest } from "store/editor/actions";
import { EditorReviewForm } from "./editor-review-form";
import { EditorArticleReview } from "store/editor/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArticleReviewStatus } from "store/reviewer/types";
import EditorChangeEditionForm from "./editor-change-edition-form";

interface RouteProps {
    id: string;
    version: number;
}

interface PropsFromState {
    loading: boolean;
    error?: string;
    name: string;
    edition?: number;
    fileUrl?: string;
    reviews: EditorArticleReview[];
}

interface PropsFromDispatch {
    getEditorArticleDetailRequest: typeof getEditorArticleDetailRequest;
    getArticleFileRequest: typeof getArticleFileRequest;
    setReviewVisibilityRequest: typeof setReviewVisibilityRequest;
}

type AllProps<T> = PropsFromState & PropsFromDispatch & RouteComponentProps<T>;

class EditorArticleDetail extends React.Component<AllProps<RouteProps>> {

    componentDidMount() {
        this.props.getEditorArticleDetailRequest({
            articleId: this.props.match.params.id,
            version: this.props.match.params.version,
        });
        this.props.getArticleFileRequest({
            articleId: this.props.match.params.id,
            version: this.props.match.params.version,
        });
    }

    content(): JSX.Element {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" />;
        }

        if (this.props.error) {
            return <Alert variant="danger">Nelze načíst detail článku {this.props.match.params.id}!</Alert>;
        }

        return <>
            <h2>{this.props.name}</h2>

            <div className="mb-3">
                <EditorChangeEditionForm articleId={this.props.match.params.id} articleEdition={this.props.edition} />
            </div>

            {this.props.fileUrl && <embed src={this.props.fileUrl} type="application/pdf" width="100%" height="600px" />}

            {this.props.reviews.map((review, index) => {
                return <div key={"reviewDiv_" + index} className="mb-3">
                    <EditorReviewForm
                        id={review.id}
                        authorName={review.reviewer.userName}
                        status={review.status}
                        interest={review.interest}
                        originality={review.originality}
                        specializationLevel={review.specializationLevel}
                        languageLevel={review.languageLevel}
                        comment={review.comment}
                        appeal={review.appeal}
                        appealDate={review.appealDate} />

                    {review.status !== ArticleReviewStatus.NEW && (!review.visibleToAuthor ?
                        (<Button variant="info" onClick={() => this.props.setReviewVisibilityRequest(review.id, true)}>
                            <FontAwesomeIcon icon="plus" className="mr-1" /> Zpřístupnit autorovi
                        </Button>) :
                        (<Button variant="info" onClick={() => this.props.setReviewVisibilityRequest(review.id, false)}>
                            <FontAwesomeIcon icon="times" className="mr-1" /> Odebrat přístup autorovi
                        </Button>)
                    )}
                </div>;
            })}
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}

const mapStateToProps = ({ editor, articles }: ApplicationState) => ({
    loading: editor.getEditorArticleDetail.loading,
    error: editor.getEditorArticleDetail.error,
    name: editor.getEditorArticleDetail.name,
    edition: editor.getEditorArticleDetail.edition,
    fileUrl: articles.getArticleFile.fileUrl,
    reviews: editor.getEditorArticleDetail.reviews,
});

const mapDispatchToProps = {
    getEditorArticleDetailRequest,
    getArticleFileRequest,
    setReviewVisibilityRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(EditorArticleDetail);
