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

@Component({
  selector: 'app-advertisements',
  standalone: true,
  imports: [AddNewAdvertisementComponent,
    FormsModule, ReactiveFormsModule,
    MatInputModule, LiveViewComponent,
    ViewAdvertisementComponent, SubHeaderComponent],
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

  



  ngOnInit(): void {
    this.listAdsInfo_1_0()
  }


  devicesData:any = [];
  listAdsInfoNewData:any = [];
  // listAdsInfoData:any = [];
listAdsInfo_1_0() {
    this.configSrvc.listAdsInfo_1_0().subscribe({
      next:(res:any) =>  {
        console.log(res);
        // this.listAdsInfoData = res.sites;
       this.devicesData =  res.sites.flatMap((item:any) => item.devices)
       console.log(this.devicesData)
       this.listAdsInfoNewData = this.devicesData.flatMap((item:any)=> item.ads)
      }
    })
  }

  showForm:boolean = false;

  openAddForm() {
    this.showForm = true;
  }
  close() {
    this.showForm = false;
  }


  viewAddForm:boolean = false;

  currentItem: any;
  openViewAddForm(data: any) {
    console.log(data)
    this.viewAddForm = true;
    this.currentItem = data

  }
  
  closeViewForm() {
    this.viewAddForm = false;
  }





}