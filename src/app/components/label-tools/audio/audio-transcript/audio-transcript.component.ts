import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';

@Component({
  selector: 'app-audio-transcript',
  templateUrl: './audio-transcript.component.html',
  styleUrls: ['./audio-transcript.component.css']
})
export class AudioTranscriptComponent implements OnInit {

  waveform: any;

  @ViewChild("waveFormElement") waveFormElement: ElementRef;

  constructor() { }

  async ngOnInit() {
    await this.loaddata('./static/audios/wave.mp3');
    this.waveform.play();

    (this.waveFormElement.nativeElement as HTMLDivElement).onclick = (event) => {
      console.log(event);
    }
  }

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
          MinimapPlugin.create()
        ]
      });

      this.waveform.on('ready', () => {
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
