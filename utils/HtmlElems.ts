import { CurrentButton, User } from "../src/UserApp"

// Simple level 1 heading
export const H1 = ( content: string ) => `<h1>${content}</h1>`




// Div with custom class
export const DivWithClass = ( divClass: string, ...content: Array<string> ) => `<div class=${divClass}>
            ${content.join( "" )}
</div>`

export const SearchBtn = ( clickedBtn: CurrentButton ) => {
    const style: string = ( clickedBtn === CurrentButton.Search )
        ? "opacity: 100%"
        : "opacity:0.5"
    return `<a id="searchBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Search
</a>`
}

export const AddBtn = ( clickedBtn: CurrentButton ) => {
    const style: string = ( clickedBtn === CurrentButton.Add )
        ? "opacity: 100%"
        : "opacity:0.5"
    return `<a id="addBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Add
</a>`
}

export const RemoveBtn = ( clickedBtn: CurrentButton ) => {
    const style: string =
        ( clickedBtn === CurrentButton.Remove )
            ? "opacity: 100%"
            : "opacity:0.5"
    return `<a id="removeBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Remove
</a>`
}

export const ShowAllBtn = ( clickedBtn: CurrentButton ) => {
    const style: string = ( clickedBtn === CurrentButton.ShowAll )
        ? "opacity: 100%"
        : "opacity:0.5"
    return `<a id="showAllBtn"
    class="waves-effect  waves-light btn" style=${style}>
    Show All
</a>`

}

// Submit button as html
export const SubmBtn = ( clickedBtn: CurrentButton ) => {
    let visability: string
    let btnName: string
    switch ( clickedBtn ) {
        case CurrentButton.Search:
            visability = "block"
            btnName = "Search"
            break
        case CurrentButton.Add:
            visability = "block"
            btnName = "add"
            break
        case CurrentButton.Remove:
            visability = "block"
            btnName = "Remove"
            break
        case CurrentButton.ShowAll:
            visability = "none"
            break
    }
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
    switch ( clickedBtn ) {
        case CurrentButton.Search:
            status = "hidden"
            if ( users.length > 0, ifSbmtClicked === true )
                status = "block"
            break
        case CurrentButton.Add:
            status = "hidden"
            break
        case CurrentButton.Remove:
            status = "hidden"
            break
        case CurrentButton.ShowAll:
            status = "block"
    }
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
export const Tbody = ( foundUsers: Array<User>, originalUsers: Array<User> ) => {
    const usersAsContent: Array<string> = []
    for ( const user of foundUsers ) {
        // To show correct id of user take it from original users array
        const id = originalUsers.indexOf( user )
        const Bodycontent: string = `<tr>
    <td class="col s3">${user.name + " " + user.surname}</td>
    <td class="col s3">${id}</td>
    <td class="col s3">${user.dateOfBirth}</td>
</tr>`
        usersAsContent.push( Bodycontent )
    }
    const body = `<tbody id="tInfoB">${usersAsContent.join( " " )}</tbody>`
    return body
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

