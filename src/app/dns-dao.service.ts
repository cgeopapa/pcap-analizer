import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DAO } from './dao';
import { DNS } from './model/Dns';

@Injectable({
  providedIn: 'root'
})
export class DnsDaoService extends DAO {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  public get(): Observable<DNS[]> {
    return this.http.get(this.url+"dns", {
      observe: 'body'
    }).pipe(
      map((resp: any) => {
        const beacons: DNS[] = [];
        resp.map((b: any) => {
          beacons.push(new DNS(b._id["$oid"], b.domain, b.dat[0].visited, b.subdomain_count));
        })
        return beacons
      })
    )
  }
}
