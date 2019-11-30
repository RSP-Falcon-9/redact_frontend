import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Alert, Button, ButtonGroup, Dropdown, Spinner, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getEditorArticlesRequest } from "store/editor/actions";
import { EditorArticle } from "store/editor/types";
import { ApplicationState } from "store/root";
import EditorSendToReviewerModal from "./editor-send-to-reviewer-modal";

interface PropsFromState {
    loading: boolean;
    articles: EditorArticle[];
    error?: string;
}

interface PropsFromDispatch {
    getEditorArticlesRequest: typeof getEditorArticlesRequest;
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
            <th>Akce</th>
        </>;
    }

    tableArticleRow(article: EditorArticle): JSX.Element {
        const sortedVersions = article.versions.sort((a, b) => a.version - b.version);
        const newestVersion = sortedVersions[0].version;

        return <>

            <td>{article.name}</td>
            <td>{article.authorId}</td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Link to={`/editor/article/${article.id}/${newestVersion}`}><Button variant="info">Zobrazit poslední verzi</Button></Link>

                    <Dropdown.Toggle split variant="info" id="dropdown-split-versions" />

                    <Dropdown.Menu>
                        {sortedVersions.map(version => {
                            return <Dropdown.Item key={`dropdown_${version.version}`} href={`/editor/article/${article.id}/${version.version}`}>{version.version}</Dropdown.Item>;
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td>{sortedVersions[0].publishDate}</td>
            <td>
                <Button variant="primary" onClick={() => this.setState({
                    showModal: true,
                    modalArticleId: article.id,
                    modalArticleVersion: newestVersion,
                })}>
                    <FontAwesomeIcon icon="spell-check" />
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
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(EditorArticlesTable);
