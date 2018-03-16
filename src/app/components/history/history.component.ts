import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router,ActivationEnd } from '@angular/router';
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {

    _current = 1;
    pageSize = 20;
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
            { name: 'image', value: false },
            { name: 'audio', value: false }
        ]
        this.dataTypeArr=[
            { name: 'boundingBox', value: false },
            { name: 'audiotrascription', value: false }
        ]
        this.statusArr=[
            { name: 'doing', value: false },
            { name: 'completed', value: false }
        ]
    }
  
    refreshData(reset = false) {
      if (reset) {
        this._current = 1;
      }
      this.loading=true;
      this.taskservice.getTaskResult({
          size:this.pageSize,
          offset:this._current
      }).then(data=>{
          this.loading=false;
          this._total=data.total;
          this._dataSet=data.data;
      })
      
    }
    //行点击事件
    rowClick(trdata,index){

    }
    ngOnInit() {
      //this.refreshData();
      for (let i = 0; i < 46; i++) {
        this._dataSet.push({
          key    : i,
          name   : `Edward King ${i}`,
          status:'doing',
          taskType:'image',
          dataType:'boundingBox',
          reason:'不知道'
        });
      }
      this._dataSet=[...this._dataSet];
    }

}
