import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ 
  providedIn: 'root'
}) 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FHTW Puzzle Game';
}