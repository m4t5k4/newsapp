export class User {
    constructor(
        public userID: number,
        public roleID: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public username: string,
        public password: string,
        public token: string) {

    }
}
