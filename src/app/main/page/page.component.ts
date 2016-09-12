import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  private mmeId: number;

  constructor(private r: ActivatedRoute) {
  }

  ngOnInit() {
    // params can change after first initialization, for example
    // if we navigate directly to a new page detail
    this.r.params.subscribe(params => this.mmeId = +params['id']);
  }

}
