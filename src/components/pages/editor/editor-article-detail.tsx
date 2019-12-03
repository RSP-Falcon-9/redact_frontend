import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Spinner, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "store/root";
import { getArticleFileRequest } from "store/articles/actions";
import { AuthorArticleReview } from "store/author/types";
import { AuthorReviewForm } from "components/pages/author/author-review-form";
import { getEditorArticleDetailRequest } from "store/editor/actions";

interface RouteProps {
    id: string;
    version: number;
}

interface PropsFromState {
    loading: boolean;
    error?: string;
    name: string;
    fileUrl?: string;
    reviews: AuthorArticleReview[];
}

interface PropsFromDispatch {
    getEditorArticleDetailRequest: typeof getEditorArticleDetailRequest;
    getArticleFileRequest: typeof getArticleFileRequest;
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

            {this.props.fileUrl && <embed src={this.props.fileUrl} type="application/pdf" width="100%" height="600px" />}

            {this.props.reviews.map((review, index) => {
                return <AuthorReviewForm key={"form_" + index}
                    id={review.id}
                    status={review.status}
                    interest={review.interest}
                    originality={review.originality}
                    specializationLevel={review.specializationLevel}
                    languageLevel={review.languageLevel}
                    comment={review.comment}
                    appeal={review.appeal}
                    appealDate={review.appealDate} />;
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
    fileUrl: articles.getArticleFile.fileUrl,
    reviews: editor.getEditorArticleDetail.reviews,
});

const mapDispatchToProps = {
    getEditorArticleDetailRequest,
    getArticleFileRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(EditorArticleDetail);
