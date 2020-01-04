import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import ChiefEditorEditionsTable from "./chiefeditor-editions-table";

export class ChiefEditorEditions extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Správa vydání</h2>
            <ChiefEditorEditionsTable />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
