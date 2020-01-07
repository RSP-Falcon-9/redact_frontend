import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { createArticleRequest } from "store/author/actions";
import { ApplicationState } from "store/root";
import { Redirect } from "react-router";
import { getEditionsRequest } from "store/unauthenticated/actions";
import { Edition } from "store/unauthenticated/types";
import { dateToFormDate } from "utils/time";

interface PropsFromState {
    loading: boolean;
    errors?: string;
    message: string;
    editions: Edition[];
}

interface PropsFromDispatch {
    getEditionsRequest: typeof getEditionsRequest;
    createArticleRequest: typeof createArticleRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

interface NewArticleFormState {
    articleName: string;
    selectedEdition?: number;
    file?: File;
}

class AuthorNewArticle extends React.Component<AllProps, NewArticleFormState> {

    constructor(props: AllProps) {
        super(props);

        this.state = {
            articleName: "",
            selectedEdition: -1,
            file: undefined,
        };
    }

    componentDidMount() {
        this.props.getEditionsRequest();
    }

    content(): JSX.Element {
        const { loading, errors, message } = this.props;

        return <>
            <h2>Nahrát nový článek</h2>

            <Alert variant="info">
                Prosíme dodržujte pokyny pro nahrávání článku:
                <ul className="mb-0">
                    <li>
                        <Alert.Link href="http://www.vspj.cz/soubory/download/id/7344">Pokyny pro autory</Alert.Link>
                    </li>
                    <li>
                        <Alert.Link href="https://www.vspj.cz/soubory/download/id/4186">Šablona</Alert.Link>
                    </li>
                </ul>
                Při nedodržení pokynů bude článek zamítnut.
            </Alert>

            <Form>
                <Form.Group>
                    <Form.Label>Název</Form.Label>
                    <Form.Control id="text_id" type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        this.setState({ articleName: e.currentTarget.value! });
                    }} required />
                </Form.Group>
                <Form.Group controlId="reviewRequest.reviewerPick">
                    <Form.Label>Výběr vydání:</Form.Label>
                    <Form.Control as="select" onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) =>
                        this.setState({ selectedEdition: parseInt(changeEvent.currentTarget.value, 10) })}>
                            <option value={-1}>Žádné číslo vydání</option>;
                            {this.props.editions.map((edition, index) => {
                                return <option key={index} value={edition.id}>{edition.id} (Uzavírka: {dateToFormDate(edition.deadline)}, Téma: {edition.description})</option>;
                            })}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Soubor (.pdf)</Form.Label>
                    <Form.Control id="file" type="file" onChange={(e: any) => {
                        if (e.target.files != null) {
                            this.setState({ file: e.target.files[0] });
                        }
                    }} required />
                </Form.Group>
                <Button variant="success" className="mt-3 mb-3" onClick={() => this.onUploadNewArticleClick()}>
                    Nahrát &amp; požádat o recenzi
                </Button>
                {loading && (<Spinner animation="border" variant="primary" />)}
                {errors && (<Alert variant="danger">Nelze přidat nový článek!</Alert>)}
                {!errors && message && (<Redirect to="/author/articles" />)}
            </Form>
        </>;
    }

    onUploadNewArticleClick() {
        this.props.createArticleRequest({
            name: this.state.articleName,
            edition: this.state.selectedEdition,
            file: this.state.file!,
        });
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}

const mapStateToProps = ({ author, unauthenticated }: ApplicationState) => ({
    loading: author.createArticle.loading,
    errors: author.createArticle.error,
    message: author.createArticle.message,
    editions: unauthenticated.getEditionsState.editions,
});

const mapDispatchToProps = {
    getEditionsRequest,
    createArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorNewArticle);
