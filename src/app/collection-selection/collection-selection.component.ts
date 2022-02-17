import { Component, OnInit } from '@angular/core';
import { CollectionDaoService } from '../collection-dao.service';

@Component({
  selector: 'app-collection-selection',
  templateUrl: './collection-selection.component.html',
  styleUrls: ['./collection-selection.component.scss']
})
export class CollectionSelectionComponent implements OnInit {

  collections: string[] = [];

  constructor(
    private dao: CollectionDaoService
  ) { }

  ngOnInit(): void {
    this.dao.getCollections().subscribe((c: any) => {
      this.collections = c.collections;
    });
  }
}
