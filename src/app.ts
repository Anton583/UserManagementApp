import { getInputField, clearPage, setSubmitButtonVisibility, bindButtons } from "./utilities"
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
