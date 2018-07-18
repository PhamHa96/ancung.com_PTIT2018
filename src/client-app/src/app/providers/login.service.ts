import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  private _isLogin = new BehaviorSubject<Boolean>(false); // check menu

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(email, password) {
     // console.log(email, password);
      return this.http.post('http://localhost:8081/auth/login', {
      Email: email,
      Password: password
    }, {responseType: 'text'});
      // .subscribe(res => {
      //     console.log(res);
      //     console.log('successfully login');
      //     this.isLogin = true;
      //   },
      //   err => {
      //     console.log(err.message);
      //     console.log('Error occured');
      //   }
      // );
  }

  loginSocial(body) {
    return this.http.post('http://localhost:8081/users/', body, {responseType: 'text'});
  }

  findUserByEmail(email) {
    return this.http.get(`http://localhost:8081/users/finduser/${email}`, {responseType: 'text'});
  }

  get IsLogin () {
    return this._isLogin.asObservable();
  }

  public setIsLogin(newValue: boolean) {
    this._isLogin.next(newValue);
  }

  getToken(token) {
    return this.http.post('http://localhost:8081/auth/gettoken', token, { responseType: 'text'} );
  }

  setTokenSocial(email) {
    return this.http.post('http://localhost:8081/auth/settokensocial', {'Email': email}, { responseType: 'text'});
  }

}
