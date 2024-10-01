import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [MatDatepickerModule, 
            FormsModule,
            ReactiveFormsModule,
            MatInputModule
          ],
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css',
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
export class AddDeviceComponent {

  @Output() newItemEvent = new EventEmitter<any>()

  closeForm() {
    this.newItemEvent.emit()
  }

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


}
