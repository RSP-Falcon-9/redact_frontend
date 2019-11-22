import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";
import { Table, Button } from "react-bootstrap";

export class AuthorNewArticle extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Nahrát nový článek</h2>

            <Table>
                <tbody>
                    <tr>
                        <td>Název</td>
                        <td><input type="text" placeholder="" /></td>
                    </tr>
                    <tr>
                        <td>Soubor</td>
                        <td><input type="file" /></td>
                    </tr>
                    <tr>
                        <td>Autor</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <Button variant="primary" className="mt-3 mb-3" onClick={() => this.onUploadNewArticleClick()}>
                            Nahrát &amp; požádat o recenzi
                        </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>;
    }

    onUploadNewArticleClick() {
        // TODO: do stuff
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
