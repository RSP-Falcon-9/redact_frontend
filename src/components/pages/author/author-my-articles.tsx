import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TemplatePage } from "components/pages/template/template-page";
import AuthorArticlesTable from "./author-articles-table";

export class AuthorMyArticles extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Moje články</h2>
            <Link to="/author/articles/new">
                <Button variant="success" className="mt-3 mb-3">
                    <FontAwesomeIcon icon="plus" /> Nahrát nový článek
                </Button>
            </Link>
            <AuthorArticlesTable />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
