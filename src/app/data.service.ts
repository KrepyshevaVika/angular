import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ConfigService } from './config/config.service';
import { INode } from './types/types';
import { updateStateAfterChange, updateStateAfterDelete, updateState, updateStateAfterHiddenChildren, updateStateAfterInsert } from './handleUpdateState/recursions.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nodes: INode[] = [];
  infoAboutNode: INode | {} = {};

//  nodesChange:  BehaviorSubject<any>;
  private nodesChange = new BehaviorSubject<any>(null); 
  private infoChange = new BehaviorSubject<any>(null); 

  constructor(private configService: ConfigService) {
   // this.nodesChange  = new BehaviorSubject(null);
  }

  getChangeNodes(): Observable<any> {
    return this.nodesChange.asObservable();
  }

  getChangeInfo(): Observable<any> {
    return this.infoChange.asObservable();
  }

  setState(nodes, infoAboutNode) {
    this.nodes = nodes;
    this.infoAboutNode = infoAboutNode;

    this.nodesChange.next(this.nodes);
    this.infoChange.next(this.infoAboutNode);
  }

  getTop() {
    this.configService.getTopNodes()
      .subscribe(
        (data: INode[]) => {
          this.setState(data, {});
        },
        error => console.log(error)
      );
  }

  getChild(id: number) {
    this.configService.getNodeChildren(id)
      .subscribe(
        (data: INode[]) => {
          this.setState(updateState(this.nodes, data, id), this.infoAboutNode);
        },
        error => console.log(error)
      );
  }

  deleteChild(id: number) {
    this.setState(updateStateAfterHiddenChildren(this.nodes, id), this.infoAboutNode);
  }

  getById(id: number) {
    this.configService.getNodeById(id)
      .subscribe(
        (data: INode) => {
          this.setState(this.nodes, data);
        },
        error => console.log(error)
      );
  }

  deleteInfo() {
    this.setState(this.nodes, {});
  }

  insertNode(data: INode, node: INode) {
    this.configService.insert(data)
      .subscribe(
        (data: INode) => {
          if (node && node.count_child > 0) {
            this.setState(this.nodes, data);

            this.getChild(data.node_id);
          } else {
            this.configService.getNodeById(data.id)
              .subscribe(
                (data: INode) => {
                  updateStateAfterInsert(this.nodes, data);
                  this.setState(this.nodes, data);
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

  deleteNode(node: INode) {
    this.configService.remove(node.id)
      .subscribe(
        () => {
          updateStateAfterDelete(this.nodes, node);
          this.setState(this.nodes, {});
        },
        error => console.log(error)
      );
  }

  updateNode(node: INode) {
    this.configService.update(node)
      .subscribe(
        () => {
          this.configService.getNodeById(node.id)
            .subscribe(
              (data: INode) => {
                updateStateAfterChange(this.nodes, data);
                this.setState(this.nodes, this.infoAboutNode);
              },
              error => console.log(error)
            );
        },
        error => console.log(error)
      );
  }

  getAll() {
    this.configService.getAllNodes()
      .subscribe(
        (data: INode[]) => {
          this.setState(data, {});
        },
        error => console.log(error)
      );
  }

  sortNodes(nodes: INode[]) {
    this.setState(nodes, {});
  }

}
