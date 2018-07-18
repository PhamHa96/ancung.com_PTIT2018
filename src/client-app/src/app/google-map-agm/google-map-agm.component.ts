import { async } from '@angular/core/testing';
import { AgmCoreModule } from '@agm/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuanAnService } from '../providers/quan-an.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MyDialogComponent } from '../content/my-dialog/my-dialog.component';
import { JoinDialogComponent } from '../content/join-dialog/join-dialog.component';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-google-map-agm',
  templateUrl: './google-map-agm.component.html',
  styleUrls: ['./google-map-agm.component.scss']
})
export class GoogleMapAgmComponent implements OnInit {
  // lat: number;
  // lng: number;
  // zoom: number;
  // quanAn: any;
  // quanan: String;

  //   constructor(
  //     public dialog: MatDialog,
  //     private _quanAnService: QuanAnService,
  //   ) { }

  //   async ngOnInit() {
  //     try {
  //       let dataMap: any;
  //       await this.getQuanAn();
  //       dataMap = await this.ngGetUserLocation();
  //       console.log(dataMap);
  //       // do {
  //       //    dataMap = await this.ngGetUserLocation();
  //       // }while (!dataMap);
  //       console.log('k loi');
  //     } catch (err) {
  //       throw err;
  //     }

  //   }

  // private ngGetUserLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //     //  this.lat = position.coords.latitude || 10.91601859333259;
  //     //  this.lng = position.coords.longitude || 106.71650704288322;
  //      this.lat =  106.71650704288322;
  //      this.lng =  10.91601859333259;
  //    });
  //  }
  //  this.zoom = 15;
  //  console.log(this.lat);
  //  console.log(this.lng);
  //  const result = {
  //   lat: this.lat,
  //   lng: this.lng,
  //   zoom: this.zoom
  //   };
  //   return result;
  // }


  // getQuanAn() {
  //   this._quanAnService.getDataQuan();
  //   this._quanAnService.getAllQuan.subscribe((data) => {
  //     this.quanAn = data;
  //     console.log(data);
  //     return this.quanAn;
  //   });
  // }

  // openDialog() {
  //   const dialogRef = this.dialog.open(MyDialogComponent, {
  //     width: '600px',
  //   });
  // }


  // openJoinDialog(idQuanAn) {
  //   this._quanAnService.shareIdQuanAn(idQuanAn); // gọi service shareIdQuanAn và gửi id của quán
  //   console.log(idQuanAn);
  //     const dialogRef = this.dialog.open(JoinDialogComponent, {
  //       width: '600px',
  //     });
  //   }
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
// GET MYLOCATION
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
