import * as React from "react";
import { Alert, Spinner, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getReviewerArticlesRequest } from "store/reviewer/actions";
import { ReviewerArticle } from "store/reviewer/types";
import { ApplicationState } from "store/root";

interface PropsFromState {
    loading: boolean;
    articles: ReviewerArticle[];
    errors?: string;
}

interface PropsFromDispatch {
    getReviewerArticlesRequest: typeof getReviewerArticlesRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

class ReviewerArticlesTable extends React.Component<AllProps> {

    componentDidMount() {
        this.props.getReviewerArticlesRequest();
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" className="mb-3 mx-auto" />;
        } else if (this.props.errors) {
            return <Alert variant="danger" className="mx-auto flex-grow-1">Nelze načíst články!</Alert>;
        }

        return <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {this.tableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.props.articles.map((article, index) => {
                        return <tr key={index}>
                            {this.tableArticleRow(article)}
                        </tr>;
                    })}
                </tbody>
            </Table>
        </>;
    }

    tableHeader(): JSX.Element {
        return <>
            <th>Název článku</th>
        </>;
    }

    tableArticleRow(article: ReviewerArticle): JSX.Element {
        return <>

            <td>{article.name}</td>
        </>;
    }

}

const mapStateToProps = ({ reviewer }: ApplicationState) => ({
    loading: reviewer.getReviewerArticles.loading,
    articles: reviewer.getReviewerArticles.articles,
    errors: reviewer.getReviewerArticles.errors,
});

const mapDispatchToProps = {
    getReviewerArticlesRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewerArticlesTable);
