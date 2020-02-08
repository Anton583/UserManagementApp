import { getResultField, makeP, } from './utilities'
import { User, getUsersByIDs, findUsersByName, getUserId as getUserIDs, addUser } from './db/user'

type UserArray = Array<User>

export const searchCard = (queryText: string, users: UserArray) => {
    const searchResult: [number, User][] = getUsersByIDs(findUsersByName(queryText, users), users)
    for (const [userID, user] of searchResult)
        getResultField().innerHTML += makeP("ID: " + userID + " | " + user.asString())
}

export const removeCard = (queryText: string, users: UserArray) => {
    const input: string = queryText.split(" ")[0]
    const userId: number = parseFloat(input)
    if (typeof (userId) !== "number" || userId >= users.length)
        getResultField().innerHTML = "Please, write the existing Id of user!"
    else {
        users.splice(userId, 1)
        const removeUser = getUsersByIDs(getUserIDs(users), users)
        for (const [otherIds, user] of removeUser) {
            getResultField().innerHTML += makeP("ID: " + otherIds + " | " + user.asString())

        }
    }
}


export const addCard = (queryText: string, users: UserArray) => {
    const newName: string = queryText.split(" ")[0]
    const newYearOfBirth: number = parseFloat(queryText.split(" ")[1])
    const input = newName + " " + newYearOfBirth
    if (queryText !== input) {
        getResultField().innerHTML = "Please, write name, space bar, year of birth!"
        return
    }
    const newUser: number = addUser(newName, newYearOfBirth, users)
    const resOutput = getUsersByIDs([newUser], users)

    for (const [userID, user] of resOutput)
        if (queryText === input || typeof (parseFloat(newName)) === "number")
            getResultField().innerHTML += makeP("ID: " + userID + " | " +
                user.asString())
}