import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'], 
  standalone: true
})
export class AboutComponent {

  private route = inject(ActivatedRoute);

}
