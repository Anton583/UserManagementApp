import { CurrentButton, User } from "../src/UserApp"
// Simple level 1 heading
export const H1 = ( content: string ) => `<h1>${content}</h1>`

// Div with size of 8 colums
export const DivCol8OffSet = ( ...content: Array<string> ) => `<div class="col s8 offset-s2">
    ${content.join( "" )}
</div>`

// Div with size of 4 colums
export const DivCol4OffSet = ( ...content: Array<string> ) => `<div class="col s4 offset-s4">
${content.join( "" )}
</div>`

// Div with custom class
export const DivWithClass = ( divClass: string, ...content: Array<string> ) => `<div class=${divClass}>
            ${content.join( "" )}
</div>`


export const SearchBtn = ( clickedBtn: CurrentButton ) => {
    let style: string
    if ( clickedBtn === CurrentButton.Search ) {
        style = "opacity: 100%"
    } else {
        style = "opacity:0.5"
    }
    return `<a id="searchBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Search
</a>`
}

export const AddBtn = ( clickedBtn: CurrentButton ) => {
    let style: string
    if ( clickedBtn === CurrentButton.Add ) {
        style = "opacity: 100%"
    } else {
        style = "opacity:0.5"
    }
    return `<a id="addBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Add
</a>`
}


export const RemoveBtn = ( clickedBtn: CurrentButton ) => {
    let style: string
    if ( clickedBtn === CurrentButton.Remove ) {
        style = "opacity: 100%"
    } else {
        style = "opacity:0.5"
    }
    return `<a id="removeBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Remove
</a>`
}
export const ShowAllBtn = ( clickedBtn: CurrentButton ) => {
    let style: string
    if ( clickedBtn === CurrentButton.ShowAll ) {
        style = "opacity: 100%"
    } else {
        style = "opacity:0.5"
    }
    return `<a id="showAllBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Show All
</a>`

}


// Submit button as html
export const SubmBtn = ( clickedBtn: CurrentButton ) => {
    let visability: string
    let btnName: string
    if ( clickedBtn === CurrentButton.Search ) {
        visability = "block"
        btnName = "Search"
    }
    if ( clickedBtn === CurrentButton.Add ) {
        visability = "block"
        btnName = "Add"
    }
    if ( clickedBtn === CurrentButton.Remove ) {
        visability = "block"
        btnName = "Remove"
    }
    if ( clickedBtn === CurrentButton.ShowAll )
        visability = "none"

    return `<a id="submitBtn" ${status}
    class="waves-effect  waves-light btn red" style="display: ${visability};" >
   ${btnName}
    </a>`

}


// Space between elements 
export const Space = () => `<br>
                            <br>
                            <br>`

// Hidden by default div 
export const HiddenDiv = ( clickedBtn: CurrentButton, users: Array<User>, ifSbmtClicked: boolean, ...content: Array<string> ) => {
    let status: string
    if ( clickedBtn === CurrentButton.Search )
        status = "hidden"
    if ( clickedBtn === CurrentButton.Search, users.length > 0, ifSbmtClicked === true )
        status = "block"
    if ( clickedBtn === CurrentButton.Add )
        status = "hidden"
    if ( clickedBtn === CurrentButton.Remove )
        status = "hidden"
    if ( clickedBtn === CurrentButton.ShowAll )
        status = "block"
    return `<div id="hiddenDiv" ${status}>${content.join( "" )}</div>`
}


// Table
export const TableElem = ( ...content: Array<string> ) => `<table id="UTable" 
class="responsive-table responsive-table col s4 offset-s4">
                                                    ${content.join( "" )}
                                                </table>`

// Head element of the table
export const Thead = ( ...content: Array<string> ) => `<thead>
                                    <tr>
                                        ${content.join( "" )}
                                    </tr>
                                </thead>`

// Name the category of table
export const TheadName = ( ...content: Array<string> ) => `<th class="col s3">${content}</th>`

// Table element with users information
export const Tbody = ( users: Array<User> ) => {

    let usersAsContent: Array<string> = []
    for ( const user of users ) {
        const id = users.indexOf( user )
        let Bodycontent: string = `<tr>
    <td class="col s3">${user.name + " " + user.surname}</td>
    <td class="col s3">${id}</td>
    <td class="col s3">${user.dateOfBirth}</td>
</tr>`
        usersAsContent.push( Bodycontent )
    }


    let body = `<tbody id="tInfoB">${usersAsContent.join( " " )}</tbody>`
    return body
}




// Fill table with users information
export const TbodyContent = ( name: string, id: number, dateOfBirth: number ) => {

}

// Output field 
export const QueryResult = ( ...content: Array<string> ) =>
    `<div id="queryResult" class="col s4 offset-s4"> 
    ${content.join( "" )}
            </div>`



// Set output massage
export const QueryResultContent = ( content: string ) => `<p>${content}</p>`

// Set submit button lacation 
export const DivInputBtn = ( ...content: Array<string> ) =>
    `<div class="col offset-6" ${status}>
        ${content.join( "" )}
    </div>`

