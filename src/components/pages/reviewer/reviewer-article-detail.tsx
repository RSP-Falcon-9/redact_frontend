import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Alert, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getArticleFileRequest } from "store/articles/actions";
import { getReviewerArticleDetailRequest } from "store/reviewer/actions";
import { ArticleReviewStatus } from "store/reviewer/types";
import { ApplicationState } from "store/root";
import { AuthorReviewForm } from "components/pages/author/author-review-form";
import ReviewerReviewForm from "./reviewer-review-form";

interface RouteProps {
    id: string;
    version: number;
}

interface PropsFromState {
    loading: boolean;
    errors?: string;
    name: string;
    fileUrl?: string;
    reviewId: string;
    reviewInterest: number;
    reviewOriginality: number;
    reviewSpecializationLevel: number;
    reviewLanguageLevel: number;
    reviewComment: string;
    reviewStatus: ArticleReviewStatus;
    reviewAppealComment: string;
    reviewAppealDate: Date;
}

interface PropsFromDispatch {
    getReviewerArticleDetailRequest: typeof getReviewerArticleDetailRequest;
    getArticleFileRequest: typeof getArticleFileRequest;
}

type AllProps<T> = PropsFromState & PropsFromDispatch & RouteComponentProps<T>;

class ReviewerArticleDetail extends React.Component<AllProps<RouteProps>> {

    componentDidMount() {
        this.props.getReviewerArticleDetailRequest({ articleId: this.props.match.params.id, version: this.props.match.params.version });
        this.props.getArticleFileRequest({ articleId: this.props.match.params.id, version: this.props.match.params.version });
    }

    content(): JSX.Element {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" />;
        }

        if (this.props.errors) {
            return <Alert variant="danger">Nelze načíst detail článku {this.props.match.params.id}!</Alert>;
        }

        return <>
            <h2>{this.props.name}</h2>

            {this.props.fileUrl && <embed src={this.props.fileUrl} type="application/pdf" width="100%" height="600px" />}

            {(this.props.reviewStatus === ArticleReviewStatus.REVIEWED || this.props.reviewStatus === ArticleReviewStatus.APPEAL) && (
                <AuthorReviewForm
                    id={this.props.reviewId}
                    status={this.props.reviewStatus}
                    interest={this.props.reviewInterest}
                    originality={this.props.reviewOriginality}
                    specializationLevel={this.props.reviewSpecializationLevel}
                    languageLevel={this.props.reviewLanguageLevel}
                    comment={this.props.reviewComment}
                    appeal={this.props.reviewAppealComment}
                    appealDate = {this.props.reviewAppealDate}
                />
            )}
            {this.props.reviewStatus === ArticleReviewStatus.NEW && (
                <ReviewerReviewForm
                    id={this.props.reviewId}
                    status={this.props.reviewStatus} />
            )}
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}

const mapStateToProps = ({ reviewer, articles }: ApplicationState) => ({
    loading: reviewer.getReviewerArticleDetail.loading,
    errors: reviewer.getReviewerArticleDetail.error,
    name: reviewer.getReviewerArticleDetail.name,
    fileUrl: articles.getArticleFile.fileUrl,
    reviewId: reviewer.getReviewerArticleDetail.id,
    reviewInterest: reviewer.getReviewerArticleDetail.interest,
    reviewOriginality: reviewer.getReviewerArticleDetail.originality,
    reviewSpecializationLevel: reviewer.getReviewerArticleDetail.specializationLevel,
    reviewLanguageLevel: reviewer.getReviewerArticleDetail.languageLevel,
    reviewComment: reviewer.getReviewerArticleDetail.comment,
    reviewStatus: reviewer.getReviewerArticleDetail.reviewStatus,
    reviewAppealComment: reviewer.getReviewerArticleDetail.appeal,
    reviewAppealDate: reviewer.getReviewerArticleDetail.appealDate,
});

const mapDispatchToProps = {
    getReviewerArticleDetailRequest,
    getArticleFileRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewerArticleDetail);
