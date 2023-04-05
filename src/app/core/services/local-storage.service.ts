import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public static setItem(key: string, value: string):void {
    if (localStorage) localStorage.setItem(key, value);
  }

  public static getItem(key: string):string {
    return localStorage.getItem(key) || '';
  }

  public static setObject(key: string, object: any):void {
    if (localStorage) localStorage.setItem(key, JSON.stringify(object));
  }

  public static getObject(key: string):any {
    return JSON.parse(localStorage.getItem(key) || '');
  }
}
