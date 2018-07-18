import { Component, OnInit } from '@angular/core';
import { TypeFoodService } from '../providers/type-food.service'


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  typeFood: any ={};
  constructor(
    private _typeFood: TypeFoodService
  ) { }

  ngOnInit() {
    this.ngGetTypeFood();
  }

  ngGetTypeFood(){
    this._typeFood.getDataTypeFood();
    this._typeFood.getAllType.subscribe(data =>{
      this.typeFood = data;
      return this.typeFood;
    });
  }


}
