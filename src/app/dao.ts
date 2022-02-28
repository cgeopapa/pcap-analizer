import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DAO {
  protected url = environment.url;

  constructor(
    protected http: HttpClient
  ) { }

  public getVT(ip: string) {
    return this.http.get(this.url + "vtinfo", {
      observe: 'body',
      params: new HttpParams().set('ip', ip),
    }).pipe(
      map((resp: any) => {
        return resp;
      }))
  }

  public setCollection(col: string) {
    const post = this.http.post(this.url + "collection_set", null, {
      params: new HttpParams().set("col", col)
    })
    return lastValueFrom(post);
  }
}
