import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../../pipes/search.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [
 FormsModule,
 ReactiveFormsModule,
 SearchPipe,
 MatSelectModule,
 MatOptionModule
  ],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.css'
})
export class SubHeaderComponent {
  constructor(
    private configSrvc: ConfigService,
    private http: HttpClient
  ) {}


  filterData:boolean = false;
  openFilter() {
    this.filterData = !this.filterData
  }

  searchText:any;

  gridTypes = [
    {
      label: '1*1',
      noOfItems:1,
      path: 'assets/icons/dot-1.svg'
    },
    {
      label: '2*2',
      noOfItems: 4,
      path: 'assets/icons/dot-2.svg'
    },
    {
      label: '3*3',
      noOfItems: 9,
      path: 'assets/icons/grid.svg'
    },
    {
      label: '4*4',
      noOfItems: 16,
      path: 'assets/icons/dot4.svg'
    }
  ];

  
  
  ngOnInit() {
    this.getSites();
  }
  
  ngAfterViewInit() {
    this.changeGrid({
      label: this.gridTypes[2].label,
      noOfItems: this.gridTypes[2].noOfItems,
      path: this.gridTypes[2].path
    });
  }

  getUrl(data: any, camData: any) {
    this.http.get(data).subscribe(res => {
    }, (err) => {
      if (err.status === 200) {
        camData.videoUrl = err.url;
      } else {
        camData.videoUrl = null;
      }
    });
  }
  
  opensiteDialog:boolean = false; 
  openSites() {
    this.opensiteDialog = !this.opensiteDialog
  }

  sitesList!: Array<any>;
  getSites() {
    this.configSrvc.getSitesListForUserName().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.getCamerasForSite(res.sites[22]);
        // this.currentCam = res.sites[0]
        this.sitesList = res.sites;
      }
    })
  }

  camerasList: any = [];
  currentSite: any;
  getCamerasForSite(data: any) {
    this.camerasList = []
    this.currentSite = data
    // data.isOpen = !data.isOpen;
    // data.isOpen ? this.currentSite = data : this.currentSite = -1;
    this.configSrvc.getCamerasForSiteId(data).subscribe({
      next: (res: any) => {
        this.camerasList = res;
      }
    })
  }

  @ViewChild('gridContainer') gridContainer!: ElementRef;
  selectedGrid!: number;
  currentgridIcon!: string;
  changeGrid(item: any) {
    if(item.noOfItems === 1) {
      this.playCurrentCam(this.camerasList[0]);
    }
    this.currentgridIcon = item.path;
    this.selectedGrid = item.noOfItems;
    this.gridContainer.nativeElement.style.gridTemplateColumns = `repeat(${Math.sqrt(item.noOfItems)}, 1fr)`;
  }

  get getCurrentItems(): any {
    let startIndex = 0;
    let endIndex = this.selectedGrid;
    return this.camerasList?.slice(startIndex, endIndex);
  }


  currentCam: any;
  playCurrentCam(item:any) {
    this.currentCam = item;
  }

  loadPrevCam() {
    let index: number = this.camerasList.indexOf(this.currentCam);
    this.currentCam = this.camerasList[index - 1]
  }

  loadNextCam() {
    let index: number = this.camerasList.indexOf(this.currentCam);
    this.currentCam = this.camerasList[index + 1]
  }

}
