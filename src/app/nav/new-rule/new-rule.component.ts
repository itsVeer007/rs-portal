import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CreateNewRuleComponent } from '../create-new-rule/create-new-rule.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchPipe } from '../../search.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { RemoveDuplicatesPipe } from '../../../pipes/remove-duplicates.pipe';
import { RulesPipe } from '../../../pipes/rules.pipe';
import { ConfigService } from '../../../services/config.service';
import { StorageService } from '../../../services/storage.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-new-rule',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    CreateNewRuleComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCheckboxModule,
    SearchPipe,
    MatButtonToggleModule,
    NewRuleComponent,
    MatTooltipModule,
    CommonModule

  ],
  templateUrl: './new-rule.component.html',
  styleUrl: './new-rule.component.css',
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
export class NewRuleComponent {

  @Output() newItemEvent = new EventEmitter<any>();
  
  constructor(
    private configSrvc: ConfigService,
    private storageSer: StorageService,
    private dialog: MatDialog,
    private alertSer: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  cameralist: any = [];
  ngOnInit() {
    this.configSrvc.dataFromSubheader.subscribe({
      next: (res:any) => {
        this.cameralist = res;
      }
    })
  }

  deviceCam: any = 0;
  cameraId:any;
  submitFor() {
    this.configSrvc.addCam({deviceId: this.data.deviceId, cameraId :this.cameraId ? this.cameraId : "0", createdBy: 1545}).subscribe((res: any) => {
      // console.log(res);
      if(res.statusCode == 200) {
        this.alertSer.success(res.message)
        // this.listDeviceInfo();
        // this.listRulesbyAdId();
      }
    })
  }

  close() {
    // this.configSrvc.listRulesInfo({ siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId, deviceId: this.currentDevice?.deviceId }).subscribe({
    //   next: (res: any) => {
    //     this.rulesData = res.rules;
    //     this.newRulesData = this.rulesData;
    //   }
    // })
    // this.body.ruleId = null;
    // this.body.fromDate = null;
    // this.body.toDate = null;
  }

}
