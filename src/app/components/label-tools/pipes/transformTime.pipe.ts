import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transformTime',
  pure: true
})
export class TransformTimePipe implements PipeTransform {
  transform(value:number, []): string {
    var result: string='try';
    let times={
        hour:3600,
        minute:60,
        second:1
    }
    let miniseconds:number;
    let n=Math.floor(value);
    miniseconds=Math.floor((value-n)*1000);
    let showhour,showminute,showsecond;
    let hourobj=this.dataTransform(n,times.hour);
    let minuteobj=this.dataTransform(hourobj.decData,times.minute);
    let secondobj=this.dataTransform(minuteobj.decData,times.second);
    showhour=hourobj.intData<10?'0'+hourobj.intData:hourobj.intData;
    showminute=minuteobj.intData<10?'0'+minuteobj.intData:minuteobj.intData;
    showsecond=secondobj.intData<10?'0'+secondobj.intData:secondobj.intData;
    return showhour+':'+showminute+':'+showsecond+'.'+miniseconds;
  }
  dataTransform(data,key){
    return {
        intData:Math.floor(data/key),
        decData:data%key
    }
  }
}