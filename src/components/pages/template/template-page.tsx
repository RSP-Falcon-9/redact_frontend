import * as React from "react";
import TemplateNavbar from "components/pages/template/template-navbar";
import TemplateFooter from "components/pages/template/template-footer";
import style from "./template-page-style.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "components/pages/common/common-login";

interface Props {
    content: JSX.Element;
}

export class TemplatePage extends React.Component<Props> {

    render() {
        return (
            <Container className={style.app_container}>
                <img src="/images/logo.png" width="250" height="250" class="rounded">
                <Row>
                    <Col sm={6}><h1>Redact</h1></Col>
                    <Col><LoginForm /></Col>
                </Row>
                <Row>
                    <Col><TemplateNavbar /></Col>
                </Row>
                <Row>
                    <Col><div className={style.app_content}>{this.props.content}</div></Col>
                </Row>
                <Row>
                    <Col><TemplateFooter /></Col>
                </Row>
            </Container>
        );
    }

}
