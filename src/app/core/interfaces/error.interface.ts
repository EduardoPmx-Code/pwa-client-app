export interface LoginErrorResponse {
    message: string;
}
export class LoginResponse {
    constructor(public token: string) {}
}