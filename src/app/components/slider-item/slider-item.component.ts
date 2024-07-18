import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnDestroy, OnInit } from '@angular/core';
import { animationFrameScheduler, interval, Subscription } from 'rxjs';
export interface SliderItem {
  imageSrc: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  id:string
};
@Component({
  selector: 'app-slider-item',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slider-item.component.html',
  styleUrl: './slider-item.component.scss'
})
export class SliderItemComponent implements OnInit, OnDestroy {
  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) { }
  activeSlideIndex: number = 0;
  private subscription: Subscription | null = null;
  private lastChangeTime: number = 1;
  private readonly SLIDE_DURATION = 3000; // 5 seconds
  sliderItems: SliderItem[] = [
    {
      imageSrc: './assets/images/slider/slider1.jpg',
      subtitle: 'Fresh & Nutritious',
      title: 'For the love of healthy salads',
      description: 'Come with family & enjoy delicious and nutritious salads',
      buttonText: 'Explore Our Salad Menu',
      id:"1"
    },
    {
      imageSrc: './assets/images/slider/slider2.jpg',
      subtitle: 'Wholesome & Fresh',
      title: 'Flavorful sprouts',
      description: 'Come with family & savor the goodness of fresh sprouts',
      buttonText: 'Discover Our Sprout Varieties',
      id:"2"
    },
    {
      imageSrc: './assets/images/slider/slider3.jpg',
      subtitle: 'Healthy & Tasty',
      title: 'Experience the goodness',
      description: 'Come with family & enjoy mouthwatering and healthy dishes',
      buttonText: 'Explore Our Healthy Options',
      id:"3"
    }
  ];
  ngOnInit() {
    this.startSlider();
  }
  ngOnDestroy() {
    this.stopSlider();
  }
  startSlider() {
    this.stopSlider();
    this.lastChangeTime = Date.now();
    this.ngZone.runOutsideAngular(() => {
      this.subscription = interval(10, animationFrameScheduler).subscribe(() => {
        const currentTime = Date.now();
        if (currentTime - this.lastChangeTime >= this.SLIDE_DURATION) {
          this.ngZone.run(() => {
            this.nextSlide();
            this.cdr.detectChanges();
          });
          this.lastChangeTime = currentTime;
        }
      });
    });
  }
  stopSlider() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
  nextSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.sliderItems.length;
  }
  prevSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.sliderItems.length;
  }
}
