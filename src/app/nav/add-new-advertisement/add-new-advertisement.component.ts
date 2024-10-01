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


@Component({
  selector: 'app-add-new-advertisement',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatInputModule,MatOption,
    MatCard,
    MatDatepickerModule,
    MatSelectModule,
    ],
  templateUrl: './add-new-advertisement.component.html',
  styleUrl: './add-new-advertisement.component.css',
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
export class AddNewAdvertisementComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private assetSer: AssetService,
    // private dropDown: MetadataService,
    // private alertSer: AlertService,
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
    // let x = event.target.files[0].type;
    
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

  user: any;
  ngOnInit(): void {
    this.addAssetForm = this.fb.group({
      'adFile': new FormControl('',Validators.required),
      'siteId': new FormControl('', Validators.required),
      'adName': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'adType': new FormControl('', Validators.required),
      'generic': new FormControl(''),
      'createdBy': new FormControl('1545'),
      'description': new FormControl('')
    });

    this.getSites()
    this.list_categories()
    this.getMetaData()
  };

  submit() {
   this.configSrvc.createAd(this.addAssetForm.value,this.selectedFile).subscribe({
    next:(res:any) => {
      console.log(res)
      this.newItemEvent.emit()
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
