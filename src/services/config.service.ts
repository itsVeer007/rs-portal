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


  public dataFromSubheader: BehaviorSubject<any> = new BehaviorSubject([]);
  public numberFromSub: BehaviorSubject<any> = new BehaviorSubject(null);
  public current_site_sub: BehaviorSubject<any> = new BehaviorSubject(null);

  public site_add_sub: BehaviorSubject<any> = new BehaviorSubject({});

  public devices_sub: BehaviorSubject<any> = new BehaviorSubject(null);
  public filter_sub: BehaviorSubject<any> = new BehaviorSubject({});

  // public currentpage_sub: BehaviorSubject<any> = new BehaviorSubject(1);
  public paginated_cam_sub: BehaviorSubject<any> = new BehaviorSubject(null);


  public getSitesListForUserName(): Observable<any> {
    let user = this.storageSrvc.getData('user');
    // let url  = `${environment.configUrl}/getSitesListForUserName_1_0?userName=${'ivisusnew'}`;
    let url  = `${environment.configUrl}/getSitesListForUserName_1_0`;
    let params = new HttpParams().set('userName', user?.UserName);
    return this.http.get(url, {params:params});
  }

  public getCamerasForSiteId(payload: any): Observable<any> {
    let url  = `${environment.configUrl}/getCamerasForSiteId_1_0/${payload?.siteId}`;
    return this.http.get(url);
  }



  createAd(payload: any, file: any) {
    let url =`${environment.adsUrl}/proximity_ads/createAd_1_0`;
    let user = this.storageSrvc.getData('user');
    let formData: any = new FormData();
    formData.append('adFile', file);
    let assetData = {
      'siteId': payload?.siteId,
      'adName': payload?.adName,
      // 'fromDate': payload?.fromDate ? formatDate(payload?.fromDate, 'yyyy-MM-dd', 'en-us') : formatDate(new Date(), 'yyyy-MM-dd', 'en-us'),
      // 'toDate': payload?.toDate ? formatDate(payload?.toDate, 'yyyy-MM-dd', 'en-us') : '2999-12-31',
      'createdBy': user?.UserId,
      'description': payload?.description,
      'adType': payload.adType,
      'category': payload?.category,
      'generic' :0
    }
    formData.append('adDetails', JSON.stringify(assetData));
    return this.http.post(url, formData);
  }


  list_categories() {
    let url = `${environment.adsUrl}/proximity_ads/list_categories_1_0`;
    return this.http.get(url)
  }

  listAdsInfo(payload?:any) {
    // console.log(payload)
    let url = `${environment.adsUrl}/proximity_ads/listAdsForSiteId_1_0`;
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

  genericAdsInfo() {
    let url = `${environment.adsUrl}/proximity_ads/genericAdsInfo_1_0`;
    return this.http.get(url)
  }

  listDeviceRules(payload:any) {
    let url =`${environment.adsUrl}/proximity_ads/listDeviceRules/${payload.adId}/${payload.siteId}`;
    return this.http.get(url)
  }

  listDeviceInfo(payload?:any) {
    let url = `${environment.adsUrl}/proximity_ads/listDeviceInfo_1_0`;
    let params = new HttpParams();
    if(payload?.siteId) {
      params = params.set('siteId', payload?.siteId)
    }
    if(payload?.deviceId) {
      params = params.set('deviceId', payload?.deviceId)
    }
    if(payload?.adId) {
      params = params.set('adId', payload?.adId)
    }
    return this.http.get(url,{params:params})
  }

  listDeviceFilter(payload?:any) {
    let url = `${environment.adsUrl}/proximity_ads/listDeviceDetails_1_0`;
    let params = new HttpParams();
    if(payload?.siteId) {
      params = params.set('siteId', payload?.siteId)
    }
    if(payload?.deviceId) {
      params = params.set('deviceId', payload?.deviceId)
    }
    if(payload?.adId) {
      params = params.set('adId', payload?.adId)
    }
    return this.http.get(url,{params:params})
  }

  // listRulesbyAdId(payload?:any) {
  //   let url = this.adsUrl + '/proximity_ads/listRulesByAdId_1_0';
  //   let params = new HttpParams();
  //   if(payload?.siteId) {
  //     params = params.set('siteId', payload?.siteId)
  //   }
  //   if(payload?.deviceId) {
  //     params = params.set('deviceId', payload?.deviceId)
  //   }
  //   if(payload?.adId) {
  //     params = params.set('adId', payload?.adId)
  //   }
  //   return this.http.get(url,{params:params})
  // }

  listRulesInfo(payload: any) {
    let user = this.storageSrvc.getData('user')
    let url = `${environment.adsUrl}/proximity_ads/listRulesInfo_1_0`;
    payload.createdBy = user?.UserId
    let params = new HttpParams();
    if(payload?.siteId) {
      params = params.set('siteId', payload?.siteId)
    }
    if(payload?.deviceId) {
      params = params.set('deviceId', payload?.deviceId)
    }
    if(payload?.adId) {
      params = params.set('adId', payload?.adId)
    }
    return this.http.get(url, {params:params})
  }

  createRule(payload:any) {
    console.log(payload)
    let user = this.storageSrvc.getData('user')
    payload.createdBy = user?.UserId
    let url = `${environment.adsUrl}/proximity_ads/createRule_1_0`;

    return this.http.post(url, payload)
  }

deviceAdRuleConn(payload:any) {
  let user = this.storageSrvc.getData('user')
  payload.createdBy = user?.UserId
  let url = `${environment.adsUrl}/proximity_ads/createRule_1_0`;
  // payload.workingDays = payload?.workingDays?.join(',')
  return this.http.post(url, payload)
}

deviceRulesActiveInfo(payload?:any) {
  let url = `${environment.adsUrl}/proximity_ads/deviceRulesActiveInfo_1_0`;
  let params = new HttpParams();
  if(payload?.deviceId) {
    params = params.set('deviceId', payload?.deviceId)
  }
  if(payload?.adId) {
    params = params.set('adId', payload?.adId)
  }
  return this.http.get(url, {params:params})
}

deleteRule(payload: any) {
  let url = `${environment.adsUrl}/proximity_ads/deleteRule_1_0`;
  return this.http.delete(url, {params: payload})

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

  addCam(payload:any) {
    let user = this.storageSrvc.getData('user')
    let url = `${environment.adsUrl}/proximity_ads/addCameraForDevice_1_0`;
    payload.createdBy = user.UserId
    // let params = new HttpParams().set('deviceId', payload?.deviceId).set('cameraId', payload?.cameraId).set('createdBy', 1);
    return this.http.post(url, payload);
  }


  
}
