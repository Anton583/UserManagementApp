
import { User, findUsersByName, getUsersByIDs, addUser, getUserId as getUserIDs } from "./db/user"
import { getButtonByType, ButtonType, getInputField, makeTBodyEl, getResultField, makeP, clearPage, setSubmitButtonVisibility } from "./utilities"

const users: Array<User> = [
    new User("Petr", 2002).setSurname("Vlasov").updateDurovVisits(6),
    new User("Stas", 1951).setSurname("Petrov").updateDurovVisits(2),
    new User("Slava", 1984).setSurname("Vlavla")
]

const searchCard = (queryText: string) => {
    const searchResult: [number, User][] = getUsersByIDs(findUsersByName(queryText, users), users)
    for (const [userID, user] of searchResult)
        getResultField().innerHTML += makeP("ID: " + userID + " | " + user.asString())
}



const removeCard = (queryText: string) => {
    const input: string = queryText.split(" ")[0]
    const userId: number = parseFloat(input)
    if (typeof (userId) !== "number" || userId >= users.length)
        getResultField().innerHTML = "Please, write the existing Id of user!"
    else {
        users.splice(userId, 1)
        const removeUser = getUsersByIDs(getUserIDs(users), users)
        for (const [otherIds, user] of removeUser) {
            getResultField().innerHTML += makeP("ID: " + otherIds + " | " + user.asString())

        }
    }
}


const addCard = (queryText: string) => {
    const newName: string = queryText.split(" ")[0]
    const newYearOfBirth: number = parseFloat(queryText.split(" ")[1])
    const input = newName + " " + newYearOfBirth
    if (queryText !== input) {
        getResultField().innerHTML = "Please, write name, space bar, year of birth!"
        return
    }
    const newUser: number = addUser(newName, newYearOfBirth, users)
    const resOutput = getUsersByIDs([newUser], users)

    for (const [userID, user] of resOutput)
        if (queryText === input || typeof (parseFloat(newName)) === "number")
            getResultField().innerHTML += makeP("ID: " + userID + " | " +
                user.asString())
}




const init = () => {

    clearPage()



    getButtonByType(ButtonType.ShowAll).onclick = (ev: MouseEvent) => {
        const btn = getButtonByType(ButtonType.ShowAll)
        btn.innerHTML = "Show All"
        getInputField().style.display = "none"
        document.getElementById("submitBtn").style.display = "none"
        document.getElementById("hiddenDiv").style.display = "block"
        const table = document.getElementById("tInfoB")
        document.getElementById("showAllBtn").removeAttribute("style")
        document.getElementById("addBtn").style.opacity = "0.5"
        document.getElementById("searchBtn").style.opacity = "0.5"
        document.getElementById("removeBtn").style.opacity = "0.5"
        table.innerHTML = ""
        for (const user of users) {
            const userName = user.name
            const dateOfBAsStr = (user.yearOfBirth).toString()
            const pavelDVisitsAsStr = (user.pavelDurovVisits).toString()
            const idAsStr = users.indexOf(user)
            table.innerHTML += table.appendChild(document.createElement("tr")).innerHTML =
                '<td class="col s3">' + userName + "</td>" +
                '<td class="col s3">' + idAsStr + "</td>" +
                '<td class="col s3">' + dateOfBAsStr + "</td>" +
                '<td class="col s3">' + pavelDVisitsAsStr + "</td>"
        }
        clearPage()
    }

    getButtonByType(ButtonType.Add).onclick = (ev: MouseEvent) => {
        const btn = getButtonByType(ButtonType.Submit)
        const inputField: HTMLInputElement = getInputField()
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
    }



    getButtonByType(ButtonType.Remove).onclick = (ev: MouseEvent) => {
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
    }




    getButtonByType(ButtonType.Search).onclick = (ev: MouseEvent) => {
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

    }

    window.onload = function () { document.getElementById("searchBtn").removeAttribute("style") }

    getButtonByType(ButtonType.Submit).onclick = (ev: MouseEvent) => {
        const inputField: HTMLInputElement = getInputField()
        const queryText = inputField.value
        const elem = getButtonByType(ButtonType.Submit) as HTMLAnchorElement
        const submitText = elem["outerText"].toUpperCase()

        clearPage()

        switch (submitText) {
            case "SEARCH":
                searchCard(queryText)
                break
            case "ADD":
                addCard(queryText)
                break
            case "REMOVE":
                removeCard(queryText)
                break

            default:
                console.error("What the hell did u just do? UNIMPLEMENTED!")
                break
        }
    }

    getInputField().oninput = (ev: InputEvent) => {
        const newInputValue = (ev.target as HTMLInputElement).value

        if (newInputValue.length < 1)
            setSubmitButtonVisibility(false)
        else
            setSubmitButtonVisibility(true)
    }

}



init();

// DZ:
// Try to center out the input and result fields DONE
// Extra: input & result fields should be centered out both when SUBMIT button is visible and not DONE
// Selected activity (Search/Add/Remove/Show All) button should be highlighted in some other color DONE
// (HINT: add/remove color class https://materializecss.com/color.html) DONE
// Add "Remove button" functionality DONE
//  In the input field, user can write the ID of the user to delete DONE
//  This deletes the user by ID from DB (if user is found, otherwise display error message) DONE
//  and prints all remaining users in the result field DONE
// Create a 4th button: "Show All" users. DONE
//  If you click it, the input field is gone, and only resultField is visible, where you can see all the users DONE
// Move user output formatting to table (https://materializecss.com/table.html) DONE