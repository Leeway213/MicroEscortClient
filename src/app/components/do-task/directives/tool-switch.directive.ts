import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appToolSwitch]'
})
export class ToolSwitchDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
