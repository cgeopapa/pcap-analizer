import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { DAO } from './dao';

@Injectable({
  providedIn: 'root'
})
export class CollectionDaoService extends DAO {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  public getCollections() {
    const takis = this.http.get(this.url+"collections", {
      observe: 'body',
    })
    return lastValueFrom(takis);
  }

  public deleteCollection(col: string) {
    const del = this.http.delete(this.url+"collection", {
      params: new HttpParams().set("col", col)
    }).pipe(
      map((resp: any) => {
          return resp;
    }))
    return lastValueFrom(del);
  }

  public uploadPcap(pcap: File, colName: string) {
    const formData = new FormData();
    formData.append('file', pcap, pcap.name);
    formData.append("colName", colName);

    const upload = this.http.post(this.url+"collection", formData);
    return lastValueFrom(upload);
  }
}
