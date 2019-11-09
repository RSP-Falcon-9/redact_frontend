import * as React from "react";
import { TemplatePage } from "components/pages/template-page";

export class HomePage extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            "Zde bude obsah home stránky."
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
