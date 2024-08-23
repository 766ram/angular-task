import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  data: Config = {};

  constructor(private http: HttpClient) {}

  async load(defaults?: Config): Promise<Config> {
    if (environment.loginenable) {
      console.log('ConfigService: Loading configuration...');
    }

    try {
      const response = await this.http.get<Config>('./assets/config.json').toPromise();
      this.data = Object.assign({}, defaults || {}, response || {});
      console.log('ConfigService: Configuration loaded from server:', this.data);
      return this.data;
    } catch (error) {
      console.error('ConfigService: Error loading configuration:', error);
      console.log('ConfigService: Using default configuration');
      this.data = Object.assign({}, defaults || {});
      return this.data;
    }
  }
}
