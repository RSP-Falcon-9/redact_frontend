import * as React from "react";
import TemplateNavbar from "components/pages/template/template-navbar";
import TemplateFooter from "components/pages/template/template-footer";
import style from "./template-page-style.module.scss";
import { Container, Row, Col, Figure } from "react-bootstrap";
import LoginForm from "components/pages/common/common-login";

interface Props {
    content: JSX.Element;
}

export class TemplatePage extends React.Component<Props> {

    render() {
        return (
            <Container className={style.app_container}>
                <Row>
                    <Col sm={6}>
                        <Figure>
                            <Figure.Image
                                width={290}
                                height={61}
                                alt="Logo VŠPJ"
                                src="/images/vspj-logo.svg"
                            />
                            <Figure.Caption>
                                <h5>Systém Redact</h5>
                            </Figure.Caption>
                        </Figure>
                    </Col>
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
