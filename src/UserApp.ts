import { DivsStructure } from "../utils/HtmlStructures"
import { $, render, toLCaseIncludes, toArr } from "./variables/functions"


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
class UserAppState {
    // Current button type
    btnState: CurrentButton
    // Array of found users
    foundUsers: Array<User> = []
    // Check if submit button clicked
    ifSbmtClicked: boolean = false
    // Check if user's input is right
    ifExecutedRight: boolean
    // Array of users
    users: Array<User> = []
    // Removed users
    removedUser = []
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
    changeUsers( clickedBtn: CurrentButton ) {
        if ( clickedBtn === CurrentButton.Search && this.ifSbmtClicked === true )
            return this.foundUsers
        else return this.users
    }
}




const updateState = ( state: UserAppState ) => {
    // The html structure of the app
    let body =
        DivsStructure( state.btnState, state.changeUsers( state.btnState ), state.removedUser, state.ifSbmtClicked, state.ifExecutedRight )
    // Put body into the main div
    render( body )

    // Get buttons on the top of the app
    const upperBtns = () => {
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
                state.foundUsers = []
                state.ifSbmtClicked = true
                for ( const user of state.users ) {
                    if ( toLCaseIncludes( user.name, inputField.value ) || toLCaseIncludes( user.surname, inputField.value ) || toLCaseIncludes( user.name + " " + user.surname, inputField.value ) )
                        state.foundUsers.push( user )
                }
                updateState( state )
            }
            break
        }
        case ( CurrentButton.Add ): {
            // Set new on click function for the "Submit" button
            sbmtBtn.onclick = ( e ) => {
                state.ifSbmtClicked = true
                const inputValue: Array<string> = inputField.value.split( " " )
                const name: string = inputValue[0]
                const surname: string = inputValue[1]
                const dateOfBirth: number = parseInt( inputValue[2] )
                const expInput: string = name + " " + surname + " " + dateOfBirth
                if ( inputField.value === expInput ) {
                    state.ifExecutedRight = true
                    state.addUser( name, surname, dateOfBirth )
                    console.log( surname )
                } else state.ifExecutedRight = false
                updateState( state )
            }
            break
        }
        case ( CurrentButton.Remove ): {
            sbmtBtn.onclick = ( e: MouseEvent ) => {
                state.ifSbmtClicked = true
                state.removedUser = []
                const expInput: number = parseFloat( inputField.value )
                if ( state.users[expInput] ) {
                    state.ifExecutedRight = true
                    const removedUser: User = state.users.splice( expInput, 1 )[0]
                    state.removedUser.push( removedUser )
                    console.log( state.removedUser[0].name )
                } else state.ifExecutedRight = false
                updateState( state )
            }
            break
        }
        case ( CurrentButton.ShowAll ): {
            render( body )
            break
        } default:
            console.warn( "Chegoo?" )
    }


    // Set update of state on buttons
    for ( const btn of upperBtns() ) {
        btn.onclick = ( e ) => {
            const clickedBtn = e.target as HTMLElement
            if ( upperBtns().indexOf( clickedBtn ) === 0 ) {
                state.btnState = CurrentButton.Search
                const newObj = new UserAppState( state.btnState )
                newObj.users = [...state.users]
                updateState( newObj )
            }
            if ( upperBtns().indexOf( clickedBtn ) === 1 ) {
                state.btnState = CurrentButton.Add
                const newObj = new UserAppState( state.btnState )
                newObj.users = [...state.users]
                updateState( newObj )
            }
            if ( upperBtns().indexOf( clickedBtn ) === 2 ) {
                state.btnState = CurrentButton.Remove
                const newObj = new UserAppState( state.btnState )
                newObj.users = [...state.users]
                updateState( newObj )
            }
            if ( upperBtns().indexOf( clickedBtn ) === 3 ) {
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
