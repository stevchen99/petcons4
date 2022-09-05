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
export class HomePage implements OnInit{
TheConso : Conso[] = []

  constructor(private consosrv:ConsoService,
              private nav:NavController,
              private router : Router) {}

              ionViewDidEnter(){ this.getConso()}            

  ngOnInit() {
   
  }

  getConso() {
    this.consosrv.getConso().subscribe((tempo: Conso[]) => {
      this.TheConso = tempo;
      console.log(tempo);
    });
  }

  edtConso(cons : Conso){
    console.log(cons.food_label)
   // this.nav.navigateForward(['/detail', cons]);
   //this.nav.navigateForward('/detail', { state :{ cons}});
   this.router.navigate(['/detail'], {queryParams : cons})
  }

  del(idcons : number)
  {
this.consosrv.deleteConso(idcons).subscribe((temp : Conso) =>{
this.getConso()
})
  }

}
