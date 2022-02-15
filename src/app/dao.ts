import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs";

export class DAO {
    protected url = "http://10.226.32.208:5000/";

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
        })
        )
    }
}
