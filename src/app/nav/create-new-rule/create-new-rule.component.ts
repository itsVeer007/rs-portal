import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
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
import { CommonModule, formatDate } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCard } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewRuleComponent } from '../new-rule/new-rule.component';
import { ValidatePipe } from '../../../pipes/validate.pipe';





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
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    NewRuleComponent,
    ValidatePipe
],
  templateUrl: './create-new-rule.component.html',
  styleUrl: './create-new-rule.component.css',
  animations:[
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(100%)" }),
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
    private dialog:MatDialog
   
  ) { }

  @Input() inputData: any;
  @Input() second: any;
  @Input() site: any;
  @Input() deviceIdFromParent: any;
  
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() listApiEvent = new EventEmitter<any>();


  closeForm() {
    this.newItemEvent.emit();
  }

  
  getType(type: any) {
    return this.storageSer.getType(type)[0].metadata;
  }

  ngOnChanges() {
  console.log(this.deviceIdFromParent)
}

 // Custom Validator
 customValidator(control: any) {
  const value = control.value;
  return value >= 5 && value < 10 ? null : { invalid: true };
}

validateInput() {
  const control = this.numberForm.get('numberInput');
  const value = control?.value;

  // If value doesn't meet criteria, reset
  if (value && (value < 5 || value >= 10 || value.toString().length > 1)) {
    control?.setValue('');
  }
}


  addAssetForm: any = FormGroup;
  searchText: any;
  currentDate = new Date();
  personshow : boolean = false;

  toggleShowOnOff(event: any): void {
    this.personshow = !this.personshow;
      this.addAssetForm.get('objectType').setValue(1);
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
  objectCount:any
  cameralist:any =[];
  ngOnInit(): void {
    // console.log(this.inputData)
    // this.user = this.storageSer.get('user');
    // this.deviceIdFromStorage = this.storageSer.get('add_body');
    this.addAssetForm = new FormGroup({
        adId : new FormControl(''),
        fromTime: new FormControl('00'),  // default value
        toTime: new FormControl('23'),  
        adHours: new FormControl('00-23'),
        workingDays: new FormControl('true'),
        temp: new FormControl('All'),
        objectRule: new FormControl(''),
        // cameraId: new FormControl(''),
        objectType: new FormControl(''),
        // objectCount: ['', [Validators.required, this.customValidator]],
        objectCount: new FormControl(),
        createdBy: new FormControl(),
        deviceCam: new FormControl(''),
        deviceId: new FormControl(''),
        fromDate: new FormControl('', Validators.required),
        toDate: new FormControl('', Validators.required),
        siteId:new FormControl('')
    });

    this.addAssetForm.get('deviceId').setValue(this.deviceIdFromParent.deviceId)
    this.listAdsInfo(this.siteId)
    this.configSrvc.dataFromSubheader.subscribe({
      next: (res:any) => {
        this.cameralist = res
      }
    })
    this.configSrvc.site_add_sub.next({ siteId: this.site?.siteId, adId: this.inputData?.adId })
    this.configSrvc.dataFromSubheader.subscribe({
      next: (res:any) => {
        this.cameralist = res
      }
    })
    // this.getSitesListForUserName();
    // this.onMetadataChange()
    // this.getCamerasForSiteIdForDevice();
  }

  
  cameraId:any

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

  submitFor() {
    this.configSrvc.addCam({deviceId: this.deviceIdFromParent.deviceId, cameraId :this.cameraId ? this.cameraId : "0", createdBy: 1545}).subscribe((res: any) => {
      console.log(res);
      if(res.statusCode == 200) {
        // this.listApiEvent.emit();
        this.alertSer.success(res.message)
      }
    })
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
      {first:'SUN',name: '0', completed: true},
      {first:'MON', name: '1', completed: true},
      {first:'TUE', name: '2', completed: true},
      {first:'WED', name: '3', completed: true},
      {first:'THU', name: '4', completed: true},
      {first:'FRI', name: '5', completed: true},
      {first:'SAT', name: '6', completed: true},
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
  addNewAsset() {
    if(this.objectRule !== true) {
      // let times = this.adTimes.subtasks.filter((item: any)=> item.completed);
      // console.log(times)
      //   let finalTimes = times.map((task: any) => task.name);
      //   console.log(finalTimes)
      //   this.addAssetForm.value.adHours = finalTimes.join(',')
    
        let days = this.adDays.subtasks.filter((item: any)=> item.completed);
        let finalDays = days.map((task: any) => task.name);
        this.addAssetForm.value.workingDays = finalDays.join(',')
        this.addAssetForm.value.fromDate = formatDate(this.addAssetForm.value.fromDate , 'yyyy-MM-dd', 'en-us')
        this.addAssetForm.value.toDate = formatDate(this.addAssetForm.value.toDate, 'yyyy-MM-dd', 'en-us')
        this.addAssetForm.value.createdBy = 1545
        this.addAssetForm.value.siteId = this.site.siteId
        this.addAssetForm.value.adId = this.inputData?.adId
        this.objectRule == true ? this.addAssetForm.value.objectRule = 2 : this.addAssetForm.value.objectRule = 1
        delete this.addAssetForm.value.objectType
        delete this.addAssetForm.value.cameraId
        delete this.addAssetForm.value.objectCount
        delete this.addAssetForm.value.deviceCam
        delete this.addAssetForm.value.fromTime
        delete this.addAssetForm.value.toTime
        this.configSrvc.createRule(this.addAssetForm.value).subscribe((res:any) => {
          this.newItemEvent.emit();
              if(res?.statusCode == 200) {
                this.alertSer.success(res?.message)
                // this.alertSer.confirmDelete().then((result:any) => {
                //   if(result.isConfirmed) {
                //     this.alertSer.ruleMethod({deviceId: this.deviceIdFromParent.deviceId})
                //   }
                // })
              } else {
                this.alertSer.error(res?.message)
              }
        }
      )
    } else {
      // let times = this.adTimes.subtasks.filter((item: any)=> item.completed);
      // console.log(times)
      //   let finalTimes = times.map((task: any) => task.name);
      //   console.log(finalTimes)
      //   this.addAssetForm.value.adHours = finalTimes.join(',')
        let days = this.adDays.subtasks.filter((item: any)=> item.completed);
        let finalDays = days.map((task: any) => task.name);
        this.addAssetForm.value.workingDays = finalDays.join(',')

        this.addAssetForm.value.fromDate = formatDate(this.addAssetForm.value.fromDate , 'yyyy-MM-dd', 'en-us')
        this.addAssetForm.value.toDate = formatDate( this.addAssetForm.value.toDate, 'yyyy-MM-dd', 'en-us')
        this.addAssetForm.value.createdBy = 1545
          this.addAssetForm.value.siteId = this.site.siteId
        this.addAssetForm.value.adId = this.inputData?.adId
        this.objectRule == true ? this.addAssetForm.value.objectRule = 2 : this.addAssetForm.value.objectRule = 1
        this.addAssetForm.value.objectCount = this.addAssetForm.value.objectCount ? this.addAssetForm.value.objectCount : 1;
        delete this.addAssetForm.value.deviceCam
        delete this.addAssetForm.value.fromTime
        delete this.addAssetForm.value.toTime
        //  if(this.deviceCam == 0 ) {
        //     this.addAssetForm.value.cameraId = this.deviceCam.toString()
        //   } else {
        //     this.addAssetForm.value.cameraId = this.addAssetForm.value.cameraId
        //   }
        this.configSrvc.createRule(this.addAssetForm.value).subscribe((res: any) => {
          this.newItemEvent.emit();
          if(this.deviceIdFromParent.cameraId == null) {
            this.alertSer.confirmDelete().then((res) => {
              if(res.isConfirmed) {              
                this.dialog.open(this.viewCameraSelection)
              }
            })
          } else {
            this.alertSer.success(res.message)
          }

          // if(res?.statusCode == 200) {
          //   // this.alertSer.success(res?.message)
          //   this.alertSer.confirmDelete().then((result:any) => {
          //     if(result.isConfirmed) {
          //       this.alertSer.ruleMethod({deviceId: this.deviceIdFromParent.deviceId})
          //     }
          //   })
          // } else {
          //   this.alertSer.error(res?.message)
          // }
        })

    }
  }


  @ViewChild('viewCameraSelection') viewCameraSelection!: TemplateRef<any>;


 

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



timeIntervals: { fromTime: string; toTime: string }[] = [];


addTimeInterval() {
  const fromTime = this.addAssetForm.get('fromTime')?.value;
  const toTime = this.addAssetForm.get('toTime')?.value;

  if (fromTime && toTime) {


    // Check if toTime is greater than fromTime
    if (fromTime >= toTime) {
      this.alertSer.error('To Time must be greater than From Time.');
      return; // Stop execution
    }
    // Add new interval to the array
    this.timeIntervals.push({ fromTime, toTime });

    // Update adHours with comma-separated intervals (without quotes)
    const adHoursValue = this.timeIntervals
      .map(interval => `${interval.fromTime.toString()}-${interval.toTime.toString()}`)
      .join(', ');

    this.addAssetForm.get('adHours')?.setValue(adHoursValue);

    // Reset the fromTime and toTime inputs
    this.addAssetForm.patchValue({ fromTime: '', toTime: '' });
  }
}

// removeReactiveKeyword(keyword: any) {
//   this.timeIntervals.update((keywords:any) => {
//     const index = keywords.indexOf(keyword);
//     if (index < 0) {
//       return keywords;
//     }

//     keywords.splice(index, 1);
//     this.announcer.announce(`removed ${keyword} from reactive form`);
//     return [...keywords];
//   });
// }

chips: string[] = ['Chip 1', 'Chip 2', 'Chip 3']; // Example chip data

removeChip(index: number): void {
  if (index >= 0) {
    this.timeIntervals.splice(index, 1); // Removes the chip at the given index
  }
}



numberForm:any
allowedNumbers = [1, 2, 3, 4, 5];
  // Custom Validator
  validateAllowedNumbers(control: AbstractControl) {
    const value = Number(control.value);
    if (this.allowedNumbers.includes(value) || control.value === null) {
      return null; // Valid
    }
    return { invalidNumber: true }; // Invalid
  }

  // Input Restriction Logic
  restrictToAllowedNumbers(event: Event): void {
    const input = (event.target as HTMLInputElement);
    const value = parseInt(input.value, 10);

    if (!this.allowedNumbers.includes(value)) {
      input.value = ''; // Clear the invalid input
      this.numberForm.get('personCount')?.setValue(null); // Reset the form control
    }
  }



}
