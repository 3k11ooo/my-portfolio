import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySearchPlaylistTracksComponent } from './spotify-search-playlist-tracks.component';

describe('SpotifySearchPlaylistTracksComponent', () => {
  let component: SpotifySearchPlaylistTracksComponent;
  let fixture: ComponentFixture<SpotifySearchPlaylistTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifySearchPlaylistTracksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifySearchPlaylistTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
