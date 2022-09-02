import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Conso } from '../modele/conso';
import { Pet } from '../modele/pet';
import { ConsoService } from '../services/conso.service';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  private dateValue: any;
  ThePet : Pet[] = []
  Pet = {} as Pet
  LeConso : Conso = {Pet:this.Pet, food_label:'',food_mark:'', food_prix:0,date_achat:new Date}

  constructor(private nav:NavController,
              private petsrv:PetService,
              private conssrv : ConsoService) { }

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
    var leConso : Conso = {Pet : this.LeConso.Pet, food_label : this.LeConso.food_label, food_mark : this.LeConso.food_mark
    ,food_prix: this.LeConso.food_prix, date_achat: this.date }

    console.log("Consss: " + leConso.date_achat)

    this.conssrv.createConso(leConso).subscribe((res:Conso)=>
    {console.log(res)}
    );
  }
}
