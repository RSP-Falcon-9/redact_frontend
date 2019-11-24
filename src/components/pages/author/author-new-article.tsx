import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { createArticleRequest } from "store/author/actions";
import { ApplicationState } from "store/root";

interface PropsFromState {
    loading: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    createArticleRequest: typeof createArticleRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

interface NewArticleFormState {
    articleName: string;
    file: File;
}

class AuthorNewArticle extends React.Component<AllProps, NewArticleFormState> {

    content(): JSX.Element {
        const { loading, errors } = this.props;

        return <>
            <h2>Nahrát nový článek</h2>

            <Form>
                <Form.Group>
                    <Form.Label>Název</Form.Label>
                    <Form.Control id="text_id" type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        this.setState({ articleName: e.currentTarget.value! });
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Soubor (.pdf)</Form.Label>
                    <Form.Control id="file" type="file" onChange={(e: any) => {
                        if (e.target.files != null) {
                            this.setState({ file: e.target.files[0] });
                        }
                    }} />
                </Form.Group>
                <Button variant="primary" className="mt-3 mb-3" onClick={() => this.onUploadNewArticleClick()}>
                    Nahrát &amp; požádat o recenzi
                </Button>
                {loading && (<Spinner animation="border" variant="primary" />)}
                {errors && (<Alert variant="danger">Nelze přidat nový článek!</Alert>)}
            </Form>
        </>;
    }

    onUploadNewArticleClick() {
        this.props.createArticleRequest({ name: this.state.articleName, file: this.state.file });
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}

const mapStateToProps = ({ author }: ApplicationState) => ({
    loading: author.createArticle.loading,
    errors: author.createArticle.errors,
});

const mapDispatchToProps = {
    createArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorNewArticle);
