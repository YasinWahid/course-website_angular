import { Component, inject } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';
import { AboutComponent } from "../about/about.component"; 
// import { Strings } from '../../enum/strings.enum'; 

@Component({
  selector: 'app-home',
  imports: [CoursesComponent, AboutComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
 
})
export class HomeComponent {

  // courses: any[] = [];
  ngOnInit() {
    // this.getCourses();
  }

  //   getCourses() {
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   console.log(data);
  //   if(data) {
  //     this.courses = JSON.parse(data);
  //   }
  // }
}
