import { DivsStructure } from "../utils/HtmlStructures"
import { $, render, toLCaseDoesInclude, toArr } from "./variables/functions"


// Enum with members representing buttons on the top of the app
export enum CurrentButton {
    Search,
    Add,
    Remove,
    ShowAll
}
// User class
export class User {
    name: string
    surname: string
    dateOfBirth: number

    constructor( name: string, surname: string, dateOfBirth: number ) {
        this.name = name
        this.surname = surname
        this.dateOfBirth = dateOfBirth
    }

}
// State class
export class UserAppState {
    // Current button type
    btnState: CurrentButton
    // Array of found users
    foundUsers: Array<User> = []
    // Check if submit button clicked
    bIsSbmtClicked: boolean = false
    // Check if user's input is right
    bIsExecutedRight: boolean
    // Array of users
    users: Array<User> = []
    // Removed user info to return as output when user is removed 
    removedUser: Array<User> = []
    // TODO here (constructor, function bodies etc)
    constructor( selectedButton: CurrentButton ) {
        this.btnState = selectedButton
    }
    // Add new User to array
    addUser( name: string, surname: string, dateOfBirth: number ) {
        this.users.push( new User( name, surname, dateOfBirth ) )
        return this.users
    }
    // Put eaither found users array either users array to render body 
    switchBetweenUsersCollections( clickedBtn: CurrentButton ) {
        if ( clickedBtn === CurrentButton.Search && this.bIsSbmtClicked === true )
            return this.foundUsers
        else {
            return this.users
        }
    }
}
const updateState = ( state: UserAppState ) => {
    // The html structure of the app
    const body =
        DivsStructure( state )
    // Put body into the main div
    render( body )
    // Get buttons on the top of the app
    const getUpperBtns = () => {
        const btns: Array<HTMLElement> = toArr( document.getElementsByTagName( "a" ) )
        btns.splice( 4, 1 )
        return btns
    }

    // Get submit button
    const sbmtBtn: HTMLElement = toArr( document.getElementsByTagName( "a" ) )[4]

    // Get input field
    const inputField: HTMLInputElement = $( "inputField" ) as HTMLInputElement

    // Set "CurrentButton" enum members functionality 
    switch ( state.btnState ) {
        case ( CurrentButton.Search ): {
            sbmtBtn.onclick = ( e ) => {
                // Clear found users when searching again to show new relevant output
                state.foundUsers = []
                // Show that submit button was clicked 
                state.bIsSbmtClicked = true
                for ( const user of state.users ) {
                    if ( toLCaseDoesInclude( user.name, inputField.value ) || toLCaseDoesInclude( user.surname, inputField.value ) || toLCaseDoesInclude( user.name + " " + user.surname, inputField.value ) )
                        // If any users found, put their info into foundUsers array
                        state.foundUsers.push( user )
                }
                // Update state to show output according to last changes
                updateState( state )
            }
            break
        }
        case ( CurrentButton.Add ): {
            // Set new on click function for the "Submit" button
            sbmtBtn.onclick = ( e ) => {
                // Show that submit button was clicked 
                state.bIsSbmtClicked = true
                // Extract user info from input
                const inputValue: Array<string> = inputField.value.split( " " )
                const name: string = inputValue[0]
                const surname: string = inputValue[1]
                const dateOfBirth: number = parseInt( inputValue[2] )
                // Set input order to check if input is relevant
                const expInput: string = name + " " + surname + " " + dateOfBirth
                // Check if the order of input is right and name or surname are not numbers 
                if ( inputField.value === expInput && isNaN( parseInt( name ) ) === true && isNaN( parseInt( surname ) ) === true ) {
                    // Show that input is right
                    state.bIsExecutedRight = true
                    state.addUser( name, surname, dateOfBirth )
                } else {
                    // Show that input is wrong
                    state.bIsExecutedRight = false
                }
                // Update state to show output according to last changes
                updateState( state )
            }
            break
        }
        case ( CurrentButton.Remove ): {
            sbmtBtn.onclick = ( e: MouseEvent ) => {
                // Show that submit button was clicked 
                state.bIsSbmtClicked = true
                // Clear removed user when deleting again to show new relevant output
                state.removedUser = []
                // Set input order to check if input is relevant
                const expInput: number = parseFloat( inputField.value )
                if ( state.users[expInput] ) {
                    // Show that input is right
                    state.bIsExecutedRight = true
                    // Save removed user info to show relevant output
                    const removedUser: User = state.users.splice( expInput, 1 )[0]
                    state.removedUser.push( removedUser )
                } else {
                    // Show that input is wrong
                    state.bIsExecutedRight = false
                }
                // Update state to show output according to last changes
                updateState( state )
            }
            break
        }
        case ( CurrentButton.ShowAll ): {
            // Just show table with users
            render( body )
            break
        } default:
            console.warn( "Chegoo?" )
    }


    // Set update of state on buttons
    for ( const btn of getUpperBtns() ) {
        btn.onclick = ( e ) => {
            const clickedBtn = e.target as HTMLElement
            // If clicked Search bbutton
            if ( getUpperBtns().indexOf( clickedBtn ) === 0 ) {
                state.btnState = CurrentButton.Search
                const newObj = new UserAppState( state.btnState )
                newObj.users = [...state.users]
                updateState( newObj )
            }
            // if clicked Add button
            else if ( getUpperBtns().indexOf( clickedBtn ) === 1 ) {
                state.btnState = CurrentButton.Add
                const newObj = new UserAppState( state.btnState )
                newObj.users = [...state.users]
                updateState( newObj )
            }
            // if clicked Remove button
            else if ( getUpperBtns().indexOf( clickedBtn ) === 2 ) {
                state.btnState = CurrentButton.Remove
                const newObj = new UserAppState( state.btnState )
                newObj.users = [...state.users]
                updateState( newObj )
            }
            // if clicked Show All button
            else if ( getUpperBtns().indexOf( clickedBtn ) === 3 ) {
                state.btnState = CurrentButton.ShowAll
                const newObj = new UserAppState( state.btnState )
                newObj.users = [...state.users]
                updateState( newObj )
            }
        }
    }

}

// This is the app state that will be updated in the updateState() when we need to change something.
let state = new UserAppState( CurrentButton.Search )
state.addUser( "Petr", "Stalinov", 1998 )
state.addUser( "Slava", "Petrov", 2002 )
state.addUser( "Anton", "Codit", 2003 )

updateState( state )
