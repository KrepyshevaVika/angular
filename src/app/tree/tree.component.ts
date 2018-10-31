import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import { DataService } from '../data.service';
import { INode } from '../types/types';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  nodes: INode[];
  infoAboutNode: INode | {} = {};

  subscription: Subscription;

  constructor(private dataService: DataService) { 
    this.subscription = this.dataService.getChangeNodes().subscribe( data => { this.nodes = data; });
    this.subscription = this.dataService.getChangeInfo().subscribe( data => { this.infoAboutNode = data; });
  }

  ngOnInit() {
    this.dataService.getTop();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isEmpty(obj: object) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

}
