const $ = (id) => document.getElementById(id)

// Puts all html code into main div
const render = (html: string) => {
    const MainDiv = $("app") as HTMLElement
    MainDiv.innerHTML = html
};
// Simple level 1 heading
const H1 = (content: string) => `<h1>${content}</h1>`

const DivCol8OffSet = (...content: Array<string>) => `<div class="col s8 offset-s2">
    ${content.join("")}
</div>`

const DivCol4OffSet = (...content: Array<string>) => `<div class="col s4 offset-s4">
${content.join("")}
</div>`

const DivWithClass = (divClass: string, ...content: Array<string>) => `<div class=${divClass}>
                                                                        ${content.join("")}
                                                                    </div>`


const Btns = (id: string, style: string, content: string) => `<a id=${id} 
                                                                   class="waves-effect  waves-light btn" style=${style}>
                                                                ${content}
                                                              </a>`
const SubmBtn = (id: string, content: string) => `<a id=${id} 
                                                class="waves-effect  waves-light btn red">
                                                    ${content}
                                                </a>`

const Space = () => `<br>
                     <br>
                     <br>`

const HiddenDiv = (...content: Array<string>) => `<div id="hiddenDiv" hidden>${content.join("")}</div>`

const TableElem = (...content: Array<string>) => `<table id="UTable" 
class="responsive-table responsive-table col s4 offset-s4">
                                                    ${content.join("")}
                                                </table>`

const Thead = (...content: Array<string>) => `<thead>
                                    <tr>
                                        ${content.join("")}
                                    </tr>
                                </thead>`

const TheadName = (...content: Array<string>) => `<th class="col s3">${content}</th>`

const Tbody = (...content: Array<string>) => `<tbody id="tInfoB">${content.join("")}</tbody>`

const TbodyContent = (name: string, id: number, dateOfBirth: number) => `<tr>
                                                                            <td class="col s3">${name}</td>
                                                                            <td class="col s3">${id}</td>
                                                                            <td class="col s3">${dateOfBirth}</td>
                                                                        </tr>`

const QueryResult = (...content: Array<string>) => `<div id="queryResult" class="col s4 offset-s4">
                                                            ${content.join("")}   
                                                    </div>`

const QueryResultContent = (content: string) => `<p>${content}</p>`

const DivInputBtn = (...content: Array<string>) => `<div class="col offset-6">
                                                    ${content.join("")}
                                                </div>`

const DivsStructure = (...content: Array<string>) => DivWithClass("containner",
    DivWithClass("row",
        DivWithClass("center-align",
            H1("User Library"),
            DivCol8OffSet(content.join("")))))

const InputSubmitElems = (Inputplaceholder: string, btnName: string) => DivWithClass("row", DivCol4OffSet(`<input id="inputField" placeholder="${Inputplaceholder}">`), DivInputBtn(SubmBtn("submitBtn", btnName)))

const Table = (...tHeadNames: Array<string>) => TableElem(Thead(tHeadNames.join("")), Tbody())

// HTMLCollectionOf<Element> => Array<Element>
function toArr(setOfElems: HTMLCollectionOf<Element>) {
    const arr = []
    for (let index = 0; index < setOfElems.length; index = index + 1)
        arr.push(setOfElems[index])
    return arr
}

const updateState = (state: Array<any[]>) => {

    const body =
        DivsStructure(
            Btns("searchBtn", "opacity:0.5!important", "Search"), " ", Btns("addBtn", "opacity:0.5!important", "Add"), " ", Btns("removeBtn", "opacity:0.5!important", "Remove"), " ", Btns("showAllBtn", "opacity:0.5!important", "Show All"),
            Space(),
            InputSubmitElems("Put your input here, please", "Search"),
            HiddenDiv(Table(TheadName("Name"), TheadName("Id"), TheadName("Date of birth"))),
            QueryResult())
    render(body)



    for (const user of state) {
        const userName = (user[0] + " " + user[1])
        const userDateOfBirth = user[2]
        const userId = state.indexOf(user)
        $("tInfoB").innerHTML += TbodyContent(userName, userId, userDateOfBirth)
    }

    const btns = toArr(document.getElementsByTagName("a"))
    const inputField = $("inputField") as HTMLInputElement
    const sbmtBtn = $("submitBtn")
    btns.splice(4, 1)
    sbmtBtn.style.display = "none"




    const clearPage = () => {
        $("queryResult").innerHTML = ""
        inputField.value = ""
        sbmtBtn.style.display = "none"
    }

    inputField.oninput = () => {
        if (inputField.value.length > 0)
            sbmtBtn.style.display = "block"
        else sbmtBtn.style.display = "none"
    }


    for (const btn of btns) {
        btn.onclick = (e) => {
            const clickedBtn = e.target as HTMLElement
            if (btns.indexOf(clickedBtn) === 3) {
                $("hiddenDiv").style.display = "block"
                inputField.style.display = "none"
                btns[0].style.opacity = "50%"
                btns[1].style.opacity = "50%"
                btns[2].style.opacity = "50%"
                btns[3].style.opacity = "100%"
                clearPage()
            } else {
                inputField.style.display = "block"
                $("hiddenDiv").style.display = "none"
            }

            if (btns.indexOf(clickedBtn) === 1) {
                sbmtBtn.innerHTML = "Add"
                btns[0].style.opacity = "50%"
                btns[2].style.opacity = "50%"
                btns[3].style.opacity = "50%"
                btns[1].style.opacity = "100%"
                clearPage()
            }

            if (btns.indexOf(clickedBtn) === 0) {
                sbmtBtn.innerHTML = "Search"
                btns[1].style.opacity = "50%"
                btns[2].style.opacity = "50%"
                btns[3].style.opacity = "50%"
                btns[0].style.opacity = "100%"
                clearPage()
            }

            if (btns.indexOf(clickedBtn) === 2) {
                sbmtBtn.innerHTML = "Remove"
                btns[0].style.opacity = "50%"
                btns[1].style.opacity = "50%"
                btns[3].style.opacity = "50%"
                btns[2].style.opacity = "100%"
                clearPage()
            }

            if (sbmtBtn.innerHTML === "Add") {
                sbmtBtn.onclick = (e) => {
                    const inputValue = inputField.value.split(" ")
                    const name: string = inputValue[0]
                    const surname: string = inputValue[1]
                    const dateOfBirth: number = parseInt(inputValue[2])
                    const input = name + " " + surname + " " + dateOfBirth
                    if (inputField.value === input) {
                        state.push([name, surname, dateOfBirth])
                        updateState(state)
                    } else {
                        inputField.value = ""
                        sbmtBtn.style.display = "none"
                        $("queryResult").innerHTML = QueryResultContent("Please, write Name, Surname and date of birth!")
                    }
                }
            }
            if (sbmtBtn.innerHTML === "Remove") {
                sbmtBtn.onclick = (e) => {
                    const input = parseFloat(inputField.value)
                    if (state[input]) {
                        state.splice(input, 1)
                        $("queryResult").innerHTML = QueryResultContent("lol")
                        updateState(state)
                    } else {
                        inputField.value = ""
                        sbmtBtn.style.display = "none"
                        $("queryResult").innerHTML = QueryResultContent("Please, write the existing ID of user")
                    }
                }
            }
        }
    }
}
updateState([["Petr", "Stalinov", 1998], ["Slava", "Petrov", 2002], ["lol", "kelek", 231]])


