import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ItypeFood } from '../models/ITypeFood'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TypeFoodService {
  private _dataTypeFood: BehaviorSubject<ItypeFood[]> = new BehaviorSubject(new Array());
  private urlGetTypeFood = 'http://localhost:8081/type'
  constructor(
    private http: Http
  ) { }

get getAllType(){
  return this._dataTypeFood.asObservable();
}

getDataTypeFood(): Promise<any> {
  return this.http.get(this.urlGetTypeFood).toPromise().then(response => {
    this._dataTypeFood.next(response.json());
    return response.json();
  }).catch(err => console.log('loi lay url get'));
}


}
