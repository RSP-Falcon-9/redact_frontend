import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import EditorArticlesTable from "components/pages/editor/editor-articles-table";

export class EditorPendingArticles extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Žádosti o posudek</h2>
            <EditorArticlesTable />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
