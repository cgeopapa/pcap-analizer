import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
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

  public async getDetails(id: string){
    let details: any = await firstValueFrom(this.getBeacon(id));
    details.ports = await firstValueFrom(this.getPorts(details.src, details.dst));

    return details;
  }

  private getBeacon(id: string): Observable<Beacon[]> {
    return this.http.get("http://192.168.105.105/beacondetails", {
      observe: 'body',
      params: new HttpParams().set('objid', id),
    }).pipe(
      map((resp: any) => {
        return resp[0];
      })
    )
  }

  private getPorts(src: string, dst: string) {
    return this.http.get("http://192.168.105.105/portsinfo", {
      observe: 'body',
      params: new HttpParams()
        .set('srcip', src)
        .set('dstip', dst)
        .set('n', 0)
    }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

}
