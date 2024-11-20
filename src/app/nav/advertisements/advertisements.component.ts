import { Component } from '@angular/core';
import { AddNewAdvertisementComponent } from '../add-new-advertisement/add-new-advertisement.component';
import { IfStmt } from '@angular/compiler';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { LiveViewComponent } from '../live-view/live-view.component';
import { ViewAdvertisementComponent } from '../view-advertisement/view-advertisement.component';
import { SubHeaderComponent } from "../sub-header/sub-header.component";
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { ConfigService } from '../../../services/config.service';
import { MetadataService } from '../../../services/metadata.service';
import { StorageService } from '../../../services/storage.service';
import { LinkAddRuleDeviceComponent } from '../link-add-rule-device/link-add-rule-device.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  imports: [AddNewAdvertisementComponent,
    FormsModule, ReactiveFormsModule,
    MatInputModule, LiveViewComponent,
    ViewAdvertisementComponent, SubHeaderComponent,
    LinkAddRuleDeviceComponent,
    CommonModule
  ],
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css'
})
export class AdvertisementsComponent {
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private assetSer: AssetService,
    // private dropDown: MetadataService,
    private alertSer: AlertService,
    // private siteService: SiteService,
    private metaSer:MetadataService,
    private configSrvc: ConfigService,
    private storageSer: StorageService,
   
  ) { }

  
  genericAds:any = []
  ngOnInit(): void {  

    // this.configSrvc.dataFromSubheader.subscribe({
    //   next:(res:any) => {
    //     console.log(res)
    //     this.genericAds = res.genericAds
    //   }
    // })
  }

  currentSite:any
  ngAfterViewInit(): void {
    this.configSrvc.current_site_sub.subscribe({
      next: (res: any) => {        
        this.currentSite = res
        this.listAdsInfo(res)
      }
    })
  }

  getStatusCounts(value: any) {
    return this.listAdsInfoData.map((item: any) => console.log(item))
  }


  siteDataForAds:any
  openSiteForAdd(data:any) {
    this.siteDataForAds = data
  }


  devicesData:any = [];
  listAdsInfoNewData:any = [];
  listAdsInfoData:any = [];
  // listAdsInfo(siteId: any) {
  //   this.configSrvc.listAdsInfo(siteId).subscribe({
  //     next: (res: any) => {
  
  //       // Extracting ads from devices
  //       this.listAdsInfoData = res.sites.flatMap((item: any) => item.devices);
  //       const devicesAds = this.listAdsInfoData.flatMap((item: any) => item.ads)
  //       // .map((ad: any) => ({ ...ad, type: 'deviceAd' }));
  //       // .map((ad: any) => ({ ...ad, type: 'siteAd' }));
  //       // Extracting siteAds
  //       const siteAds = res.sites.flatMap((item: any) => item.siteAds)
        
  //       // Merging both devicesAds and siteAds
  //       this.listAdsInfoNewData = [...devicesAds, ...siteAds];
  //     }
  //   });
  // }

  newlistAdsInfoData:any = [];
    listAdsInfo(siteId: any) {
    this.configSrvc.listAdsInfo(siteId).subscribe({
      next: (res: any) => {
        this.listAdsInfoData = res.sites.flatMap((item: any) => item.ads);
        this.newlistAdsInfoData = this.listAdsInfoData;

        this.configSrvc.filter_sub.subscribe({
          next: (res: any) => {
            console.log(res)
            this.configSrvc.listAdsInfo(res).subscribe({
              next:(res:any) => {
                this.newlistAdsInfoData = res.sites.flatMap((item:any)=> item.ads)
              }
            })
          }
        })
      }
    });
  }

  openContent: boolean = false;
  addIndex!: number;
  open(index: number) {
    this.addIndex = index;
    this.openContent = true;
  }

  showForm:boolean = false;
  openAddForm() {
    this.showForm = true;
  }
  close() {
    this.showForm = false;
  }

  viewLinkForm:boolean = false

  currentItem:any
  addRuleData:any;
  openLinkForm(item: any) {
    this.currentItem = item;
    this.configSrvc.listDeviceRules({siteId: this.currentSite?.siteId, adId: item?.adId}).subscribe({
      next:(res: any) => {
        console.log(res);
        this.addRuleData = res.sites.flatMap((item:any)=> item.Devices)
        this.configSrvc.devices.next(this.addRuleData)
      }
    })
    this.viewLinkForm = true;
  }

  closeLinkForm() {
    this.viewLinkForm = false;
  }


  openViewAddForm() {

  }

}
