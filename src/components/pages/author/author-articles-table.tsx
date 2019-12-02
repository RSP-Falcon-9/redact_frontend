import * as React from "react";
import { Alert, Spinner, Table, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { getArticlesRequest } from "store/author/actions";
import { AuthorArticle, ArticleVersionStatus } from "store/author/types";
import { ApplicationState } from "store/root";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PropsFromState {
    loading: boolean;
    articles: AuthorArticle[];
    error?: string;
}

interface PropsFromDispatch {
    getArticlesRequest: typeof getArticlesRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

class AuthorArticlesTable extends React.Component<AllProps> {

    componentDidMount() {
        this.props.getArticlesRequest();
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
            <th>Verze</th>
            <th>Datum poslední verze</th>
            <th>Stav poslední verze</th>
        </>;
    }

    tableArticleRow(article: AuthorArticle): JSX.Element {
        const sortedVersions = article.versions.sort((a, b) => a.version - b.version);
        const newestVersion = sortedVersions[0].version;

        let statusText;
        switch (sortedVersions[0].status) {
            case ArticleVersionStatus.NEW:
                statusText = "Požádáno o recenzi";
                break;
            case ArticleVersionStatus.ACCEPTED:
                statusText = "Přijato";
                break;
            case ArticleVersionStatus.DENIED:
                statusText = "Zamítnuto";
                break;
            default: break;
        }

        return <>
            <td>{article.name}</td>
            <td>
                <Dropdown as={ButtonGroup} className="mr-3">
                    <Link to={`/author/article/${article.id}/${newestVersion}`}><Button variant="info">Zobrazit poslední verzi</Button></Link>

                    <Dropdown.Toggle split variant="info" id="dropdown-split-versions" />

                    <Dropdown.Menu>
                        {sortedVersions.map(version => {
                            return <Dropdown.Item key={`dropdown_${version.version}`} href={`/author/article/${article.id}/${version.version}`}>{version.version}</Dropdown.Item>;
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                {sortedVersions[0].status === ArticleVersionStatus.DENIED && (
                    <Link to={`/author/articles/new/${article.id}`}>
                        <Button variant="primary">
                            <FontAwesomeIcon icon="plus" />
                        </Button>
                    </Link>
                )}
            </td>
            <td>{sortedVersions[0].publishDate}</td>
            <td>{statusText}</td>
        </>;
    }

}

const mapStateToProps = ({ author }: ApplicationState) => ({
    loading: author.getArticles.loading,
    articles: author.getArticles.articles,
    error: author.getArticles.error,
});

const mapDispatchToProps = {
    getArticlesRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorArticlesTable);
