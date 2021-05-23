import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit {
  title: String = "Student's Voice"
  author: String = "Aziz Mavlyanov"

  constructor() { }

  ngOnInit(): void {
  }

}
