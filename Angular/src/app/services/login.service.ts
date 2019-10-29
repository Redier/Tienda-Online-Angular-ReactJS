import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx"

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(){
    return this.http.get(/*"https://tiendaenlinea-bea91.firebaseio.com/users/.json"*/
                          "https://tiendaonline-33689.firebaseio.com/Usuarios/.json")
      .map((res: Response) => res.json());
  }
}
