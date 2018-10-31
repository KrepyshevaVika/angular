import { Component, OnInit, Input } from '@angular/core';

import { INode } from '../types/types';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form-with-fields',
  templateUrl: './form-with-fields.component.html',
  styleUrls: ['./form-with-fields.component.css']
})
export class FormWithFieldsComponent implements OnInit {
  @Input() data: INode;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  handleClose() {
    this.dataService.deleteInfo();
  }

  handleChangeField(event) {
    this.dataService.updateNode(this.data);
    this.handleClose();
  }

}
