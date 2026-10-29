import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { form, FormField, FormRoot, min, required } from '@angular/forms/signals';
import { DeviceService } from '../../data-access/device-service';
import { CATEGORIES, DeviceFormModel, DeviceModel } from '../../data-access/device-model';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [FormRoot, FormField],
  selector: 'app-page-form',
  styleUrl: './page-form.css',
  templateUrl: './page-form.html',
})
export class PageForm implements OnInit {
  private readonly service = inject(DeviceService);

  protected readonly emptyDevice: DeviceFormModel = {
    modelName: '',
    category: '',
    salePrice: Number.NaN,
    brand: '',
    material: '',
    isInStore: false,
    notes: '',
    cupProfile: '',
  };

  private readonly deviceFormModel = signal({ ...this.emptyDevice });

  readonly editingDevice = input<DeviceModel>();
  readonly editedDevice = output<DeviceModel>();
  protected readonly isEditing = computed(() => this.editingDevice() !== undefined);

  ngOnInit() {
    const editingDevice = this.editingDevice();
    if (editingDevice && this.isEditing()) {
      this.deviceFormModel.set(editingDevice);
    }
  }

  protected readonly categories = CATEGORIES;

  protected readonly deviceForm = form(
    this.deviceFormModel,
    (device) => {
      required(device.modelName, { message: 'Nombre requerido' });
      required(device.category, { message: 'categoria requerida' });
      required(device.salePrice, { message: 'Precio requerido' });
      min(device.salePrice, 1, { message: 'Precio minimo 1' });
      required(device.brand, { message: 'Marca requerida' });
      required(device.material, { message: 'Material requerido' });
      required(device.notes, { message: 'La descripcion no puede estar en blanco' });
      required(device.cupProfile, { message: 'El perfil de taza no puede estar en blanco' });
    },
    {
      submission: {
        action: async (fieldTree) => {
          if (!confirm('Desea guardar?')) return;
          const device = fieldTree().value();
          const id = this.editingDevice()?.id;
          if (id && this.isEditing()) {
            const editedDevice = await firstValueFrom(this.service.update(id, device));
            alert('Modificado!');
            this.editedDevice.emit(editedDevice);
          } else {
            await firstValueFrom(this.service.add(device));
            alert('Agregado!');
            this.formReset();
          }
        },
        onInvalid: () => {
          alert('Revise el formulario!');
        },
      },
    },
  );

  formReset() {
    return this.deviceForm().reset({ ...this.emptyDevice });
  }
}
