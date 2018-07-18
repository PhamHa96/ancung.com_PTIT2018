import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { NgForm  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataUser: any[];

  constructor(private _getprofile: GetprofileService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this._getprofile.getProfile().then(data => {
      this.dataUser = data;
    });
  }

}
