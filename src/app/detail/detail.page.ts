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
  ThePet: Pet[] = []
  Pet = {} as Pet  
  edtCons: Conso
  LeConso: Conso = { Pet: this.Pet, pet_id: 0 ,food_id: 0, food_label: '', food_mark: '', food_prix: 0, date_achat: new Date }
  foodID: number  
  btnLabel : string
   
  

  constructor(private nav: NavController,
    private petsrv: PetService,
    private conssrv: ConsoService,
    private route: ActivatedRoute,
    private router: Router) { }

ionViewDidEnter(){
  this.route.queryParams.subscribe(params => {   
    this.LeConso.Pet.pet_id = params.pet_id
    this.LeConso.food_label = params.food_label
    this.LeConso.food_mark = params.food_mark
    this.LeConso.food_prix = params.food_prix
    this.date = params.date_achat
    this.foodID = params.food_id   
  })  

  console.log(this.LeConso.date_achat)

  if (this.foodID == undefined){this.btnLabel= "Save"}
  else {this.btnLabel= "Update"}

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

  getPet() {
    this.petsrv.getPet().subscribe((temp: Pet[]) => {
      this.ThePet = temp
    
    });
  }

  goBack() {
     this.nav.pop()
     }

  goSave() {    

    if (this.foodID != undefined) {
      var leConso: Conso = {
        food_id: this.foodID, pet_id: this.LeConso.Pet.pet_id, Pet: this.LeConso.Pet, food_label: this.LeConso.food_label, food_mark: this.LeConso.food_mark
        , food_prix: this.LeConso.food_prix, date_achat: this.date
      }
      this.conssrv.updateConso(leConso).subscribe((res: Conso) => { console.log(res) }
      );
    }
    else {
      var leConso: Conso = {
        food_id: 0,pet_id: this.LeConso.Pet.pet_id, Pet: this.LeConso.Pet, food_label: this.LeConso.food_label, food_mark: this.LeConso.food_mark
        , food_prix: this.LeConso.food_prix, date_achat: this.date == null ? new Date : this.date
      }
    

      this.conssrv.createConso(leConso).subscribe((res: Conso) => { console.log(res) }
      );
    }
    this.nav.pop()
  }

}
