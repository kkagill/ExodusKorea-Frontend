import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-not-found',
  templateUrl: './video-not-found.component.html',
  styleUrls: ['./video-not-found.component.scss']
})
export class VideoNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onHomeClick() {
    this.router.navigate(['']);
  }
}
