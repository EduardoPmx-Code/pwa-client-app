import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user.model';

import { ApiService } from './api.service';
import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);

  user:any;

  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  token = '';

  constructor(
    private apiService: ApiService,
    private sessionService: SessionService,
    private router:Router,
  ) { this.loadToken(); }
  static jwtDecode(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

    loadToken() {
      const token = SessionService.getToken();
      if (token) {
        this.isAuthenticated.next(true);
      } else {
        this.isAuthenticated.next(false);
      }
    }
  
    checkTokenExp(): void {
      const token = SessionService.getToken();
      if (token !== '') {
        const now = Math.trunc(new Date().getTime() / 1000);
        const decodedToken:any = jwt_decode(token);
        if (now > decodedToken.exp) {
          this.purgeAuth();
        }
      } else {
        this.purgeAuth();
      }
    }
  
    setAuth(user: User) {
      // Save JWT sent from server in storage
      this.updateAuthData(user);/// //here
    }
  
    updateAuthData(user: User) {
      // Save user data from server in localstorage
      SessionService.saveUser(user);
      // Set current user data into observable
      this.currentUserSubject.next(user);
      // Set isAuthenticated to true
      this.isAuthenticated.next(true);
    }
  
    purgeAuth() {
      // Remove JWT from storage
      SessionService.destroyToken();
      SessionService.destroyUser();
      // Set current user to an empty object
      this.currentUserSubject.next({} as User);
      // Set auth status to false
      this.isAuthenticated.next(false);
      this.router.navigate(['/']);
    }
  
    getCurrentUser(): User {
      if (!this.currentUserSubject.value.token) {      
        const user = SessionService.getUser();    
        this.currentUserSubject.next(user);
      }
      return this.currentUserSubject.value;
    }
    logger(credentials:any):Observable<any> {
      return this.apiService.post("/auth/login", credentials).pipe(
        map((data) => {
          SessionService.saveToken(data.token);
          const decodedToken = UserService.jwtDecode(data.token);
          const response = {
            token: data.token,
            decodedToken,
            user:data.user,
          };
          if(response.user.seller === true){
            this.purgeAuth()
            return null
          }else{
            return response;
          }
        })
      );
    }
    attemptAuth(user:any):Observable<any> {
      
      const id = user._id? user._id : '';
        return this.getUserById(id)
        .pipe(
          map((data) => {
            this.setAuth({ ...user, ...data });
            return user;
          }),
        );  
    }
    getUserById(id: string): Observable<User> {
      return this.apiService.get(`/auth/info/${id}`);
    }

    registerUser(body:any): Observable<any>{
      return this.apiService.post("/auth/register",body)
    }

    recoveryPassword(body:any): Observable<any>{
      return this.apiService.post("/auth/forgot-password",body)
    }
    resetPassword(body:any): Observable<any>{
      return this.apiService.post("/auth/reset-password",body)
    }
}
