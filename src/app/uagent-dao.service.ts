import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserAgent } from './model/UserAgents';

@Injectable({
  providedIn: 'root'
})
export class UagentDaoService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<UserAgent[]> {
    return this.http.get("http://192.168.105.105/uagents", {
      observe: 'body'
    }).pipe(
      map((resp: any) => {
        const beacons: UserAgent[] = [];
        resp.map((b: any) => {
          console.log(b);
          beacons.push(new UserAgent(b._id["$oid"], b.user_agent, b.dat.seen));
        })
        return beacons
      })
    )
  }
}
