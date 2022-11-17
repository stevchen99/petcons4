import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'petlibelle'
})
export class PetlibellePipe implements PipeTransform {

  transform(value: number): string {
    var res : string
   /*  switch (value){
      case 1 : {
        res = value+"Hirukami Murakmi"
        break;
      }
      case 2 : {
        res = value+"Josephine"
        break;
      }
      default: {
        res = value+"Mikey n Blaky"
        break;
      }
    } */
    if (value == 1) { res = "Hirukami Murakmi"}
    else if (value == 2) { res = "Josephine"}
    else { res = "Mikey n Blaky"}
    return res;
  }

}
