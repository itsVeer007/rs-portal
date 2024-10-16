import { Injectable } from '@angular/core';
import { MetadataService } from './metadata.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private metaSrvc: MetadataService
  ) { }

  getType(type: any) {
    let data: any[] = this.getData('metaData');
    return data.filter((item: any) => item.type == type);
  }

  public saveData(name: any, data: any) {
    // let x = btoa(encodeURIComponent(JSON.stringify(data)));
    // localStorage.setItem(name, x);
    localStorage.setItem(name, JSON.stringify(data));
  }

  public getData(data: any) {
    // let x: any = localStorage.getItem(data);
    // return JSON.parse(decodeURIComponent(atob(x)));
    return JSON.parse(localStorage.getItem(data)!);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
  
}
