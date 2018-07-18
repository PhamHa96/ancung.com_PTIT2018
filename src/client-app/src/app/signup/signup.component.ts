import { Component, OnInit } from '@angular/core';
import { SignupService } from '../providers/signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _signup: SignupService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  signUp(fistName, lastName, email, password, confirmPassword, sex) {
    // console.log(fistName, lastName, email, password, confirmPassword, sex);
    if (password === confirmPassword) {
      this._signup.signUp(fistName, lastName, email, password, sex).subscribe(res => {
        // thanh cong
        this.toastr.success('Sign up succsessfully');
      }, err => {
        console.log('error sign in');
        this.toastr.error('Error to sign in, please check your infomation');
      });
    } else {
      this.toastr.error('Password is not same');
    }
  }

}
