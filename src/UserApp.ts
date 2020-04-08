import { DivsStructure, InputSubmitElems, Table } from "../utils/HtmlStructures"
import { Btn, Space, HiddenDiv, TheadName, QueryResult, TbodyContent, QueryResultContent } from "../utils/HtmlElems"
import { $, render, toLCaseIncludes, setSbmtBtnVis, setHiddenDivVis, toArr } from "./variables/functions"

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
    // Get buttons at the top of the app only 
    const upperBtns = () => {
        const btns: Array<HTMLElement> = toArr(document.getElementsByTagName("a"))
        btns.splice(4, 1)
        return btns
    }
    // Make submit button invisable as default 
    setSbmtBtnVis("none")
    // Get rid of extra elements on the page
    const clearPage = () => {
        queryRes.innerHTML = ""
        inputField.value = ""
        setSbmtBtnVis("none")
        tBodyContent.innerHTML = ""
    }
    // Set default on input function
    const defaultOnInput = () => {
        inputField.oninput = () => {
            inputField.value.length > 0 ? setSbmtBtnVis("block")
                : setSbmtBtnVis("none")

        }
    }
    // Set on click functions for buttons
    for (const btn of upperBtns()) {
        btn.onclick = (e: MouseEvent) => {
            // Identify the clicked button 
            const clickedBtn = e.target as HTMLElement
            // Set on click function and change the app state by id of the button
            if (upperBtns().indexOf(clickedBtn) === 3) {
                setHiddenDivVis("block")
                queryRes.innerHTML = ""
                tBodyContent.innerHTML = ""
                inputField.style.display = "none"
                upperBtns()[0].style.opacity = "50%"
                upperBtns()[1].style.opacity = "50%"
                upperBtns()[2].style.opacity = "50%"
                upperBtns()[3].style.opacity = "100%"
                for (const user of state) {
                    // Get User full name
                    const userName: string = (user[0] + " " + user[1])
                    const userDateOfBirth: number = user[2]
                    // Get ID of user
                    const userId: number = state.indexOf(user)
                    // Fill table with users info
                    tBodyContent.innerHTML += TbodyContent(userName, userId, userDateOfBirth)
                }

            } else {
                inputField.style.display = "block"
                setHiddenDivVis("none")
            }
            if (upperBtns().indexOf(clickedBtn) === 1) {
                defaultOnInput()
                sbmtBtn.innerHTML = "Add"
                upperBtns()[0].style.opacity = "50%"
                upperBtns()[2].style.opacity = "50%"
                upperBtns()[3].style.opacity = "50%"
                upperBtns()[1].style.opacity = "100%"
                clearPage()
            }
            if (upperBtns().indexOf(clickedBtn) === 0) {
                sbmtBtn.innerHTML = "Search"
                upperBtns()[1].style.opacity = "50%"
                upperBtns()[2].style.opacity = "50%"
                upperBtns()[3].style.opacity = "50%"
                upperBtns()[0].style.opacity = "100%"
                clearPage()
                // Change input field's on input function 
                inputField.oninput = () => {
                    inputField.value.length > 0 ? setSbmtBtnVis("block")
                        : setSbmtBtnVis("none")
                    const arrOfUsers: Array<Array<any>> = []
                    for (const user of state) {
                        setHiddenDivVis("block")
                        tBodyContent.innerHTML = ""
                        // Check if input includes users info
                        if (toLCaseIncludes(user[0], inputField.value) || toLCaseIncludes(user[1], inputField.value) || toLCaseIncludes(user[0] + " " + user[1], inputField.value)) {
                            // Fill the array with found users
                            arrOfUsers.push(user)
                            queryRes.innerHTML = ""
                        }

                    }
                    // Show table with found users only 
                    for (const userFound of arrOfUsers) {
                        const userName: string = (userFound[0] + " " + userFound[1])
                        const userDateOfBirth: number = userFound[2]
                        const userId: number = state.indexOf(userFound)
                        tBodyContent.innerHTML += TbodyContent(userName, userId, userDateOfBirth)
                        // If no users found
                    } if (arrOfUsers.length === 0) {
                        setHiddenDivVis("none")
                        queryRes.innerHTML = QueryResultContent("No users found!")
                    } if (inputField.value.length === 0) {
                        clearPage()
                        setHiddenDivVis("none")
                    }
                }
            } if (upperBtns().indexOf(clickedBtn) === 2) {
                defaultOnInput()
                sbmtBtn.innerHTML = "Remove"
                upperBtns()[0].style.opacity = "50%"
                upperBtns()[1].style.opacity = "50%"
                upperBtns()[3].style.opacity = "50%"
                upperBtns()[2].style.opacity = "100%"
                clearPage()
                // If the "Add" button was clicked
            } if (sbmtBtn.innerHTML === "Add") {
                // Set new on click function for the "Submit" button
                sbmtBtn.onclick = (e) => {
                    const inputValue: Array<string> = inputField.value.split(" ")
                    const name: string = inputValue[0]
                    const surname: string = inputValue[1]
                    const dateOfBirth: number = parseInt(inputValue[2])
                    const input: string = name + " " + surname + " " + dateOfBirth
                    if (inputField.value === input) {
                        state.push([name, surname, dateOfBirth])
                        updateState(state)
                    } else {
                        inputField.value = ""
                        setSbmtBtnVis("none")
                        queryRes.innerHTML = QueryResultContent("Please, write Name, Surname and date of birth!")
                    }
                }
            }
            if (sbmtBtn.innerHTML === "Remove") {
                sbmtBtn.onclick = (e) => {
                    const input: number = parseFloat(inputField.value)
                    if (state[input]) {
                        state.splice(input, 1)
                        updateState(state)
                    } else {
                        inputField.value = ""
                        setSbmtBtnVis("none")
                        queryRes.innerHTML = QueryResultContent("Please, write the existing ID of user")
                    }
                }
            }
        }
    }
}
updateState([["Petr", "Stalinov", 1998], ["Slava", "Petrov", 2002], ["lol", "kelek", 231]])


