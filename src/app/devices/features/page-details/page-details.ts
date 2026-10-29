import { Component, inject, OnInit, signal } from '@angular/core';
import { PageForm } from '../page-form/page-form';
import { DeviceService } from '../../data-access/device-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceModel } from '../../data-access/device-model';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [PageForm],
  selector: 'app-page-details',
  styleUrl: './page-details.css',
  templateUrl: './page-details.html',
})
export class PageDetails implements OnInit {
  private readonly service = inject(DeviceService);
  protected readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);
  private readonly id = this.route.snapshot.paramMap.get('id');

  protected readonly device = signal<DeviceModel | null>(null);
  protected readonly isEditing = signal(false);
  protected readonly showPanel = signal<'notes' | 'cupProfile'>('notes');

  async ngOnInit() {
    if (this.id) {
      const device = await firstValueFrom(this.service.getById(this.id));
      this.device.set(device);
    } else {
      alert('No se reconocio ningun dispositivo. Redirigiendo...');
      this.router.navigate(['/devices']);
    }
  }

  async onDelete() {
    if (!confirm('Desea eliminar el dispositivo?') || !this.id) return;
    await firstValueFrom(this.service.delete(this.id));
    alert('Producto eliminado');
    this.router.navigate(['/devices']);
  }

  onEdit(device: DeviceModel) {
    this.device.set(device);
    this.isEditing.set(false);
  }
}
