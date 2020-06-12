import { DivCol4OffSet, DivCol8OffSet, Tbody, DivWithClass, H1, DivInputBtn, TableElem, SubmBtn, Thead, QueryResult, QueryResultContent, TheadName, HiddenDiv, AddBtn, RemoveBtn, SearchBtn, ShowAllBtn, Space } from "./HtmlElems"
import { CurrentButton, User, UserAppState } from "../src/UserApp"




// The structure of divs in the app
export const DivsStructure = ( state: UserAppState ) => {
    let clickedBtn: CurrentButton = state.btnState
    let users: Array<User> = state.switchBetweenUsersCollections( state.btnState )
    const formalOutput = ( content: string ) => QueryResult( QueryResultContent( content ) )

    const standardStrctr: string = ( SearchBtn( clickedBtn ) + " " + AddBtn( clickedBtn ) + " " + RemoveBtn( clickedBtn ) + " " + ShowAllBtn( clickedBtn ) + Space() )

    const inputField = ( state ) => {
        if ( state.btnState === CurrentButton.ShowAll )
            return ""
        else {
            return InputSubmitElems( "Put your input here, please", clickedBtn )
        }
    }
    // According to current state decide what output to show
    const SwitchOutput = ( state ) => {
        if ( clickedBtn === CurrentButton.Search && state.bIsSbmtClicked === true && users.length > 0 || clickedBtn === CurrentButton.ShowAll )
            return HiddenDiv( clickedBtn, users, state.bIsSbmtClicked, Table( TheadName( "Name" ), TheadName( "Id" ), TheadName( "Date of birth" ), Tbody( users ) ) )
        else if ( clickedBtn === CurrentButton.Search && state.bIsSbmtClicked === true && users.length === 0 ) {
            return formalOutput( "No users found!" )
        }
        if ( clickedBtn === CurrentButton.Add && state.bIsSbmtClicked === true && state.bIsExecutedRight === true ) {
            return formalOutput( "Added user: ID: " + users.indexOf( users[users.length - 1] ) + "; Full Name: " + users[users.length - 1].name + " " + users[users.length - 1].surname + "; Born in: " + users[users.length - 1].dateOfBirth + ";" )
        }
        else if ( clickedBtn === CurrentButton.Add && state.bIsExecutedRight === false ) {
            return formalOutput( "Please, write name, surname, date of birth of user" )
        }
        if ( clickedBtn === CurrentButton.Remove && state.bIsSbmtClicked === true && state.bIsExecutedRight === true ) {
            return formalOutput( "Removed user: Full Name: " + state.removedUser[0].name + " " + state.removedUser[0].surname + "; Born in: " + state.removedUser[0].dateOfBirth + ";" )
        }
        else if ( clickedBtn === CurrentButton.Remove && state.bIsExecutedRight === false ) {
            return formalOutput( "Please, write the existing id of user" )
        }
    }

    let content: Array<string> = [standardStrctr, inputField( state ), SwitchOutput( state )]

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