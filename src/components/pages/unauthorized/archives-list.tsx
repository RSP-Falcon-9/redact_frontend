import * as React from "react";
import { Alert, Spinner, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { ApplicationState } from "store/root";
import { getArchivesRequest } from "store/unauthenticated/actions";
import { archiveDownloadEndpoint } from "store/unauthenticated/types";

interface PropsFromState {
    loading: boolean;
    error?: string;
    archives: string[];
}

interface PropsFromDispatch {
    getArchivesRequest: typeof getArchivesRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

class ArchivesList extends React.Component<AllProps> {

    componentDidMount() {
        this.props.getArchivesRequest();
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" className="mb-3 mx-auto" />;
        } else if (this.props.error) {
            return <Alert variant="danger" className="mx-auto flex-grow-1">Nelze načíst archiv článků!</Alert>;
        }

        return <ListGroup>
            {this.props.archives.map((archive, index) => {
                return <ListGroup.Item key={index}><a href={archiveDownloadEndpoint(archive)}>Vydání {archive}</a></ListGroup.Item>;
            })}
        </ListGroup>;
    }

}

const mapStateToProps = ({ unauthenticated }: ApplicationState) => ({
    loading: unauthenticated.archivesState.loading,
    error: unauthenticated.archivesState.error,
    archives: unauthenticated.archivesState.archives,
});

const mapDispatchToProps = {
    getArchivesRequest,
};

export default connect<PropsFromState, PropsFromDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(ArchivesList);
