import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { NewRuleComponent } from '../new-rule/new-rule.component';

@Component({
  selector: 'app-view-advertisement',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, 
    MatInputModule,
    MatOption,MatCard,MatSelectModule,
    MatDatepickerModule,AddDeviceComponent,
    NewRuleComponent
  ],
  templateUrl: './view-advertisement.component.html',
  styleUrl: './view-advertisement.component.css',
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
export class ViewAdvertisementComponent {
  constructor(
    
  ) {}
   @Output() newItemEvent = new EventEmitter<any>()

  viewAssetForm:any = FormGroup

  
  myobj = [
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"device-1",
      age:10
    },
  
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"device-2",
      age:10
    },
      {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"device-3",
      age:10
    },
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"device-4",
      age:10
    },
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"device-5",
      age:10
    },
    
  
    
    
   

  ]


  submit() {

  }


  closeForm() {
    this.newItemEvent.emit();
  }


  showDeviceForm:boolean = false;

openDeviceForm() {
  this.showDeviceForm = true;
}
closeDeviceForm() {
  this.showDeviceForm = false;
}


showRuleForm:boolean = false;

openRuleForm() {
  this.showRuleForm = true;
}
closeRuleForm() {
  this.showRuleForm = false;
}


}
