import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'spaceXLaunchPrograms';

  static searchString = "";
  static filteredYearIndex = null;
  static launchSuccess = null;
  static landSuccess = null;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.navigate(['/']);
  }
}
