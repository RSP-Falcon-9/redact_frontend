import * as React from "react";
import TemplateNavbar from "./template/template-navbar";
import TemplateFooter from "./template/template-footer";
import style from "./template-page-style.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "./login/login";

interface Props {
    content: JSX.Element;
}

export class TemplatePage extends React.Component<Props> {

    render() {
        return (
            <Container className={style.app_container}>
                <Row>
                    <Col><h1>Redact</h1></Col>
                    <Col><LoginForm /></Col>
                </Row>
                <Row>
                    <Col><TemplateNavbar /></Col>
                </Row>
                <Row>
                    <Col className={style.app_content}>{this.props.content}</Col>
                </Row>
                <Row>
                    <Col><TemplateFooter /></Col>
                </Row>
            </Container>
        );
    }

}
