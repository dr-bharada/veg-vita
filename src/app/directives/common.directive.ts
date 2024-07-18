import { Directive, ElementRef, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, interval, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appToggleHeader]',
  standalone: true
})
export class ToggleHeaderDirective {
  private lastScrollPos = 0;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;
    const header = this.el.nativeElement;
    if (currentScrollPos >= 50) {
      this.renderer.addClass(header, 'active');
      this.toggleHeader(currentScrollPos);
    } else {
      this.renderer.removeClass(header, 'active');
    }
    this.lastScrollPos = currentScrollPos;
  }
  private toggleHeader(currentScrollPos: number) {
    const header = this.el.nativeElement;
    if (this.lastScrollPos < currentScrollPos) {
      this.renderer.addClass(header, 'hide');
    } else {
      this.renderer.removeClass(header, 'hide');
    }
  }
}

@Directive({
  selector: '[appActiveLink]',
  standalone: true
})
export class ActiveLinkDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private scrollService: ScrollService,
    @Inject(DOCUMENT) private document :Document
  ) { }
  ngOnInit() {
    this.updateActiveClass();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveClass();
    });
    const href = this.el.nativeElement.getAttribute('href');
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      if (sectionId) {
        const sectionElement = this.document.getElementById(sectionId);
        if (sectionElement) {
          this.scrollService.registerSection(sectionElement);
        }
      }
    }
  }
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const parent = this.el.nativeElement.closest('.navbar-list');
    Array.from(parent.querySelectorAll('.navbar-link')).forEach(link => {
      this.renderer.removeClass(link, 'active');
    });
    this.renderer.addClass(this.el.nativeElement, 'active');
  }
  private updateActiveClass() {
    const currentHash = this.router.url.split('#')[1];
    if (this.el.nativeElement.getAttribute('href').includes(currentHash)) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }
}

@Directive({
  selector: '[navToggler]',
  standalone:true
})
export class NavTogglerDirective {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  @HostListener('click') onClick() {
    const navbar = this.document.querySelector('.navbar');
    const overlay = this.document.querySelector('.overlay');
    if (navbar && overlay) { // Add this check for null safety
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      this.document.body.classList.toggle('nav-active');
    } else {
        console.error('Element not found')
    }
  }
}