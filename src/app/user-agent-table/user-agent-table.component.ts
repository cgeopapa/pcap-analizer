import { Component, OnInit } from '@angular/core';
import { UserAgent } from '../model/UserAgents';
import { Values } from '../model/Values';
import { UagentDaoService } from '../uagent-dao.service';

@Component({
  selector: 'app-user-agent-table',
  templateUrl: './user-agent-table.component.html',
  styleUrls: ['./user-agent-table.component.scss']
})
export class UserAgentTableComponent implements OnInit {
  uagent: UserAgent[] = [];
  rows = Values.rows;
  loading = true;

  constructor(
    private dao: UagentDaoService
  ) { }

  ngOnInit(): void {
    this.dao.get().subscribe((u: any) => {
      this.uagent = u;
      this.loading = false;
    })
  }

}
