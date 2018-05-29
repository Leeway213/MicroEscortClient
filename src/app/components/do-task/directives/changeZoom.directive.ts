import {Directive, ElementRef, Input, HostListener} from "@angular/core";
import { ZoomChange } from "./changeZoom";
@Directive({
  selector:'[changeZoom]'
})
export class ChangeZoomDirective{
  private _defaultZoom=1;
  private el:HTMLElement;
  private oldPos:ZoomChange;
  private newPos:ZoomChange;
  @Input('inputZoom') inputZoom:number;
  // set backgroundColor(colorName:string){
  //   this.setStyle(colorName);
  // };
  constructor(el:ElementRef){
    this.el=el.nativeElement;
  }
  @HostListener('mousewheel',['$event'])
  onMousewheel(e){
      console.log(e);
    this.oldPos={
        //宿主元素到相邻父容器的左边距
        relatedParentX:this.el.offsetLeft,
        relatedParentY:this.el.offsetTop,
        //鼠标到宿主元素的x距离
        mouseX:e.offsetX,
        mouseY:e.offsetY,
        width:parseInt(this.el.style.width),
        height:parseInt(this.el.style.height)
    },
    this.newPos={
        relatedParentX:this.oldPos.relatedParentX+(1-this.inputZoom)*this.oldPos.mouseX,
        relatedParentY:this.oldPos.relatedParentY+(1-this.inputZoom)*this.oldPos.mouseY,
        mouseX:e.offsetX,
        mouseY:e.offsetY,
        width:this.oldPos.width*this.inputZoom,
        height:this.oldPos.height*this.inputZoom
    }
    //this.el.offsetLeft=this.newPos.relatedParentX;

    //this.setStyle(this.inputZoom||this._defaultZoom);
  }
}