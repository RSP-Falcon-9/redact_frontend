import * as React from "react";
import { Alert, Spinner, Table, Dropdown, Button, ButtonGroup, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { getArticlesRequest } from "store/author/actions";
import { AuthorArticle, ArticleVersionStatus } from "store/author/types";
import { ApplicationState } from "store/root";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthorUpdateArticleModal from "./author-update-article-modal";

interface PropsFromState {
    loading: boolean;
    articles: AuthorArticle[];
    error?: string;
}

interface PropsFromDispatch {
    getArticlesRequest: typeof getArticlesRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

interface AuthorArticlesTableState {
    showModal: boolean;
    articleId: string;
    articleName: string;
}

class AuthorArticlesTable extends React.Component<AllProps, AuthorArticlesTableState> {

    constructor(props: Readonly<AllProps>) {
        super(props);

        this.state = {
            showModal: false,
            articleId: "",
            articleName: "",
        };
    }

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
            <AuthorUpdateArticleModal
                show={this.state.showModal}
                articleId={this.state.articleId}
                articleName={this.state.articleName}
                onModalClose={() => this.setState({
                    showModal: false,
                    articleId: "",
                    articleName: "",
                })} />
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
        const sortedVersions = article.versions.sort((a, b) => b.version - a.version);
        const newestVersion = sortedVersions[0].version;

        let statusBadge: JSX.Element;
        switch (sortedVersions[0].status) {
            case ArticleVersionStatus.NEW:
                statusBadge = <Badge variant="info">Požádáno o recenzi</Badge>;
                break;
            case ArticleVersionStatus.REVIEW_PENDING:
                statusBadge = <Badge variant="info">V recenzním řízení</Badge>;
                break;
            case ArticleVersionStatus.ACCEPTED:
                statusBadge = <Badge variant="success">Přijato</Badge>;
                break;
            case ArticleVersionStatus.DENIED:
                statusBadge = <Badge variant="danger">Zamítnuto</Badge>;
                break;
            default:
                statusBadge = <Badge variant="info">Stav neznámý</Badge>;
                break;
        }

        return <>
            <td>{article.name}</td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Link to={`/author/article/${article.id}/${newestVersion}`}><Button variant="info">Zobrazit poslední verzi</Button></Link>

                    <Dropdown.Toggle split variant="info" id="dropdown-split-versions" />

                    <Dropdown.Menu>
                        {sortedVersions.map(version => {
                            return <Dropdown.Item key={`dropdown_${version.version}`} href={`/author/article/${article.id}/${version.version}`}>Verze {version.version}</Dropdown.Item>;
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                {sortedVersions[0].status === ArticleVersionStatus.DENIED && (
                    <Button variant="success" className="ml-3" onClick={() => this.setState({
                        showModal: true,
                        articleId: article.id,
                        articleName: article.name,
                    })}>
                        <FontAwesomeIcon icon="plus" className="mr-1" /> Nahrát novou verzi
                    </Button>
                )}
            </td>
            <td>{sortedVersions[0].publishDate}</td>
            <td>{statusBadge}</td>
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
