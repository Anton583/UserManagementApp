import { getInputField, clearPage, setSubmitButtonVisibility, bindButtons, fillUsersTable, getResultField, ButtonType } from "./utilities"
import { buttonBindings } from './bindings'
import users from './db/userStorage'
import { User } from './db/user'


const bindInputField = () =>
    getInputField().oninput = (ev: InputEvent) => {
        const newInputValue = (ev.target as HTMLInputElement).value
        getResultField().innerHTML = ""
        if (newInputValue.length < 1) {
            setSubmitButtonVisibility(false)
            document.getElementById("hiddenDiv").style.display = "none"
        }
        else {
            const userArr: User[] = []
            setSubmitButtonVisibility(true)
            const inputToLC: string = newInputValue.toLowerCase()
            if (document.getElementById("searchBtn").getAttribute("style") === null) {
                document.getElementById("hiddenDiv").style.display = "block"
                for (const user of users) {
                    if (user.name.toLowerCase().includes(inputToLC) || user.surname.toLowerCase().includes(inputToLC) === true) {
                        userArr.push(user)
                        fillUsersTable(userArr)
                    }
                    if (userArr.length === 0) {
                        document.getElementById("hiddenDiv").style.display = "none"
                        getResultField().innerHTML = "No Users found!"
                    }
                }
            }
        }
    }

(() => {
    clearPage()
    bindButtons(buttonBindings)
    document.getElementById("searchBtn").removeAttribute("style")

    bindInputField()

    // fillUsersTable(users)
})()