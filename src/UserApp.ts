import { DivsStructure, InputSubmitElems, Table } from "../utils/HtmlStructures"
import { Btn, Space, HiddenDiv, TheadName, QueryResult, TbodyContent, QueryResultContent } from "../utils/HtmlElems"
import { $, render, toLCaseIncludes, setSbmtBtnVis, setHiddenDivVis, toArr } from "./variables/functions"


// Enum with members representing buttons on the top of the app
enum CurrentButton {
    Search,
    Add,
    Remove,
    ShowAll
}

const updateState = (keyState: Array<Array<any>>, state: CurrentButton) => {
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
    // Set default on input function
    const defaultOnInput = () => {
        inputField.oninput = () => {
            inputField.value.length > 0 ? setSbmtBtnVis("block")
                : setSbmtBtnVis("none")
        }
    }

    // Get buttons on the top of the app 
    const upperBtns = () => {
        const btns: Array<HTMLElement> = toArr(document.getElementsByTagName("a"))
        btns.splice(4, 1)
        return btns
    }

    // Get rid of extra elements on the page
    const clearPage = () => {
        queryRes.innerHTML = ""
        inputField.value = ""
        setSbmtBtnVis("none")
        tBodyContent.innerHTML = ""
    }

    // Set buttons style 
    const setBtnStyle = (sbmtBtnInnerText: string, searchBtnOp: string, addBtnOp: string, removeBtnOp: string, showAllBtnOp: string) => {
        sbmtBtn.innerHTML = sbmtBtnInnerText
        upperBtns()[0].style.opacity = searchBtnOp
        upperBtns()[1].style.opacity = addBtnOp
        upperBtns()[2].style.opacity = removeBtnOp
        upperBtns()[3].style.opacity = showAllBtnOp
    }
    // Set "CurrentButton" enum members functionality 
    switch (state) {
        case (CurrentButton.Search): {
            clearPage()
            defaultOnInput()
            setHiddenDivVis("none")
            inputField.style.display = "block"
            setBtnStyle("Search", "100%", "50%", "50%", "50%")
            sbmtBtn.onclick = (e) => {
                queryRes.innerHTML = ""
                tBodyContent.innerHTML = ""
                setHiddenDivVis("block")
                const arrOfFoundUsers: Array<Array<any>> = []
                for (const user of keyState)
                    // Check if input includes users info
                    if (toLCaseIncludes(user[0], inputField.value) || toLCaseIncludes(user[1], inputField.value) || toLCaseIncludes(user[0] + " " + user[1], inputField.value))
                        arrOfFoundUsers.push(user)
                for (const userFound of arrOfFoundUsers) {
                    setSbmtBtnVis("none")
                    const userName: string = (userFound[0] + " " + userFound[1])
                    const userDateOfBirth: number = userFound[2]
                    const userId: number = keyState.indexOf(userFound)
                    tBodyContent.innerHTML += TbodyContent(userName, userId, userDateOfBirth)
                } if (arrOfFoundUsers.length === 0) {
                    queryRes.innerHTML = ""
                    setHiddenDivVis("none")
                    queryRes.innerHTML += QueryResultContent("No users found!")
                }
            }
            break
        }
        case (CurrentButton.Add): {
            clearPage()
            setHiddenDivVis("none")
            inputField.style.display = "block"
            setBtnStyle("Add", "50%", "100%", "50%", "50%")
            defaultOnInput()
            // Set new on click function for the "Submit" button
            sbmtBtn.onclick = (e) => {
                const inputValue: Array<string> = inputField.value.split(" ")
                const name: string = inputValue[0]
                const surname: string = inputValue[1]
                const dateOfBirth: number = parseInt(inputValue[2])
                const expInput: string = name + " " + surname + " " + dateOfBirth
                if (inputField.value === expInput) {
                    setSbmtBtnVis("none")
                    keyState.push([name, surname, dateOfBirth])
                    queryRes.innerHTML = QueryResultContent("Added user: ID: " + (keyState.length - 1) + "; Full Name: " + (name + " " + surname) + "; Born in: " + dateOfBirth + ";")
                    inputField.value = ""
                } else {
                    inputField.value = ""
                    setSbmtBtnVis("none")
                    queryRes.innerHTML = QueryResultContent("Please, write Name, Surname and date of birth!")
                }
            }
            break
        }
        case (CurrentButton.Remove): {
            clearPage()
            setHiddenDivVis("none")
            inputField.style.display = "block"
            defaultOnInput()
            setBtnStyle("Remove", "50%", "50%", "100%", "50%")
            sbmtBtn.onclick = (e: MouseEvent) => {
                const expInput: number = parseFloat(inputField.value)
                if (keyState[expInput]) {
                    const removedUser: Array<Array<any>> = keyState.splice(expInput, 1)
                    queryRes.innerHTML = QueryResultContent("Removed user: ID: " + expInput + "; Full Name: " + removedUser[0][0] + " " + removedUser[0][1] + "; Born in: " + removedUser[0][2] + ";")
                    inputField.value = ""
                } else {
                    inputField.value = ""
                    setSbmtBtnVis("none")
                    queryRes.innerHTML = QueryResultContent("Please, write the existing ID of user")
                }
            }
            break
        }
        case (CurrentButton.ShowAll): {
            setHiddenDivVis("block")
            clearPage()
            setBtnStyle("", "50%", "50%", "50%", "100%")
            inputField.style.display = "none"
            for (const user of keyState) {
                // Get User full name
                const userName: string = (user[0] + " " + user[1])
                //Get User date of birth
                const userDateOfBirth: number = user[2]
                // Get ID of user
                const userId: number = keyState.indexOf(user)
                // Fill table with users info
                tBodyContent.innerHTML += TbodyContent(userName, userId, userDateOfBirth)
            } if (typeof (keyState[0]) == "undefined") {
                setHiddenDivVis("none")
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
            if (upperBtns().indexOf(clickedBtn) === 0)
                updateState(keyState, CurrentButton.Search)
            if (upperBtns().indexOf(clickedBtn) === 1)
                updateState(keyState, CurrentButton.Add)
            if (upperBtns().indexOf(clickedBtn) === 2)
                updateState(keyState, CurrentButton.Remove)
            if (upperBtns().indexOf(clickedBtn) === 3)
                updateState(keyState, CurrentButton.ShowAll)
        }
    }
}
updateState([["Petr", "Stalinov", 1998], ["Slava", "Petrov", 2002], ["lol", "kelek", 231]], CurrentButton.Search)


