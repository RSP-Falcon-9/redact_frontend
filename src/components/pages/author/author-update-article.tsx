import { TemplatePage } from "components/pages/template/template-page";
import * as React from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { createArticleRequest, updateArticleRequest } from "store/author/actions";
import { ApplicationState } from "store/root";

interface RouteProps {
    id: string;
}

interface PropsFromState {
    loading: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    createArticleRequest: typeof createArticleRequest;
    updateArticleRequest: typeof updateArticleRequest;
}

type AllProps<T> = PropsFromState & PropsFromDispatch & RouteComponentProps<T>;

interface NewArticleFormState {
    file: File;
}

class AuthorUpdateArticle extends React.Component<AllProps<RouteProps>, NewArticleFormState> {

    content(): JSX.Element {
        const { loading, errors } = this.props;

        return <>
            <h2>Aktualizovat článek {this.props.match.params.id}</h2>

            <Form>
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
        this.props.updateArticleRequest({ id: this.props.match.params.id, file: this.state.file });
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}

const mapStateToProps = ({ author }: ApplicationState) => ({
    loading: author.createArticle.loading,
    errors: author.createArticle.error,
});

const mapDispatchToProps = {
    createArticleRequest,
    updateArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorUpdateArticle);
