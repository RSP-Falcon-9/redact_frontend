import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import ArticleList from "components/pages/common/common-article-list";

export class ReviewerAssignedArticles extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Články k recenzi</h2>
            <ArticleList />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
