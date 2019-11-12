import * as React from "react";
import { TemplatePage } from "components/pages/template-page";
import AdminUsersForm from "./admin-users-form";

export class AdminUsers extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Správa uživatelů</h2>
            <AdminUsersForm />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
