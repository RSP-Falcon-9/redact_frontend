import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import ArchivesList from "components/pages/unauthorized/archives-list";

export class ArchivePage extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Archív článků</h2>
            <ArchivesList />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
