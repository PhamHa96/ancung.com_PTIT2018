import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';

@Component({
  selector: 'app-listfriends',
  templateUrl: './listfriends.component.html',
  styleUrls: ['./listfriends.component.scss']
})
export class ListfriendsComponent implements OnInit {
  friendInfo: any[];
  constructor(private _getprofile: GetprofileService) { }

  ngOnInit() {
    this._getprofile.getFriend().then(data => {
      console.log(data);
      this.friendInfo = data;
    });
  }

}
