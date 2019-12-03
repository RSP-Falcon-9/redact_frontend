import * as React from "react";
import { Form, Badge } from "react-bootstrap";
import { ArticleReviewStatus } from "store/reviewer/types";
import { dateToFormDate } from "utils/time";

interface FormProps {
    id: string;
    status: ArticleReviewStatus;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
    appeal: string;
    appealDate: Date;
}

export class AuthorReviewForm extends React.Component<FormProps> {

    render() {
        let appealBadge: JSX.Element;

        switch (this.props.status) {
            case ArticleReviewStatus.NEW:
                appealBadge = <Badge variant="info">Nový</Badge>;
                break;
            case ArticleReviewStatus.REVIEWED:
                appealBadge = <Badge variant="info">Zrecenzováno</Badge>;
                break;
            case ArticleReviewStatus.APPEAL:
                appealBadge = <Badge variant="info">Autor se odvolal</Badge>;
                break;
            default:
                appealBadge = <Badge variant="info">Neznámý stav</Badge>;
                break;
        }

        return <>
            <h3>
                <span className="mr-3">Recenze</span>
                {appealBadge}
            </h3>
            <Form>
                {this.radioGroup("Aktuálnost, zajímavost a přínosnost", "uptodate", this.props.interest)}
                {this.radioGroup("Originalita", "originality", this.props.originality)}
                {this.radioGroup("Odborná úroveň", "technicality", this.props.specializationLevel)}
                {this.radioGroup("Jazyková a stylistická úroveň", "language", this.props.languageLevel)}

                <Form.Group controlId="comment">
                    <Form.Label>Komentář</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.props.comment} readOnly />
                </Form.Group>

                {this.props.status === ArticleReviewStatus.APPEAL && (
                    <>
                        <Form.Group controlId="appeal">
                            <Form.Label>Odvolání</Form.Label>
                            <Form.Control as="textarea" rows="3" value={this.props.comment} readOnly />
                        </Form.Group>
                        <Form.Group controlId="appealDate">
                            <Form.Label>Datum odvolání</Form.Label>
                            <Form.Control type="date" placeholder="Datum odvolání" value={dateToFormDate(this.props.appealDate)} readOnly />
                        </Form.Group>
                    </>)}
            </Form>
        </>;
    }

    radioGroup(label: string, name: string, checkedPos: number): JSX.Element {
        return <Form.Group className="row">
            <Form.Label className="legend" column md={4}>
                {label}
            </Form.Label>

            {[...Array(5)].map((_x, i) =>
                this.radioGroupBtn(name, i + 1, (i + 1) === checkedPos),
            )}
        </Form.Group>;
    }

    radioGroupBtn(name: string, index: number, checked: boolean): JSX.Element {
        return <Form.Check
                key={index}
                inline
                type="radio"
                label={index}
                name={name}
                id={name + index}
                readOnly
                checked={checked} />;
    }

}
