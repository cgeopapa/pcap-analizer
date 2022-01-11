import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DNS } from './model/Dns';

@Injectable({
  providedIn: 'root'
})
export class DnsDaoService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<DNS[]> {
    return this.http.get("http://192.168.105.105/dns", {
      observe: 'body'
    }).pipe(
      map((resp: any) => {
        const beacons: DNS[] = [];
        resp.map((b: any) => {
          beacons.push(new DNS(b._id["$oid"], b.domain, b.dat.visited, b.subdomain_count));
        })
        return beacons
      })
    )
  }
}
