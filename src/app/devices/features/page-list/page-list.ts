import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CATEGORIES } from '../../data-access/device-model';
import { DeviceService } from '../../data-access/device-service';
import { DeviceCard } from '../../ui/device-card/device-card';

@Component({
  imports: [DeviceCard],
  selector: 'app-page-list',
  styleUrl: './page-list.css',
  templateUrl: './page-list.html',
})
export class PageList {
  private readonly service = inject(DeviceService);
  protected readonly router = inject(Router);
  private readonly devices = toSignal(this.service.getAll());

  protected readonly categories = CATEGORIES;
  protected readonly sortOrder = signal<'asc' | 'desc' | string>('asc');
  protected readonly categoryFilter = signal<string>('');

  protected readonly filteredDevices = computed(() => {
    const devices = this.devices() || [];

    const filteredDevice = devices.filter((device) => {
      const categoryFilter = this.categoryFilter();
      return categoryFilter ? device.category === categoryFilter : true;
    });

    switch (this.sortOrder()) {
      case 'asc':
        return filteredDevice.sort((a, b) => a.salePrice - b.salePrice);
      case 'desc':
        return filteredDevice.sort((a, b) => b.salePrice - a.salePrice);
      default:
        return filteredDevice;
    }
  });

  protected readonly deviceAmount = computed(() => {
    return this.filteredDevices().length;
  });
}
