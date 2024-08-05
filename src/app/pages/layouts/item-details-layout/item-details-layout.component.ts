import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-item-details-layout',
  standalone: true,
  imports: [RouterLink, CommonModule, NavigationComponent],
  templateUrl: './item-details-layout.component.html',
  styleUrl: './item-details-layout.component.scss',
})
export class ItemDetailsLayoutComponent {
  @Input({ required: true }) backRoute!: string;
  @Input({ required: true }) previousItemRoute: string | undefined | null;
  @Input({ required: true }) nextItemRoute: string | undefined | null;
}
