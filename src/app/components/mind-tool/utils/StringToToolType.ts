import { ToolType } from '../models/ToolType';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'StringToToolType'
})
export class StringToToolTypePipe implements PipeTransform {
    public transform(value: any): any {
        return ToolType[value];
    }
}
