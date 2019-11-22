import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import { RouteComponentProps } from "react-router";

interface RouteProps {
    id: string;
}

export class ArticleDetail extends React.Component<RouteComponentProps<RouteProps>> {

    content(): JSX.Element {
        return <>
            <h2>Článek #{this.props.match.params.id}</h2>
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
