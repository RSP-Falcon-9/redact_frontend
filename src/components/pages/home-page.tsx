import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";

export class HomePage extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h2>O časopisu LOGOS POLYTECHNIKOS</h2>
            <p>
                <b>LOGOS POLYTECHNIKOS je vysokoškolský odborný recenzovaný časopis</b>, který slouží pro publikační aktivity
                akademických pracovníků Vysoké školy polytechnické Jihlava i jiných vysokých škol, univerzit a výzkumných
                organizací. Je veden na seznamu recenzovaných odborných a vědeckých časopisů
                ERIH PLUS - European Reference Index for the Humanities and the Social Sciences
                (https://dbh.nsd.uib.no/publiseringskanaler/erihplus/periodical/info?id=488187).
            </p>
            <p>
                Od roku 2010 do roku 2018 byl časopis vydáván čtyřikrát ročně v elektronické a tištěné podobě.
                Od roku 2019 vychází třikrát ročně v elektronické verzi. Redakční rada časopisu sestává z interních i externích odborníků.
                Funkci šéfredaktora zastává prorektor pro tvůrčí a projektovou činnost Vysoké školy polytechnické Jihlava.
                Funkce odpovědných redaktorů jednotlivých čísel přísluší vedoucím kateder Vysoké školy polytechnické Jihlava.
                Veškeré vydávané příspěvky prochází recenzním řízením a jsou pečlivě redigovány.
            </p>
            <p>
                <b>Tematické a obsahové zaměření časopisu</b> reflektuje potřeby oborových kateder Vysoké školy polytechnické Jihlava.
                Na základě souhlasu odpovědného redaktora mohou katedry poskytnout publikační prostor i odborníkům bez zaměstnanecké
                vazby k Vysoké škole polytechnické Jihlava.
            </p>
            <p>
                <b>V časopise je možné publikovat</b> odborné články, statě, přehledové studie, recenze a další typy odborných příspěvků
                v českém, slovenském a anglickém jazyce. Do recenzního řízení jsou přijímány příspěvky tematicky odpovídající
                zaměření časopisu a formálně upravené dle redakční šablony.
            </p>

            <h2>Šéfredaktor</h2>
            <ul className="list-group mb-3">
                <li className="list-group-item">doc. Ing. Zdeněk Horák, Ph.D. (Vysoká škola polytechnická Jihlava)</li>
            </ul>

            <h2>Redakční rada</h2>
            <ul className="list-group mb-3">
                <li className="list-group-item">prof. PhDr. RNDr. Martin Boltižiar, PhD. (Univerzita Konštantína Filozofa v Nitre)</li>
                <li className="list-group-item">prof. RNDr. Helena Brožová, CSc. (Česká zemědělská univerzita v Praze)</li>
                <li className="list-group-item">doc. PhDr. Lada Cetlová, PhD. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">prof. Mgr. Ing. Martin Dlouhý, Dr. MSc. (Vysoká škola ekonomická v Praze)</li>
                <li className="list-group-item">prof. Ing. Tomáš Dostál, DrSc. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">doc. Ing. Jiří Dušek, Ph.D. (Vysoká škola evropských a regionálních studií)</li>
                <li className="list-group-item">doc. RNDr. Petr Gurka, CSc. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">Ing. Veronika Hedija, Ph.D. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">doc. Ing. Zdeněk Horák, Ph.D. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">Ing. Ivica Linderová, PhD. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">prof. MUDr. Aleš Roztočil, CSc. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">doc. PhDr. David Urban, Ph.D. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">doc. Dr. Ing. Jan Voráček, CSc. (Vysoká škola polytechnická Jihlava)</li>
                <li className="list-group-item">RNDr. PaedDr. Ján Veselovský, PhD. (Univerzita Konštantína Filozofa v Nitre)</li>
                <li className="list-group-item">doc. Ing. Libor Žídek, Ph.D. (Masarykova univerzita Brno)</li>
            </ul>

            <h2>O systému Redact</h2>
            <p>
                Systém Redact slouží pro ulehčení workflowu časopisu LOGOS POLYTECHNIKOS, pro manipulaci se systémem
                se prosím přihlašte. Přihlašovací údaje jsou poskytovány administrátorem.
            </p>
            <p>
                Pokud se vyskytnou jakékoliv problémy, kontaktujte naši sekretářku <a href="mailto:hanzli07@student.vspj.cz?subject=Problém se systémem Redact">hanzli07@student.vspj.cz</a>.
            </p>
        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
