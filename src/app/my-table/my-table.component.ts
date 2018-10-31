import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

import { DataService } from '../data.service';
import { INode } from '../types/types';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  nodes: INode[];
  faSortAmountDown = faSortAmountDown;
  sort: boolean = true;

  subscription: Subscription;

  constructor(private dataService: DataService) { 
    this.subscription = this.dataService.getChangeNodes().subscribe( data => { this.nodes = data; });
  }

  ngOnInit() {
    this.dataService.getAll();
  }

  handleKeyPress(type, id, e) {
    if (e.key === 'Enter') {
      let data: any = {
          id: id,
      }
      data[type] = e.target.value;

      this.dataService.updateNode(data);
    }
  }

  sortWithParam (sortParameter, nodes, type) {
    function compare(a, b) {
        if (a[sortParameter] < b[sortParameter]) 
            return (type) ? -1 : 1;
        if (a[sortParameter] > b[sortParameter])
            return (type) ? 1 : -1;
        return 0;
    }
    nodes.sort(compare);
    return nodes;
  }

  handleSort() {
    let arr = this.nodes.slice();
    arr = this.sortWithParam('name', arr, this.sort);
    this.sort = !this.sort;
    this.dataService.sortNodes(arr);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
