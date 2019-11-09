import * as React from "react";
import style from "components/pages/template/template-footer-style.module.scss";

export default class TemplateFooter extends React.Component<{}> {

    render() {
        return (
            <>
                <footer className={"mt-3 py-3 " + style.app_footer}>
                    <div className="text-center">Redact &copy; 2019</div>
                </footer>
            </>
        );
    }

}
