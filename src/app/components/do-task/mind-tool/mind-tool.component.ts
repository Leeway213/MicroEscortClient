import { DomSanitizer } from '@angular/platform-browser';
import { labelTools } from './../../label-tools/LabelToolComponent';
import { LabelToolComponent } from '../../label-tools/LabelToolComponent';
import { Task } from 'protractor/built/taskScheduler';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  Type,
} from '@angular/core';
import { TaskService, TaskModel } from '../../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BoundingBoxComponent } from '../../label-tools/image-annotation/bounding-box/bounding-box.component';
import { SafeStyle } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { ToolSwitchDirective } from '../directives/tool-switch.directive';



@Component({
  selector: 'app-mind-tool',
  templateUrl: './mind-tool.component.html',
  styleUrls: ['./mind-tool.component.css']
})
export class MindToolComponent implements OnInit, OnDestroy {

  verifyPass: boolean;

  @ViewChild(ToolSwitchDirective) toolSwitch: ToolSwitchDirective;

  labelToolComponent: LabelToolComponent;

  safeTransform: SafeStyle;

  @ViewChild('svgContainer') svgContainerRef: ElementRef;

  @ViewChild('canvas') canvasRef: ElementRef;
  canvasContext: CanvasRenderingContext2D;


  currentTaskIndex: number;
  @Input() tasks: TaskModel[];
  get currentTask(): TaskModel {
    return this.tasks ? this.tasks[this.currentTaskIndex] : null;
  }

  mode: 'draw' | 'select' | 'delete' = 'draw';

  @ViewChild('toolContainer') toolRef: any;

  @Input() dataSrc: string;

  @Input() srcWidth: number;
  @Input() srcHeight: number;

  width: number;
  height: number;
  zoomTimes = 0;
  zoom = 1;

  translating = false;
  transX = 0;
  transY = 0;

  @Output() quizEvent = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sanitizer: DomSanitizer
  ) {
  }

  private refreshTransform() {
    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle(`scale(${this.zoom}) translate(${this.transX}px, ${this.transY}px)`);
    this.labelToolComponent.zoom = this.zoom;
  }

  ngOnInit() {
    (this.svgContainerRef.nativeElement as HTMLDivElement).addEventListener('mousedown', event => { this.onMouseDown(event) }, true);
    (this.svgContainerRef.nativeElement as HTMLDivElement).addEventListener('mousemove', event => { this.onMouseMove(event) }, true);
    (this.svgContainerRef.nativeElement as HTMLDivElement).addEventListener('mouseup', event => { this.onMouseUp(event) }, true);
    (this.svgContainerRef.nativeElement as HTMLDivElement).addEventListener('mousewheel', event => { this.onMouseWheel(event) }, true);

    this.addSkipWhenWindowClosedHandler();
    this.initialize();
    this.addShotcut();
    console.log(this.toolRef);
  }

  async ngOnDestroy(): Promise<void> {
    console.log(this.currentTask);

    this.removeSkipWhenWindowClosedHandler();
    if (this.currentTask) {
      await this.taskService.skipTask(this.currentTask);
    }
  }

  private initialize() {
    this.currentTaskIndex = 0;
    this.loadTool(labelTools[this.currentTask.type]);
    this.refresh();
  }

  private loadTool(component: Type<LabelToolComponent>) {
    if (!component) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.toolSwitch.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.labelToolComponent = componentRef.instance;
    this.refreshTool();
  }

  private refreshTool() {
    this.labelToolComponent.data = this.currentTask;
    this.labelToolComponent.mode = this.mode;
    this.labelToolComponent.zoom = this.zoom;
    this.labelToolComponent.blockKeyInMouseEvent = 'ctrlKey';
    this.labelToolComponent.refresh();
  }

  private async refresh() {
    this.dataSrc = '';
    this.width = this.height = 0;
    await this.loadImage(this.currentTask.params.attachment);
    this.fitImage();
    this.refreshTool();
  }

  private async loadImage(src: string) {
    const promise = new Promise<any>(resolve => {
      const tmp: HTMLImageElement = new Image();
      tmp.onload = function () {
        resolve(tmp);
      };
      tmp.src = src;
    });
    const image: HTMLImageElement = await promise;
    this.width = image.width;
    this.height = image.height;
    this.dataSrc = src;

    this.labelToolComponent.width = this.width;
    this.labelToolComponent.height = this.height;
  }

  /**
   * 添加快捷键操作
   */
  private addShotcut() {
    document.onkeydown = e => {
      // ctrl+z: 撤销
      if (e.ctrlKey && e.key === 'z') {
        this.undo();
      }
    };
  }

  /**
   * 为当前窗口添加一个事件句柄，在浏览器窗口或标签关闭、刷新时，执行跳过当前任务的操作
   */
  private addSkipWhenWindowClosedHandler() {
    window.onbeforeunload = async e => {
      await this.taskService.skipTask(this.currentTask);
      e.returnValue = '离开？';
    };
  }

  /**
   * 移除window.onbeforeunload事件句柄
   */
  private removeSkipWhenWindowClosedHandler() {
    window.onbeforeunload = undefined;
  }

  async submit() {
    const result: any = {};
    if (this.currentTask.status === 'doing' || this.currentTask.quiz) {
      const annotations = this.labelToolComponent.getResult();
      result.taskId = this.currentTask.id;
      result.results = {
        annotations: annotations,
        quiz: this.currentTask.quiz
      };
    } else if (this.currentTask.status === 'verifying') {
      result.results = {
        pass: this.verifyPass
      };
    }

    const response = await this.taskService.finishTask(
      this.currentTask.id,
      result
    );
    console.log(response);
    if (this.currentTask.quiz) {
      this.quizEvent.emit(response.data);
    } else {
      this.next();
    }
  }

  async next() {
    if (this.currentTask.quiz) {
      this.currentTaskIndex++;
      if (this.currentTask) {
        this.refresh();
      } else {
        this.router.navigate(['/tasks']);
      }
    } else {
      // 刷新任务
      try {
        const res: any = await this.taskService.getTask(
          this.currentTask.taskset
        );
        console.log(res);
        if (res.code === 200) {
          this.tasks = res.data.tasks;
          this.refresh();
        }
      } catch (error) {
        this.tasks = undefined;
        this.router.navigate(['/tasks']);
      }
    }
  }

  modeChange(e) {
    this.mode = e.value;
    this.labelToolComponent.mode = e.value;
  }

  /**
   *
   * @param args  object { label: "", color: "" }
   */
  label(args: any) {
    this.labelToolComponent.label(args);
  }

  /**
   * 右键点击事件，禁止右键菜单
   */
  disableMenu() {
    return false;
  }

  /**
   * 放大按钮点击事件
   */
  onZoomInClick() {
    this.zoomIn();
  }

  /**
   * 缩小按钮点击事件
   */
  onZoomOutClick() {
    this.zoomOut();
  }

  /**
   * 还原大小按钮点击事件
   */
  fitImage() {
    this.zoom = 1;
    this.zoomTimes = 0;
    this.transX = 0;
    this.transY = 0;

    this.refreshTransform();
  }

  onMouseDown(e: MouseEvent) {
    if (e.buttons === 1 && e.ctrlKey) {
      // 开始拖动
      this.translating = true;

      return false;
    }

  }

  onMouseMove(e: MouseEvent) {

    if (this.translating && e.buttons === 1) {
      this.translate(e);
      return false;
    }

  }

  onMouseUp(e: MouseEvent) {

    if (this.translating) {
      this.translating = false;
      return false;
    }

  }

  onMouseWheel(e: WheelEvent) {
    // if (e.ctrlKey) {
      if (e.deltaY < 0 && this.zoomTimes < 10) {
        this.zoomIn();
      } else if (e.deltaY > 0 && this.zoomTimes > 0) {
        this.zoomOut();
      }
      console.log(`zoom: ${this.zoomTimes}`);
      e.preventDefault();
    // }
  }

  zoomIn() {
    this.zoom += 0.2 * (this.zoomTimes++ + 1);

    this.refreshTransform();
    console.log(this.labelToolComponent.zoom);
  }

  zoomOut() {
    console.log(`${this.zoom} - 0.2 * (${this.zoomTimes})`);
    this.zoom -= 0.2 * this.zoomTimes--;

    this.refreshTransform();
  }

  translate(e: MouseEvent) {
    this.transX += e.movementX / this.zoom;
    this.transY += e.movementY / this.zoom;
    this.refreshTransform();
    console.log(this.transX + '--' + this.transY);
  }

  undo() {
    this.labelToolComponent.undo();
  }

  verifyResultChange(e: boolean) {
    this.verifyPass = e;
  }

}
