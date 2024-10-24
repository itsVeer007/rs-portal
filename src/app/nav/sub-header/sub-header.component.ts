import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../../pipes/search.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SearchPipe,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.css'
})
export class SubHeaderComponent {

  searchText: any;

  gridTypes = [
    {
      label: '1*1',
      noOfItems: 1,
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

  filteredOptions: any;
  constructor(
    private configSrvc: ConfigService,
    private http: HttpClient,
    private router: Router
  ) { }

  filterData: boolean = false;
  openFilter() {
    this.filterData = !this.filterData
  }
  ngOnInit() {
    this.getSites();

    this.changeGrid({
      label: this.gridTypes[2].label,
      noOfItems: this.gridTypes[2].noOfItems,
      path: this.gridTypes[2].path
    });
  }

  currentUrl: any
  ngDoCheck() {
    this.currentUrl = this.router.url.split('/')[2];
  }


  // genericAdsInfoData: any
  // genericAdsInfo() {
  //   this.configSrvc.genericAdsInfo().subscribe({
  //     next: (res: any) => {
  //       this.genericAdsInfoData = res;
  //       this.configSrvc.dataFromSubheader.next(res.GenericAds);
  //     }
  //   })
  // }

  ngAfterViewInit() {
    this.configSrvc.numberFromSub.subscribe({
      next: (res: any) => {
        this.selectedGrid = res.noOfItems
      }
    })
  }

  /* searches */
  siteSearch: any;
  searchSites(event: any) {
    this.siteSearch = (event.target as HTMLInputElement).value;
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

  opensiteDialog: boolean = false;
  openSites() {
    this.opensiteDialog = !this.opensiteDialog;
  }

  sitesList!: Array<any>;
  getSites() {
    this.configSrvc.getSitesListForUserName().subscribe({
      next: (res: any) => {
        this.sitesList = res.sites;
        this.getCamerasForSite(this.sitesList[22]);
      }
    })
  }

  camerasList: any = [];
  currentSite: any;
  getCamerasForSite(data: any) {
    this.camerasList = [];
    this.currentSite = data;
    this.configSrvc.current_site_sub.next(data);
    this.configSrvc.getCamerasForSiteId(data).subscribe({
      next: (res: any) => {
        this.camerasList = res;
        this.configSrvc.dataFromSubheader.next(res);
        this.currentCam = this.camerasList[0]
      }
    })
  }

  selectedGrid: number =9;
  currentgridIcon!: string;
  changeGrid(item: any) {
    this.configSrvc.numberFromSub.next(item);

    // if (item.noOfItems === 1) {
    //   this.playCurrentCam(this.camerasList[0]);
    // }
    // this.currentgridIcon = item.path;
    // this.selectedGrid = item.noOfItems;
  }

  get getCurrentItems(): any {
    let startIndex = 0;
    let endIndex = this.selectedGrid;
    return this.camerasList?.slice(startIndex, endIndex);
  }


  currentCam: any;
  playCurrentCam(item: any) {
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
