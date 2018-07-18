import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MyDialogComponent} from '../../content/my-dialog/my-dialog.component';
import { QuanAnService } from '../../providers/quan-an.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';

@Component({
  selector: 'app-quanan',
  templateUrl: './quanan.component.html',
  styleUrls: ['./quanan.component.scss']
})
export class QuananComponent implements OnInit {
  quanAn: any = {};
  party: any = {};
  constructor(public dialog: MatDialog, private _quananService: QuanAnService) {
  }

  ngOnInit() {
    this._quananService.getDataQuan();
    this._quananService.getAllQuan.subscribe(data => {
      this.quanAn = data;
      return this.quanAn;
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      width: '600px',
    });
  }


  openJoinDialog(idQuanAn) {
    this._quananService.shareIdQuanAn(idQuanAn); //gọi service shareIdQuanAn và gửi id của quán
    console.log(idQuanAn);
      let dialogRef = this.dialog.open(JoinDialogComponent, {
        width: '600px',
      });
    }
  }





