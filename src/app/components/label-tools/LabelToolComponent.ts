import { BoundingBoxComponent } from './image-annotation/bounding-box/bounding-box.component';
import { Type } from '@angular/core';
import { PolygonComponent } from './image-annotation/polygon/polygon.component';
import { PointComponent } from './image-annotation/point/point.component';
import {AudioTranscriptComponent} from './audio/audio-transcript/audio-transcript.component';
export interface LabelToolComponent {
  data: any;
  width?: number;
  height?: number;
  mode?: 'draw' | 'select' | 'delete';
  zoom?: number;
  blockKeyInMouseEvent?: 'ctrlKey' | 'shiftKey' | 'altKey';
  canUndo?: boolean;
  undo();
  getResult(): any;
  refresh();
  label(args?: any);
}


export const labelTools: {[key: string]: Type<LabelToolComponent>} = {
  'boundingbox': BoundingBoxComponent,
  'polygon': PolygonComponent,
  'point': PointComponent,
  'audiotranscription':AudioTranscriptComponent
};
