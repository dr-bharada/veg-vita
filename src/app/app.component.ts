import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActiveLinkDirective, NavTogglerDirective, ToggleHeaderDirective } from './directives/common.directive';
import { ScrollService } from './services/scroll.service';
import { SliderItemComponent } from './components/slider-item/slider-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToggleHeaderDirective, ActiveLinkDirective, NavTogglerDirective,SliderItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ScrollService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  activeIndex = 0;
  sprinner: boolean = false
  title = 'veg-vita';
  email = "vegvita7@gmail.com"
  navbarItems = [
    { href: '#home', label: 'Home', active: true },
    { href: '#menu', label: 'Menus', active: false },
    { href: '#contactUs', label: 'Contact Us', active: false }
  ];
  sliderItems = [
    {
      imageSrc: './assets/images/slider/slider1.jpg',
      subtitle: 'Fresh & Nutritious',
      title: 'For the love of healthy salads',
      description: 'Come with family & enjoy delicious and nutritious salads',
      buttonText: 'Explore Our Salad Menu'
    },
    {
      imageSrc: './assets/images/slider/slider2.jpg',
      subtitle: 'Wholesome & Fresh',
      title: 'Flavorful sprouts',
      description: 'Come with family & savor the goodness of fresh sprouts',
      buttonText: 'Discover Our Sprout Varieties'
    },
    {
      imageSrc: './assets/images/slider/slider3.jpg',
      subtitle: 'Healthy & Tasty',
      title: 'Experience the goodness',
      description: 'Come with family & enjoy mouthwatering and healthy dishes',
      buttonText: 'Explore Our Healthy Options'
    }
  ];
  serviceItems = [
    {
      imageSrc: './assets/images/service/service1.png',
      title: 'Breakfast',
      link: '#menu'
    },
    {
      imageSrc: './assets/images/service/service2.png',
      title: 'Lunch/Dinner',
      link: '#menu'
    },
    {
      imageSrc: './assets/images/service/service3.png',
      title: 'Juices',
      link: '#menu'
    }
  ];
  menuItems = [
    {
      imageSrc: './assets/images/menu-list/menu1.png',
      title: 'Sweet Corn Salad',
      badge: 'Seasonal',
      description: 'Sweet Corn, Cucumber, Capsicum, Carrot, Lemon, Masala',
      link: '#'
    },
    {
      imageSrc: './assets/images/menu-list/menu2.png',
      title: 'Paneer Salad (Sautéed)',
      description: 'Paneer 50g, Capsicum, Cucumber, Tomato, Lemon, Masala',
      link: '#'
    },
    {
      imageSrc: './assets/images/menu-list/menu3.png',
      title: 'Mix Vegetable Salad',
      description: 'Carrot, Cabbage, Beet Root, Capsicum, Cucumber, Tomato, Lemon, Masala, Curd',
      link: '#'
    },
    {
      imageSrc: './assets/images/menu-list/menu4.png',
      title: 'Mix Kathol Salad',
      badge: 'New',
      description: 'Mix boiled kathol, Carrot, Onion, Tomato, Lemon, Masala',
      link: '#'
    },
    {
      imageSrc: './assets/images/menu-list/menu5.png',
      title: 'Cucumber Onion (Dressing)',
      description: 'Cucumber, Onion, Sweet corn, Chilli flakes, Oregano, Black pepper powder, Honey, Lemon, Masala, Curd',
      link: '#'
    },
    {
      imageSrc: './assets/images/menu-list/menu6.png',
      title: 'Roasted Peanuts Salad',
      description: 'Roasted Peanuts, Chickpeas, Cucumber, Capsicum, Lemon, Masala',
      link: '#'
    }
  ];
  constructor() { 
        // setInterval(() => this.nextSlide() , 30000);
  }
  ngOnInit(): void {
  }
  nextSlide() {
    console.trace("next slide working");
    this.activeIndex = (this.activeIndex + 1) % this.sliderItems.length;
    console.log(this.activeIndex);
  }
  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.sliderItems.length) % this.sliderItems.length;
  }
}
