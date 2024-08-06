import { Component } from '@angular/core';
import { SculptureComponent } from '../../components/sculpture/sculpture.component';
import { SculpturesService } from '../../services';
import { Router } from '@angular/router';
import { Sculpture } from '../../types';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from '../layouts';

@Component({
  selector: 'app-sculptures-page',
  standalone: true,
  imports: [BaseLayoutComponent, SculptureComponent, CommonModule],
  templateUrl: './sculptures-page.component.html',
  styleUrl: './sculptures-page.component.scss',
})
export class SculpturesPageComponent {
  sculptures: Sculpture[] = [];

  constructor(
    private sculpturesService: SculpturesService,
    private router: Router
  ) {
    this.sculptures = this.sculpturesService.getAllSculptures();
  }

  sculptureSelectedHandler(sculpture: Sculpture): void {
    this.router.navigate(['sculptures', sculpture.id]);
  }

  sculptureDeletedHandler(sculpture: Sculpture): void {
    this.sculptures = this.sculpturesService.deleteSculpture(sculpture.id);
  }
}
