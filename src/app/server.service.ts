import { Injectable } from '@angular/core';
import {  Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable() //allows other services to be injected into this service (ex: http)
export class ServerService {
    constructor(private http: Http) {

    }

    storeServers(servers: any[]){
        const headers = new Headers({'Content-Type': 'application/json'});
        // return this.http.post(
        //     'https://angular-http-651da.firebaseio.com/data.json', 
        //     servers, 
        //     {headers}
        // ); //not sending the request yet. returns an observable. data.json is a specific place that needs to be specified if u use Firebase
         return this.http.put(
            'https://angular-http-651da.firebaseio.com/data.json', 
            servers, 
            {headers}
        ); 
    }

    //map takes whatever we wrap in here and transforms it in the observable so the type of data may be different when an observer subsscribes to it
    getServers(){
        return this.http.get('https://angular-http-651da.firebaseio.com/data.json').map(
            (response: Response) => {
                const data = response.json();
                for (const server of data){
                    server.name = 'FETCHED_' + server.name;
                }
                return data;
            }
        ).catch(  //must return observable b/c the observer is subscribing to it
            (err: Response) => {
                return Observable.throw('something went wrong')
            }
        );
    }

    getAppName(){
        return this.http.get('https://angular-http-651da.firebaseio.com/appName.json').map(
            (response: Response) => {
                return response.json();
            }
        );
    }
}