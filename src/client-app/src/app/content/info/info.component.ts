import {Router, ActivatedRoute} from '@angular/router';
import {GoogleMapComponent} from '../../google-map/google-map.component'
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MyDialogComponent} from '../../content/my-dialog/my-dialog.component';
import { QuanAnService } from '../../providers/quan-an.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private active: ActivatedRoute) { }

  ngOnInit() { 
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
