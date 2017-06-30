import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
    private _needToPan = new Subject<boolean>();
    private _currentPhotoData = new Subject<any>();
    public currentPhotoData;

    setPhotoData(value: any) {
        this._currentPhotoData.next(value);
    }

    getPhotoData(): Observable<any> {
        return this._currentPhotoData.asObservable();
    }


    setPanStatus(value: boolean) {
        this._needToPan.next(value);
    }

    getPanStatus(): Observable<any> {
        return this._needToPan.asObservable();
    }
};
