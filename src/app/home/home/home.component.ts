import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllData().subscribe((respData: any)=> {

    },
    (err: Error)=> {
      console.error(`ERROR GETTING ALL LAUNCH PROGRAMS ==> ${err.message}`);
    });
  }

}
