import * as React from "react";
import { Form, Badge } from "react-bootstrap";
import { ArticleReviewStatus } from "store/reviewer/types";

interface FormProps {
    id: string;
    status: ArticleReviewStatus;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

export class AuthorReviewForm extends React.Component<FormProps> {

    render() {
        return <>
            <h3>Recenze {this.props.id}
                {this.props.status === ArticleReviewStatus.NEW && <Badge variant="info">Nový</Badge>}
                {this.props.status === ArticleReviewStatus.REVIEWED && <Badge variant="info">Zrecenzováno</Badge>}
                {this.props.status === ArticleReviewStatus.APPEAL && <Badge variant="info">Autor se odvolal</Badge>}
            </h3>
            <Form>
                {this.radioGroup("Aktuálnost, zajímavost a přínosnost", "uptodate", this.props.interest)}
                {this.radioGroup("Originalita", "originality", this.props.originality)}
                {this.radioGroup("Odborná úroveň", "technicality", this.props.specializationLevel)}
                {this.radioGroup("Jazyková a stylistická úroveň", "language", this.props.languageLevel)}

                <Form.Group controlId="comment">
                    <Form.Label>Komentář</Form.Label>
                    <Form.Control as="textarea" rows="3" readOnly>
                        {this.props.comment}
                    </Form.Control>
                </Form.Group>
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
