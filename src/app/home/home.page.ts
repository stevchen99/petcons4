import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';
import { Conso } from '../modele/conso';
import { ConsoService } from '../services/conso.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
TheConso : Conso[] = []

  constructor(private consosrv:ConsoService) {}

  getConso() {
    this.consosrv.getConso().subscribe((tempo: Conso[]) => {
      this.TheConso = tempo;
      console.log(tempo);
    });
  }

  del()
  {

  }

}
