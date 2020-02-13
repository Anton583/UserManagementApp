import { getResultField, makeP, fillUsersTable, getInputField } from './utilities'
import { User, getUsersByIDs, findUsersByName, getUserId as getUserIDs, addUser, } from './db/user'

type UserArray = Array<User>

export const searchCard = (queryText: string, users: UserArray) => {
    const userArr: User[] = []
    document.getElementById("hiddenDiv").style.display = "block"
    for (const user of users)
        if (user.name.toLowerCase().includes(queryText) || user.surname.toLowerCase().includes(queryText) === true) {
            userArr.push(user)
            fillUsersTable(userArr)
        } if (userArr.length === 0)
        getResultField().innerHTML = "No Users found!"
}

export const removeCard = (queryText: string, users: UserArray) => {
    const input: string = queryText.split(" ")[0]
    const userId: number = parseFloat(input)
    document.getElementById("hiddenDiv").style.display = "block"
    if (typeof (userId) === "number" && userId < users.length) {
        const removed = users.splice(userId, 1)
        fillUsersTable(users)
        getResultField().innerHTML = makeP("Removed: ID: " + userId + " | " + removed[0].asString())
        if (users.length === 0)
            document.getElementById("hiddenDiv").style.display = "none"
    }
    else {
        getResultField().innerHTML = "Please, write the existing Id of user!"
        document.getElementById("hiddenDiv").style.display = "none"
    }
}

export const addCard = (queryText: string, users: UserArray) => {
    const newName: string = queryText.split(" ")[0]
    const newYearOfBirth: number = parseFloat(queryText.split(" ")[1])
    const input = newName + " " + newYearOfBirth
    if (queryText !== input) {
        document.getElementById("hiddenDiv").style.display = "none"
        getResultField().innerHTML = "Please, write name, space bar, year of birth!"
        return
    }
    document.getElementById("hiddenDiv").style.display = "block"
    addUser(newName, newYearOfBirth, users)
    fillUsersTable(users)
}
