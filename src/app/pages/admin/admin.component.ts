// import { NgIf } from '@angular/common';
import { Component, inject, LOCALE_ID, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
// import { Strings } from '../../enum/strings.enum';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  // model: any = {};
  // cover!: string | null ;
  // cover_file: any;
  // showError = false;

  model = signal<any>({});
  cover = signal<string | null>(null);
  cover_file = signal<any>(null);
  showError = signal<boolean>(false);

  // courses: any[] =[];
  private courseService = inject(CourseService);

  ngOnInit() {
    // this.getCourses();
  }

  // getCourses() {
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   console.log(data);
  //   if(data) {
  //     this.courses = JSON.parse(data);
  //   }
  // }

  onFileSelected(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      // this.cover_file = file;
      this.cover_file.set(file);
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        // this.cover = dataUrl;
        this.cover.set(dataUrl);
        console.log('image:', this.cover);
      };
      reader.readAsDataURL(file);
      // this.showError =false;
      this.showError.set(false);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if (!this.cover) {
        // this.showError = true;
        this.showError.set(true);
      }
      return;
    }
    console.log(form.value);
    this.saveCourse(form);
  }

  clearForm(form: NgForm) {
    form.reset();
    // this.cover = null;
    // this.cover_file = null;
    this.cover.set(null);
    this.cover_file.set(null);
  }
  async saveCourse(form: NgForm) {
    try {
      const formValue = form.value;
      console.log(formValue);

      const data: Course = {
        ...formValue,
        image: this.cover(),
        // id: this.courses.length + 1,
      };

      await this.courseService.addCourse(data);

      // this.courses = [ ...this.courses, data ];
      // this.setItem(this.courses);

      this.clearForm(form);
    } catch (e) {
      console.log(e);
    }
  }

  // deleteCourse(course: any) {
  // //   this.courses = this.courses.filter(course_item => course_item.id != course.id );
  // //   this.setItem(this.courses);

  // }
}
