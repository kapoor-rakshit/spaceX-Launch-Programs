import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseURL: string;
  
  constructor() { 
    this.baseURL = "https://api.spaceXdata.com/v3/launches?limit=100";
  }
}
