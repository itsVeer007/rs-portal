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
  // selectedFile: any;
  // isAudio: boolean = false;
  // onFileSelected(event: any) {
  //   console.log(event.target.files)
  //   let x = event.target.files[0].type;
  // }

  selectedFile: any;
  isAudio: boolean = false;
  isVideo: boolean = false;
  disableOtherOptions: boolean = false;
  fileUploadError: string | null = null; // To track the error message
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
      const allowedAudioFormats = [
        'audio/mpeg', // MP3
        'audio/wav',  // WAV
        'audio/ogg',  // OGG
        'audio/aac',  // AAC
        'audio/flac', // FLAC
        'audio/mp4'   // M4A
      ];
  
      const allowedVideoFormats = [
        'video/mp4', // MP4
        'video/webm', // WebM
        'video/ogg'  // Ogg Video
      ];
  
      // Prevent .xlsx files from being uploaded
      if (fileExtension === 'xlsx') {
        this.alertSer.error('Uploading .xlsx files is not allowed.');
        this.addAssetForm.patchValue({ adFile: null });
        this.addAssetForm.patchValue({ adType: null });
        this.selectedFile = null;
        return; // Stop further execution
      }
        // Clear any previous error messages
    this.fileUploadError = null;
  
      // Check if the file is an audio format
      this.isAudio = allowedAudioFormats.includes(fileType);
      // Check if the file is a video format
      this.isVideo = allowedVideoFormats.includes(fileType);
  
      if (this.isAudio) {
        // Set the form control to 1 for "Audio"
        this.addAssetForm.patchValue({ adType: 1 });
        this.disableOtherOptions = false; // Enable all options
      } else if (this.isVideo) {
        // Set the form control to 2 for "Video"
        this.addAssetForm.patchValue({ adType: 2 });
        this.disableOtherOptions = true; // Disable other options
      } else {
        // If it's neither audio nor video, reset selection
        this.addAssetForm.patchValue({ adType: null });
        this.disableOtherOptions = false; // Enable all options
      }
  
      // Store the selected file
      this.selectedFile = file;
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
      adType: [{ value: '', disabled: true }, Validators.required],
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
