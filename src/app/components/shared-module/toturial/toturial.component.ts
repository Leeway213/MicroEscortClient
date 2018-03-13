import { Component, ComponentFactoryResolver, OnInit, Type, ComponentFactory, ViewChild,Input,Output,AfterViewInit,EventEmitter } from '@angular/core';
import { TaskService, TaskModel } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, ProjectModel } from '../../../services/project.service';
import { TaskSetModel, TaskSetService } from '../../../services/taskset.service';

import { TdTextEditorComponent } from '@covalent/text-editor';


@Component({
  selector: 'app-toturial',
  templateUrl: './toturial.component.html',
  styleUrls: ['./toturial.component.css']
})

export class ToturialComponent implements OnInit,AfterViewInit {
  @Input() tasksetId:string;
  @Output() changeEditor=new EventEmitter();
  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  options:any={
    lineWrapping: false,
    toolbar: false
  }
  constructor(
    private tasksetService: TaskSetService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {
  }
  commit(e){
    this.changeEditor.emit(e);
  }
  ngOnInit() {
    
  }
  ngAfterViewInit(){
    if(this.tasksetId){
      this.tasksetService.getTaskSetById(this.tasksetId).then(data=>{
        this._textEditor.value=data.tutorial;
        this._textEditor.togglePreview();
      })
    }else{
      this._textEditor.value="这是各类任务说明文档，请先选择具体任务，谢谢合作！";
    }
    
  }

}
