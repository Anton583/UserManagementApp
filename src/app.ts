import { getInputField, clearPage, bindButtons, fillUsersTable, $, ButtonType, setSubmitButtonVisibility } from "./utilities"
import { buttonBindings } from './bindings'
import users from './db/userStorage'
import { User } from './db/user'

const lCaseIncludes = (input: string, data: string) => input.toLowerCase().includes(data)

// If for whatever reason we should not have results, or we don't have enough data - returns empty array
const filterOutUsers = ([inName, inSurname]: [string, string]): Array<User> =>
    // Return empty array whenever we should not be doing the search, or there is no data
    ($("submitBtn").innerHTML !== "Search") || (inName.length < 1)
        ? []
        : users.filter(({ name, surname }) => inSurname
            // Do boolean join differently depending on whether we have a surname or not
            ? lCaseIncludes(name, inName) && lCaseIncludes(surname, inSurname)
            : lCaseIncludes(name, inName) || lCaseIncludes(surname, inName))

const bindInputField = () =>
    getInputField().oninput = ({ target }) => {
        // Extract and lowercase our value
        const inputWords = (target as HTMLInputElement)
            .value
            .toLowerCase()
            .split(" ", 2) as [string, string]
        if ($("submitBtn").innerHTML !== "Search") {
            setSubmitButtonVisibility(inputWords[0].length > 0)

            return
        }
        // Filter out the users based on the words
        const fittingUsers = filterOutUsers(inputWords)

        // Fill a table with users, could be empty
        // fill func handles the empty case.
        fillUsersTable(fittingUsers)
    }

(() => {
    clearPage()
    bindButtons(buttonBindings)
    $("searchBtn").removeAttribute("style")

    bindInputField()
})()