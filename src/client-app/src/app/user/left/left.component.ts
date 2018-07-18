import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { Router } from '@angular/router';
import { LoginService } from '../../providers/login.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  dataUser: any;
  constructor(private _getprofile: GetprofileService, public router: Router, private _login: LoginService ) { }

  ngOnInit() {
    this._getprofile.getProfile().then(data => {
      this.dataUser = data;
    });
  }

  edit() {
    this._getprofile.setDisable(true);
  }

  signout() {
    localStorage.clear();
    this._login.setIsLogin(false);
    this.router.navigate(['/login']);
  }

}
