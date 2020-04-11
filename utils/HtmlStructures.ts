import { DivCol4OffSet, DivCol8OffSet, Tbody, DivWithClass, H1, DivInputBtn, TableElem, SubmBtn, Thead } from "./HtmlElems"

// The structure of divs in the app
export const DivsStructure = (...content: Array<string>) => DivWithClass("containner",
    DivWithClass("row",
        DivWithClass("center-align",
            H1("User Library"),
            DivCol8OffSet(content.join("")))))

// Input field with submit button
export const InputSubmitElems = (Inputplaceholder: string, btnName: string) => DivWithClass("row", DivCol4OffSet(`<input id="inputField" placeholder="${Inputplaceholder}">`), DivInputBtn(SubmBtn("submitBtn", btnName)))

// Table element structure
export const Table = (...tHeadNames: Array<string>) => TableElem(Thead(tHeadNames.join("")), Tbody())

