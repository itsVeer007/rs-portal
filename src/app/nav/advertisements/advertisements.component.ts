import { Component } from '@angular/core';
import { AddNewAdvertisementComponent } from '../add-new-advertisement/add-new-advertisement.component';
import { IfStmt } from '@angular/compiler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { LiveViewComponent } from '../live-view/live-view.component';
import { ViewAdvertisementComponent } from '../view-advertisement/view-advertisement.component';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  imports: [AddNewAdvertisementComponent,
            FormsModule,ReactiveFormsModule,
            MatInputModule,LiveViewComponent,
             ViewAdvertisementComponent,
            ],
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css'
})
export class AdvertisementsComponent {


  myobj = [
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
    }

  ]




  ngOnInit(): void {
  }

  showForm:boolean = false;

  openAddForm() {
    this.showForm = true;
  }
  close() {
    this.showForm = false;
  }


  viewAddForm:boolean = false;

  openViewAddForm() {
    this.viewAddForm = true;
  }
  closeViewForm() {
    this.viewAddForm = false;
  }





}
