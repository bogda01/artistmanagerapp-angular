import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from './artist';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ArtistService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiServerUrl}/artist/all`);
  }

  public addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${this.apiServerUrl}/artist/add`, artist);
  }

  public updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiServerUrl}/artist/update`, artist);
  }

  public deleteArtist(artistId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/artist/delete/${artistId}`);
  }
}
