import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DAO } from './dao';
import { UserAgent } from './model/UserAgents';

@Injectable({
  providedIn: 'root'
})
export class UagentDaoService extends DAO {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  public get(): Observable<UserAgent[]> {
    return this.http.get(this.url+"uagents", {
      observe: 'body'
    }).pipe(
      map((resp: any) => {
        const beacons: UserAgent[] = [];
        resp.map((b: any) => {
          beacons.push(new UserAgent(b._id["$oid"], b.user_agent, b.dat.seen));
        })
        return beacons
      })
    )
  }
}
