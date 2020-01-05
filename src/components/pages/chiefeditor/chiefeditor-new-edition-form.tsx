import * as React from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ApplicationState } from "store/root";
import { createEditionRequest } from "store/chiefeditor/actions";
import { dateToFormDate } from "utils/time";

interface PropsFromState {
    loading: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    createEditionRequest: typeof createEditionRequest;
}

interface ChiefEditorNewEditionFormProps {
    onAddClick: () => void;
}

interface ChiefEditorNewEditionFormState {
    description: string;
    deadline: Date;
}

type AllProps = ChiefEditorNewEditionFormProps & PropsFromState & PropsFromDispatch;

const DESCRIPTION_FIELD = "descriptionField";
const DEADLINE_FIELD = "deadilineField";

class ChiefEditorNewEditionForm extends React.Component<AllProps, ChiefEditorNewEditionFormState> {

    constructor(props: Readonly<AllProps>) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            description: "",
            deadline: new Date(),
        };
    }

    handleChange(formEvent: React.FormEvent<HTMLInputElement>) {
        switch (formEvent.currentTarget.id) {
            case DESCRIPTION_FIELD: {
                this.setState({
                    description: formEvent.currentTarget.value!,
                });
                break;
            }
            case DEADLINE_FIELD: {
                this.setState({
                    deadline: new Date(formEvent.currentTarget.value!),
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
        formEvent.preventDefault();

        const form = formEvent.currentTarget;
        if (!form.checkValidity()) {
            formEvent.stopPropagation();
            return;
        }

        this.props.createEditionRequest({
            description: this.state.description,
            deadline: this.state.deadline,
        });

        this.props.onAddClick();
    }

    render() {
        const { loading, errors } = this.props;

        return <Container>
            <Row>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Popis</Form.Label>
                                <Form.Control
                                    id={DESCRIPTION_FIELD}
                                    required
                                    type="text"
                                    placeholder="Text popisu"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Uzavírka</Form.Label>
                                <Form.Control
                                    id={DEADLINE_FIELD}
                                    required
                                    type="date"
                                    placeholder="Uzavírka"
                                    defaultValue={dateToFormDate(this.state.deadline)}
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit" className="mb-3 float-right">Přidat nové vydání</Button>
                        {loading && (<Spinner animation="border" variant="primary" />)}
                        {errors && (<Alert variant="danger">Momentálně nelze přidat nové vydání.</Alert>)}
                    </Form>
                </Col>
            </Row>
        </Container>;
    }

}

const mapStateToProps = ({ admin }: ApplicationState) => ({
    loading: admin.getAllUsers.loading,
    errors: admin.getAllUsers.errors,
});

const mapDispatchToProps = {
    createEditionRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ChiefEditorNewEditionForm);
