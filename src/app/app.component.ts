import {Component, HostListener, OnInit} from '@angular/core';
import {PhotoDetails} from './domain/photo-details';
import {Lightbox} from './components/lightbox/services/lightbox.service';
import {FullscreenService} from './components/fullscreen/services/fullscreen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'standalone-lightbox';

  private screenWidth: number;

  public constructor(private lightbox: Lightbox,
                     private fullscreenService: FullscreenService) {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('document:showPhoto', ['$event'])
  onShowPhoto($event) {
    const e = $event;
    const photo: PhotoDetails = new PhotoDetails();
    photo.url = e.detail.url;
    photo.title = e.detail.title;

    const photoList = new Array();
    photoList.push(photo);

    if (this.screenWidth > 480) {
      this.lightbox.open(photoList, 0);
    } else {
      this.fullscreenService.open(photoList, 0);
    }
  }

  @HostListener('document:showGallery', ['$event'])
  onShowGallery($event) {
    const e = $event;
    const photo: PhotoDetails = new PhotoDetails();
    photo.url = e.detail.url;
    photo.title = e.detail.title;

    const photoList = new Array();
    photoList.push(photo);

    if (this.screenWidth > 480) {
      this.lightbox.open(photoList, 0);
    } else {
      this.fullscreenService.open(photoList, 0);
    }
  }

}
