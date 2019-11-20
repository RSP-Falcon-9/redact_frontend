import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import ArticleList from "components/pages/common/common-article-list";

export class EditorPendingArticles extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Žádosti o posudek</h2>
            <ArticleList />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
