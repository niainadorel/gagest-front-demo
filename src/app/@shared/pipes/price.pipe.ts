import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let suffix = args[0] || '';
    suffix = suffix ? ' ' + suffix : suffix;
    console.log('suffix', suffix)
    switch (args[0]) {
      case 'ArToFMG':
        value = value * 5;
        suffix = ' FMG';
        break;
      case 'FMGToAr':
        value = value / 5;
        suffix = ' Ar'
        break;
    }
    let result: string = Intl.NumberFormat('fr-FR').format(value);
    result += suffix;
    console.log('Result', result);
    return result;
  }

}
