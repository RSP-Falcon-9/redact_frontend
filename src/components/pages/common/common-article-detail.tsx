import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import { RouteComponentProps } from "react-router";
import { Table, Button } from "react-bootstrap";

interface RouteProps {
    id: string;
}

interface Message {
    id: string;
    author: string;
    content: string;
}

export class ArticleDetail extends React.Component<RouteComponentProps<RouteProps>> {

    messages: Message[] = [
        { id: "m1", author: "reviewer", content: "Předělej tohle" },
        { id: "m2", author: "author", content: "OK" },
        { id: "m3", author: "reviewer", content: "Předělej támhleto" },
        { id: "m4", author: "author", content: "Hotovo." },
    ];

    content(): JSX.Element {
        return <>
            <h2>Článek #{this.props.match.params.id}</h2>

            <Button variant="primary" className="mt-3 mb-3" onClick={() => this.onDownloadClick()}>
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
