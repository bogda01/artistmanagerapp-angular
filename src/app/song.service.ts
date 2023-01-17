import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from './song';
import {Artist} from './artist';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSongs(artistId: number): Observable<Song[]>{
    return this.http.get<Song[]>(`${this.apiServerUrl}/song/all?id=${artistId}`);
  }

}
