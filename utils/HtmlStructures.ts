import { DivCol4OffSet, DivCol8OffSet, Tbody, DivWithClass, H1, DivInputBtn, TableElem, SubmBtn, Thead, QueryResult, QueryResultContent, TheadName, HiddenDiv, AddBtn, RemoveBtn, SearchBtn, ShowAllBtn, Space } from "./HtmlElems"
import { CurrentButton, User } from "../src/UserApp"




// The structure of divs in the app
export const DivsStructure = ( clickedBtn: CurrentButton, users: Array<User>, removedUser: Array<User>, ifSbmtClicked: boolean, ifExecutedRight: boolean ) => {
    let output: string
    let content: Array<string>
    const formalOutput = ( content: string ) => QueryResult( QueryResultContent( content ) )
    const standardStrctr: string = ( SearchBtn( clickedBtn ) + " " + AddBtn( clickedBtn ) + " " + RemoveBtn( clickedBtn ) + " " + ShowAllBtn( clickedBtn ) + Space() )
    const inputField = InputSubmitElems( "Put your input here, please", clickedBtn )
    const table = ( clickedBtn, users, ifSbmtClicked ) => HiddenDiv( clickedBtn, users, ifSbmtClicked, Table( TheadName( "Name" ), TheadName( "Id" ), TheadName( "Date of birth" ), Tbody( users ) ) )
    if ( clickedBtn === CurrentButton.Search )
        content = [standardStrctr, inputField]
    if ( clickedBtn === CurrentButton.Search && ifSbmtClicked === true && users.length > 0 )
        content = [standardStrctr, inputField, table( clickedBtn, users, ifSbmtClicked )]
    if ( clickedBtn === CurrentButton.Search && ifSbmtClicked === true && users.length === 0 )
        content = [standardStrctr, inputField, formalOutput( "No users found!" )]

    if ( clickedBtn === CurrentButton.Add )
        content = [standardStrctr, inputField, formalOutput( "" )]
    if ( clickedBtn === CurrentButton.Add && ifSbmtClicked === true && ifExecutedRight === true ) {
        output = "Added user: ID: " + users.indexOf( users[users.length - 1] ) + "; Full Name: " + users[users.length - 1].name + " " + users[users.length - 1].surname + "; Born in: " + users[users.length - 1].dateOfBirth + ";"
        content = [standardStrctr, inputField, formalOutput( output )]
    } else if ( ifExecutedRight === false )
        content = [standardStrctr, inputField, formalOutput( "Please, write name, surname, date of birth of user" )]

    if ( clickedBtn === CurrentButton.Remove )
        content = [standardStrctr, inputField, formalOutput( "" )]
    if ( clickedBtn === CurrentButton.Remove && ifSbmtClicked === true && ifExecutedRight === true ) {
        output = "Removed user: Full Name: " + removedUser[0].name + " " + removedUser[0].surname + "; Born in: " + removedUser[0].dateOfBirth + ";"
        content = [standardStrctr, inputField, formalOutput( output )]
    } else if ( ifExecutedRight === false )
        content = [standardStrctr, inputField, formalOutput( "Please, write the existing id of user" )]
    if ( clickedBtn === CurrentButton.ShowAll )
        content = [standardStrctr, table( clickedBtn, users, ifSbmtClicked )]
    return DivWithClass( "containner",
        DivWithClass( "row",
            DivWithClass( "center-align",
                H1( "User Library" ),
                DivCol8OffSet( content.join( "" ) ) ) ) )
}

// Input field with submit button
export const InputSubmitElems = ( Inputplaceholder: string, clickedBtn: CurrentButton ) =>
    DivWithClass( "row", DivCol4OffSet( `<input id="inputField" placeholder="${Inputplaceholder}" style="display:"> ` ), DivInputBtn( SubmBtn( clickedBtn ) ) )

// Table element structure
export const Table = ( ...tHeadNames: Array<string> ) => TableElem( Thead( tHeadNames.join( "" ) ) )