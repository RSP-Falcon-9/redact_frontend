import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import ReviewerArticlesTable from "components/pages/reviewer/reviewer-articles-table";
import { Alert } from "react-bootstrap";

export class ReviewerAssignedArticles extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Články k recenzi</h2>
            <Alert variant="info">
                Prosíme o recenzování dle pokynů v souboru <Alert.Link href="http://www.vspj.cz/soubory/download/id/7345">Recenzní řízení</Alert.Link>.
            </Alert>
            <ReviewerArticlesTable />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
