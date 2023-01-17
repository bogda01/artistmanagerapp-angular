import { Component, OnInit } from '@angular/core';
import { Artist } from './artist';
import { ArtistService } from './artist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {SongService} from './song.service';
import {Song} from './song';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'artistmanagerapp-angular';
  public artists: Artist[];
  public songs: Song[];
  public songArtist: Artist;
  public editArtist: Artist;
  public deleteArtist: Artist;

  constructor(private artistService: ArtistService, private songService: SongService){}

  ngOnInit() {
    this.getArtists();
  }

  public getArtists(): void {
    this.artistService.getArtists().subscribe(
      (response: Artist[]) => {
        this.artists = response;
        console.log(this.artists);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onGetSongs(artistId: number): void {
    this.songService.getSongs(artistId).subscribe(
      (response: Song[]) => {
        this.songs = response;
        console.log(this.songs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddArtist(addForm: NgForm): void {
    document.getElementById('add-artist-form').click();
    this.artistService.addArtist(addForm.value).subscribe(
      (response: Artist) => {
        console.log(response);
        this.getArtists();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateArtist(artist: Artist): void {
    this.artistService.updateArtist(artist).subscribe(
      (response: Artist) => {
        console.log(response);
        this.getArtists();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteArtist(artistId: number): void {
    this.artistService.deleteArtist(artistId).subscribe(
      (response: void) => {
        console.log(response);
        this.getArtists();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchArtists(key: string): void {
    console.log(key);
    const results: Artist[] = [];
    for (const artist of this.artists) {
      if (artist.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || artist.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(artist);
      }
    }
    this.artists = results;
    if (results.length === 0 || !key) {
      this.getArtists();
    }
  }

  public onOpenModal(artist: Artist, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addArtistModal');
    }
    if (mode === 'edit') {
      this.editArtist = artist;
      button.setAttribute('data-target', '#updateArtistModal');
    }
    if (mode === 'delete') {
      this.deleteArtist = artist;
      button.setAttribute('data-target', '#deleteArtistModal');
    }
    if (mode === 'song') {
      this.songArtist = artist;
      this.onGetSongs(this.songArtist.id);
      button.setAttribute('data-target', '#songModal');
    }
    container.appendChild(button);
    button.click();
  }


}
