import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TemplateAngComponent} from './template-ang/template-ang.component';
import {AppointementComponent} from './appointement/appointement.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplateAngComponent, AppointementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin';
}
