import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, Observable, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private sections: HTMLElement[] = [];
  private scrollEvent$: Observable<Event> | any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollEvent$ = fromEvent(window, 'scroll').pipe(
        throttleTime(100),
        map(() => window.scrollY)
      );
      this.scrollEvent$.subscribe(() => this.onScroll());
    }
  }

  registerSection(section: HTMLElement) {
    this.sections.push(section);
  }

  private onScroll() {
    let activeSectionId: string | any = null;
    let maxVisiblePercentage = 0;

    this.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const visiblePercentage = (visibleHeight / rect.height) * 100;

      // Adjusted Threshold for Bottom Sections
      const threshold = rect.bottom < window.innerHeight ? 10 : 50; // Lower threshold for sections near the bottom

      if (visiblePercentage > maxVisiblePercentage && visiblePercentage >= threshold) {
        maxVisiblePercentage = visiblePercentage;
        activeSectionId = section.getAttribute('id');
      }
    });
    if (activeSectionId) {
      this.router.navigate([], { fragment: activeSectionId });
    }
  }
}
