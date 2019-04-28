import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoundProgressConfigProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RoundProgressConfigProvider Provider');
  }

}
