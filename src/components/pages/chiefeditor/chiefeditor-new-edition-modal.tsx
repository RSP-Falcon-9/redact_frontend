import * as React from "react";
import { Modal } from "react-bootstrap";
import ChiefEditorNewEditionForm from "./chiefeditor-new-edition-form";

interface ChiefEditorNewEditionModalProps {
    show: boolean;
    onModalClose: (() => void);
}

export default class ChiefEditorNewEditionModal extends React.Component<ChiefEditorNewEditionModalProps> {

    render() {
        return <>
            <Modal
                show={this.props.show}
                size="lg"
                centered
                onHide={this.props.onModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Přidat vydání
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChiefEditorNewEditionForm
                        onAddClick={() => this.props.onModalClose()} />
                </Modal.Body>
            </Modal>
        </>;
    }

}
