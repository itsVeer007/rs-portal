import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  siteAddData: any;
  constructor(
    private snackBar: MatSnackBar,
    private configSrvc: ConfigService
  )
  {
    this.configSrvc.site_add_sub.subscribe({
      next: (res: any) => {        
        this.siteAddData = res
      }
    })
  }





  /* sweet alert */
  error(message: any) {
    Swal.fire({
      icon: 'error',
      title: 'Failed!',
      text: message,
      showCloseButton: true
    })
  }



  success(message: any) {
    Swal.fire({
      icon: 'success',
      title: `Done!`,
      text: `${message}`,
      showCloseButton: true,
      timer: 3000
    })
  }

  wait() {
    Swal.fire({
      text: "Please wait",
      imageUrl: "gif/ajax-loading-gif.gif",
      showConfirmButton: false,
      allowOutsideClick: false
    })
  }


  updateCam() {
    return Swal.fire({
      // title: "Are you sure?",
      text: "Do you want to Update Camera?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    })
  }

  confirmDelete() {
    return Swal.fire({
      // title: "Are you sure?",
      text: "To activate this object-based rule, you need to add a camera for the device. Would you like to add a camera?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    })
  }

  confirmDel() {
    return Swal.fire({
      // title: "Are you sure?",
      text: "Do you Want to Deactivate This Rule?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    })
  }


  confirmDe() {
    return Swal.fire({
      // title: "Are you sure?",
      text: "Do you like to add a camera?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    })
  }

  async ruleMethod(payload: any) {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          "0": "Device Camera",
          "1": "Existing Camera",
        });
      }, 1000);
    });
    const { value: color } = await Swal.fire({
      title: "Select",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve("Please select value");
          }
        });
      }
    });

    if (color) {
      this.cameraSelect(payload)
    } else {
      this.configSrvc.addCam({deviceId: payload.deviceId, cameraId : 0, createdBy: 1}).subscribe((res: any) => {
        // console.log(res)
        if(res.statusCode == 200) {
          this.configSrvc.listRulesInfo(this.siteAddData).subscribe()
        }
      })
    }
  }


  cameralist: any = [];
  getCams() {
    return new Promise(() => {
      this.configSrvc.dataFromSubheader.subscribe({
        next: (res:any) => {
          this.cameralist = res
        }
      });
    })
  }

  async cameraSelect(payload: any) {
    // let configSrvc: any = Inject(ConfigService);
    // await this.getCams();
    // console.log(this.cameralist)

    const { value: fruit } = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: ["Camera 01", "Camera 02", "Camera 03"],
      inputPlaceholder: "Select a camera",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve("Please select value");
          }
        });
      }
    });
    if (fruit) {
      // Swal.fire(`You selected: ${fruit}`);
      this.configSrvc.addCam({deviceId: payload.deviceId, cameraId : fruit, createdBy: 1}).subscribe((res: any) => {
        // console.log(res);
        if(res.statusCode == 200) {

          this.configSrvc.listRulesInfo(this.siteAddData).subscribe()
        }
      })
    }
  }

}


