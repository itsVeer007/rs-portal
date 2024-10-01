import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-create-new-rule',
  standalone: true,
  imports: [MatSliderModule,
    MatInputModule,
    MatSelect,
    MatOption
            
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

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'T';
    }

    return `${value}`;
  }


  closeForm() {
    this.newItemEvent.emit()
  }
}
