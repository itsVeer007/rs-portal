import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fb:FormBuilder,
    private auth:AuthService
  ) {}

  loginForm:any =  FormGroup
  showPassword:boolean = false

  ngOnInit() {
    this.loginForm = this.fb.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  visiblePaswword() {
    this.showPassword = !this.showPassword
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
     next:(res:any) => {
      console.log(res);
      if(res.Status === 'Success') {
        this.router.navigate(['/dashboard'])
      }
     },
     error: (err: HttpErrorResponse) => {
      
     }
    })
  }

}
