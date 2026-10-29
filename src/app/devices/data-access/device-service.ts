import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DeviceFormModel, DeviceModel } from './device-model';

@Service()
export class DeviceService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/brewingDevices';

  getAll() {
    return this.http.get<DeviceModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<DeviceModel>(`${this.url}/${id}`);
  }

  add(device: DeviceFormModel) {
    return this.http.post<DeviceModel>(this.url, device);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  update(id: string, device: DeviceFormModel) {
    return this.http.put<DeviceModel>(`${this.url}/${id}`, device);
  }
}
