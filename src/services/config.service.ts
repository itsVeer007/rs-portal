import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
    private storageSrvc: StorageService
  ) { }


  public dataFromSubheader:BehaviorSubject<any> = new BehaviorSubject([]);

  public getSitesListForUserName(): Observable<any> {
    let user = this.storageSrvc.getData('userData');
    let url  = `${environment.configUrl}/getSitesListForUserName_1_0?userName=${'ivisusnew'}`;
    return this.http.get(url);
  }

  public getCamerasForSiteId(payload: any): Observable<any> {
    let url  = `${environment.configUrl}/getCamerasForSiteId_1_0/${payload?.siteId}`;
    return this.http.get(url);
  }


  baseUrl = 'http://192.168.0.107:8000';


  // createAd(payload:any) {
  //   let url = this.baseUrl + '/proximity_ads/createAd_1_0';
  //   return this.http.post(url, payload)

  // }

  createAd(payload: any, file: any) {
    console.log(payload);
    let url = this.baseUrl + "/proximity_ads/createAd_1_0";
    let user = this.storageSrvc.getData('user');

    let formData: any = new FormData();
    formData.append('adFile', file);
    let assetData = {
      'siteId': payload?.siteId,
      'adName': payload?.adName,
      // 'fromDate': payload?.fromDate ? formatDate(payload?.fromDate, 'yyyy-MM-dd', 'en-us') : formatDate(new Date(), 'yyyy-MM-dd', 'en-us'),
      // 'toDate': payload?.toDate ? formatDate(payload?.toDate, 'yyyy-MM-dd', 'en-us') : '2999-12-31',
      'createdBy': '1545',
      'description': payload?.description,

      'adType': payload.adType,
      'category': payload?.description,
      'generic' :0
    }
    formData.append('adDetails', JSON.stringify(assetData));
    return this.http.post(url, formData);
  }


  list_categories() {
    let url = this.baseUrl + '/proximity_ads/list_categories_1_0';
    return this.http.get(url)
  }

  listAdsInfo_1_0(payload?:any) {
    let url = this.baseUrl + '/proximity_ads/listAdsForSiteId_1_0';
    let params = new HttpParams();
    if(payload?.siteId) {
      params = params.set('siteId', payload?.siteId)
    }
    if(payload?.deviceId) {
      params = params.set('deviceId', payload?.deviceId)
    }
    if(payload?.category) {
      params = params.set('category', payload?.category)
    }
    if(payload?.adType) {
      params = params.set('adType', payload?.adType)
    }
    return this.http.get(url,{params:params})
  }

  

  incidentList(payload:any) {
    let url = `${environment.incidentUrl}/incidents/incidentList_1_0`;
    let params = new HttpParams();
    // if(payload?.siteId) {
      params = params.set('siteId', 36337)
    // }
    // if(payload?.fromDate) {
      params = params.set('fromDate','2024-9-10')
    // }

    return this.http.get(url, {params:params})
  }

}
