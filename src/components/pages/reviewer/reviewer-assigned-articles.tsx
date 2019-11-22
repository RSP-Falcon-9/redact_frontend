import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import ArticlesTable from "components/pages/common/common-articles-table";

export class ReviewerAssignedArticles extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Články k recenzi</h2>
            <ArticlesTable />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
