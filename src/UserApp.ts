import { DivsStructure, InputSubmitElems, Table } from "../utils/HtmlStructures"
import { Btn, Space, HiddenDiv, TheadName, QueryResult, TbodyContent, QueryResultContent } from "../utils/HtmlElems"
import { $, render, toLCaseIncludes, toArr } from "./variables/functions"


// Enum with members representing buttons on the top of the app
enum CurrentButton {
    Search,
    Add,
    Remove,
    ShowAll
}

const updateState = (state: Array<any[]>) => {
    // The html structure of the app
    const body: string =
        DivsStructure(
            Btn("searchBtn", "opacity:0.5!important", "Search"), " ", Btn("addBtn", "opacity:0.5!important", "Add"), " ", Btn("removeBtn", "opacity:0.5!important", "Remove"), " ",
            Btn("showAllBtn", "opacity:0.5!important", "Show All"),
            Space(),
            InputSubmitElems("Put your input here, please", "Search"),
            HiddenDiv(Table(TheadName("Name"), TheadName("Id"), TheadName("Date of birth"))),
            QueryResult())
    // Put body into the main div
    render(body)
    // Get query massage field
    const queryRes: HTMLElement = $("queryResult")
    // Get submit button
    const sbmtBtn: HTMLElement = $("submitBtn")
    // Get table body element
    const tBodyContent: HTMLElement = $("tInfoB")
    // Get input field
    const inputField: HTMLInputElement = $("inputField") as HTMLInputElement

    // Get buttons on the top of the app 
    const upperBtns = () => {
        const btns: Array<HTMLElement> = toArr(document.getElementsByTagName("a"))
        btns.splice(4, 1)
        return btns
    }
    // Get only current btn status from state 
    const btnState = state[state.length - 1][0]
    // Get only users from state
    const users = () => {
        const arrForUsers = []
        for (const components of state) {
            arrForUsers.push(components)
        }
        arrForUsers.pop()
        return arrForUsers
    }
    // Set "CurrentButton" enum members functionality 
    switch (btnState) {
        case (CurrentButton.Search): {
            queryRes.innerHTML = ""
            inputField.value = ""
            sbmtBtn.style.display = "none"
            tBodyContent.innerHTML = ""
            inputField.oninput = () => {
                inputField.value.length > 0 ? sbmtBtn.style.display = "block"
                    : sbmtBtn.style.display = "none"
            }
            $("hiddenDiv").style.display = "none"
            inputField.style.display = "block"
            sbmtBtn.innerHTML = "Search"
            upperBtns()[0].style.opacity = "100%"
            upperBtns()[1].style.opacity = "50%"
            upperBtns()[2].style.opacity = "50%"
            upperBtns()[3].style.opacity = "50%"
            sbmtBtn.onclick = (e) => {
                queryRes.innerHTML = ""
                tBodyContent.innerHTML = ""
                $("hiddenDiv").style.display = "block"
                const arrOfFoundUsers: Array<Array<any>> = []
                for (const user of users())
                    // Check if input includes users info
                    if (toLCaseIncludes(user[0], inputField.value) || toLCaseIncludes(user[1], inputField.value) || toLCaseIncludes(user[0] + " " + user[1], inputField.value))
                        arrOfFoundUsers.push(user)
                for (const userFound of arrOfFoundUsers) {
                    sbmtBtn.style.display = "none"
                    const userName: string = (userFound[0] + " " + userFound[1])
                    const userDateOfBirth: number = userFound[2]
                    const userId: number = users().indexOf(userFound)
                    tBodyContent.innerHTML += TbodyContent(userName, userId, userDateOfBirth)
                } if (arrOfFoundUsers.length === 0) {
                    queryRes.innerHTML = ""
                    $("hiddenDiv").style.display = "none"
                    queryRes.innerHTML += QueryResultContent("No users found!")
                }
            }
            break
        }
        case (CurrentButton.Add): {
            queryRes.innerHTML = ""
            inputField.value = ""
            sbmtBtn.style.display = "none"
            tBodyContent.innerHTML = ""
            $("hiddenDiv").style.display = "none"
            inputField.style.display = "block"
            sbmtBtn.innerHTML = "Add"
            upperBtns()[0].style.opacity = "50%"
            upperBtns()[1].style.opacity = "100%"
            upperBtns()[2].style.opacity = "50%"
            upperBtns()[3].style.opacity = "50%"
            inputField.oninput = () => {
                inputField.value.length > 0 ? sbmtBtn.style.display = "block"
                    : sbmtBtn.style.display = "none"
            }
            // Set new on click function for the "Submit" button
            sbmtBtn.onclick = (e) => {
                const inputValue: Array<string> = inputField.value.split(" ")
                const name: string = inputValue[0]
                const surname: string = inputValue[1]
                const dateOfBirth: number = parseInt(inputValue[2])
                const expInput: string = name + " " + surname + " " + dateOfBirth
                if (inputField.value === expInput) {
                    sbmtBtn.style.display = "none"
                    state.splice(state.length - 1, 0, [name, surname, dateOfBirth])
                    queryRes.innerHTML = QueryResultContent("Added user: ID: " + (users().length - 1) + "; Full Name: " + (name + " " + surname) + "; Born in: " + dateOfBirth + ";")
                    inputField.value = ""
                } else {
                    inputField.value = ""
                    sbmtBtn.style.display = "none"
                    queryRes.innerHTML = QueryResultContent("Please, write Name, Surname and date of birth!")
                }
            }
            break
        }
        case (CurrentButton.Remove): {
            queryRes.innerHTML = ""
            inputField.value = ""
            sbmtBtn.style.display = "none"
            tBodyContent.innerHTML = ""
            $("hiddenDiv").style.display = "none"
            inputField.style.display = "block"
            inputField.oninput = () => {
                inputField.value.length > 0 ? sbmtBtn.style.display = "block"
                    : sbmtBtn.style.display = "none"
            }
            sbmtBtn.innerHTML = "Remove"
            upperBtns()[0].style.opacity = "50%"
            upperBtns()[1].style.opacity = "50%"
            upperBtns()[2].style.opacity = "100%"
            upperBtns()[3].style.opacity = "50%"
            sbmtBtn.onclick = (e: MouseEvent) => {
                const expInput: number = parseFloat(inputField.value)
                if (users()[expInput]) {
                    const removedUser: Array<Array<any>> = state.splice(expInput, 1)
                    queryRes.innerHTML = QueryResultContent("Removed user: ID: " + expInput + "; Full Name: " + removedUser[0][0] + " " + removedUser[0][1] + "; Born in: " + removedUser[0][2] + ";")
                    inputField.value = ""
                } else {
                    inputField.value = ""
                    sbmtBtn.style.display = "none"
                    queryRes.innerHTML = QueryResultContent("Please, write the existing ID of user")
                }
            }
            break
        }
        case (CurrentButton.ShowAll): {
            $("hiddenDiv").style.display = "block"
            queryRes.innerHTML = ""
            inputField.value = ""
            sbmtBtn.style.display = "none"
            tBodyContent.innerHTML = ""
            upperBtns()[0].style.opacity = "50%"
            upperBtns()[1].style.opacity = "50%"
            upperBtns()[2].style.opacity = "50%"
            upperBtns()[3].style.opacity = "100%"
            inputField.style.display = "none"
            for (const user of users()) {
                // Get User full name
                const userName: string = (user[0] + " " + user[1])
                //Get User date of birth
                const userDateOfBirth: number = user[2]
                // Get ID of user
                const userId: number = state.indexOf(user)
                // Fill table with users info
                tBodyContent.innerHTML += TbodyContent(userName, userId, userDateOfBirth)
            } if (typeof (users()) == "undefined") {
                $("hiddenDiv").style.display = "none"
                queryRes.innerHTML = QueryResultContent("No users left!")
            }
            break
        } default:
            console.warn("Chegoo?")
    }
    // Update state depend on the button clicked
    for (const btn of upperBtns()) {
        btn.onclick = (e: MouseEvent) => {
            const clickedBtn: HTMLElement = e.target as HTMLElement
            if (upperBtns().indexOf(clickedBtn) === 0) {
                state.pop()
                state.push([CurrentButton.Search])
                updateState(state)
            }
            if (upperBtns().indexOf(clickedBtn) === 1) {
                state.pop()
                state.push([CurrentButton.Add])
                updateState(state)
            }
            if (upperBtns().indexOf(clickedBtn) === 2) {
                state.pop()
                state.push([CurrentButton.Remove])
                updateState(state)
            }
            if (upperBtns().indexOf(clickedBtn) === 3) {
                state.pop()
                state.push([CurrentButton.ShowAll])
                updateState(state)
            }
        }
    }
}
updateState([["Petr", "Stalinov", 1998], ["Slava", "Petrov", 2002], ["Anton", "Codit", 2003], [CurrentButton.Search]])


