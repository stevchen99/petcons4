import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

import { Conso } from '../modele/conso';
import { ConsoService } from '../services/conso.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  TheConso: Conso[] = [];
  groupArrays: any = [];
  tempsum: string
  radioValue;

  constructor(
    private consosrv: ConsoService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ionViewDidEnter() {
    this.getConso();
  }

  ngOnInit() {
    //this.getConso();
  }

  //Swipe Down to get the data
  doRefresh(event) {
    console.log('Begin async operation');
    this.getConso();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    console.log("refresh",this.radioValue)
  }

  selectedCategory() {
    this.getConso();
  }

  // Get the data from service
  async getConso() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();

    this.consosrv.getConso().subscribe((tempo: Conso[]) => {
      this.TheConso = tempo;

      if (this.radioValue == undefined)
      this.radioValue = "Month"
     
      //Group data in month
      const groups = this.TheConso.reduce((groups, donne) => {
      var filter; 

      if (this.radioValue == "Month"){ filter = new Date(donne.date_achat).getMonth() + 1;}
      else { filter = donne.pet_id; }      
      

        if (!groups[filter]) {
          groups[filter] = [];
        }
        groups[filter].push(donne);
        return groups;
      }, {});

      //Mapping data to array
      this.groupArrays = Object.keys(groups).map((mois) => {
        return {
          mois,
          sum: groups[mois].reduce((a, b) => a + parseFloat(b.food_prix), 0),
          donnes: groups[mois].sort((objA, objB) => new Date(objA.date_achat).getTime() - new Date(objB.date_achat).getTime()),
        };
      }) //.sort((a,b) => a.mois.localeCompare(b.mois));  

      loading.dismiss();

    });
  }

 

  //Modification item
  edtConso(cons: Conso) {
    this.router.navigate(['/detail'], { queryParams: cons });
  }

  //Delete item
  del(idcons: number) {
    this.consosrv.deleteConso(idcons).subscribe((temp: Conso) => {
      this.getConso();
    });
  }

ngOnDestroy(){
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

}
