import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';


@Injectable({
  providedIn: 'root',
})
export class SessionService {
  static getToken(): string {
    return sessionStorage.getItem('clientToken') || '';
  }

  static saveToken(token: string) {
    sessionStorage.setItem('clientToken', token);
  }

  static destroyToken() {
    sessionStorage.removeItem('clientToken');
  }

  static getUser(): any {
    try {
      return JSON.parse(sessionStorage.getItem('clientUser') || '');
    } catch (error) {
      return null;
    }
  }

  static saveUser(user: User) {
    sessionStorage.setItem('clientUser', JSON.stringify(user));
  }

  static destroyUser() {
    sessionStorage.removeItem('clientUser');
  }
}
