import { Component, OnInit } from '@angular/core';
import { BeaconDaoService } from '../beacon-dao.service';
import { Beacon } from '../model/Beacon';

@Component({
  selector: 'app-beacon-table',
  templateUrl: './beacon-table.component.html',
  styleUrls: ['./beacon-table.component.scss']
})
export class BeaconTableComponent implements OnInit {
  beacons: Beacon[] = [];

  constructor(
    private beaconDao: BeaconDaoService,
  ) { }

  ngOnInit(): void {
    this.beaconDao.get().subscribe((b: any) => {
      this.beacons = b
    });
  }

}
