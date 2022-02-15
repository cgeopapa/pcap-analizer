import { Component, OnInit } from '@angular/core';
import { BeaconDaoService } from '../beacon-dao.service';
import { Beacon } from '../model/Beacon';
import { Values } from '../model/Values';

@Component({
  selector: 'app-beacon-table',
  templateUrl: './beacon-table.component.html',
  styleUrls: ['./beacon-table.component.scss']
})
export class BeaconTableComponent implements OnInit {
  beacons: Beacon[] = [];
  rows = Values.rows;

  beaconDetails: any;
  details = false;
  ts: any = {};
  ds: any = {};
  ports: any = {};

  options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false
      }
    },
  };
  doughnutOptions = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: true,
        position: "left"
      }
    },
  }

  constructor(
    private beaconDao: BeaconDaoService,
  ) {}

  ngOnInit(): void {
    this.beaconDao.get().subscribe((b: any) => {
      this.beacons = b
      console.log(b);
    });
  }

  view(id: string) {
    this.beaconDao.getDetails(id).then((b: any) => {
      this.beaconDetails = b;
      console.log(this.beaconDetails);

      this.ts = {
        labels: this.beaconDetails.ts.intervals,
        datasets: [
          {
            type: 'line',
            label: "Intervals",
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            data: this.beaconDetails.ts.interval_counts,
            tension: 0.5,
          },
          {
            type: 'bar',
            label: "Intervals",
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            data: this.beaconDetails.ts.interval_counts
          },
        ]
      }

      this.ds = {
        labels: this.beaconDetails.ds.sizes,
        datasets: [
          {
            type: 'line',
            label: "Connections",
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            data: this.beaconDetails.ds.counts,
            tension: 0.5,
          },
          {
            type: 'bar',
            label: "Connections",
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            data: this.beaconDetails.ds.counts,
          },
        ]
      }

      const bPorts = this.beaconDetails.ports;
      this.ports = {
        labels: bPorts.map((p: any) => `Port ${p.port}`),
        datasets: [{
          data: bPorts.map((p: any) => p.count),
          borderColor: '#42A5F5',
        }]
      }

      this.details = true;
    })
  }

}
