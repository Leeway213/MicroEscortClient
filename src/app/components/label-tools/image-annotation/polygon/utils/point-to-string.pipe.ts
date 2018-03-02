import { Vertex } from "../../models/Graph";
import { PipeTransform, Pipe } from "@angular/core";


@Pipe({
    name: 'PointsToString'
})
export class PointsToStringPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        const zoom = args[0];
        const tmp = value as Vertex[];
        return tmp.map(v => `${v.X * zoom},${v.Y * zoom}`).join(' ');
    }

}