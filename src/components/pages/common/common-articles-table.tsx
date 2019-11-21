import * as React from "react";
import { Alert, Spinner, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getArticlesRequest } from "store/articles/actions";
import { Article } from "store/articles/types";
import { ApplicationState } from "store/root";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PropsFromState {
    loading: boolean;
    articles: Article[];
    errors?: string;
}

interface PropsFromDispatch {
    getArticlesRequest: typeof getArticlesRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class ArticlesTable extends React.Component<AllProps> {

    componentDidMount() {
        this.props.getArticlesRequest();
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
            <th>Datum poslední revize</th>
            <th>Prošlo recenzí?</th>
        </>;
    }

    tableArticleRow(article: Article): JSX.Element {
        return <>
            <td><Link to={`/article/${article.id}`}>{article.name}</Link></td>
            <td>{article.versions[0].publishDate}</td>
            <td><FontAwesomeIcon icon="times" /></td>
        </>;
    }

}

const mapStateToProps = ({ articles }: ApplicationState) => ({
    loading: articles.getArticles.loading,
    articles: articles.getArticles.articles,
    errors: articles.getArticles.errors,
});

const mapDispatchToProps = {
    getArticlesRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ArticlesTable);
