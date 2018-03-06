import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';

@Component({
  selector: 'app-audio-transcript',
  templateUrl: './audio-transcript.component.html',
  styleUrls: ['./audio-transcript.component.css']
})
export class AudioTranscriptComponent implements OnInit {
  regionState:boolean=false;
  waveform: any;
  regionEle:any;
  tableData:Array<any>;
  @ViewChild("waveFormElement") waveFormElement: ElementRef;

  constructor() { }

  async ngOnInit() {
    this.tableData=[     
       
    ]
    await this.loaddata('./static/audios/wave.mp3'); 
    (this.waveFormElement.nativeElement as HTMLDivElement).onclick = (event) => {
      this.saveNewRegion();
    };
    
       
  }

  //保留最新的region区域,并且选择结束后播放该区域
  saveNewRegion(){
    var length=Object.keys(this.waveform.regions.list).length;
    var newValue=Object.keys(this.waveform.regions.list)[length-2];
    var playValue=Object.keys(this.waveform.regions.list)[length-1];
    var start=this.waveform.regions.list[playValue]?this.waveform.regions.list[playValue].start:0;
    var end=this.waveform.regions.list[playValue]?this.waveform.regions.list[playValue].end:0;
    var dur=start-end;
    if(length>1){
      this.waveform.regions.list[newValue].remove();
    }
  }
  //提交文本数据
  commit(inputEle){
    if(this.regionState){
      this.tableData[this.tableData.length-1].content=inputEle.value;
      this.regionState=false;
    }
     
  }
  //加载数据
  loaddata(dataurl: string) {
    const promise = new Promise((resolve, reject) => {
      this.waveform = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        plugins: [
          TimelinePlugin.create({
            container: '#waveform-timeline'
          }),
          RegionsPlugin.create({
            container: '#waveform'
          }),
          CursorPlugin.create({
            // plugin options ...
          }),
          MinimapPlugin.create()
        ]
      });
     
      this.waveform.on('region-update-end',(region,e)=>{
        this.regionState=true;
        this.tableData.push({
          startTime:region.start,
          endTime:region.end
        })
      })
      this.waveform.on('ready', () => {
        this.regionEle= this.waveform.regions.enableDragSelection({
          loop:true
        });
        
        this.waveform.regions.on('onDrag',(e)=>{
         console.log(e)
        })
        resolve();
      });

      this.waveform.on('error', () => {
        reject();
      })

      this.waveform.load(dataurl);
    });

    return promise;
  }

  switch() {
    this.waveform.playPause();
  }

}
