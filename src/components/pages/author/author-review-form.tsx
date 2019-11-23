import * as React from "react";
import { Form } from "react-bootstrap";

interface FormProps {
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

export class AuthorReviewForm extends React.Component<FormProps> {

    render() {
        return <>
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
        return <>
                <Form.Group className="row">
                    <Form.Label className="legend" column md={4}>
                        {label}
                    </Form.Label>

                    {[...Array(5)].map((_x, i) =>
                        this.radioGroupBtn(name, i + 1, (i + 1) === checkedPos),
                    )}
                </Form.Group>
            </>;
    }

    radioGroupBtn(name: string, index: number, checked: boolean): JSX.Element {
        return <>
            <Form.Check
                inline
                type="radio"
                label={index}
                name={name + index}
                id={name + index}
                readOnly
                checked={checked} />
        </>;
    }

}
