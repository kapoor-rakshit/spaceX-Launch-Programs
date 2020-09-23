import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  spaceLaunchesDataArr: any = [];
  yearDict = {};
  yearArr: any = [];

  filteredYearIndex = null;
  launchSuccess = null;
  landSuccess = null;

  searchString = "";
  dataFound: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    //this.spinnerService.show();

    this.homeService.getAllData().subscribe((respData: any)=> {
      this.spaceLaunchesDataArr = [...respData];

      for(let data of this.spaceLaunchesDataArr) {
        this.yearDict[data.launch_year] = false;
      }

      for(let year in this.yearDict) {
        this.yearArr.push({"yearVal": year, "yearClicked": this.yearDict[year]});
      }

      if(this.spaceLaunchesDataArr.length > 0) {
        this.dataFound = true;
      }
      else {
        this.dataFound = false;
      }
      
      //this.spinnerService.hide();
    },
    (err: Error)=> {
      console.error(`ERROR GETTING ALL LAUNCH PROGRAMS ==> ${err.message}`);
    });
  }

  getYearFilteredData(indexOfFilteredYear) {
    if(this.filteredYearIndex != null) {
      this.yearArr[this.filteredYearIndex]["yearClicked"] = false;
    }
    this.filteredYearIndex = indexOfFilteredYear;
    this.yearArr[this.filteredYearIndex]["yearClicked"] = true;
    this.getFilteredData();
  }

  getLaunchFilteredData(launchSuccessVal) {
    this.launchSuccess = launchSuccessVal;
    this.getFilteredData();
  }

  getLandFilteredData(landSuccessVal) {
    this.landSuccess = landSuccessVal;
    this.getFilteredData();
  }

  getFilteredData() {
    this.searchString = "";
    //this.spinnerService.show();

    if(this.filteredYearIndex != null) {
      this.searchString+=`&launch_year=${this.yearArr[this.filteredYearIndex]["yearVal"]}`;
    }

    if(this.launchSuccess != null) {
      this.searchString+=`&launch_success=${this.launchSuccess}`;
    }

    if(this.landSuccess != null) {
      this.searchString+=`&land_success=${this.landSuccess}`;
    }

    this.homeService.getFilteredData(this.searchString).subscribe((respData: any)=> {
      this.spaceLaunchesDataArr = [...respData];

      if(this.spaceLaunchesDataArr.length > 0) {
        this.dataFound = true;
      }
      else {
        this.dataFound = false;
      }
      //this.spinnerService.hide();
    },
    (err: Error)=> {
      console.error(`ERROR GETTING FILTERED LAUNCH PROGRAMS ==> ${err.message}`);
    });
  }

}
