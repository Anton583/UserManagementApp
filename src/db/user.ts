class User {
    name: string
    surname: string = ""
    yearOfBirth: number
    pavelDurovVisits: number = 0

    constructor(name: string, yearOfBirth: number) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
    }

    asString(): string {
        return this.getUserName() + ", " + this.yearOfBirth + ", Pasha visited " + this.pavelDurovVisits + " times."
    }

    setSurname(surname: string) {
        this.surname = surname;
        return this;
    }
    updateDurovVisits(newVisits: number) {
        this.pavelDurovVisits = newVisits;
        return this;
    }

    getUserName() {
        return this.name
    }

    getUserFullname() {
        return this.name + " " + this.surname;
    }

    getUserAgeOfBirth() {
        return this.yearOfBirth
    }

    clone(clone: User): User {
        const clonedUser = new User(this.name, this.yearOfBirth).setSurname(
            this.surname
        );

        clonedUser.pavelDurovVisits = this.pavelDurovVisits;
        return clonedUser;
    }
}

// dz:
// - findUsersByAge (move to findUsers() form, just like finUsersByName)
// - Assuming today 2019, find all users in particular age range (16, 41)
// - Function to Add multiple users by their names and ages
//   (its  argument is array in form of [["name", 1985], ["name2", 1981]])
//   returns array of their IDs
// - Function which renames user with given id (arguments are: userID, newName)
// - Given an array of user IDs, return an array of users (with fitting IDs)
//   (getUsersByIDs)

// tsc *.ts --outFile output/app.js --strict


// User:
// Name
// Surname
// Year of birth
// Avatar link

// addUser :: (name, yearOfBirth) -> id
export const getUserId = (users: Array<User>) => {
    const ids: Array<number> = []
    for (let user of users) {
        ids.push(users.indexOf(user));
    }
    return ids
}

const addUser = (newName: string, newYearOfBirth: number, users: Array<User>) => {
    const newUser = new User(newName, newYearOfBirth);
    const newID = users.push(newUser) - 1;
    return newID;
};

type UserPredicate = (u: User) => boolean

// f = user => Bool

const findUsers = (users: Array<User>, f: UserPredicate) => {
    const userIDsWithMatchingName = [];
    for (let index = 0; index < users.length; index = index + 1) {
        const u: User = users[index]
        if (f(u)) {
            userIDsWithMatchingName.push(index);
        }
    }

    return userIDsWithMatchingName;
};


// UserID = number
// SearchedName = String
// findUsersByName :: SearchedName -> [UserID]

const findUsersByName = (searchedName: string, users: Array<User>) =>
    findUsers(users, user => {
        const userFullName = user.getUserFullname().toLowerCase();
        return userFullName.includes(searchedName.toLowerCase());
    });

// Age = number
// findUsersByAge :: Age -> [UserID]

const findUsersByAge = (minAge: number, maxAge: number, users: Array<User>) =>
    findUsers(users, user => {
        const userAge = 2019 - user.yearOfBirth;
        return (userAge >= minAge) && (userAge <= maxAge);
    });

// - Function to Add multiple users by their names and ages
//   (its  argument is array in form of [["name", 1985], ["name2", 1981]])
//   returns array of their IDs

const addUsers = (newUsers: Array<[string, number]>, users: Array<User>): Array<number> => {
    let ids: Array<number> = []
    for (const newUser of newUsers) {
        const id = addUser(newUser[0], newUser[1], users)
        ids.push(id)

    }
    return ids
}

function removeUserByID(userID: number, users: Array<User>) {
    const sliced = users.slice(userID, 1)
    return sliced
}



function renameUser(userID: number, newName: string, users: Array<User>) {
    const previousInfo = users[userID];
    previousInfo.name = newName;
    return users[userID];
}


// - Given an array of user IDs, return an array of users (with fitting IDs)
// (getUsersByIDs)

function getUsersByIDs(IDs: Array<number>, users: Array<User>): Array<[number, User]> {
    const finalArrayOfUsers: Array<[number, User]> = []
    for (const iD of IDs) {
        finalArrayOfUsers.push([iD, users[iD]])
    }
    return finalArrayOfUsers
}

function getUserNameById(ID: number, users: Array<User>) {
    const user = users[ID]
    return user.name
}

export function getUserNamesByIds(IDs: Array<number>, users: Array<User>) {
    const names: Array<string> = []

    for (const ID of IDs) {
        names.push(users[ID].name)
    }
    return names
}




export { User, findUsersByName, getUsersByIDs, addUser, getUserNameById, removeUserByID }