import * as React from "react";
import { Alert, Button, Spinner, Table, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getReviewerArticlesRequest } from "store/reviewer/actions";
import { ArticleReviewStatus, ReviewerArticleState } from "store/reviewer/types";
import { ApplicationState } from "store/root";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PropsFromState {
    loading: boolean;
    articles: ReviewerArticleState[];
    error?: string;
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
        }

        if (this.props.error) {
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
            <th>Verze článku</th>
            <th>Stav recenze</th>
            <th>Akce</th>
        </>;
    }

    tableArticleRow(article: ReviewerArticleState): JSX.Element {
        let statusBadge: JSX.Element;

        switch (article.status) {
            case ArticleReviewStatus.NEW:
                statusBadge = <Badge variant="info">Nový</Badge>;
                break;
            case ArticleReviewStatus.REVIEWED:
                statusBadge = <Badge variant="info">Zrecenzováno</Badge>;
                break;
            case ArticleReviewStatus.APPEAL:
                statusBadge = <Badge variant="info">Autor se odvolal</Badge>;
                break;
            default:
                statusBadge = <Badge variant="info">Neznámý stav</Badge>;
                break;
        }

        return <>
            <td>{article.name}</td>
            <td>{article.version}</td>
            <td>{statusBadge}</td>
            <td>
                <Link to={`/reviewer/article/${article.id}/${article.version}`}>
                    <Button variant="info"><FontAwesomeIcon icon="star" className="mr-1" /> Zrecenzovat</Button>
                </Link>
            </td>
        </>;
    }

}

const mapStateToProps = ({ reviewer }: ApplicationState) => ({
    loading: reviewer.getReviewerArticles.loading,
    articles: reviewer.getReviewerArticles.articles,
    error: reviewer.getReviewerArticles.error,
});

const mapDispatchToProps = {
    getReviewerArticlesRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewerArticlesTable);
