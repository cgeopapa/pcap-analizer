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

  details = false;
  longConDetails: any = {};

  loading = true;
  api_abuse: any = {};
  vt_abuse: any = {};

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
    private dao: LongconDaoService
  ) { }

  ngOnInit(): void {
    this.dao.get().subscribe((l: any) => {
      this.longCon = l;
    })
  }

  view(ip: string) {
    this.details = true;
    this.loading = true;
    this.dao.getVT(ip).subscribe((info: any) => {
      this.longConDetails = info[0];
      this.longConDetails["ip"] = ip;

      this.api_abuse = {
        labels: ["Confidence of Abuse (%)"],
        datasets: [{
          data: [this.longConDetails.AIP_confidence_of_abuse],
          borderColor: ["#42A5F5"],
        }]
      }

      this.vt_abuse = {
        labels: ["Malicious", "Clean"],
        datasets: [{
          data: [this.longConDetails.VT_Positives, this.longConDetails.VT_Total],
          borderColor: ["#FF6384", "#36A2EB"],
        }]
      }

      this.loading = false;
      console.log(info);
    });
  }
}
