import * as React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Article {
    name: String;
    reviewed: Boolean;
}

export default class ArticlesTable extends React.Component {

    render() {
        // TODO: hook into db
        const articles: Article[]  = [
            {name: "Pavel dělá frontend", reviewed: false},
            {name: "Druhej Pavel dělá bakalářku", reviewed: true}
        ];

        return <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {this.tableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => {
                        return this.tableArticleRow(article)
                    })}
                </tbody>
            </Table>
        </>;
    }

    tableHeader(): JSX.Element {
        return <>
            <th>Název článku</th>
            <th>Prošlo recenzí?</th>
        </>;
    }

    tableArticleRow(article: Article): JSX.Element {
        return <>
            <tr>
                <td>{article.name}</td>
                <td><FontAwesomeIcon icon={article.reviewed ? "check" : "times" } /></td>
            </tr>
        </>;
    }

}
