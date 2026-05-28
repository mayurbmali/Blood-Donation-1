import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="custom-chip" [ngClass]="getChipClass()">
      {{ status }}
    </span>
  `,
  styles: [`
    .custom-chip {
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
      text-transform: uppercase;
    }
  `]
})
export class StatusChipComponent {
  @Input() status: string = '';

  getChipClass(): string {
    const s = this.status ? this.status.toUpperCase() : '';
    if (s === 'PENDING' || s === 'LOW') {
      return 'chip-pending';
    } else if (s === 'APPROVED' || s === 'OK') {
      return 'chip-approved';
    } else if (s === 'REJECTED' || s === 'CRITICAL') {
      return 'chip-rejected';
    }
    return '';
  }
}
