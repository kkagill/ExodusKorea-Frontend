import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {
  _apiURI: string;
  _authURI: string;

  constructor() {
    this._apiURI = environment.APIEndPoint;
    this._authURI = environment.AuthEndPoint;
    // this._apiURI = '//localhost:18691/api/';
    // this._authURI = '//localhost:18691/';
    // this._apiURI = 'https://exoduskoreaapi.azurewebsites.net/api/';
    // this._authURI = 'https://exoduskoreaapi.azurewebsites.net/';
  }

  getApiURI() {
    return this._apiURI;
  }

  getAuthURI() {
    return this._authURI;
  }

  getApiHost() {
    return this._apiURI.replace('api/', '');
  }
}