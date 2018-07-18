
import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { QuanAnService } from '../providers/quan-an.service'
// import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs/Observer';
import { Title } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapAgmComponent } from '../google-map-agm/google-map-agm.component'


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  tittle = 'hello';
  // mapProp;
  quanAn: any = {};
  map: google.maps.Map;
  locationUser: google.maps.Marker;
  setCenter: google.maps.Circle;
  constructor(
    private _quanAnService: QuanAnService,
  ) {

  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.ngLocationUser(position.coords.latitude, position.coords.longitude);
      });
    }
    else {
      alert("Trình duyệt này không hỗ trợ");
    }
  }




  ngLocationUser(latitude, longitude) {
    var mapProp = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.locationUser = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map
    });


  }


    ngGetCenter()
    {
      var lat = this.setCenter.getCenter();
      console.log(lat);
    }

  }

