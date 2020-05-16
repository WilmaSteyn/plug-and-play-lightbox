import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {PhotoDetails} from '../../domain/photo-details';

export class ImgStyle {
  public maxHeight: string;
  public maxWidth: string;
}

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.css']
})
export class FullscreenComponent implements OnInit, AfterViewInit {

  @Input() photoList: PhotoDetails[];
  @Input() index: number;
  @Input() cmpRef: any;

  @ViewChild('fullscreen') containerElementRef: ElementRef;

  private documentRef: Document;
  private fullscreenOpening = true;

  private swipeCoord?: [number, number];
  private swipeTime?: number;
  private screenWidth: number;
  private screenHeight: number;


  constructor() {
    this.documentRef = window.document;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elem = this.containerElementRef.nativeElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  onFullScreenChange($event) {
    if (!this.fullscreenOpening) {
      this.cmpRef.destroy();
    } else {
      this.fullscreenOpening = false;
    }
  }

  getImgWidth(): string {
    return this.screenWidth + 'px';
  }

  getImgHeight(): string {
    return this.screenHeight + 'px';
  }


  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
   }
    this.end();
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        // Do whatever you want with swipe
        if (swipe === 'next') {
          if (this.index < this.photoList.length - 1) {
            this.index++;
          }
        } else if (swipe === 'previous') {
          if (this.index > 0) {
            this.index--;
          }
        }
      }
    }
  }

  private end(): void {
    setTimeout(() => {
      this.cmpRef.destroy();
    });
  }
}
