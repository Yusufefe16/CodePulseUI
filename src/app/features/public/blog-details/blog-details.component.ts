import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit{
  url: string | null = null

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe({
        next: (params) =>{
          this.url = params.get('url')
        }
      });


  }
}
