import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Button, Table, Spinner, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getArticleDetailRequest } from "store/author/actions";
import { ApplicationState } from "store/root";
import { getArticleFileRequest } from "store/articles/actions";

interface RouteProps {
    id: string;
    version: number;
}

interface PropsFromState {
    loading: boolean;
    error?: string;
    name: string;
    fileUrl?: string;
}

interface PropsFromDispatch {
    getArticleDetailRequest: typeof getArticleDetailRequest;
    getArticleFileRequest: typeof getArticleFileRequest;
}

type AllProps<T> = PropsFromState & PropsFromDispatch & RouteComponentProps<T>;

interface Message {
    id: string;
    author: string;
    content: string;
}

class ArticleDetail extends React.Component<AllProps<RouteProps>> {

    messages: Message[] = [
        { id: "m1", author: "reviewer", content: "Předělej tohle" },
        { id: "m2", author: "author", content: "OK" },
        { id: "m3", author: "reviewer", content: "Předělej támhleto" },
        { id: "m4", author: "author", content: "Hotovo." },
    ];

    componentDidMount() {
        this.props.getArticleDetailRequest({ articleId: this.props.match.params.id, version: this.props.match.params.version });
        this.props.getArticleFileRequest({ articleId: this.props.match.params.id, version: this.props.match.params.version });
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

            <Button variant="success" className="mt-3 mb-3" onClick={() => this.onDownloadClick()}>
                Stáhnout poslední verzi (DATUM)
            </Button>
            <br />
            <Button variant="info" className="mt-3 mb-3" onClick={() => this.onAproveClick()}>
                Schválit
            </Button>

            <h3>Komentáře</h3>

            <div className="row">
                <textarea className="col-md"></textarea>
            </div>

            <Button variant="primary" className="mt-3 mb-3" onClick={() => this.onAddCommentClick()}>
                Přidat komentář
            </Button>

            <Table>
                <tbody>
                    {this.messages.map((message, index) => {
                        return <tr key={index} className="row">
                            {this.tableMessageRow(message)}
                        </tr>;
                    })}
                </tbody>
            </Table>
        </>;
    }

    onDownloadClick() {
        // TODO: do stuff
    }

    onAproveClick() {
        // TODO: do stuff
    }

    onAddCommentClick() {
        // TODO: do stuff
    }

    tableMessageRow(message: Message): JSX.Element {
        return <>
            <td className="col-md-2"><b>{message.author}</b></td>
            <td className="col-md">{message.content}</td>
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
});

const mapDispatchToProps = {
    getArticleDetailRequest,
    getArticleFileRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleDetail);
