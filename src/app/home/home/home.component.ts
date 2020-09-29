import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  spaceLaunchesDataArr: any = [];
  yearDict = {};
  yearArr: any = [];

  filteredLaunchSuccess = AppComponent.launchSuccess;
  filteredLandSuccess = AppComponent.landSuccess;

  dataFound: boolean = false;

  constructor(private homeService: HomeService, private ngxService: NgxUiLoaderService, private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();

    this.yearArr = [
      {"yearVal": 2006, "yearClicked": false},
      {"yearVal": 2007, "yearClicked": false},
      {"yearVal": 2008, "yearClicked": false},
      {"yearVal": 2009, "yearClicked": false},
      {"yearVal": 2010, "yearClicked": false},
      {"yearVal": 2011, "yearClicked": false},
      {"yearVal": 2012, "yearClicked": false},
      {"yearVal": 2013, "yearClicked": false},
      {"yearVal": 2014, "yearClicked": false},
      {"yearVal": 2015, "yearClicked": false},
      {"yearVal": 2016, "yearClicked": false},
      {"yearVal": 2017, "yearClicked": false},
      {"yearVal": 2018, "yearClicked": false},
      {"yearVal": 2019, "yearClicked": false},
      {"yearVal": 2020, "yearClicked": false}
    ];

    if(AppComponent.filteredYearIndex != null) {
      this.yearArr[AppComponent.filteredYearIndex]["yearClicked"] = true;
    }

    this.homeService.getFilteredData(AppComponent.searchString).subscribe((respFilteredData: any)=> {
        this.spaceLaunchesDataArr = [...respFilteredData];

        if(this.spaceLaunchesDataArr.length > 0) {
          this.dataFound = true;
        }
        else {
          this.dataFound = false;
        }
        
        this.ngxService.stop();
      
      },
      (err: Error)=> {
        console.error(`ERROR GETTING FILTERED LAUNCH PROGRAMS ==> ${err.message}`);
    });
  }

  getYearFilteredData(indexOfFilteredYear) {
    if(AppComponent.filteredYearIndex != null) {
      this.yearArr[AppComponent.filteredYearIndex]["yearClicked"] = false;
    }

    if(AppComponent.filteredYearIndex != null && AppComponent.filteredYearIndex == indexOfFilteredYear) {
      AppComponent.filteredYearIndex = null;
    }
    else{
      AppComponent.filteredYearIndex = indexOfFilteredYear;
      this.yearArr[AppComponent.filteredYearIndex]["yearClicked"] = true;
    }

    this.getFilteredData();
  }

  getLaunchFilteredData(launchSuccessVal) {
    if(this.filteredLaunchSuccess == launchSuccessVal) {
      this.filteredLaunchSuccess = null;
      AppComponent.launchSuccess = null;
    }
    else {
      this.filteredLaunchSuccess = launchSuccessVal;
      AppComponent.launchSuccess = launchSuccessVal;
    }

    this.getFilteredData();
  }

  getLandFilteredData(landSuccessVal) {
    if(this.filteredLandSuccess == landSuccessVal){
      this.filteredLandSuccess = null;
      AppComponent.landSuccess = null;
    }
    else {
      this.filteredLandSuccess = landSuccessVal;
      AppComponent.landSuccess = landSuccessVal;
    }
    
    this.getFilteredData();
  }

  getFilteredData() {
    AppComponent.searchString = "";

    this.ngxService.start();

    if(AppComponent.filteredYearIndex != null) {
      AppComponent.searchString+=`&launch_year=${this.yearArr[AppComponent.filteredYearIndex]["yearVal"]}`;
    }

    if(AppComponent.launchSuccess != null) {
      AppComponent.searchString+=`&launch_success=${AppComponent.launchSuccess}`;
    }

    if(AppComponent.landSuccess != null) {
      AppComponent.searchString+=`&land_success=${AppComponent.landSuccess}`;
    }

    this.homeService.getFilteredData(AppComponent.searchString).subscribe((respFilteredData: any)=> {
      this.spaceLaunchesDataArr = [...respFilteredData];

      if(this.spaceLaunchesDataArr.length > 0) {
        this.dataFound = true;
      }
      else {
        this.dataFound = false;
      }
      
      this.ngxService.stop();
      this.router.navigate(['/filtered-data']);
    
      },
      (err: Error)=> {
        console.error(`ERROR GETTING FILTERED LAUNCH PROGRAMS ==> ${err.message}`);
    });
  }

}
