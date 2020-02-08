import { User, findUsersByName, getUsersByIDs, addUser, getUserId as getUserIDs } from "./db/user"
import { getButtonByType, ButtonType, getInputField, getResultField, makeP, clearPage, setSubmitButtonVisibility, OnClickFn, bindButtons } from "./utilities"
import { buttonBindings } from './bindings'


const bindInputField = () =>
    getInputField().oninput = (ev: InputEvent) => {
        const newInputValue = (ev.target as HTMLInputElement).value

        if (newInputValue.length < 1)
            setSubmitButtonVisibility(false)
        else
            setSubmitButtonVisibility(true)
    }

(() => {
    clearPage()
    bindButtons(buttonBindings)
    document.getElementById("searchBtn").removeAttribute("style")

    bindInputField()

    // fillUsersTable(users)
})()


// DZ:
// Try to center out the input and result fields DONE
// Extra: input & result fields should be centered out both when SUBMIT button is visible and not DONE
// Selected activity (Search/Add/Remove/Show All) button should be highlighted in some other color DONE
// (HINT: add/remove color class https://materializecss.com/color.html) DONE
// Add "Remove button" functionality DONE
//  In the input field, user can write the ID of the user to delete DONE
//  This deletes the user by ID from DB (if user is found, otherwise display error message) DONE
//  and prints all remaining users in the result field DONE
// Create a 4th button: "Show All" users. DONE
//  If you click it, the input field is gone, and only resultField is visible, where you can see all the users DONE
// Move user output formatting to table (https://materializecss.com/table.html) DONE