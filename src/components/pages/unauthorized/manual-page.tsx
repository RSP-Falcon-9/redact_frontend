import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";

export class ManualPage extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Návod k obsluze</h2>

            <p>TODO</p>
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
