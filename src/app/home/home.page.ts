import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { Conso } from '../modele/conso';
import { ConsoService } from '../services/conso.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
  }

  selectedCategory() {
  console.log("qfd",this.radioValue)
   
  }

  // Get the data from service
  async getConso() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();

    this.consosrv.getConso().subscribe((tempo: Conso[]) => {
      this.TheConso = tempo;

      console.log(tempo)

      //Group data in month
      const groups = this.TheConso.reduce((groups, donne) => {
        const month = new Date(donne.date_achat).getMonth() + 1;
        const MM = this.getMonthName(month);

        if (!groups[month]) {
          groups[month] = [];
        }
        groups[month].push(donne);
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

  // Get month label
  getMonthName(monthNumber: any): string {
    var tempMonth: string;
    let monat = [
      { id: 1, title: 'Janvier' },
      { id: 2, title: 'Fevrier' },
      { id: 3, title: 'Mars' },
      { id: 4, title: 'Avril' },
      { id: 5, title: 'Mai' },
      { id: 6, title: 'Juin' },
      { id: 7, title: 'Juillet' },
      { id: 8, title: 'Août' },
      { id: 9, title: 'Septembre' },
      { id: 10, title: 'Octobre' },
      { id: 11, title: 'Novembre' },
      { id: 12, title: 'DDecembreec' },
    ];
    monat.forEach((yue) => {
      if (yue.id === monthNumber) {
        tempMonth = yue.title;
      }
    });
    return tempMonth;
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
}
