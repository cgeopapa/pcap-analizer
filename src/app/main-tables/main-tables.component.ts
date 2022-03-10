import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { DAO } from '../dao';
import { Display } from '../model/Display';

@Component({
  selector: 'app-main-tables',
  templateUrl: './main-tables.component.html',
  styleUrls: ['./main-tables.component.scss']
})
export class MainTablesComponent implements OnInit {
  display: Display = Display.beacons;
  collection = "";

  menuItems: MenuItem[] = [
    {
      label: "Beacons",
      icon: "pi pi-wifi",
      command: () => this.display = Display.beacons,
    },
    {
      label: "Long Connections",
      icon: "pi pi-globe",
      command: () => this.display = Display.longCon,
    },
    {
      label: "DNS",
      icon: "pi pi-google",
      command: () => this.display = Display.dns,
    },
    {
      label: "User Agents",
      icon: "pi pi-user",
      command: () => this.display = Display.userAgents,
    },
    // {
    //   label: "HTTP Traffic",
    //   icon: "pi pi-cloud-upload",
    //   command: () => this.display = Display.httpTraffic,
    // }
  ]

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: ActivatedRoute,
    private dao: DAO
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.router.queryParams.subscribe((p: any) => {
      this.collection = p.col;
      this.dao.setCollection(this.collection);
    })
  }
}
