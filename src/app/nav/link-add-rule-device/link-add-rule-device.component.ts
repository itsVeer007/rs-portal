import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { ViewAdvertisementComponent } from '../view-advertisement/view-advertisement.component';
import { ConfigService } from '../../../services/config.service';
import { StorageService } from '../../../services/storage.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateNewRuleComponent } from '../create-new-rule/create-new-rule.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchPipe } from "../../../pipes/search.pipe";

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
    SearchPipe
],
  templateUrl:'./link-add-rule-device.component.html',
  styleUrl:'./link-add-rule-device.component.css'
})
export class LinkAddRuleDeviceComponent {

  constructor(
    private configSrvc: ConfigService,
    private storageSer: StorageService,
    private dialog : MatDialog
  ) {}

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

  searchDevice:any
  searchDevices(event: any) {
    this.searchDevice = (event.target as HTMLInputElement).value;
  }


  personshow : boolean = false;
  deviceCam: any = 0;
  


  objectRule:any 
  person:any = 1;
 

  

  modifiedWorkingDays: any;
  ngOnInit() {
    this.listDeviceRules()

  //   this.addAssetForm = this.fb.group({
  //     adId : new FormControl(''),
  //     adHours: new FormControl('true'),
  //     workingDays: new FormControl('true'),
  //     temp: new FormControl(''),
  //     objectRule: new FormControl(''),
  //     cameraId: new FormControl(''),
  //     modelObjectTypeId: new FormControl(''),
  //     objectCount: new FormControl(''),
  //     createdBy: new FormControl(''),

  //     tempFrom: new FormControl(''),
  //     tempTo: new FormControl(''),
      
  //     deviceCam: new FormControl('')
  // });
  }

  ngAfterViewInit(): void {
  }

  getType(type: any) {
    return this.storageSer.getType(type)[0].metadata;
  }

  listDeviceRules() {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.configSrvc.listDeviceRules({siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId}).subscribe({
      next:(res: any) => {
        console.log(res);
        this.devicesData = res.sites.flatMap((item:any) => item.Devices);
        this.rulesData = this.devicesData.flatMap((item:any) => item.rules);

        this.rulesData.forEach((el: any) => {
          el.workingDays = el.workingDays.split(',')
        });
        console.log(this.rulesData)
      }
    })
    // this.viewLinkForm = true;
  }


  rulesData:any = [];
  devicesData:any = [];
  // getDevicesAndRulesData() {
  //   this.devicesData = this.dataFromAds.sites[0].flatMap((item:any) => item.Devices)
  //   console.log(this.devicesData)

  //   this.rulesData = this.devicesData.flatMap((item:any) => item.rules)
  // }

  closeForm() {
    this.newItemEvent.emit();
  }

  checked = false;
  disabled = false;

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
  
showRuleForm:boolean = false;

openRuleForm() {
  this.showRuleForm = true;
}
closeRuleForm() {
  this.showRuleForm = false;
}

@ViewChild('addNewRuleForm') addNewRuleForm = {} as TemplateRef<any>
openRuleFormFor()  {
  this.dialog.open(this.addNewRuleForm)
}

// @ViewChild('openViewAdver') openViewAdver = {} as TemplateRef<any>
// openAdverForm()  {
//   this.dialog.open(this.openViewAdver)
// }

}
