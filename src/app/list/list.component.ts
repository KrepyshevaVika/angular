import { Component, OnInit, Input } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { INode } from '../types/types';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  animations: [
    trigger('transformIcon', [
      state('hide', style({ transform: 'rotate(0)' })),
      state('show', style({ transform: 'rotate(90deg)' })),
      transition('hide => show', [style({transform: 'rotate(-360deg)'}), animate('350ms ease-out')]),
      transition('show => hide', animate('350ms ease-in'))
    ]),
    trigger('openClose', [
      state('closed', style({
        backgroundColor: 'yellow',
        transform: 'scale(1)'
      })),
      state('open', style({
        backgroundColor: 'green',
        transform: 'scale(1.2)'
      })),
      transition('* => *', [
        animate('.5s ease')
      ])
    ]),
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() nodes: INode[];
  @Input() selectedNode: number;
  faAngleRight = faAngleRight;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  handleToLoad(event, node) {
    if (node.count_child > 0) {
      if(!node.id) return;
      this.dataService.getById(node.id);

      if (node.children) 
        this.dataService.deleteChild(node.id);
      else 
        this.dataService.getChild(node.id);
    }else this.dataService.getById(node.id);
  }

  handleDelete(event, node) {
    console.log("handleDelete");
    this.dataService.deleteNode(node);
    event.stopPropagation();
  }

  handleInsert(event, node) {
    console.log("handleInsert");
    let data: any ={
      node_id: node ? node.id : null,
      name: "defaultName",
      type_id: 3,
    }

    this.dataService.insertNode(data, node);
    event.stopPropagation();
  }

}