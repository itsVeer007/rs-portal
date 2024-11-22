import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ViewAdvertisementComponent } from '../view-advertisement/view-advertisement.component';
import { ConfigService } from '../../../services/config.service';
import { StorageService } from '../../../services/storage.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateNewRuleComponent } from '../create-new-rule/create-new-rule.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchPipe } from "../../../pipes/search.pipe";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NewRuleComponent } from '../new-rule/new-rule.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { formatDate } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { CommonModule } from '@angular/common';
import { RemoveDuplicatesPipe } from "../../../pipes/remove-duplicates.pipe";
import { RulesPipe } from "../../../pipes/rules.pipe";
import { LoaderComponent } from "../../utilities/loader/loader.component";



@Component({
  selector: 'app-link-add-rule-device',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    ViewAdvertisementComponent,
    CreateNewRuleComponent,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCheckboxModule,
    SearchPipe,
    MatButtonToggleModule,
    NewRuleComponent,
    MatTooltipModule,
    CommonModule,
    RemoveDuplicatesPipe,
    RulesPipe,
    LoaderComponent
],
  templateUrl: './link-add-rule-device.component.html',
  styleUrl: './link-add-rule-device.component.css'
})
export class LinkAddRuleDeviceComponent {

  constructor(
    private configSrvc: ConfigService,
    private storageSer: StorageService,
    private dialog: MatDialog,
    private alertSer: AlertService,
  ) { }

  // @Input() dataFromAds: any;
  @Input() currentAdd: any;
  @Input() currentSite: any;
  @Output() newItemEvent = new EventEmitter<any>()

  deviceSearch!: string;
  ruleSearch!: string;
  currentDate = new Date();

  // searchSite:any
  // searchSites(event: any) {
  //   this.searchSite = (event.target as HTMLInputElement).value;
  // }

  searchDevice: any
  searchDevices(event: any) {
    this.searchDevice = (event.target as HTMLInputElement).value;
  }

  fontStyleControl = new FormControl('');
  fontStyle!: string;
  personshow: boolean = false;
  cameralist:any =[]
  modifiedWorkingDays: any;
  showLoader: boolean = false;
  ngOnInit() {
    this.listDeviceInfo();
    this.listRulesbyAdId();

    this.configSrvc.site_add_sub.next({ siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId })
    this.configSrvc.dataFromSubheader.subscribe({
      next: (res:any) => {
        this.cameralist = res
      }
    })
  }

  getType(type: any) {
    return this.storageSer.getType(type)[0].metadata;
  }

  newRulesData: any = [];
  weekdayays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // listDeviceRules() {
  //   this.configSrvc.listDeviceRules({ siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId }).subscribe({
  //     next: (res: any) => {
  //       this.devicesData = res.sites.flatMap((item: any) => item.Devices);
  //       this.rulesData = this.devicesData.flatMap((item: any) => item.rules);
  //       this.newRulesData = this.rulesData;

  //       this.openRuleFormFor(this.devicesData[0]);
  //       this.newRulesData.forEach((el: any) => {
  //         el.workingDays = el.workingDays.split(',').map((el: any) => +el);
  //       });
  //     }
  //   })
  // }

  listDeviceInfo() {
    this.showLoader = true;
    this.configSrvc.listDeviceInfo({ siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId }).subscribe({
      next: (res: any) => {
        this.showLoader = false;
        this.devicesData = res.sites.flatMap((item: any) => item.Devices);
        // this.openRuleFormFor(this.devicesData[0]);
      },
      error: (err: any) => {
        this.showLoader = false;
      }
    })
  }

  listRulesbyAdId() {
    // this.showLoader = true;

    this.configSrvc.listRulesInfo({
      siteId: this.currentSite?.siteId,
      adId: this.currentAdd?.adId,
      deviceId: this.currentDevice?.deviceId,
    }).subscribe({
      next: (res: any) => {
        this.showLoader = false;
        this.rulesData = res.rules.sort((a: any, b: any) => a.fromDate ? -1 : 1)
        this.newRulesData = this.rulesData;

        this.newRulesData.forEach((el: any) => {
          let x = el.workingDays.split(',').map((val: any) => +val);
          el.workingDays = x
          });
      },
      error: (err: any) => {
        this.showLoader = false;
      }
    })
  }

  RuleForm: boolean = false;
  createRuleForm() {
    this.RuleForm = true;
  }

  closereateRuleForm() {
    this.RuleForm = false;
  }


  currentRuleData: any
  rulesData: any = [];
  devicesData: any = [];
  // getDevicesAndRulesData() {
  //   this.devicesData = this.dataFromAds.sites[0].flatMap((item:any) => item.Devices)
  //   console.log(this.devicesData)
  //   this.rulesData = this.devicesData.flatMap((item:any) => item.rules)
  // }

  closeForm() {
    this.newItemEvent.emit();
  }

  disabled = false;
  viewAddForm: boolean = false;
  currentItem: any;
  openPlayDialog(data: any) {
    this.viewAddForm = true;
    this.currentItem = data
  }

  closeViewForm() {
    this.viewAddForm = false;
  }

  showRuleForm: boolean = false;
  currentDevice: any
  openRuleForm(item: any) {
    console.log(item)
    this.currentDevice = item
    this.showRuleForm = true;
  }

  openRuleFormNew() {
    this.showRuleForm = true;
  }
  closeRuleForm() {
    this.showRuleForm = false;
    setTimeout(() => {
      this.listDeviceInfo();
      this.listRulesbyAdId();
    }, 10000)
  }

  body: any = {
    fromDate: null,
    toDate: null,
    adId: null,
    ruleId: null,
    siteId: null,
    createdBy: 1545,
    deviceId: null,
    objectRule: null
  }
  
  
  deviceIndex!: number;
  newArr: any = [];
  openRuleFormFor(data: any) {
    this.currentDevice = data;
    this.deviceIndex = this.devicesData.indexOf(data);


    // this.configSrvc.deviceRulesActiveInfo({ deviceId: data.deviceId, adId: this.currentAdd.adId }).subscribe({
    //   next: (res: any) => {
    //     this.newArr = []
    //     if(res.statusCode === 200) {
    //       this.newArr = res.DatesInfo;
    //     }
    //   }
    // })


    // this.newRulesData.map((item: any) => {
    //   if (item.deviceId == data.deviceId) {
    //     item.myRule = true;
    //   } else {
    //     item.myRule = false;
    //   }
    // })
  }

  @ViewChild('addNewRuleForm') addNewRuleForm = {} as TemplateRef<any>
  openRuleFormForAssociate(item: any) {
    console.log(item)
    if (item.fromDate) {
      this.dialog.open(this.addNewRuleForm, { disableClose: true })
    } else {
      this.alertSer.confirmDel().then((result: any) => {
        if (result.isConfirmed) {
          this.deleteRule();
        } else {
          this.configSrvc.listRulesInfo({ siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId, deviceId: this.currentDevice?.deviceId }).subscribe({
            next: (res: any) => {
              this.rulesData = res.rules;
              this.newRulesData = this.rulesData;
            }
          })
        }
      });;
    }
  }

  openCameraDetails(item:any) {
    this.alertSer.ruleMethod(item)

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
  }

  // selectedDeviceId: string | null = null; // Property to track the selected device
  // openRuleFormFor(data: any) {
  //   console.log('Selected data:', data);
  //   this.selectedDeviceId = data.deviceId; // Set the selected device ID when the function is called
  // }

  // // Function to determine highlight color
  // getHighlightColor(item: any): string {
  //   return item.deviceId === this.selectedDeviceId ? 'lightblue' : 'transparent'; // Change 'lightgreen' to your desired color
  // }



  submit() {
    // if (!this.body.ruleId) {
    //   this.alertSer.error('Please select a rule before proceeding.');
    //   return; // Prevent submission if ruleId is not selected
    // }
    let frmDate = formatDate(this.body.fromDate, 'yyyy-MM-dd', 'en-us');
    this.body.fromDate = frmDate;

    let toDate = formatDate(this.body.toDate, 'yyyy-MM-dd', 'en-us');
    this.body.toDate = toDate;
    
    this.body.adId = this.currentAdd?.adId
    this.body.siteId = this.currentSite?.siteId
    this.body.deviceId = this.currentItem?.deviceId
    this.body.ruleId = this.currentItem?.objectRule;


    let newObj = {
      deviceId: this.currentDevice.deviceId,
      adHours: this.currentRuleData.adHours,
      workingDays: this.currentRuleData.workingDays.join(','),
      objectRule: this.currentRuleData.objectRule,

      objectType:this.currentRuleData.objectType,
      objectCount:this.currentRuleData.objectCount,

      temp: this.currentRuleData.temp
    }
    let obj = { ...this.body, ...newObj}
    delete obj.ruleId
    delete obj.cameraName
    delete obj.cameraUrl
    delete obj.ruleAssociationStatus

    this.configSrvc.deviceAdRuleConn(obj).subscribe({
      next: (res: any) => {
        if (res?.statusCode == 200) {
          this.alertSer.success(res?.message)
          this.listRulesbyAdId()
        } else {
          this.alertSer.error(res?.message)
        }
        // this.newItemEvent.emit()
        // this.listDeviceRules()
      }
    })
  }

  
  // person:any = 1;
  // deviceCam: any = 0;

  deviceCam: any = 0;
  cameraId:any
  person: any = 1;

  toggleShowOnOff(event: any): void {
 
      this.deviceCam.get('deviceCam').reset(0);
      // this.addAssetForm.get('cameraId').reset().setValue(0);
  }

  @ViewChild('viewCameraSelection') viewCameraSelection = {} as TemplateRef<any>
  openAdverForm()  {
    this.deviceCam = 0;
    this.cameraId = null;
    // if(this.cameraId == '') {
      // this.dialog.open(this.viewCameraSelection)
    // }
    this.alertSer.confirmDe().then((res) => {
      if(res.isConfirmed) {              
        this.dialog.open(this.viewCameraSelection)
      }
    })
  }
  
  @ViewChild('viewCameraSelectionForUpdate') viewCameraSelectionForUpdate = {} as TemplateRef<any>
  openUpdate()  {
    this.deviceCam = 0;
    this.cameraId = null;
    this.alertSer.updateCam().then((res) => {
      if(res.isConfirmed) {              
        this.dialog.open(this.viewCameraSelection)
      }
    })
  //  this.dialog.open(this.viewCameraSelection)
  }

  submitFor() {
    this.configSrvc.addCam({deviceId: this.currentDevice.deviceId, cameraId :this.cameraId ? this.cameraId : "0", createdBy: 1545}).subscribe((res: any) => {
      // console.log(res);
      if(res.statusCode == 200) {
        this.alertSer.success(res.message)
        this.listDeviceInfo()
        this.listRulesbyAdId()
      }
    })
  }

  close() {
    // this.listDeviceRules();
    // this.newRulesData = [];

    this.configSrvc.listRulesInfo({ siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId, deviceId: this.currentDevice?.deviceId }).subscribe({
      next: (res: any) => {
        this.rulesData = res.rules;
        this.newRulesData = this.rulesData;
      }
    })
    this.body.ruleId = null;
    this.body.fromDate = null;
    this.body.toDate = null;
  }

  deleteRule() {
    this.configSrvc.deleteRule({ruleId: this.currentRuleData?.ruleId, deviceId: this.currentRuleData?.deviceId, adId: this.currentAdd?.adId, modifiedBy: 1}).subscribe({
      next:(res:any) => {
        // console.log(res);
        this.configSrvc.listRulesInfo({ siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId, deviceId: this.currentDevice?.deviceId }).subscribe({
          next: (res: any) => {
            this.rulesData = res.rules;
            this.newRulesData = this.rulesData;
          }
        })
      }
    })
  }

}
