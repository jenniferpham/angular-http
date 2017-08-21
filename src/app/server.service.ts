import { Injectable } from '@angular/core';
import {  Headers, Http } from '@angular/http';

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

    getServers(){
        return this.http.get(
            'https://angular-http-651da.firebaseio.com/data.json');
    }
}