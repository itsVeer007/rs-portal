import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import {MatInputModule} from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatCard } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConfigService } from '../../../services/config.service';
import { MetadataService } from '../../../services/metadata.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AlertService } from '../../../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-new-advertisement',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatInputModule,MatOption,
    MatCard,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonToggleModule
    ],
  templateUrl: './add-new-advertisement.component.html',
  styleUrl: './add-new-advertisement.component.css',
  //  animations:[
  //   trigger("inOutPaneAnimation", [
  //     transition(":enter", [
  //       style({ opacity: 0, transform: "translateX(-100%)" }),
  //       animate(
  //         "500ms ease-in-out",
  //         style({ opacity: 1, transform: "translateX(0)" })
  //       )
  //     ]),
  //     transition(":leave", [
  //       style({ opacity: 1, transform: "translateX(0)" }),
  //       animate(
  //         "500ms ease-in-out",
  //         style({ opacity: 0, transform: "translateX(100%)" })
  //       )
  //     ])
  //   ])
  // ]
})
export class AddNewAdvertisementComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private assetSer: AssetService,
    // private dropDown: MetadataService,
    private alertSer: AlertService,
    // private siteService: SiteService,
    private metaSer:MetadataService,
    private configSrvc: ConfigService,
    private storageSer: StorageService,
   
  ) { }

  /* file upload */
  selectedFile: any;
  // selectedFiles: any = [];
  isAudio: boolean = false;
  onFileSelected(event: any) {
    console.log(event.target.files)
    let x = event.target.files[0].type;
    
    // if(this.currentDeviceType === 1 || this.newData?.deviceTypeId == 1) {
    //   if(x === 'audio/mpeg' || x === 'video/mp4' || x === 'video/avi' || x == 'audio/wav' || x == 'audio/vnd.dlna.adts') {
    //     this.isAudio = false
    //   } else {
    //     this.isAudio = true;
    //   }
    // } else if(this.currentDeviceType === 2 || this.newData?.deviceTypeId == 2 || this.currentDeviceType === 3 || this.newData?.deviceTypeId == 3) {
    //   if(x === 'audio/mpeg' || x === 'audio/vnd.dlna.adts') {
    //     this.isAudio = true
    //   } else {
    //     this.isAudio = false;
    //   }
    // } 

    if(typeof(event) == 'object') {
      this.selectedFile = event.target.files[0] ?? null;
    }
  }

  deleteFile() {
    this.isAudio = false
    this.selectedFile = null;
    // this.assetData.file = null;
  }

  @Output() newItemEvent = new EventEmitter<any>();
  @Input() newData:any;

  addAssetForm: any = FormGroup;

  personshow : boolean = false;
  toggleShowOnOff() {
    this.personshow = !this.personshow;
  }

  sitesList!: Array<any>;
  getSites() {
    this.configSrvc.getSitesListForUserName().subscribe({
      next: (res: any) => {
        console.log(res);
        this.sitesList = res.sites;
        // this.sitesList.forEach((item: any) => {
        //   item.isOpen = false;
        // })
      }
    })
  }

  listCategoriesData:any;

  list_categories() {
    this.configSrvc.list_categories().subscribe({
      next:(res:any) =>{
        console.log(res)
        this.listCategoriesData = res.rules
      }

    })
  }
  getType(type: any) {
    return this.storageSer.getType(type)[0].metadata
  }

  user: any;
  ngOnInit(): void {
    let user = this.storageSer.getData('user')
    this.addAssetForm = this.fb.group({
      // 'adFile': new FormControl('',Validators.required),
      // 'adName': new FormControl('', Validators.required),
      // 'category': new FormControl('', Validators.required),
      // 'adType': new FormControl(1, Validators.required),
      'generic': new FormControl(''),
      'siteId': new FormControl('36337'),
      'createdBy': new FormControl('1545'),
      // 'description': new FormControl('')
      description: [{ value: '', disabled: true }],
      adType: [{ value: 1, disabled: true }, Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      adName: [{ value: '', disabled: true }, Validators.required],
      adFile: [null, Validators.required],
      
      
    });

    this.addAssetForm.get('adFile')?.valueChanges.subscribe((value:any) => {
      if (value) {
        this.enableFields();
      } else {
        this.disableFields();
      }
    });


    this.getSites()
    this.list_categories()
    this.getMetaData()
  };

  enableFields(): void {
    this.addAssetForm.get('adName')?.enable();
    this.addAssetForm.get('description')?.enable();
    this.addAssetForm.get('category')?.enable();
    this.addAssetForm.get('adType')?.enable();
  }

  disableFields(): void {
    this.addAssetForm.get('adName')?.disable();
    this.addAssetForm.get('description')?.disable();
    this.addAssetForm.get('category')?.disable();
    this.addAssetForm.get('adType')?.disable();
  }

  // deviceSelection:any = 1;
  submitted:boolean = false

  submit() {
    this.submitted = true;
    if(!this.addAssetForm.valid) return
    this.addAssetForm.createdBy = this.user?.UserId
   this.configSrvc.createAd(this.addAssetForm.value,this.selectedFile).subscribe({
    next:(res:any) => {
      console.log(res)
      if(res?.statusCode === 200) {
        this.alertSer.success(res?.message)
      }
      this.newItemEvent.emit()
    },
    error:(err:HttpErrorResponse) => {
      this.alertSer.error(err?.error?.message)
    }
   })
  }


  closeForm() {
    this.newItemEvent.emit();
  }


  file:any[]=[]
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files) {
      // Process files
      console.log('Dropped files:', files);
      this.file = []; // Clear previously uploaded file names
    for (let i = 0; i < files.length; i++) {
      this.file.push(files[i].name); // Add file name to the array
    }
    }
  }
 
  finalData:any;
getMetaData() {
  // let data = this.storageSer.getData('metaData');
  // data?.forEach((item:any)=> {
  //   if(item.type == 2 ) {
  //     this.finalData = item.metaData
  //   }
  // })
  this.metaSer.getMetadata().subscribe((res:any)=> {
    console.log(res)
  })
}





}
