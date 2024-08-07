import { Component } from '@angular/core';
import {
  RedirectWarningComponent,
  SculptureFormComponent,
} from '../../components';
import { AppRoutes, Sculpture } from '../../types';
import { CanComponentDeactivate, SculpturesService } from '../../services';
import { Router } from '@angular/router';
import { BaseLayoutComponent } from '../layouts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-sculpture-page',
  standalone: true,
  imports: [
    SculptureFormComponent,
    BaseLayoutComponent,
    RedirectWarningComponent,
    CommonModule,
  ],
  templateUrl: './add-sculpture-page.component.html',
  styleUrl: './add-sculpture-page.component.scss',
})
export class AddSculpturePageComponent implements CanComponentDeactivate {
  dataSaved: boolean = true;
  warningOpen: boolean = false;
  redirectUrl: string | undefined;

  constructor(
    private sculpturesService: SculpturesService,
    private router: Router
  ) {}

  cancel() {
    this.router.navigate([AppRoutes.Sculptures]);
  }

  updateSculpture(sculpture: Sculpture) {
    this.dataSaved = true;
    this.sculpturesService.upsertSculpture(sculpture);
    this.router.navigate([AppRoutes.Sculptures]);
  }

  confirmRedirect(): void {
    this.dataSaved = true;
    this.router.navigate([this.redirectUrl]);
  }

  cancelRedirect(): void {
    this.warningOpen = false;
  }

  setFormDirty(dirty: boolean): void {
    this.dataSaved = !dirty;
  }

  canDeactivate(): boolean {
    this.warningOpen = true;
    return this.dataSaved;
  }

  setRedirect(url: string): void {
    this.redirectUrl = url;
  }
}
