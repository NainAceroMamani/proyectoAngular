export class Usuario {

    constructor(
        public name: string,
        public email: string,
        public password: string,
        // tslint:disable-next-line: variable-name
        public sur_name?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) {}
}
