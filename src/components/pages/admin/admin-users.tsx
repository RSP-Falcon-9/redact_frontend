import * as React from "react";
import { TemplatePage } from "components/pages/template-page";
import AdminUsersTable from "./admin-users-table";

export class AdminUsers extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Správa uživatelů</h2>
            <AdminUsersTable />
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
