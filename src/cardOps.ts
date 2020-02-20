import { getResultField, makeP, fillUsersTable, getInputField, fillUsersTableWithRightId, fillUsersTableWithCustomUserArr } from './utilities'
import { User, addUser } from './db/user'

type UserArray = Array<User>

// If users are found, shows them with the click as table rows
export const searchCard = (queryText: string, users: UserArray) => {
    const userArr: User[] = []
    document.getElementById("hiddenDiv").style.display = "block"
    for (const user of users) {
        const possibleInpToLC = (queryText).toLowerCase()
        const devidedInp = possibleInpToLC.split(" ")
        const possName = devidedInp[0]
        const possSurname = devidedInp[1]
        const nameToLC = user.name.toLowerCase()
        const surnameToLC = user.surname.toLowerCase()
        if (nameToLC.includes(queryText.toLowerCase()) === true ||
            surnameToLC.includes(queryText.toLowerCase()) === true ||
            (nameToLC + " " + surnameToLC).includes(possName + " " + possSurname) === true) {
            userArr.push(user)
            fillUsersTableWithCustomUserArr(userArr, users)
        }
    }
    if (userArr.length === 0) {
        document.getElementById("hiddenDiv").style.display = "none"
        getResultField().innerHTML = "No Users found!"
    }
}

// Removes user by id, shows users left as table rows, writes down the removed user info under the table 
export const removeCard = (queryText: string, users: UserArray) => {
    const input: string = queryText.split(" ")[0]
    const userId: number = parseFloat(input)
    document.getElementById("hiddenDiv").style.display = "block"
    if (typeof (userId) === "number" && userId < users.length) {
        const removed = users.splice(userId, 1)
        fillUsersTable(users)
        getResultField().innerHTML = makeP("Removed: ID: " + userId + " | " + removed[0].asString())
        if (users.length === 0) {
            document.getElementById("hiddenDiv").style.display = "none"
            getResultField().innerHTML = "No users left!"
        }
    } else {
        getResultField().innerHTML = "Please, write the existing Id of user!"
        document.getElementById("hiddenDiv").style.display = "none"
    }
}

// Adds user by input (name + " " + date of birth), shows the added user info as table row 
export const addCard = (queryText: string, users: UserArray) => {
    const userArr: User[] = []
    const newName: string = queryText.split(" ")[0]
    const newYearOfBirth: number = parseFloat(queryText.split(" ")[1])
    const input = newName + " " + newYearOfBirth
    if (queryText !== input) {
        document.getElementById("hiddenDiv").style.display = "none"
        getResultField().innerHTML = "Please, write name, space bar, year of birth!"
        return
    }
    document.getElementById("hiddenDiv").style.display = "block"
    const newUser = addUser(newName, newYearOfBirth, users)
    userArr.push(users[newUser])
    fillUsersTableWithRightId(newUser, userArr)
}
