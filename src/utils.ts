import { $ } from "./variables/functions"
export const unimplemented = () => {
    throw new Error( "Trying to call unimplemented function! 😡" )
}
// Get query massage field
export const queryRes: HTMLElement = $( "queryResult" )
// Get submit button
export const sbmtBtn: HTMLElement = $( "submitBtn" )
// Get table body element
export const tBodyContent: HTMLElement = $( "tInfoB" )
// Get input field
export const inputField: HTMLInputElement = $( "inputField" ) as HTMLInputElement