import { Component, effect, inject, Input, SecurityContext, signal,  } from '@angular/core';
// import { Strings } from '../../enum/strings.enum';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  // @Input() courses: any;
  // courses: Course[] = []; 
  courses = signal<Course[]>([]);
  @Input() isAdmin = false;
  coursesSub!: Subscription;
  // @Output() del = new EventEmitter();
  private courseService = inject(CourseService);
  // private sanitizer = inject(DomSanitizer)

  constructor() {
    effect(() => {
       const courses = this.courseService.courseSignal();
       
       if (courses !== this.courses()) {
        this.courses.set(courses);
        console.log('courses:' , this.courses());
       }
    }, {allowSignalWrites: true});
  }

  ngOnInit() {
    // // this.courses = this.courseService.getCourses();
    // this.courses.set(this.courseService.getCourses());

    // this.coursesSub = this.courseService.courses.subscribe({
    //   next: (courses) => {
    //     // this.courses = courses;
    //     // console.log("courses:", this.courses);
    //     this.courses.set(courses);
    //     console.log("courses:", this.courses());
      

    //   },
    //   error: (e) => {
    //     console.log(e);
    //   }
    // })
  }

  // sanitizeUrl(value: string) {
  //   return this.sanitizer.sanitize(SecurityContext.URL, value) || null;

  // }

 

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course);
  }
  ngOnDestroy() {
    // console.log('courses destroyed');
    
    // if(this.coursesSub) this.coursesSub.unsubscribe();

  }



}
