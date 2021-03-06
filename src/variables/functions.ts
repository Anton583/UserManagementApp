// Fast way to get element by ID
export const $ = ( id: string ) => document.getElementById( id )
// Puts all html code into main div
export const render = ( html: string ) => {
    const MainDiv = $( "app" ) as HTMLElement
    MainDiv.innerHTML = html
}
// Check if string in lower case includes another string in lower case
export const toLCaseDoesInclude = ( data: string, equalTo: string ) => {
    if ( equalTo.length === 0 )
        return false
    return data.toLowerCase().includes( equalTo.toLowerCase() )
}


// HTMLCollectionOf<Element> => Array<Element>
export function toArr( setOfElems: HTMLCollectionOf<Element> ) {
    const arr = []
    for ( let index = 0; index < setOfElems.length; index = index + 1 )
        arr.push( setOfElems[index] )
    return arr
}

