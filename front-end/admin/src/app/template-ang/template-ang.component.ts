import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'cli-template-ang',
  templateUrl: './template-ang.component.html',
  styleUrls: ['./template-ang.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class TemplateAngComponent {
  // Ajoutez votre logique de composant ici
}
