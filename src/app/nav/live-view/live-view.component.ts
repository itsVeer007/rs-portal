import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { ConfigService } from '../../../services/config.service';
import {MatInputModule} from '@angular/material/input';
import { SanitizePipe } from '../../../pipes/sanitize.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../../pipes/search.pipe';
import { VideoPlrComponent } from "../../video-plr/video-plr.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from "../sub-header/sub-header.component";
import { DummyPlrComponent } from "../../dummy-plr/dummy-plr.component";

@Component({
  selector: 'app-live-view',
  standalone: true,
  imports: [
    HeaderComponent,
    MatGridListModule,
    MatMenuModule,
    MatInputModule,
    SanitizePipe,
    FormsModule,
    ReactiveFormsModule,
    SearchPipe,
    VideoPlrComponent,
    CommonModule,
    SubHeaderComponent,
    DummyPlrComponent
],
  templateUrl: './live-view.component.html',
  styleUrl: './live-view.component.css'
})
export class LiveViewComponent {

  // @HostListener('click', ['$event'])
  // onClick() {
  //   this.opensiteDialog == true ? this.opensiteDialog = false : null;
  // }

  constructor(
    private configSrvc: ConfigService,
    private http: HttpClient
  ) {}

  searchText:any;
  data: any;
  @ViewChild('gridContainer') gridContainer!: ElementRef;
  ngOnInit() {
    this.getSites();
  }
  
  gridData: any;
  ngAfterViewInit() {
    this.configSrvc.numberFromSub.subscribe({
      next:(res) => {
        if(res) {
          this.selectedGrid = res.noOfItems;
          this.gridContainer.nativeElement.style.gridTemplateColumns = `repeat(${Math.sqrt(res.noOfItems)}, 1fr)`;
        }
      }
    });

    this.configSrvc.currentpage_sub.subscribe((res) => {
      if(res) {
        this.currentPage = res;
      }
    })
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
        this.sitesList = res.sites;
        this.configSrvc.dataFromSubheader.subscribe({
          next: (res: any) => {
            this.camerasList = [];
            setTimeout(() => {
              this.camerasList = res;
              this.currentCam = this.camerasList[0]
            }, 100)
          }
        })
      }
    })
  }

  camerasList: any = [];
  currentSite: any;
  selectedGrid!: number;
  currentgridIcon!: string;
  currentPage!: number;
  getCurrentItems(): any {
    let startIndex = (this.currentPage - 1) * this.selectedGrid;
    let endIndex = startIndex + this.selectedGrid;
    return this.camerasList.slice(startIndex, endIndex);
  }


  currentCam: any;
  playCurrentCam(item:any) {
    this.configSrvc.numberFromSub.next({noOfItems: 1});
    this.selectedGrid = 1;
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
