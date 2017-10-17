import { Pipe, PipeTransform } from '@angular/core';
import { Vertex } from '../models/Graph';
@Pipe({
    name: 'PointsToString'
})
export class PointsToStringPipe implements PipeTransform {


    public transform(value: any, args: any[]): any {
        const tmp = value as Vertex[];
        return tmp.map(v => `${v.X},${v.Y}`).join(' ');
    }
}
