import { User } from './user'

const users: Array<User> = [
    new User("Petr", 2002).setSurname("Vlasov").updateDurovVisits(6),
    new User("Stas", 1951).setSurname("Petrov").updateDurovVisits(2),
    new User("Slava", 1984).setSurname("Vlavla")
]

export default users;