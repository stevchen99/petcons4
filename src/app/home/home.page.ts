import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';
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
  

  constructor(
    private consosrv: ConsoService,
    private nav: NavController,
    private router: Router
  ) {}

  ionViewDidEnter() {
    this.getConso();
  }

  ngOnInit() {
    //this.getConso();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getConso();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getConso() {
    this.consosrv.getConso().subscribe((tempo: Conso[]) => {
      this.TheConso = tempo;

      // this gives an object with dates as keys
      const groups = this.TheConso.reduce((groups, donne) => {
        const month = new Date(donne.date_achat).getMonth() + 1;
          const MM = this.getMonthName(month)
       
        if (!groups[MM]) {
          groups[MM] = [];
        }
        groups[MM].push(donne);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((mois) => {
        return {
          mois,
          donnes: groups[mois],
        };
      });
    });
  }

   getMonthName(monthNumber: any) : string {
   var tempMonth : string
    let maanden = [
      { id: 1, title: 'Januari' },
      { id: 2, title: 'Februari' },
      { id: 3, title: 'Maart' },
      { id: 4, title: 'April' },
      { id: 5, title: 'Mei' },
      { id: 6, title: 'Juni' },
      { id: 7, title: 'Juli' },
      { id: 8, title: 'Aout' },
      { id: 9, title: 'Sept' },
      { id: 10, title: 'Oct' },
      { id: 11, title: 'Nov' },
      { id: 12, title: 'Dec' },
    ];
    maanden.forEach((maand) => {     
      if (maand.id === monthNumber) 
      {       
        tempMonth = maand.title;
      }     
    });
    return tempMonth;
  }

  edtConso(cons: Conso) {
    this.router.navigate(['/detail'], { queryParams: cons });
  }

  del(idcons: number) {
    this.consosrv.deleteConso(idcons).subscribe((temp: Conso) => {
      this.getConso();
    });
  }
}
