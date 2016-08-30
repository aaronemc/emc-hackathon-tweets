/**
 * Created by liut8 on 8/29/16.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


import { HEROES } from './mock-heroes';
@Injectable()
export class HeroService {

    private heroesUrl = '/tweets';  // URL to web API

    constructor (private http: Http) {}

    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }
    
    getTweets (): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
         return body.statuses || { };

    }
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}
