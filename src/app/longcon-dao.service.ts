import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LongConnection } from './model/LongConnection';

@Injectable({
  providedIn: 'root'
})
export class LongconDaoService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<LongConnection[]> {
    return this.http.get("http://192.168.105.105/uconns", {
      observe: 'body'
    }).pipe(
      map((resp: any) => {
        const beacons: LongConnection[] = [];
        resp.map((b: any) => {
          beacons.push(new LongConnection(b._id["$oid"], b.dst, b.src, b.dat[0].tuples[0], b.dat[0].maxdur, b.dat[0].tdur));
        })
        return beacons
      })
    )
  }
}
