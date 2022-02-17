import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

export class DAO {
    protected url = environment.url;

    constructor(
        protected http: HttpClient
    ){}

    public getVT(ip: string) {
    return this.http.get(this.url+"vtinfo", {
        observe: 'body',
        params: new HttpParams().set('ip', ip),
        }).pipe(
        map((resp: any) => {
            return resp;
        }))
    }
}
