import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import ReviewerArticlesTable from "components/pages/reviewer/reviewer-articles-table";

export class ReviewerAssignedArticles extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Články k recenzi</h2>
            <ReviewerArticlesTable />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}