import * as React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { User } from "store/admin/types";
import { RolesMapping } from "utils/constants";

interface AdminUserInfoModalProps {
    show: boolean;
    onModalClose: (() => void);
    user: User | null;
}

export default class AdminUserInfoModal extends React.Component<AdminUserInfoModalProps> {

    render() {
        if (this.props.user === null) {
            // We didn't select user so only return empty view.
            return null;
        }

        return <>
            <Modal
                show={this.props.show}
                size="lg"
                centered
                onHide={this.props.onModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Uživatel <b>{this.props.user.userName}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <h3>Práva</h3>
                                <ul>
                                    {this.props.user.roles.map((role, index) => {
                                        return <li key={index}>{RolesMapping[role]}</li>;
                                    })}
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>;
    }

}
