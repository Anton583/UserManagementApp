import { getInputField, clearPage, setSubmitButtonVisibility, bindButtons, fillUsersTable, getResultField, ButtonType, fillUsersTableWithCustomUserArr } from "./utilities"
import { buttonBindings } from './bindings'
import users from './db/userStorage'
import { User } from './db/user'

const bindInputField = () =>
    getInputField().oninput = (ev: InputEvent) => {
        const newInputValue = (ev.target as HTMLInputElement).value
        if (newInputValue.length < 1) {
            setSubmitButtonVisibility(false)
            document.getElementById("hiddenDiv").style.display = "none"
        } else {
            setSubmitButtonVisibility(true)
            if (document.getElementById("searchBtn").getAttribute("style") === null)
                document.getElementById("hiddenDiv").style.display = "block"
            const inputToLC: string = newInputValue.toLowerCase()
            if (document.getElementById("submitBtn").innerHTML === "Search") {
                const userArr: User[] = []
                for (const user of users) {
                    if (newInputValue.length > 0) {
                        document.getElementById("hiddenDiv").style.display = "block"
                        const possibleInpToLC = (inputToLC).toLowerCase()
                        const devidedInp = possibleInpToLC.split(" ")
                        const possName = devidedInp[0]
                        const possSurname = devidedInp[1]
                        const nameToLC = user.name.toLowerCase()
                        const surnameToLC = user.surname.toLowerCase()
                        // if name or surname contain input from input field, shows the results as table rows
                        if (nameToLC.includes(inputToLC) === true || surnameToLC.includes(inputToLC) === true ||
                            (nameToLC + " " + surnameToLC).includes(possName + " " + possSurname) === true) {
                            // fill special array with found users
                            userArr.push(user)
                            // use special array as custom array to fill the table with users using the right ids 
                            fillUsersTableWithCustomUserArr(userArr, users)
                            getResultField().innerHTML = ""
                        }
                    }
                }
                if (userArr.length === 0) {
                    document.getElementById("hiddenDiv").style.display = "none"
                    getResultField().innerHTML = "No Users found!"
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