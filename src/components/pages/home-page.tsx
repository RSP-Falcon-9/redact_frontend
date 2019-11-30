import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";

export class HomePage extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>O systému</h2>
            <p>
                Systém postaven pro ulehčení workflowu časopisu Logos Polytechnikos, pro manipulaci se systémem
                prosím přihlašte se.
            </p>
            <p>
                Pokud se vyskytnou jakékoliv problémy, kontaktujte naši sekretářku <a href="mailto:hanzli07@student.vspj.cz?subject=Problém se systémem Redact">hanzli07@student.vspj.cz</a>.
            </p>
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
