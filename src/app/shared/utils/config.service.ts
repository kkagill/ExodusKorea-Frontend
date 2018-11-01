import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  _apiURI: string;
  _authURI: string;

  constructor() {
    this._apiURI = '//localhost:18691/api/';
    this._authURI = '//localhost:18691/';
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