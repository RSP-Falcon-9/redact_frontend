import * as React from "react";
import { TemplatePage } from "components/pages/template/template-page";

export class ManualPage extends React.Component<{}> {

    content(): JSX.Element {
        return <>
            <h1>Návod k obsluze</h1>

            <h2>Seznam pro nepřihlášené uživatele</h2>
Každá stránka obsahuje přihlašovací hlavičku v pravém horním rohu, kde po zadání přihlašovacích údajů (uživatelské jméno a heslo) a po kliknutí na tlačítko <i>"Přihlásit"</i> bude uživatel přihlášen do svého profilu. Při potížích se objeví zpráva "Nelze se přihlásit" pod přihlašovací hlavičkou v červeném poli. Pokud bude přihlášení úspěšné zobrazí se uživateli hlavička se jménem a tlačítkem <i>"Odhlásit"</i>. Uživatel bude odhlášen automaticky v případě opuštění webu nebo po uplynutí limitu nepoužívaní systému. Váš účet spravuje administrátor v případě problémů se na něj obraťte.  
<h3>Domů</h3>
<p>Stránka slouží jako informativní stránka časopisu LOGOS POLYTECHNIKOS. </p>

<p>Na stránce najdete hlavní popis časopisu a k čemu slouží systém Redact. Dále informace o redakční radě a hlavním šéfredaktorovi časopisu.</p>
<h3>Archív článků</h3>
<p>Obsahuje přehled všech vydaných časopisů a také aktuální vydání podle ročníků a čísla vydání.</p>
<h3>Návod k obsluze</h3>
<p>Stránka slouží jako nápověda pro manipulaci se systémem Redact.</p>
<h2>Seznam pro přihlášené uživatele</h2>
Seznam je obohacen o fuknci uživatele
<p><b>Váš účet spravuje administrátor v případě problémů se na něj obraťte.</b></p>
<h3>Autor</h3>
Uživatelský účet autor může ve výběru po rozkliknutí vybrat dvě možnosti, a to <u>nahrát nový článek a moje články.</u>
<h4>Nahrát nový článek</h4>
<p>Stránka slouží pro nahrání nových článků.</p><p> Autor musí dodržovat následují pokyny v modrém rámečku nahoře. Jsou zde uvedeny pokyny pro autory o nahrávaní článků a šablona podoby článku.</p> 
Pro nahrání nového článku musí uživatel zadat příhodný <i>Název článku</i>, vybrat z možností <i>číslo vydání</i> a vložit soubor článku pomocí tlačítka <b><i>"Vybrat soubor"</i></b>. Soubor lze nahrát pouze ve formátu PDF. U čísla vydaní je vždy uvedena uzavírka a popis čísla. Všechny údaje jsou povinné a nezbytné k nahrání článku. Pokud splníte předchozí tři údaje, můžete pomocí tlačítka <b><i>"Nahrát & požádat o recenzi"</i></b> nahrát svůj článek a poslat, tak článek k posouzení recenzentovi. Pokud však bude jeden z povinných údajů prázdný, po kliknutí na tlačítko, nebude možné nahrát článek a budete upozorněni vyskakovacím polem s obsahem "Nelze přidat nový článek!". Pokud nelze vybrat číslo vydání, šéfredaktor zatím nezahájil výběr článků do nového vydání.
<h4>Moje články</h4>
<p>Stránka slouží jako přehled Vašich článků.</p> 
Pomocí tlačítka <b><i>"Nahrát nový článek"</i></b> budete přesměrováni na stránku s nahráním článku, jak bylo uvedeno výše. V tabulce pod tlačítkem se zobrazuje přehled článků s následujícími názvy sloupců <i>Název článku, Verze, Datum poslední verze a Stav poslední verze</i>. <i>Název článku</i> je neměnný, stejně tak nelze článek smazat. <i>Verze</i> nám umožňuje nahlédnout na poslední přidanou verzi článku pomocí tlačítka <i><b>"Zobrazit poslední verzi"</b></i> anebo zobrazit předchozí přidané verze článku pomocí tlačítka znaku <i><b>"šipky"</b></i> hned vedle tlačítka <i><b>"Zobrazit poslední verzi"</b></i>. <i>Datum poslední verze</i> se zobrazuje podle přidání poslední verze článku. <i>Stav poslední verze</i> Vám ukazuje, v jakém stavu se článek momentálně nachází. Pokud nahrajete nový článek zobrazí se stav "Požádáno o recenzi". Redaktor následně Váš článek pošle do recenzního řízení, kde určený recenzent zhodnotí Váši práci a stav se tedy změní na "V recenzních řízení". Po zhodnocení redaktor může zpřístupnit Vaši recenzi, ta je viditelná na stránce poslední verze hned pod náhledem Vaší práce. Zde můžete také podat svoji námitku pomocí textového pole a tlačítka <i><b>"Podat námitku"</b></i>. Poté redaktor Vaši práci může přijmout anebo zamítnout. Bude to demonstrovat stav "Přijato" anebo "Zamítnuto". V případě zamítnutí lze nahrát Vaši novou verzi pomocí tlačítka <i><b>"Nahrát novou verzi"</i></b>, která se zobrazí ve sloupci verze hned vedle tlačítka <i><b>"Zobrazit poslední verzi"</b></i>.
<h3>Recenzent</h3>
Uživatelský účet recenzent může ve výběru po rozkliknutí vybrat možnost <u>články k recenzi.</u>
<h4>Články k recenzi</h4>
<p>Recenzent musí dodržovat následují pokyny v modrém rámečku nahoře. Jsou zde uvedeny pokyny recenzního řízení.</p> 
V tabulce pod modrým rámečkem se zobrazuje přehled článků s následujícími názvy sloupců <i>Název článku, Verze článku, Stav recenze a Akce</i>. <i>Název článku</i> je neměnný, stejně tak nelze článek smazat. <i>Verze</i> nám ukazuje číslo verze článku k recenzování. <i>Stav recenze</i> může mít tři podoby "Nové", "Zrecenzováno" a "Autor se odvolal". V případě stavu "Nové" se jedná o recenzi nového článku nebo nové verze článku, o kterou vás požádal redaktor. V případě stavu "zrecenzováno" byl už článek hodnocen a v případě stavu "Autor se odvolal" podal autor na Vaše hodnocení námitku. Sloupec <i>Akce</i> umožnuje zrecenzovat článek. Po kliknutí na tlačítko <i><b>"Zrecenzovat"</b></i> budete přesměrováni na stránku článku kde se nachází náhled a pod ním je možnost přidat recenzi. Hodnotí se následující aspekty Aktuálnost, zajímavost a přínosnost, Originalita, Odborná úroveň, Jazyková a stylistická úroveň pomocí výběru od 1-nejhorší do 5-nejlepší. Poté musíte přidat komentář. Tlačítkem <i><b>"Odeslat recenzi"</b></i> zrecenzuje článek a přesměruje se na hlavní stránku recenzenta. Tlačítkem <i><b>"Zrecenzovat"</b></i> ve sloupci Akce poté lze zobrazit Vaši recenzi na článek a pokud se autor odvolal zobrazí se pod Vaším komentářem i jeho Odvolání s datem přidání.
<h3>Redaktor</h3>
Uživatelský účet redaktor může ve výběru po rozkliknutí vybrat možnost <u>žádosti o posudek.</u>
<h4>Žádost o posudek</h4>
V tabulce se zobrazuje přehled článku s následujícími názvy sloupců <i>Název článku, Autor, Verze, Datum poslední verze, Stav poslední verze, Akce</i>. <i>Název článku</i> je neměnný, stejně tak nelze článek smazat. <i>Autor</i> zobrazuje autora, který článek přidal. <i>Verze</i> nám umožňuje nahlédnout na poslední přidanou verzi článku pomocí tlačítka <i><b>"Zobrazit poslední verzi"</b></i> anebo zobrazit předchozí přidané verze článku pomocí tlačítka znaku <i><b>"šipky"</i></b> hned vedle tlačítka <i><b>"Zobrazit poslední verzi"</b></i>. <i>Datum poslední verze</i> se zobrazuje podle přidání poslední verze článku. <i>Stav poslední verze</i> Vám ukazuje, v jakém stavu se článek momentálně nachází. Pokud byl nahrán nový článek zobrazí se stav "Požádáno o recenzi". Následně když pošlete článek do recenzního řízení výběrem recenzenta změní se stav na "V recenzních řízení". Po zhodnocení recenzentem můžete zpřístupnit recenzi autorovi. Stav "Přijato" a "Zamítnuto" odpovídá provedené akci. Sloupec <i>Akce</i> obsahuje tři tlačítka <i><b>"Kontrola recenzentem, Přijmout a Odmítnout"</b></i>. Tlačítko <i><b>"Kontrola recenzentem"</b></i> umožňuje vybrat recenzenta z nabídky a odeslat žádost o posudek recenzentovi. Na základě recenze Tlačítka <i><b>"Přijmout a Odmítnout"</b></i> slouží jako přijetí nebo odmítnutí článku autora. 
<h3>Šéfredaktor</h3>
Uživatelský účet šéfredaktor může ve výběru po rozkliknutí vybrat možnost <u>správa vydání.</u>
<h4>Správa vydání</h4>
Tlačítko <i><b>"Přidat"</b></i> nové vydání zobrazí nové okno na stránce. Vyplněním pole popisu a výběrem data uzavírky přidáte vydání do kterého mohou autoři přidávat nové články. V tabulce pod tlačítkem <i><b>"Přidat nové vydání"</b></i>se zobrazuje přehled vydání s názvy sloupců <i>Číslo, Popis, Datum, Archivováno? a Akce.</i> <i>Číslo</i> označuje vydání a generuje se automaticky. <i>Popis</i> se nedá změnit. <i>Datum</i> je nastaven podle uzavírky vydání. <i>Archivováno</i> nám ukazuje, zda je vydání v archivu či ne pomocí znaku "křížku a fajfky". Sloupec <i>Akce</i> umožňuje archivovat vydání či smazat vydání pomocí tlačítek <i><b>"Archivovat a Smazat"</b></i>.

        </>;
    }

    render() {
        return <TemplatePage content={this.content()} />;
    }

}
