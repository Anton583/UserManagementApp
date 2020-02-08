import { ButtonType, OnClickFn, getButtonByType, getInputField, clearPage, fillUsersTable } from './utilities'
import { searchCard, addCard, removeCard } from './cardOps'
import users from './db/userStorage'

export const buttonBindings: Array<[ButtonType, OnClickFn]> = [
    [ButtonType.ShowAll, ev => {
        const btn = getButtonByType(ButtonType.ShowAll)
        getInputField().style.display = "none"
        document.getElementById("submitBtn").style.display = "none"
        document.getElementById("hiddenDiv").style.display = "block"
        document.getElementById("showAllBtn").removeAttribute("style")
        document.getElementById("addBtn").style.opacity = "0.5"
        document.getElementById("searchBtn").style.opacity = "0.5"
        document.getElementById("removeBtn").style.opacity = "0.5"
        fillUsersTable(users)
        clearPage()
    }],
    [ButtonType.Add, ev => {
        const btn = getButtonByType(ButtonType.Submit)
        document.getElementById("addBtn").removeAttribute("style")
        document.getElementById("showAllBtn").style.opacity = "0.5"
        document.getElementById("searchBtn").style.opacity = "0.5"
        document.getElementById("removeBtn").style.opacity = "0.5"
        btn.innerHTML = "Add"
        if (getInputField().style.display || document.getElementById("submitBtn").style.display
            === "none") {
            getInputField().style.display = "block"
            document.getElementById("submitBtn").style.display = "block"
        }
        if (document.getElementById("hiddenDiv").style.display === "block")
            document.getElementById("hiddenDiv").style.display = "none"
        clearPage()
    }],
    [ButtonType.Remove, ev => {
        const btn = getButtonByType(ButtonType.Submit)
        btn.innerHTML = "Remove"
        document.getElementById("removeBtn").removeAttribute("style")
        document.getElementById("addBtn").style.opacity = "0.5"
        document.getElementById("searchBtn").style.opacity = "0.5"
        document.getElementById("showAllBtn").style.opacity = "0.5"
        if (getInputField().style.display || document.getElementById("submitBtn").style.display
            === "none") {
            getInputField().style.display = "block"
            document.getElementById("submitBtn").style.display = "block"
            if (document.getElementById("hiddenDiv").style.display === "block")
                document.getElementById("hiddenDiv").style.display = "none"
        }
        clearPage()
    }],
    [ButtonType.Search, ev => {
        const btn = getButtonByType(ButtonType.Submit)
        btn.innerHTML = "Search"
        document.getElementById("searchBtn").removeAttribute("style")
        document.getElementById("addBtn").style.opacity = "0.5"
        document.getElementById("removeBtn").style.opacity = "0.5"
        document.getElementById("showAllBtn").style.opacity = "0.5"
        if (getInputField().style.display || document.getElementById("submitBtn").style.display
            === "none") {
            getInputField().style.display = "block"
            document.getElementById("submitBtn").style.display = "block"
        }
        if (document.getElementById("hiddenDiv").style.display === "block")
            document.getElementById("hiddenDiv").style.display = "none"
        clearPage()

        // Show all users in a table:
        // fillUsersTable(users)
    }],
    [ButtonType.Submit, ev => {
        const inputField: HTMLInputElement = getInputField()
        const queryText = inputField.value
        const elem = getButtonByType(ButtonType.Submit) as HTMLAnchorElement
        const submitText = elem["outerText"].toUpperCase()

        clearPage()

        switch (submitText) {
            case "SEARCH":
                searchCard(queryText, users)
                break
            case "ADD":
                addCard(queryText, users)
                break
            case "REMOVE":
                removeCard(queryText, users)
                break

            default:
                console.error("What the hell did u just do? UNIMPLEMENTED!")
                break
        }
    }]
]