import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CreateNewRuleComponent } from '../create-new-rule/create-new-rule.component';

@Component({
  selector: 'app-new-rule',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    CreateNewRuleComponent

  ],
  templateUrl: './new-rule.component.html',
  styleUrl: './new-rule.component.css',
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
export class NewRuleComponent {

  @Output() newItemEvent = new EventEmitter<any>();

  myobj = [
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"device-1",
      age:10
    },
  
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"lav",
      age:10
    },
      {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"lav",
      age:10
    },
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"lav",
      age:10
    },
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"lav",
      age:10
    },
    {
      img:'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2509.jpg',
      name:"lav",
      age:10
    },
    
  
  ]

  timeobj = [
    {
      name:'gh',
      age:7
    },
    {
      name:'gh',
      age:7
    }
  ]
  camobj = [
    {
      name:'gh',
      age:7
    },
 
  ]


  closeForm() {
    this.newItemEvent.emit()
  }

showCreateRuleForm:boolean = false;

openCreateRuleForm() {
  this.showCreateRuleForm = true;
}
closeCreateRuleForm() {
  this.showCreateRuleForm = false;
}
}
