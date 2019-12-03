import * as React from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { updateArticleRequest } from "store/author/actions";
import { ApplicationState } from "store/root";

interface UpdateArticleProps {
    articleId: string;
    onUploadNewArticle: (() => void);
}

interface PropsFromState {
    loading: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    updateArticleRequest: typeof updateArticleRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & UpdateArticleProps;

interface NewArticleFormState {
    file: File;
}

class AuthorUpdateArticle extends React.Component<AllProps, NewArticleFormState> {

    render() {
        const { loading, errors } = this.props;

        return <>
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
                {errors && (<Alert variant="danger">Nelze aktualizovat článek!</Alert>)}
            </Form>
        </>;
    }

    onUploadNewArticleClick() {
        this.props.updateArticleRequest({ id: this.props.articleId, file: this.state.file });
        this.props.onUploadNewArticle();
    }

}

const mapStateToProps = ({ author }: ApplicationState) => ({
    loading: author.createArticle.loading,
    errors: author.createArticle.error,
});

const mapDispatchToProps = {
    updateArticleRequest,
};

export default connect<PropsFromState, PropsFromDispatch, UpdateArticleProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorUpdateArticle);
