import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ngxScrollIndicatr]',
})
export class NgxScrollIndicatrDirective implements OnInit, OnChanges {
  @Input() showScrollIndicator: boolean = true;
  child: HTMLSpanElement;
  private document?: Document;

  /** @dynamic */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) doc: any
  ) {
    this.document = doc;
  }

  ngOnInit() {
    const id = Math.random().toString(16).slice(2);
    const className = `scroll-down-${id}`;

    this.child = this.document.createElement('span');
    this.child.className = className;
    this.renderer.appendChild(
      this.elementRef.nativeElement.parentNode,
      this.child
    );
    const styles = this.document.createElement('style');
    styles.innerHTML = `span.${className} {
      display: inline;
      position: fixed;
      bottom: 60px;
      left: 50%;
      width: 24px;
      height: 24px;
      margin-left: -12px;
      border-left: 2px solid grey;
      border-bottom: 2px solid grey;
      transform: rotate(-45deg);
      animation: scroll-${id} 1.5s infinite;
      box-sizing: border-box;
      z-index: 100;
    }
  
    @keyframes scroll-${id} {
      0% {
        transform: rotate(-45deg) translate(0, 0);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: rotate(-45deg) translate(-25px, 25px);
        opacity: 0;
      }
    }`;
    this.renderer.appendChild(this.elementRef.nativeElement.parentNode, styles);
  }

  ngOnChanges() {
    if (this.child) {
      this.child.style.display = this.showScrollIndicator ? 'inline' : 'none';
    }
  }
}
