import { Component, OnInit } from '@angular/core';
import { LongconDaoService } from '../longcon-dao.service';
import { LongConnection } from '../model/LongConnection';
import { Values } from '../model/Values';

@Component({
  selector: 'app-long-connection-table',
  templateUrl: './long-connection-table.component.html',
  styleUrls: ['./long-connection-table.component.scss']
})
export class LongConnectionTableComponent implements OnInit {
  longCon: LongConnection[] = [];
  rows = Values.rows;

  constructor(
    private dao: LongconDaoService
  ) { }

  ngOnInit(): void {
    this.dao.get().subscribe((l: any) => {
      this.longCon = l;
    })
  }

}
