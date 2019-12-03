import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getArticleDetailRequest } from "store/author/actions";
import { ApplicationState } from "store/root";
import { getArticleFileRequest } from "store/articles/actions";
import { AuthorArticleReview } from "store/author/types";
import { AuthorReviewForm } from "./author-review-form";
import { ArticleReviewStatus } from "store/reviewer/types";
import AuthorAppealModal from "./author-appeal-modal";

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
    getArticleDetailRequest: typeof getArticleDetailRequest;
    getArticleFileRequest: typeof getArticleFileRequest;
}

type AllProps<T> = PropsFromState & PropsFromDispatch & RouteComponentProps<T>;

interface AuthorArticleDetailState {
    showModal: boolean;
    reviewId: string;
}

class AuthorArticleDetail extends React.Component<AllProps<RouteProps>, AuthorArticleDetailState> {

    constructor(props: Readonly<AllProps<RouteProps>>) {
        super(props);

        this.state = {
            showModal: false,
            reviewId: "",
        };
    }

    componentDidMount() {
        this.props.getArticleDetailRequest({
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
                return <div key={"form_" + index}>
                    <AuthorReviewForm
                        id={review.id}
                        status={review.status}
                        interest={review.interest}
                        originality={review.originality}
                        specializationLevel={review.specializationLevel}
                        languageLevel={review.languageLevel}
                        comment={review.comment}
                        appeal={review.appeal}
                        appealDate={review.appealDate} />
                    {review.status === ArticleReviewStatus.REVIEWED && (<Button variant="secondary" onClick={() => this.setState({
                        showModal: true,
                        reviewId: review.id,
                    })}>Námitka</Button>)}
                </div>;
            })}

            <AuthorAppealModal
                show={this.state.showModal}
                reviewId={this.state.reviewId}
                onModalClose={() => {
                    this.setState({
                        showModal: false,
                        reviewId: "",
                    });

                    // FIXME
                    /*this.props.getArticleDetailRequest({
                        articleId: this.props.match.params.id,
                        version: this.props.match.params.version,
                    });*/
                }} />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}

const mapStateToProps = ({ author, articles }: ApplicationState) => ({
    loading: author.getArticleDetail.loading,
    error: author.getArticleDetail.error,
    name: author.getArticleDetail.name,
    fileUrl: articles.getArticleFile.fileUrl,
    reviews: author.getArticleDetail.reviews,
});

const mapDispatchToProps = {
    getArticleDetailRequest,
    getArticleFileRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorArticleDetail);
