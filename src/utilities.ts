// All types of buttons available on the page
export enum ButtonType {
    Search,
    Add,
    Remove,
    ShowAll,
    Submit

}

export const getResultField = () => document.getElementById("queryResult")
export const getInputField = () => document.getElementById("inputField") as HTMLInputElement

export const makeP = text => "<p>" + text + "</p>"
export const makeTBodyEl = (dataN, dataId, dataDOB, dataPDV) => {
    "<td>" + dataN + "</td>"
    "<td>" + dataId + "</td>"
    "<td>" + dataDOB + "</td>"
    "<td>" + dataPDV + "</td>"

}

export const getButtonByType = (type: ButtonType): HTMLAnchorElement => {
    let buttonID = "";
    switch (type) {
        case ButtonType.Add:
            buttonID = "addBtn"
            break
        case ButtonType.Remove:
            buttonID = "removeBtn"
            break
        case ButtonType.Search:
            buttonID = "searchBtn"
            break
        case ButtonType.ShowAll:
            buttonID = "showAllBtn"
            break
        // Same as ButtonType.Submit
        default:
            buttonID = "submitBtn"
    }

    return document.getElementById(buttonID) as HTMLAnchorElement
}

// Clear result, input fields, hide submission button
export const clearPage = () => {
    getResultField().innerHTML = ""
    getInputField().value = ""

    setSubmitButtonVisibility(false)
}

export const setSubmitButtonVisibility = (isVisible: boolean) =>
    getButtonByType(ButtonType.Submit).style.display = isVisible ? "inline-block" : "none"
