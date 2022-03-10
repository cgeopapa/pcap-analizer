import { Component, OnInit } from '@angular/core';
import { DnsDaoService } from '../dns-dao.service';
import { DNS } from '../model/Dns';
import { Values } from '../model/Values';

@Component({
  selector: 'app-dns-table',
  templateUrl: './dns-table.component.html',
  styleUrls: ['./dns-table.component.scss']
})
export class DnsTableComponent implements OnInit {
  dns: DNS[] = [];
  rows = Values.rows;
  loading = true;

  constructor(
    private dao: DnsDaoService
  ) { }

  ngOnInit(): void {
    this.dao.get().subscribe((d: any) => {
      this.dns = d;
      this.loading = false;
    })
  }

}
