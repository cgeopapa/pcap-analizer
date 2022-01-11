import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Beacon } from './model/Beacon';

@Injectable({
  providedIn: 'root'
})
export class BeaconDaoService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Beacon[]> {
    return this.http.get("http://192.168.105.105/beacons", {
      observe: 'body'
    }).pipe(
      map((resp: any) => {
        const beacons: Beacon[] = [];
        resp.map((b: any) => {
          beacons.push(new Beacon(b._id["$oid"], b.dst, b.score, b.src));
        })
        return beacons
      })
    )
  }
}
