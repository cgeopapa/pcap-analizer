import { HttpClient } from '@angular/common/http';
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
    return this.http.get(this.url+"collections", {
      observe: 'body',
    }).pipe(
      map((resp: any) => {
          return resp;
      }))
  }

  public uploadPcap(pcap: File, colName: string) {
    const formData = new FormData();
    formData.append('file', pcap, pcap.name);
    formData.append("colName", colName);

    const upload = this.http.post(this.url+"collection", formData);
    return lastValueFrom(upload);
  }
}
