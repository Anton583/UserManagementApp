import { User } from './db/user'

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

export type OnClickFn = (this: GlobalEventHandlers, ev: MouseEvent) => any


const bindButtonEvent = (btnType: ButtonType, fn: OnClickFn) =>
    getButtonByType(btnType).onclick = fn

export const bindButtons = (bindings: Array<[ButtonType, OnClickFn]>) => {
    for (let [btn, fn] of bindings) {
        bindButtonEvent(btn, fn)
    }
}

// Find a table element on a page and add all the supplied users as table rows
export const fillUsersTable = (users: Array<User>) => {
    const table = document.getElementById("tInfoB")
    table.innerHTML = ""
    for (const user of users) {
        const userName = user.name
        const dateOfBAsStr = (user.yearOfBirth).toString()
        const pavelDVisitsAsStr = (user.pavelDurovVisits).toString()
        const idAsStr = users.indexOf(user)
        if (user.surname) {
            table.innerHTML += table.appendChild(document.createElement("tr")).innerHTML =
                '<td class="col s3">' + userName + " " + user.surname + "</td>" +
                '<td class="col s3">' + idAsStr + "</td>" +
                '<td class="col s3">' + dateOfBAsStr + "</td>" +
                '<td class="col s3">' + pavelDVisitsAsStr + "</td>"
        }
        else {
            table.innerHTML += table.appendChild(document.createElement("tr")).innerHTML =
                '<td class="col s3">' + userName + "</td>" +
                '<td class="col s3">' + idAsStr + "</td>" +
                '<td class="col s3">' + dateOfBAsStr + "</td>" +
                '<td class="col s3">' + pavelDVisitsAsStr + "</td>"
        }

    }
}