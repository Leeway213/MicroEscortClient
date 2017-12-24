import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], ...args: { field: string, value: string, negate: boolean }[]): any[] {
    if (!items || items.length === 0) return [];
    for (let arg of args) {
      items = items.filter(item => arg.negate ? item[arg.field] !== arg.value : item[arg.field] === arg.value);
    }
    console.log("********");
    console.log(items);
    console.log("********");
    return items;
  }

}
