import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataService {
    _baseUrl: string = '';

    constructor(private http: HttpClient,
                private configService: ConfigService) 
    {
        this._baseUrl = this.configService.getApiURI();
    }  

    getAdmin(): Observable<number[]> {
        const header = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + localStorage.getItem('access_token')
        };      
        return this.http.get<number[]>(this._baseUrl + 'admin', { headers: header })
            .pipe(
                map(data => {             
                    return data;
                }),
                tap(data => console.log(data))
            )
    }
}