import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INewsDetail } from '../interfaces';

@Injectable()
export class DataSharingService {
    public updatedNotif: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public uploaderAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public nl: BehaviorSubject<INewsDetail> = new BehaviorSubject<INewsDetail>(null);
}
