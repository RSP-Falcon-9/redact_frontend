import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Alert, Button, Spinner, Table, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { ApplicationState } from "store/root";
import { deleteEditionRequest, getEditionsRequest, archiveEditionRequest } from "store/chiefeditor/actions";
import { Edition } from "store/chiefeditor/types";
import ChiefEditorNewEditionModal from "./chiefeditor-new-edition-modal";

interface PropsFromState {
    loading: boolean;
    error?: string;
    editions: Edition[];
}

interface PropsFromDispatch {
    getEditionsRequest: typeof getEditionsRequest;
    deleteEditionRequest: typeof deleteEditionRequest;
    archiveEditionRequest: typeof archiveEditionRequest;
}

interface EditionsTableFormState {
    addEditionModalActive: boolean;
}

type AllProps = PropsFromState & PropsFromDispatch;

class ChiefEditorEditionsTable extends React.Component<AllProps, EditionsTableFormState> {

    constructor(props: AllProps) {
        super(props);

        this.state = {
            addEditionModalActive: false,
        };
    }

    componentDidMount() {
        this.props.getEditionsRequest();
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" className="mb-3 mx-auto" />;
        } else if (this.props.error) {
            return <Alert variant="danger" className="mx-auto flex-grow-1">Nelze načíst vydání!</Alert>;
        }

        return <>
            <Button variant="primary" className="mt-3 mb-3"
                onClick={() => this.setState({ addEditionModalActive: true })}>
                <FontAwesomeIcon icon="plus" />
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Číslo</th>
                        <th>Popis</th>
                        <th>Datum</th>
                        <th>Archivováno?</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.editions.map((edition, index) => {
                        return <tr key={index}>
                            <td>{edition.id}</td>
                            <td>{edition.description}</td>
                            <td>{edition.deadline}</td>
                            <td>
                                <Badge variant="info">
                                    {edition.archived ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="times" />}
                                </Badge>
                            </td>
                            <td>
                                <Button variant="info" className="mr-3 mb-3">
                                    <FontAwesomeIcon icon="archive" />
                                </Button>

                                <Button variant="danger" onClick={() => this.props.deleteEditionRequest(edition.id)}>
                                    <FontAwesomeIcon icon="trash" />
                                </Button>
                            </td>
                        </tr>;
                    })}
                </tbody>
            </Table>
            <ChiefEditorNewEditionModal show={this.state.addEditionModalActive}
                onModalClose={() => this.setState({ addEditionModalActive: false })} />
        </>;
    }

}

const mapStateToProps = ({ chiefEditor }: ApplicationState) => ({
    loading: chiefEditor.getEditionsState.loading,
    error: chiefEditor.getEditionsState.error,
    editions: chiefEditor.getEditionsState.editions,
});

const mapDispatchToProps = {
    getEditionsRequest,
    deleteEditionRequest,
    archiveEditionRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ChiefEditorEditionsTable);
