import { Component, input, output } from '@angular/core';
import { DeviceModel } from '../../data-access/device-model';

@Component({
  imports: [],
  selector: 'app-device-card',
  styleUrl: './device-card.css',
  templateUrl: './device-card.html',
})
export class DeviceCard {
  readonly device = input.required<DeviceModel>();
  readonly navigationRequest = output();
}
