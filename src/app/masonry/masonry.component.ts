import { Component, OnInit } from '@angular/core';
import * as Masonry from 'masonry-layout';
import {Subscription} from 'rxjs';

import { DataService } from '../data.service';
import { INode } from '../types/types';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.css']
})
export class MasonryComponent implements OnInit {
  nodes: INode[];
  sort: boolean = true;

  subscription: Subscription;

  constructor(private dataService: DataService) { 
    this.subscription = this.dataService.getChangeNodes().subscribe( data => { this.nodes = data; });
  }

  ngOnInit() {
    this.dataService.getAll();
    const grid: any = document.querySelector('.grid')
    console.log(grid);
    const msnry: any = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: 10,
        horizontalOrder: true,
        percentPosition: true
    })
    msnry.layout();
  }

  rndColor() {
    return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
