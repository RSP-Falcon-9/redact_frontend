import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Alert, Button, ButtonGroup, Dropdown, Spinner, Table, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getEditorArticlesRequest, acceptArticleRequest, denyArticleRequest } from "store/editor/actions";
import { EditorArticleState } from "store/editor/types";
import { ApplicationState } from "store/root";
import EditorSendToReviewerModal from "./editor-send-to-reviewer-modal";
import { ArticleVersionStatus } from "store/author/types";

interface PropsFromState {
    loading: boolean;
    articles: EditorArticleState[];
    error?: string;
}

interface PropsFromDispatch {
    getEditorArticlesRequest: typeof getEditorArticlesRequest;
    acceptArticleRequest: typeof acceptArticleRequest;
    denyArticleRequest: typeof denyArticleRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

interface EditorArticlesTableState {
    showModal: boolean;
    modalArticleId: string;
    modalArticleVersion: number;
}

class EditorArticlesTable extends React.Component<AllProps, EditorArticlesTableState> {

    constructor(props: Readonly<AllProps>) {
        super(props);

        this.state = {
            showModal: false,
            modalArticleId: "",
            modalArticleVersion: 0,
        };
    }

    componentDidMount() {
        this.props.getEditorArticlesRequest();
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
            <EditorSendToReviewerModal show={this.state.showModal}
                articleId={this.state.modalArticleId} version={this.state.modalArticleVersion}
                onModalClose={() => this.setState({ showModal: false, modalArticleId: "", modalArticleVersion: 0})} />
        </>;
    }

    tableHeader(): JSX.Element {
        return <>
            <th>Název článku</th>
            <th>Autor</th>
            <th>Verze</th>
            <th>Datum poslední verze</th>
            <th>Stav poslední verze</th>
            <th>Akce</th>
        </>;
    }

    tableArticleRow(article: EditorArticleState): JSX.Element {
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
            <td>{article.authorId}</td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Link to={`/editor/article/${article.id}/${newestVersion}`}><Button variant="info">Zobrazit poslední verzi</Button></Link>

                    <Dropdown.Toggle split variant="info" id="dropdown-split-versions" />

                    <Dropdown.Menu>
                        {sortedVersions.map(version => {
                            return <Dropdown.Item key={`dropdown_${version.version}`} href={`/editor/article/${article.id}/${version.version}`}>Verze {version.version}</Dropdown.Item>;
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td>{sortedVersions[0].publishDate}</td>
            <td>{statusBadge}</td>
            <td>
                <Button variant="warning" className="mr-1 mb-1" onClick={() => this.setState({
                    showModal: true,
                    modalArticleId: article.id,
                    modalArticleVersion: newestVersion,
                })}>
                    <FontAwesomeIcon icon="spell-check" className="mr-1" /> Kontrola recenzentem
                </Button>

                <Button variant="success" className="mr-1 mb-1" onClick={() => this.props.acceptArticleRequest(article.id, newestVersion)}>
                    <FontAwesomeIcon icon="check" className="mr-1" /> Přijmout
                </Button>

                <Button variant="danger" className="mb-1" onClick={() => this.props.denyArticleRequest(article.id, newestVersion)}>
                    <FontAwesomeIcon icon="trash" className="mr-1" /> Odmítnout
                </Button>
            </td>
        </>;
    }

}

const mapStateToProps = ({ editor }: ApplicationState) => ({
    loading: editor.getEditorArticles.loading,
    articles: editor.getEditorArticles.articles,
    error: editor.getEditorArticles.error,
});

const mapDispatchToProps = {
    getEditorArticlesRequest,
    acceptArticleRequest,
    denyArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(EditorArticlesTable);
