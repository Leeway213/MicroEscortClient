import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router,ActivationEnd } from '@angular/router';
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
    //当前页码
    _current = 1;
    //每页数据条数
    pageSize = 1;
    _total = 1;
    _dataSet = [];
    loading = true;
    //每页最后一条时间戳
    pageEndTime:string;
    //任务类型
    dataArr:Array<any>;
    //操作类型
    dataTypeArr:Array<any>;
    //状态
    statusArr:Array<any>;

    //button值
    taskBtnValue:any;
    dataBtnValue:any;
    statusBtnValue:any;
    //日期范围
    startTime:any=null;
    endTime:any=null;
    postStartTime:any;
    postEndTime:any;
    reset() {
      this.dataArr.forEach(item => {
        item.value = false;
        });
      this.refreshData(true);
    }
    constructor(
        private taskservice: TaskService
    ) {
        this.dataArr=[
            { name: '全部', value: false },
            { name: 'image', value: false },
            { name: 'audio', value: false }
        ]
        this.dataTypeArr=[
            { name: '全部', value: false },
            { name: 'boundingBox', value: false },
            { name: 'audiotrascription', value: false }
        ]
        this.statusArr=[
            { name: '全部', value: false },
            { name: 'accept', value: false },
            { name: 'completed', value: false }
        ]
        this.taskBtnValue=this.dataArr[0].name;
        this.dataBtnValue=this.dataTypeArr[0].name;
        this.statusBtnValue=this.statusArr[0].name;
    }
  
    refreshData(reset = false) {
      if (reset) {
        this._current = 1;
      }
      this.loading=true;
      this.taskservice.getTaskResult({
          size:this.pageSize,
          offset:this._current-1
      }).then(data=>{
          this.loading=false;
          this._total=data.data.count;
          this._dataSet=data.data.tasks;
      })
      
    }
    //行点击事件
    rowClick(trdata,index){

    }
    //筛选
    selectFun(valueObj,type){
        switch(type){
            case 'task':
            this.taskBtnValue=valueObj.name;
            break;
            case 'operation':
            this.dataBtnValue=valueObj.name;           
            break;
            case 'status':
            this.statusBtnValue=valueObj.name;
            break;
            default:
            break;
        }
    }
    lastSelect(){
        let opts={
            dataType:this.dataBtnValue,
            type:this.taskBtnValue, 
            startIndex:this.postStartTime,
            endIndex:this.postEndTime,  
            status:this.statusBtnValue,       
            size:this.pageSize,
            offset:this._current-1
        }
        //判断筛选条件
        if(this.dataBtnValue=="全部"){
           delete opts.dataType
        }
        if(this.taskBtnValue=="全部"){
           delete opts.type
        }
        console.log(this.statusBtnValue)
        if(this.statusBtnValue=="全部"){
            delete opts.status
         }
        if(!this.postStartTime){
           delete opts.startIndex 
        }
        if(!this.postEndTime){
           delete opts.endIndex
        }
        console.log(opts);
        this.loading=true;
        this.taskservice.getTaskResult(opts).then(data=>{
            this.loading=false;
            this._total=data.data.count;
            this._dataSet=data.data.tasks;
        })
    }
    //时间改变触发事件
    startTimeChange(){
        if (this.startTime > this.endTime) {
            this.endTime = null;
          }
          if(this.startTime){
            this.postStartTime=Math.ceil(this.startTime.getTime());
          }
          
    }
    endTimeChange(){
        if (this.startTime > this.endTime) {
            this.startTime = null;
        }
        if(this.endTime){
            this.postEndTime=Math.ceil(this.endTime.getTime());
        }
        
    }
    ngOnInit() {
      this.refreshData();
      
    }

}
