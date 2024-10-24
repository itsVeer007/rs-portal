import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { ConfigService } from '../../../services/config.service';
import { MetadataService } from '../../../services/metadata.service';
import { StorageService } from '../../../services/storage.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCard } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';



@Component({
  selector: 'app-create-new-rule',
  standalone: true,
  imports: [
    MatSliderModule,
    MatInputModule,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCard,
    MatCheckboxModule,
    MatRadioModule,
    
   
            
  ],
  templateUrl: './create-new-rule.component.html',
  styleUrl: './create-new-rule.component.css',
  animations:[
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100%)" }),
        animate(
          "500ms ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateX(0)" }),
        animate(
          "500ms ease-in-out",
          style({ opacity: 0, transform: "translateX(100%)" })
        )
      ])
    ])
  ]
})
export class CreateNewRuleComponent {
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

  @Input() inputData:any
  @Output() newItemEvent = new EventEmitter<any>();


  closeForm() {
    this.newItemEvent.emit()
  }

  
  getType(type: any) {
    return this.storageSer.getType(type)[0].metadata;
  }


  addAssetForm:any = FormGroup;
  searchText: any;
  currentDate = new Date();

  personshow : boolean = false;

  toggleShowOnOff(event: any): void {
    this.personshow = !this.personshow;
      this.addAssetForm.get('modelObjectTypeId').setValue(1);
      this.addAssetForm.get('objectCount').reset();
      this.addAssetForm.get('deviceCam').reset(0);
      // this.addAssetForm.get('cameraId').reset().setValue(0);
  }
    // refreshFields(): void {
   
    //   this.addAssetForm.get('modelObjectTypeId').reset();
    //   this.addAssetForm.get('objectCount').reset();
    //   this.addAssetForm.get('deviceCam').reset();
    //   this.addAssetForm.get('cameraId').reset();
    // }
  


  objectRule:any 

  person:any = 1;
  deviceCam: any = 0;

  siteId:any
  adFor: any = null;
  enableDemo: boolean = false;

  // deviceIdFromStorage: any;
  user: any;
  finalId:any
  finalName:any
  cameralist:any =[];
  ngOnInit(): void {
    // this.user = this.storageSer.get('user');
    // this.deviceIdFromStorage = this.storageSer.get('add_body');
    this.addAssetForm = new FormGroup({
        adId : new FormControl(''),
        adHours: new FormControl('true'),
        workingDays: new FormControl('true'),
        temp: new FormControl(''),
        objectRule: new FormControl(''),
        cameraId: new FormControl(''),
        modelObjectTypeId: new FormControl(''),
        objectCount: new FormControl(1),
        createdBy: new FormControl(),
        deviceCam: new FormControl(''),

        deviceId: new FormControl(''),
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
    });


    this.listAdsInfo(this.siteId)
    this.configSrvc.dataFromSubheader.subscribe({
      next: (res:any) => {
        console.log(res)

        this.cameralist = res
      }
    })
    // this.getSitesListForUserName();
    // this.onMetadataChange()
    // this.getCamerasForSiteIdForDevice();
  }

  devicesData:any = [];
  listAdsInfoNewData:any = [];
  listAdsInfoData:any = [];
  listAdsInfo(siteId: any) {
    this.configSrvc.listAdsInfo(siteId).subscribe({
      next: (res: any) => {
  
        // Extracting ads from devices
        this.listAdsInfoData = res.sites.flatMap((item: any) => item.devices);
        const devicesAds = this.listAdsInfoData.flatMap((item: any) => item.ads).map((ad: any) => ({ ...ad, type: 'deviceAd' }));
        
        // Extracting siteAds
        const siteAds = res.sites.flatMap((item: any) => item.siteAds).map((ad: any) => ({ ...ad, type: 'siteAd' }));
        
        // Merging both devicesAds and siteAds
        this.listAdsInfoNewData = [...devicesAds, ...siteAds];
      }
    });
  }

  

 

  // siteData: any = [];
  // getSitesListForUserName() {
  //   this.siteSer.getSitesListForUserName().subscribe((res: any) => {
  //     if(res?.Status == 'Success') {
  //       this.siteData = res.sites?.sort((a: any, b: any) => a.siteId < b.siteId ? -1 : a.siteId > b.siteId ? 1 : 0);
  //     }
  //   });
    
  // }


  /* searches */
  siteSearch: any;
  searchSites(event: any) {
    this.siteSearch = (event.target as HTMLInputElement).value
  }



  /* file upload */
  selectedFile: any;
  // selectedFiles: any = [];
  onFileSelected(event: any) {
    if(typeof(event) == 'object') {
      this.selectedFile = event.target.files[0] ?? null;
    }
  }

  


  closenow() {
    this.newItemEvent.emit();
  }

 

  /* Search for Get Site and Device Id's */
  sit: string = '';
  dev: string = '';
  siteSearchh(e: Event) {
    this.sit = (e.target as HTMLInputElement).value;
  }

  deviceSer(e: Event) {
    this.dev = (e.target as HTMLInputElement).value;
  }

  /* create Asset */
  submit: boolean = false;

  

  // camerass: any = [];
  // getCamerasForSiteIdForDevice() {
  //   this.siteSer.getCamerasForSiteId(this.deviceInputData?.siteId).subscribe((res: any) => {
  //     console.log(res);
  //     this.camerass = res.cameras;
  //   })
  // }

  


  adTimes: any = {
    name: 'All',
    completed: true,
    subtasks: [
      {name: '00', completed: true},
      {name: '01', completed: true},
      {name: '02', completed: true},
      {name: '03', completed: true},
      {name: '04', completed: true},
      {name: '05', completed: true},
      {name: '06', completed: true},
      {name: '07', completed: true},
      {name: '08', completed: true},
      {name: '09', completed: true},
      {name: '10', completed: true},
      {name: '11', completed: true},
      {name: '12', completed: true},
      {name: '13', completed: true},
      {name: '14', completed: true},
      {name: '15', completed: true},
      {name: '16', completed: true},
      {name: '17', completed: true},
      {name: '18', completed: true},
      {name: '19', completed: true},
      {name: '20', completed: true},
      {name: '21', completed: true},
      {name: '22', completed: true},
      {name: '23', completed: true}
    ],
  };

  adDays: any = {
    name: 'All',
    completed: true,
    subtasks: [
      {first:'Sunday',name: '0', completed: true},
      {first:'Monday', name: '1', completed: true},
      {first:'Tuesday', name: '2', completed: true},
      {first:'Wednesday', name: '3', completed: true},
      {first:'Thursday', name: '4', completed: true},
      {first:'Friday', name: '5', completed: true},
      {first:'Saturday', name: '6', completed: true},
    ],
  };

  selectAllAddTimes: boolean = true;
  selectAllAddDays: boolean = true;
  
  updateAllComplete() {
    this.selectAllAddTimes = this.adTimes.subtasks.every((t: any) => t.completed);
  }

  updateAllComplete1() {
    this.selectAllAddDays = this.adDays.subtasks.every((t: any) => t.completed);
  }

  setAll(completed: boolean) {
    this.selectAllAddTimes = completed;
    this.adTimes.subtasks.forEach((t: any) => (t.completed = completed));
  }

  setAll1(completed: boolean) {
    this.selectAllAddDays = completed;
    this.adDays.subtasks.forEach((t: any) => (t.completed = completed));
  }

  camera:any = this.addAssetForm?.value



  // addNewAsset() {
  //   let times = this.adTimes.subtasks.filter((item: any)=> item.completed);
  //   let finalTimes = times.map((task: any) => task.name);
  //   this.addAssetForm.value.adHours = finalTimes.join(',')
  //   console.log(finalTimes.join(','));

  //   let days = this.adDays.subtasks.filter((item: any)=> item.completed);
  //   let finalDays = days.map((task: any) => task.name);
  //   this.addAssetForm.value.workingDays = finalDays.join(',')
  //   console.log(finalDays.join(','))
  //   this.addAssetForm.value.createdBy = this.user?.UserId
    
  //   if(this.deviceCam == 0 ) {
  //     this.addAssetForm.value.cameraId = this.deviceCam.toString()
  //   } else {
  //     this.addAssetForm.value.cameraId = this.addAssetForm.value.cameraId
  //   }
  //   this.addAssetForm.value.adId = this.inputData?.adId,
  //   this.objectRule == true ? this.addAssetForm.value.objectRule = 2 : this.addAssetForm.value.objectRule = 1
  //   delete this.addAssetForm.value.deviceCam


  //   this.adver.createRule(this.addAssetForm.value).subscribe((res:any)=> {
  //     console.log(res)
  //     this.newItemEvent.emit();
  //     if(res?.statusCode == 200) {
  //       this.alertSer.success(res?.message)
  //     } else {
  //       this.alertSer.error(res?.message)
  //     }
  //   },(error:any)=> {
  //     this.alertSer.error(error?.err?.message)
  //   }
  // )
  // }
 

  
  addNewAsset() {
    if(this.objectRule !== true) {
      let times = this.adTimes.subtasks.filter((item: any)=> item.completed);
      console.log(times)
        let finalTimes = times.map((task: any) => task.name);
        console.log(finalTimes)
        this.addAssetForm.value.adHours = finalTimes.join(',')
    
        let days = this.adDays.subtasks.filter((item: any)=> item.completed);
        let finalDays = days.map((task: any) => task.name);
        this.addAssetForm.value.workingDays = finalDays.join(',')

        this.addAssetForm.value.createdBy = 1545
        this.addAssetForm.value.adId = this.inputData?.adId
        this.objectRule == true ? this.addAssetForm.value.objectRule = 2 : this.addAssetForm.value.objectRule = 1
        delete this.addAssetForm.value.modelObjectTypeId
        delete this.addAssetForm.value.cameraId
        delete this.addAssetForm.value.objectCount
        delete this.addAssetForm.value.deviceCam


        this.configSrvc.createRule(this.addAssetForm.value).subscribe((res:any)=> {
          console.log(res)
        }
      )
    } else {
      let times = this.adTimes.subtasks.filter((item: any)=> item.completed);
      console.log(times)
        let finalTimes = times.map((task: any) => task.name);
        console.log(finalTimes)
        this.addAssetForm.value.adHours = finalTimes.join(',')
    
        let days = this.adDays.subtasks.filter((item: any)=> item.completed);
        let finalDays = days.map((task: any) => task.name);
        this.addAssetForm.value.workingDays = finalDays.join(',')

        this.addAssetForm.value.createdBy = 1545
        this.addAssetForm.value.adId = this.inputData?.adId
        this.objectRule == true ? this.addAssetForm.value.objectRule = 2 : this.addAssetForm.value.objectRule = 1
        delete this.addAssetForm.value.deviceCam
         if(this.deviceCam == 0 ) {
            this.addAssetForm.value.cameraId = this.deviceCam.toString()
          } else {
            this.addAssetForm.value.cameraId = this.addAssetForm.value.cameraId
          }

        this.configSrvc.createRule(this.addAssetForm.value).subscribe((res:any)=> {
          console.log(res)
        })

    }
  }

 

  pending:any =[]
  addedAd:any = []
  activated:any = []
  removed:any = []
  Deactivated:any = []

  showLoader:any
  newlistAdsInfoData:any = [];
  // listAdsInfoData:any;
  devices:any

//   listAdsInfo() {
//     this.adver.listAdsInfo().subscribe((res:any)=> {
//       // console.log(res);
//       this.siteData = res?.sites;
//       this.listAdsInfoData = res.sites.flatMap((item:any)=>item.devices);
//       this.devices = this.listAdsInfoData;
//       this.newlistAdsInfoData = this.listAdsInfoData.flatMap((item: any) => item.ads);
//       this.newlistAdsInfoData = this.newlistAdsInfoData.sort((a:any, b:any)=> a.createdTime > b.createdTime && a.active == 1 ? -1:  a.createdTime < b.createdTime ? 1 : 0);

//       for(let item of this.newlistAdsInfoData) {
//         if(item.status == 1 || item.status == 2 || item.status == 3) {
//           this.pending.push(item)
//         } 
        
//         // else  if(item.status == 3) {
//         //   this.removed.push(item)
//         // }
//         else  if(item.status == 4) {
//           this.activated.push(item)
//         }
//         else  if(item.status == 5) {
//           this.Deactivated.push(item)
//         }
//       }
//     })
// }

}
