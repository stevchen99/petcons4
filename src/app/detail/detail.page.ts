import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Conso } from '../modele/conso';
import { Pet } from '../modele/pet';
import { ConsoService } from '../services/conso.service';
import { PetService } from '../services/pet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  private dateValue: any;
  ThePet : Pet[] = []
  Pet = {} as Pet
  edtCons : Conso
  LeConso : Conso = {Pet:this.Pet,food_id:0, food_label:'',food_mark:'', food_prix:0,date_achat:new Date}
  foodID : number

  constructor(private nav:NavController,
              private petsrv:PetService,
              private conssrv : ConsoService,
              private route: ActivatedRoute,
              private router : Router) {
// this.route.queryParams.subscribe(_p => {
//   const test = this.router.getCurrentNavigation().extras.state
//   console.log(test)
//   if(test) this.edtCons = test.Conso
//   console.log(this.edtCons.food_label)
this.route.queryParams.subscribe(params => {
  console.log(params)
  this.LeConso.Pet = params.Pet
  this.LeConso.food_label = params.food_label
  this.LeConso.food_mark = params.food_mark
  this.LeConso.food_prix = params.food_prix
  this.foodID = params.food_id
})
}

               

        

  ngOnInit() {
    this.getPet()
  }
  get date(): any {
    return this.dateValue;
  }
  set date(value: any) {
    console.log({ value });
    this.dateValue = value;
  }
  getPet()
  {
this.petsrv.getPet().subscribe(( temp : Pet[])=>{
  this.ThePet = temp
  console.log(temp)
});
  }

  goBack()
  {this.nav.pop()}

  goSave()
  {

    console.log("foodID: " + this.foodID)
    
    if (this.foodID != undefined)
    {
      var leConso : Conso = {food_id:this.foodID,Pet : this.LeConso.Pet, food_label : this.LeConso.food_label, food_mark : this.LeConso.food_mark
        ,food_prix: this.LeConso.food_prix, date_achat: this.date }
    
       
        this.conssrv.updateConso(leConso).subscribe((res:Conso)=>
        {console.log(res)}
        );
    }
    else
    {
      var leConso : Conso = { food_id:0, Pet : this.LeConso.Pet, food_label : this.LeConso.food_label, food_mark : this.LeConso.food_mark
        ,food_prix: this.LeConso.food_prix, date_achat: this.date }
    
        console.log("Consss: " + leConso.date_achat)
    
        this.conssrv.createConso(leConso).subscribe((res:Conso)=>
        {console.log(res)}
        );
    }
    this.nav.pop()
    
  }
}
