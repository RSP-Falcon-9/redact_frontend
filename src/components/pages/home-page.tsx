import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";

export class HomePage extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>Pavel dělá frontend</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu.
                Vivamus ac leo pretium faucibus.
                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Integer in sapien.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Pellentesque sapien. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.
                Morbi scelerisque luctus velit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Integer in sapien. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus.
                Phasellus faucibus molestie nisl. Aliquam erat volutpat. Phasellus et lorem id felis nonummy placerat.
                Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis.
            </p>
            <p>
                Mauris elementum mauris vitae tortor. Etiam posuere lacus quis dolor. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.
                In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Nullam rhoncus aliquam metus.
                Nunc tincidunt ante vitae massa. Etiam posuere lacus quis dolor. In rutrum. Nullam at arcu a est sollicitudin euismod. Fusce suscipit libero eget elit.
                Nullam eget nisl. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Aliquam ante. Phasellus rhoncus. Pellentesque ipsum.
                Pellentesque pretium lectus id turpis. Aliquam erat volutpat.
                Vivamus porttitor turpis ac leo. Mauris dictum facilisis augue. Nam quis nulla.
            </p>
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
