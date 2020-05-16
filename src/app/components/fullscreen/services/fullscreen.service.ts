import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {FullscreenComponent} from '../fullscreen.component';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  private documentRef: Document;

  private componentRef: ComponentRef<any>;

  private screenWidth: number;
  private screenHeight: number;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              private applicationRef: ApplicationRef) {
    this.documentRef = window.document;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  open(photoList, index) {
    this.componentRef = this._createComponent(FullscreenComponent);

    this.componentRef.instance.photoList = photoList;
    this.componentRef.instance.index = index;
    this.componentRef.instance.cmpRef = this.componentRef;

    this.applicationRef.attachView(this.componentRef.hostView);
    this.componentRef.onDestroy(() => {
      this.applicationRef.detachView(this.componentRef.hostView);
    });

    this.documentRef.querySelector('body').appendChild(this.componentRef.location.nativeElement);
  }

  _createComponent(ComponentClass: any): ComponentRef<any> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    const component = factory.create(this.injector);

    return component;
  }

}
