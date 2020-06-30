import { Tbody, DivWithClass, H1, DivInputBtn, TableElem, SubmBtn, Thead, QueryResult, QueryResultContent, TheadName, HiddenDiv, AddBtn, RemoveBtn, SearchBtn, ShowAllBtn, Space } from "./HtmlElems"
import { CurrentButton, User, UserAppState } from "../src/UserApp"

enum DivOffset {
    col4,
    col8
}

const SizeDiv = ( offset: DivOffset, ...content: Array<string> ) => {
    const bIsBigOffset: boolean = offset == DivOffset.col8;
    const divClassStr = `col ${bIsBigOffset ? "s8" : "s4"} offset-${bIsBigOffset ? "s2" : "s4"}`;
    return `<div class="${divClassStr}">${content.join( "" )}</div>`
}


// The structure of divs in the app
export const DivsStructure = ( state: UserAppState ) => {
    const clickedBtn: CurrentButton = state.btnState
    // According to state this is either foundUsers either users
    const users: Array<User> = state.switchBetweenUsersCollections( state.btnState )
    // Original user array 
    const originalUsers: Array<User> = state.switchBetweenUsersCollections( CurrentButton.Add )
    // Output message Html basis
    const formalOutput = ( content: string ) => QueryResult( QueryResultContent( content ) )
    // App's top buttons structure
    const topButtonsRow: string = ( SearchBtn( clickedBtn ) + " " + AddBtn( clickedBtn ) + " " + RemoveBtn( clickedBtn ) + " " + ShowAllBtn( clickedBtn ) + Space() )
    // Input field structure
    const inputField = ( state.btnState !== CurrentButton.ShowAll ) ? InputSubmitElems( "Put your input here, please", clickedBtn ) : ""
    // According to current state decide what output to show
    const switchOutput = ( ( state ) => {
        switch ( clickedBtn ) {
            case CurrentButton.Search:
                // Output if at least one user found
                if ( state.bIsSbmtClicked === true && users.length > 0 ) {
                    return HiddenDiv( clickedBtn, users, state.bIsSbmtClicked, Table( TheadName( "Name" ), TheadName( "Id" ), TheadName( "Date of birth" ), Tbody( users, originalUsers ) ) )
                }
                // Output there are no found users
                else if ( users.length === 0 ) {
                    return formalOutput( "No users found!" )
                }
                break
            case CurrentButton.Add:
                // Show detailed output with info of added user if input is right
                if ( state.bIsSbmtClicked === true && state.bIsExecutedRight === true ) {
                    return formalOutput( "Added user: ID: " + users.indexOf( users[users.length - 1] ) + "; Full Name: " + users[users.length - 1].name + " " + users[users.length - 1].surname + "; Born in: " + users[users.length - 1].dateOfBirth + ";" )
                }
                // Output if input while adding new user is wrong
                else if ( state.bIsExecutedRight === false ) {
                    return formalOutput( "Please, write name, surname, date of birth of user" )
                }
                break
            case CurrentButton.Remove:
                // Show detailed output with info of removed user if input is right
                if ( state.bIsSbmtClicked === true && state.bIsExecutedRight === true ) {
                    return formalOutput( "Removed user: Full Name: " + state.removedUser[0].name + " " + state.removedUser[0].surname + "; Born in: " + state.removedUser[0].dateOfBirth + ";" )
                }
                // Output if input while removing user is wrong
                else if ( state.bIsExecutedRight === false ) {
                    return formalOutput( "Please, write the existing id of user" )
                }
                break
            case CurrentButton.ShowAll:
                return HiddenDiv( clickedBtn, users, state.bIsSbmtClicked, Table( TheadName( "Name" ), TheadName( "Id" ), TheadName( "Date of birth" ), Tbody( users, users ) ) )
        }
    }
    )( state )
    // Final Html output
    const content: Array<string> = [topButtonsRow, inputField, switchOutput]
    return DivWithClass( "containner",
        DivWithClass( "row",
            DivWithClass( "center-align",
                H1( "User Library" ),
                SizeDiv( DivOffset.col8, content.join( "" ) ) ) ) )
}

// Input field with submit button
export const InputSubmitElems = ( Inputplaceholder: string, clickedBtn: CurrentButton ) =>
    DivWithClass( "row", SizeDiv( DivOffset.col4, `<input id="inputField" placeholder="${Inputplaceholder}" style="display:"> ` ), DivInputBtn( SubmBtn( clickedBtn ) ) )

// Table element structure
export const Table = ( ...tHeadNames: Array<string> ) => TableElem( Thead( tHeadNames.join( "" ) ) )