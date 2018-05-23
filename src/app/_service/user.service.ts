import { Injectable } from '@angular/core';
import {RequestOptions, Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../_models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    static headers = new Headers({
        'Content-Type'  : 'application/json',
        // 'Access-Control-Allow-Origin'   :   'http://localhost:8000',
        // 'Access-Control-Allow-Methods'  :   'GET, POST, PUT, DELETE',
        // 'Access-Control-Allow-Headers'  :   'Origin, Content-Type, X-Auth-Token'
    });
    static REQUEST_OPTIONS: RequestOptions = new RequestOptions({headers: UserService.headers});

    private apiRootUrl  = 'http://superern.bonntech.com.au/';
    private findAllUrl  = this.apiRootUrl + 'bonntech/api/users';
    private findByIdUrl = this.apiRootUrl + 'bonntech/api/users/';
    private createUrl   = this.apiRootUrl + 'bonntech/api/users/create';
    private saveUrl     = this.apiRootUrl + 'bonntech/api/users/save';
    private deleteUrl   = this.apiRootUrl + 'bonntech/api/users/delete';
    constructor(private http: Http) { }

    findAll(): Observable<User[]> {
        return this.http.get(this.findAllUrl)
            .map((response: Response) => response.json())
            .catch( this.defaultErrorHandler());
    }

    findById(id: number): Observable<User> {
        return this.http.get(this.findByIdUrl + '/' + id)
            .map((response: Response) => response.json())
            .catch(this.defaultErrorHandler());
    }

    update(user: User): Observable<User> {
        return this.http.post(this.saveUrl, user, UserService.REQUEST_OPTIONS)
            .map((response: Response) => response.json())
            .catch(this.defaultErrorHandler());
    }

    delete(data: Array<Object>): Observable<any> {
        return this.http.post(this.deleteUrl, JSON.stringify(data), UserService.REQUEST_OPTIONS)
            .map((response: Response) => response.json())
            .catch(this.defaultErrorHandler());
    }

    add(user: User): Observable<User> {
        return this.http.post(this.createUrl, user, UserService.REQUEST_OPTIONS)
            .map((response: Response) => response.json())
            .catch(this.defaultErrorHandler());
    }

    private defaultErrorHandler() {
        return (error: any) => {
            return Observable.throw(error.json().error || 'server error');
        };
    }
}
