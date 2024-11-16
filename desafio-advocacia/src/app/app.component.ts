import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { AboutUsComponent } from "./about-us/about-us.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CarouselComponent, ContactFormComponent, AboutUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desafio-advocacia';
}
