import { Task } from 'protractor/built/taskScheduler';
import { PolygonCanvas } from './models/PolygonCanvas';
import { ObjectHelper } from './utils/StaticMethod';
import { ToolType } from './models/ToolType';
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    Output,
} from '@angular/core';
import { BoundingBox } from './models/BoundingBox';
import { Point } from './models/Point';
import { Vertex } from './models/Graph';
import { Line } from './models/Line';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskModel } from '../tasks/tasks.component';

@Component({
  selector: 'app-mind-tool',
  templateUrl: './mind-tool.component.html',
  styleUrls: ['./mind-tool.component.css']
})
export class MindToolComponent implements OnInit, OnDestroy {

  quiz: boolean;
  correctResult: any;

  currentTaskIndex: number;
  @Input() tasks: TaskModel[];
  get currentTask(): TaskModel {
    return this.tasks ? this.tasks[this.currentTaskIndex] : null;
  }

  mode: 'draw' | 'select' | 'delete' = 'draw';

  @ViewChild('toolContainer') toolRef: any;

  @Input() imgSrc: string;

  @Input() srcWidth: number;
  @Input() srcHeight: number;

  @Input() toolType: ToolType;

  operationStack: any[] = [];

  width: number;
  height: number;
  zoomTimes = 0;
  zoom = 1;

  boundingBoxs: Array<BoundingBox>;
  polygonCanvas: PolygonCanvas;

  resizing = false;
  resizingBoundingBox: BoundingBox;
  resizingBound: string;

  translating = false;
  transX = 0;
  transY = 0;

  @Output() quizEvent = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.addSkipWhenWindowClosedHandler();
    this.initialize();
    this.addShotcut();
    console.log(this.toolRef);
  }

  async ngOnDestroy(): Promise<void> {
    console.log(this.currentTask);
    this.removeSkipWhenWindowClosedHandler();
    await this.taskService.skipTask(this.currentTask.id);
  }

  private initialize() {
    // this.route.data.subscribe(async res => {
    //   this.quiz = res.task[0].quiz;
    //   this.tasks = res.task;
    //   this.currentTaskIndex = 0;

    //   this.toolType = this.determinToolType(this.currentTask.type);

    //   this.refresh();
    // });
    this.currentTaskIndex = 0;
    this.quiz = this.currentTask.quiz;
    this.toolType = this.determinToolType(this.currentTask.type);
    this.refresh();
  }

  private initDraw() {
    switch (this.toolType) {
      case ToolType.BoundingBox:
        this.boundingBoxs = [];
        break;
      case ToolType.Path:
        this.polygonCanvas = new PolygonCanvas();

        this.polygonCanvas.draw(new Point(2, 2));
        this.polygonCanvas.draw(new Point(2, this.height - 2));
        this.polygonCanvas.draw(new Point(this.width - 2, this.height - 2));
        this.polygonCanvas.draw(new Point(this.width - 2, 2));
        this.polygonCanvas.draw(new Point(2, 2));

        break;
    }
  }

  private async refresh() {
    this.imgSrc = '';
    this.width = this.height = 0;
    await this.loadImage(this.currentTask.params.attachment);
    this.initDraw();
    this.fitImage();
    this.operationStack = [];
    this.correctResult = undefined;
  }

  private async loadImage(src: string) {
    const promise = new Promise<HTMLImageElement>(resolve => {
      const tmp: HTMLImageElement = new Image();
      tmp.onload = () => {
        resolve(tmp);
      };
      tmp.src = src;
    });
    const image: HTMLImageElement = await promise;
    this.width = image.width;
    this.height = image.height;

    this.imgSrc = src;
  }

  private determinToolType(typeString: string): ToolType {
    const lowerType: string = typeString.toLowerCase();
    switch (lowerType) {
      case 'boundingbox':
      return ToolType.BoundingBox;
      case 'polygon':
      return ToolType.Path;
      default:
      return undefined;
    }
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
      console.log(e);
      await this.taskService.skipTask(this.currentTask.id);
      e.returnValue = '离开？';
    };
  }

  /**
   * 移除window.onbeforeunload事件句柄
   */
  private removeSkipWhenWindowClosedHandler() {
    window.onbeforeunload = undefined;
  }

  private drawCorrect(data: any) {
    // todo: 画出正确答案
  }

  async submit() {
    if (this.toolType === ToolType.BoundingBox) {
      const annotations = this.boundingBoxs.map(value => value.getResult());
      const result: any = {};
      result.taskId = this.currentTask.id;
      result.results = { annotations: annotations, quiz: this.currentTask.quiz };

      const response = await this.taskService.finishTask(this.currentTask.id, result);
      console.log(response);
      if (this.quiz) {
        this.correctResult = response.data.result;
        console.log(this.correctResult);
        this.drawCorrect(response.data);
        this.quizEvent.emit(response.data);
      } else {
        // todo: 提交任务结果并刷新任务
      }
    }
  }

  next() {
    this.currentTaskIndex++;
    if (this.currentTask) {
      this.refresh();
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  modeChange(e) {
    this.mode = e.value;
  }

  /**
   *
   * @param args  object { label: "", color: "" }
   */
  label(args: any) {
    console.log(args);
    this.boundingBoxs.map(value => {
      if (value.selected) {
        value.label = args.label;
        value.fillColor = args.color;
      }
    });
      this.operationStack.push(ObjectHelper.objClone(
        this.boundingBoxs,
        []
      ) as BoundingBox[]);
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
    if (this.toolType === ToolType.Path) {
      this.polygonCanvas.zoom = 1;
    }
    this.zoomTimes = 0;
    this.transX = 0;
    this.transY = 0;
  }

  onMouseDown(e: MouseEvent) {
    if (e.buttons === 1 && !e.ctrlKey && this.mode === 'draw') {
      switch (this.toolType) {
        case ToolType.BoundingBox:
          this.startBounding(e);
          break;
      }
    } else if (e.buttons === 1 && e.ctrlKey) {
      // 开始拖动
      this.translating = true;
    }

    e.preventDefault();
  }

  onMouseMove(e: MouseEvent) {
    if (this.resizing) {
      this.resizeBound(e);
      return;
    }

    if (this.translating && e.buttons === 1) {
      this.translate(e);
      return;
    }

    if (
      this.toolType === ToolType.BoundingBox &&
      e.buttons === 1 &&
      this.boundingBoxs.length >= 1 &&
      this.mode === 'draw'
    ) {
      this.moveBounding(e);
    }

    e.preventDefault();
  }

  onMouseUp(e: MouseEvent) {
    if (this.resizing) {
      this.resizing = false;
      this.operationStack.push(ObjectHelper.objClone(
        this.boundingBoxs,
        []
      ) as BoundingBox[]);
      return;
    }

    if (this.translating) {
      this.translating = false;
      return;
    }
    if (e.button === 0) {
      switch (this.toolType) {
        case ToolType.BoundingBox:
          if (this.boundingBoxs.length >= 1 && this.mode === 'draw') {
            this.endBounding(e);
          }
          break;

        case ToolType.Path:
          if (e.srcElement && e.srcElement.classList.contains('path-point') && this.mode === 'draw') {
            // tslint:disable-next-line:radix
            const x = parseInt(e.srcElement.getAttribute('cx'));
            // tslint:disable-next-line:radix
            const y = parseInt(e.srcElement.getAttribute('cy'));
            console.log(`draw on point ${x},${y}`);
            this.polygonCanvas.drawOnPoint(new Point(x, y));
          } else {
            // const p = new Point(Math.round(e.offsetX), Math.round(e.offsetY));
            const p = new Point(e.offsetX, e.offsetY);
            console.log(`${p.X}, ${p.Y}`);
            this.polygonCanvas.draw(p);
          }

          break;
      }
    }

    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
  }

  onMouseWheel(e: WheelEvent) {
    if (e.ctrlKey) {
      if (e.deltaY < 0 && this.zoomTimes < 10) {
        this.zoomIn();
      } else if (e.deltaY > 0 && this.zoomTimes > 0) {
        this.zoomOut();
      }
      console.log(`zoom: ${this.zoomTimes}`);
      e.preventDefault();
    }
  }

  zoomIn() {
    this.zoom += 0.2 * (this.zoomTimes++ + 1);
    if (this.toolType === ToolType.Path) {
      this.polygonCanvas.zoom += 0.2 * (this.zoomTimes++ + 1);
    }
  }

  zoomOut() {
    console.log(`${this.zoom} - 0.2 * (${this.zoomTimes})`);
    this.zoom -= 0.2 * (this.zoomTimes--);
    if (this.toolType === ToolType.Path) {
      this.polygonCanvas.zoom -= 0.2 * (this.zoomTimes-- - 1);
    }
    console.log(this.zoom);
  }

  startBounding(e: MouseEvent) {
    console.log(`start ${e.offsetX}--${e.offsetY}`);

    // 将最后一个bounding的selected设置为false
    if (this.boundingBoxs.length > 0) {
      this.boundingBoxs[this.boundingBoxs.length - 1].selected = false;
    }

    const boundingbox: BoundingBox = new BoundingBox();
    boundingbox.start = new Point(e.offsetX, e.offsetY);
    boundingbox.svgStart = new Point(e.offsetX, e.offsetY);
    boundingbox.strokeColor = '#555555';
    boundingbox.selected = true;
    this.boundingBoxs.push(boundingbox);
  }

  moveBounding(e: MouseEvent) {
    const boundingbox: BoundingBox = this.boundingBoxs[
      this.boundingBoxs.length - 1
    ];
    boundingbox.width = e.offsetX - boundingbox.start.X;
    boundingbox.height = e.offsetY - boundingbox.start.Y;
  }

  endBounding(e: MouseEvent) {
    const boundingbox: BoundingBox = this.boundingBoxs[
      this.boundingBoxs.length - 1
    ];
    if (!boundingbox.width && !boundingbox.height) {
      this.boundingBoxs.pop();
      return;
    }
    this.operationStack.push(ObjectHelper.objClone(
      this.boundingBoxs,
      []
    ) as BoundingBox[]);
  }

  clickBox(i: number) {
    if (this.mode !== 'delete') {
      this.boundingBoxs[i].selected = !this.boundingBoxs[i].selected;
    } else if (this.mode === 'delete') {
      this.boundingBoxs.splice(i, 1);
    }
    this.operationStack.push(ObjectHelper.objClone(
      this.boundingBoxs,
      []
    ) as BoundingBox[]);
  }

  startResize(e: MouseEvent) {
    const tmp: string[] = e.srcElement.id.split('-');
    // tslint:disable-next-line:radix
    const index: number = parseInt(tmp[2]);
    this.resizingBoundingBox = this.boundingBoxs[index];
    this.resizingBound = tmp[0];
    this.resizing = true;

    e.stopPropagation();
  }

  resizeBound(e: MouseEvent) {
    switch (this.resizingBound) {
      case `left`:
        this.resizingBoundingBox.svgWidth +=
          this.resizingBoundingBox.svgStart.X - e.offsetX;
        this.resizingBoundingBox.svgStart.X = e.offsetX;
        break;
      case `right`:
        this.resizingBoundingBox.svgWidth =
          e.offsetX - this.resizingBoundingBox.svgStart.X;
        break;
      case `top`:
        this.resizingBoundingBox.svgHeight +=
          this.resizingBoundingBox.svgStart.Y - e.offsetY;
        this.resizingBoundingBox.svgStart.Y = e.offsetY;
        break;
      case `bottom`:
        this.resizingBoundingBox.svgHeight =
          e.offsetY - this.resizingBoundingBox.svgStart.Y;
        break;
    }
  }

  translate(e: MouseEvent) {
    this.transX += e.movementX / this.zoom;
    this.transY += e.movementY / this.zoom;
  }

  undo() {
    switch (this.toolType) {
      case ToolType.BoundingBox:
        if (this.operationStack.length <= 0) {
          return;
        }
        this.operationStack.pop();
        this.undoBounding();
        break;
      case ToolType.Path:
        this.undoPolygon();
        break;
    }
  }

  undoPolygon() {
    this.polygonCanvas.undo();
  }

  undoBounding() {
    this.boundingBoxs = this.operationStack[this.operationStack.length - 1];
    if (!this.boundingBoxs) {
      this.boundingBoxs = [];
    }
  }
}
