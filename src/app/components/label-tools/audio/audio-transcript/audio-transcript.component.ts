import { Component, OnInit, ElementRef, ViewChild,Input } from '@angular/core';
import {Router,Route,ActivatedRoute} from "@angular/router";

import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import { SimpleChanges, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DatePipe } from '@angular/common/src/pipes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-audio-transcript',
  templateUrl: './audio-transcript.component.html',
  styleUrls: ['./audio-transcript.component.css']
})
export class AudioTranscriptComponent implements OnInit,AfterContentInit {
  regionState:boolean=false;
  waveform: any;
  regionEle:any;
  @Input() tableData:Array<any>;
  tempEditObject = {};
  addRegionState:boolean=false;
  count:number=-1;
  editRow = null;
  selectRow=null;
  cacheTrData:any;
  tasksetId:string;
  currentTaskIndex:number;
  startZoom:number=1;
  endZoom:number=200;
  _current = 1;
  _pageSize = 2;
  _total = 1;

  
  taskset:any;
  canUndo: boolean;
  @Input() data: any;
  @ViewChild("waveFormElement") waveFormElement: ElementRef;

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.tableData=[];
    this.count=-1;
    this.currentTaskIndex=0;
    route.params.subscribe(params=>{
      this.tasksetId=params.id;
    })
   }
   ngOnchanges(change:SimpleChanges){
    
   }
  async ngOnInit() {
    (this.waveFormElement.nativeElement as HTMLDivElement).onclick = (event) => {
      this.saveNewRegion();
    };  
  }
  //自动播放区域
  autoPlay(startTime){
    let dur=this.waveform.getDuration();
    this.waveform.stop();
    this.waveform.seekTo(startTime/dur);
    this.waveform.play();
  }
  refreshData(reset = false){
    if(reset){
      this._current=1;
    }
  }
  //行选中事件
  rowSelect(data){
    this.clearRegions();
    this.waveform.addRegion({
      start:data.startTime,
      end:data.endTime,
      loop:true
   })
   this.selectRow=data.key;
   this.addRegionState=true;
   this.autoPlay(data.startTime);
  }
  //编辑需要显示区域块
  edit(data) {
    this.tempEditObject[ data.key ] = { ...data };
    this.editRow = data.key;
    //获取区域
    this.clearRegions();
    this.waveform.addRegion({
       start:data.startTime,
       end:data.endTime,
       loop:true
    })
    this.addRegionState=true;
    this.autoPlay(data.startTime);
    event.stopPropagation();
  }
  save(data) {
    Object.assign(data, this.tempEditObject[ data.key ]);
    this.editRow = null;
    this.addRegionState=false;
    //如果文本内容为空，则为无效数据
    if(data.content){
      this.tableData[data.key].startTime=this.cacheTrData.startTime;
      this.tableData[data.key].endTime=this.cacheTrData.endTime;
    }else{
      this.tableData.splice(data.key,1);
      this.tableData=this.changeTable();
      this.tableData = [...this.tableData];
    }
    
    this.clearRegions();
    event.stopPropagation();
  }
  delete(data) {
    this.tempEditObject[ data.key ] = {};
    this.tableData.splice(data.key,1);
    this.editRow = null;
    this.count=this.count-1;
    //重新调整key值
    this.tableData=this.changeTable();
    this.tableData = [...this.tableData];
    this._total=this.tableData.length;
    event.stopPropagation();
    console.log(this.tableData);
  }
  cancel(data) {
    this.tempEditObject[ data.key ] = {};
    this.editRow = null;
    this.addRegionState=false;
    event.stopPropagation();
  }
  //获取当前任务的数据
  getResult() {
    return {
      id:this.data.id,
      data:this.tableData
    }
  }

  async refresh() {
    this.tableData=[];
    this.tempEditObject = {};  
    console.log(this.data);
    await this.loaddata(this.data.params.attachment)
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
    //如果文本内容为空，则为无效数据
    if(inputEle.value&&this.regionState){
      if(!this.addRegionState){
        this.cacheTrData.key=++this.count;
        this.tableData.push(this.cacheTrData);
        this._total=this.tableData.length;
        this.tableData = [...this.tableData];
      }   
      if(this.regionState){
        this.tableData[this.tableData.length-1].content=inputEle.value;
        this.tableData = [...this.tableData];
        this.regionState=false;
      }
    }else{
      alert('文本内容不能为空且必须选择语音区域')
    }
    this.clearRegions();
     
  }
  //清除所有区块
  clearRegions(){
    this.waveform.regions.clear();
    this.addRegionState=false;
    this.selectRow=null;
    this.regionState=false;
  }
  //重新调整tableData
  changeTable(){
    this.tableData.forEach((item,index)=>{
      item.key=index;
    })
    return this.tableData;
  }
  //放大区域
  changeZoom(e){
    if(e.deltaY<0){
      this.startZoom=this.startZoom+20>this.endZoom?this.endZoom:this.startZoom+20;
    }else{
      this.startZoom=this.startZoom-20<0?1:this.startZoom-20;
    }
    this.waveform.zoom(this.startZoom);
  }
  //加载数据
  loaddata(dataurl: string) {
    const promise = new Promise((resolve, reject) => {
      this.waveform = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        hideScrollbar:false,
        plugins: [
          TimelinePlugin.create({
            container: '#waveform-timeline'
          }),
          RegionsPlugin.create({
            container: '#waveform'
          }),
         // MinimapPlugin.create()
        ]
      });
      //当选择区域的属性发生变化时触发
      this.waveform.on('region-updated',(region,e)=>{
        this.cacheTrData={
          startTime:region.start,
          endTime:region.end
        }
        //改变区域的起始和结束时间
        if(this.addRegionState&&this.selectRow!=null){
          this.tableData[this.selectRow].startTime=this.cacheTrData.startTime;
          this.tableData[this.selectRow].endTime=this.cacheTrData.endTime;
        }else if(this.addRegionState){
          this.tableData[this.editRow].startTime=this.cacheTrData.startTime;
          this.tableData[this.editRow].endTime=this.cacheTrData.endTime;
        }     
        this.tableData = [...this.tableData];  
      })
      this.waveform.on('region-update-end',(region,e: MouseEvent)=>{
        this.regionState=true;
        if(!this.addRegionState){
          this.cacheTrData={
            startTime:region.start,
            endTime:region.end
          }          
        }else{
          this.cacheTrData={
            startTime:region.start,
            endTime:region.end
          }
        }         
        setTimeout(() => {
           //自动播放区域
        this.autoPlay(region.start);
         }, 20);
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
  switch(btn) {
    this.waveform.playPause();
    if(btn.innerText=='播放'){
      btn.innerText='暂停'
    }else{
      btn.innerText='播放';
    }
  }
  undo(){

  }
  label(){

  }
  ngAfterContentInit(){
    
  }

}
