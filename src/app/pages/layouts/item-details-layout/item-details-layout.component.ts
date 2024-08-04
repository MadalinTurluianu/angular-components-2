import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-details-layout',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './item-details-layout.component.html',
  styleUrl: './item-details-layout.component.scss',
})
export class ItemDetailsLayoutComponent {
  @Input({ required: true }) backRoute!: string;
  @Input({ required: true }) previousItemRoute: string | undefined;
  @Input({ required: true }) nextItemRoute: string | undefined;
}
