import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SignupService {

  constructor(private http: HttpClient) { }

  signUp(fistName, lastName, email, password, sex) {
    // console.log(fistName + lastName);
    const name = fistName + lastName;
    return this.http.post('http://localhost:8081/users/', {
      Name: name,
      Email: email,
      Password: password,
      Sex: sex
    }, {responseType: 'text'});
  }

}
