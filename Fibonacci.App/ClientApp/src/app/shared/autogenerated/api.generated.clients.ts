//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IFibonacciClient {
    getRequestInfoHistory(): Observable<FibonacciRequestInfo[]>;
    calculateFibonacciNumber(requestNumber: number): Observable<number>;
}

@Injectable()
export class FibonacciClient implements IFibonacciClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getRequestInfoHistory(): Observable<FibonacciRequestInfo[]> {
        let url_ = this.baseUrl + "/api/Fibonacci/GetRequestInfoHistory";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetRequestInfoHistory(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetRequestInfoHistory(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FibonacciRequestInfo[]>;
                }
            } else
                return _observableThrow(response_) as any as Observable<FibonacciRequestInfo[]>;
        }));
    }

    protected processGetRequestInfoHistory(response: HttpResponseBase): Observable<FibonacciRequestInfo[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver) as FibonacciRequestInfo[];
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    calculateFibonacciNumber(requestNumber: number): Observable<number> {
        let url_ = this.baseUrl + "/api/Fibonacci/CalculateFibonacciNumber?";
        if (requestNumber === undefined || requestNumber === null)
            throw new Error("The parameter 'requestNumber' must be defined and cannot be null.");
        else
            url_ += "requestNumber=" + encodeURIComponent("" + requestNumber) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCalculateFibonacciNumber(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCalculateFibonacciNumber(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<number>;
                }
            } else
                return _observableThrow(response_) as any as Observable<number>;
        }));
    }

    protected processCalculateFibonacciNumber(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver) as number;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export interface FibonacciRequestInfo {
    requestedNumber?: number;
    requestDate?: moment.Moment;
    resultNumber?: number;
}

function jsonParse(json: any, reviver?: any) {
    json = JSON.parse(json, reviver);

    var byid: any = {};
    var refs: any = [];
    json = (function recurse(obj: any, prop?: any, parent?: any) {
        if (typeof obj !== 'object' || !obj)
            return obj;
        
        if ("$ref" in obj) {
            let ref = obj.$ref;
            if (ref in byid)
                return byid[ref];
            refs.push([parent, prop, ref]);
            return undefined;
        } else if ("$id" in obj) {
            let id = obj.$id;
            delete obj.$id;
            if ("$values" in obj)
                obj = obj.$values;
            byid[id] = obj;
        }
        
        if (Array.isArray(obj)) {
            obj = obj.map((v, i) => recurse(v, i, obj));
        } else {
            for (var p in obj) {
                if (obj.hasOwnProperty(p) && obj[p] && typeof obj[p] === 'object')
                    obj[p] = recurse(obj[p], p, obj);
            }
        }

        return obj;
    })(json);

    for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];
        ref[0][ref[1]] = byid[ref[2]];
    }

    return json;
}

function createInstance<T>(data: any, mappings: any, type: any): T | null {
  if (!mappings)
    mappings = [];
  if (!data)
    return null;

  const mappingIndexName = "__mappingIndex";
  if (data[mappingIndexName])
    return <T>mappings[data[mappingIndexName]].target;

  data[mappingIndexName] = mappings.length;

  let result: any = new type();
  mappings.push({ source: data, target: result });
  result.init(data, mappings);
  return result;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}