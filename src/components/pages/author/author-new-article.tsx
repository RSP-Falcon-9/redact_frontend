import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";

export class AuthorNewArticle extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Nahrát nový článek</h2>
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
