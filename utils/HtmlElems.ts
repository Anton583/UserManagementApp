
// Simple level 1 heading
export const H1 = (content: string) => `<h1>${content}</h1>`

// Div with size of 8 colums
export const DivCol8OffSet = (...content: Array<string>) => `<div class="col s8 offset-s2">
    ${content.join("")}
</div>`

// Div with size of 4 colums
export const DivCol4OffSet = (...content: Array<string>) => `<div class="col s4 offset-s4">
${content.join("")}
</div>`

// Div with custom class
export const DivWithClass = (divClass: string, ...content: Array<string>) => `<div class=${divClass}>
            ${content.join("")}
</div>`

// Button with custom id and style
export const Btn = (id: string, style: string, content: string) => `<a id=${id} 
                                                                        class="waves-effect  waves-light btn" style=${style}>
                                                                        ${content}
                                                                    </a>`

// Submit button as html
export const SubmBtn = (id: string, content: string) => `<a id=${id} 
                                                            class="waves-effect  waves-light btn red">
                                                            ${content}
                                                        </a>`
// Space between elements 
export const Space = () => `<br>
                            <br>
                            <br>`

// Hidden by default div 
export const HiddenDiv = (...content: Array<string>) => `<div id="hiddenDiv" hidden>${content.join("")}</div>`

// Table
export const TableElem = (...content: Array<string>) => `<table id="UTable" 
class="responsive-table responsive-table col s4 offset-s4">
                                                    ${content.join("")}
                                                </table>`

// Head element of the table
export const Thead = (...content: Array<string>) => `<thead>
                                    <tr>
                                        ${content.join("")}
                                    </tr>
                                </thead>`

// Name the category of table
export const TheadName = (...content: Array<string>) => `<th class="col s3">${content}</th>`

// Table element with users information
export const Tbody = (...content: Array<string>) =>
    `<tbody id="tInfoB">${content.join("")}</tbody>`

// Fill table with users information
export const TbodyContent = (name: string, id: number, dateOfBirth: number) => `<tr>
    <td class="col s3">${name}</td>
    <td class="col s3">${id}</td>
    <td class="col s3">${dateOfBirth}</td>
</tr>`

// Output field 
export const QueryResult = (...content: Array<string>) => `<div id="queryResult" class="col s4 offset-s4">
                                                            ${content.join("")}   
                                                            </div>`

// Set output massage
export const QueryResultContent = (content: string) => `<p>${content}</p>`

// Set submit button lacation 
export const DivInputBtn = (...content: Array<string>) =>
    `<div class="col offset-6">
        ${content.join("")}
    </div>`

