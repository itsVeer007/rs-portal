import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../services/storage.service';
import { MetadataService } from '../../../services/metadata.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private storageSrvc: StorageService,
    private metaSrvc: MetadataService
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

  saveMetaData() {
    this.metaSrvc.getMetadata().subscribe({
      next: (res) =>
         this.storageSrvc.saveData('metaData', res)
    })
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
     next:(res:any) => {
      console.log(res)
      if(res.Status === 'Success') {
        this.saveMetaData();
        this.storageSrvc.saveData('user', res)
        this.router.navigate(['/dashboard']);
      }
     },
     error: (err: HttpErrorResponse) => {}
    })
  }

}
