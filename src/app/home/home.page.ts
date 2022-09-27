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
    // this.getConso();
  }

  ngOnInit() {
    this.getConso();
  }

  getConso() {
    this.consosrv.getConso().subscribe((tempo: Conso[]) => {
      this.TheConso = tempo;
      console.log(this.TheConso);
      // this gives an object with dates as keys
      const groups = this.TheConso.reduce((groups, game) => {
        const month = new Date(game.date_achat).getMonth() + 1;

        if (!groups[month]) {
          groups[month] = [];
        }
        groups[month].push(game);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((mois) => {
        return {
          mois,
          games: groups[mois],
        };
      });
    });

    console.log('monjt: ' + this.groupArrays);
  }

  private getMonthNumber(event: any): number {
    return event.date_achat.split('-')[1];
  }

  public getMonthName(monthNumber: any) {
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
      if (maand.id === monthNumber) return maand.title;
    });
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
