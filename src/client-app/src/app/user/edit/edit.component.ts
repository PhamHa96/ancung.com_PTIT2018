import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { NgForm  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  dataUser: any[];
  sex: boolean;
  userId: string;
  disable: Boolean = false; // false: hide, true: show

  selectedFile: File = null;

  constructor(private _getprofile: GetprofileService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();

    this._getprofile.Disable.subscribe(value => {
      this.disable = value;
    });
  }

  getProfile() {
    this._getprofile.getProfile().then(data => {
      console.log('data ----', data );
      this.dataUser = data;
      this.userId = data._id;
      this._getprofile.userId = data._id;
      if (data.Sex === 'male') {
        this.sex = true;
      } else {
        this.sex = false;
       }
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);

    const fd: any = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    const URL = 'http://localhost:8081/upload/' + this.userId;
    this.http.post(URL, fd).subscribe(res => {
      console.log(res);
    });
  }

  update(form: NgForm) {
    console.log(form.value);
    this._getprofile.update(this.userId, form.value).then(data => {
      this.toastr.success('Update Info succsessfully', '', { positionClass: 'toast-bottom-right' });
      this._getprofile.setDisable(false);
    });
  }

  cancel(form: NgForm) {
    this._getprofile.setDisable(false);
  }

}
