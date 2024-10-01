import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterModule,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 constructor(private router:Router) {}

 logout() {
  this.router.navigate(['/login'])
 }
}
