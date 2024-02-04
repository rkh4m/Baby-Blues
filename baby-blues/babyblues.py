import spotipy
from spotipy.oauth2 import SpotifyOAuth
import random

# api key
client_id = "6f3bc5b1ddd647558965125cde910218"
client_secret = "b38fb25080cf45949a895fdbaec257b7"
redirect_uri = "http://localhost:8888/callback"
username = "justintshim"
genre = 'sad'

scope = "playlist-modify-public playlist-modify-private"
# setup
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=client_id,
                                               client_secret=client_secret,
                                               redirect_uri=redirect_uri,
                                               scope=scope,
                                               username=username))

def get_all_playlists():
    playlists = sp.current_user_playlists(limit=50)
    while playlists:
        for playlist in playlists['items']:
            print(f"Name: {playlist['name']}, ID: {playlist['id']}, Owner: {playlist['owner']['id']}")
        if playlists['next']:
            playlists = sp.next(playlists)
        else:
            break

get_all_playlists()


def get_playlist_id(playlist_name):
    playlists = sp.current_user_playlists(limit=50)
    while playlists:
        for playlist in playlists['items']:
            # Debug print to see the playlist names being checked
            print(f"Checking: {playlist['name']}, Owned by: {playlist['owner']['id']}")
            if playlist['name'] == playlist_name and playlist['owner']['id'] == username:
                return playlist['id']
        if playlists['next']:
            playlists = sp.next(playlists)
        else:
            playlists = None
    return None

# test
playlist_id = get_playlist_id(genre + " Playlist")
if playlist_id:
    print(f"Playlist ID: {playlist_id}")
else:
    print("Playlist not found.")


def create_playlist_for_genre(genre_keyword):
    playlist_name = f"{genre_keyword} Playlist"
    playlist_id = get_playlist_id(genre + " Playlist")

    if playlist_id:
        sp.current_user_unfollow_playlist(playlist_id)
        print(f"Existing playlist '{playlist_name}' removed.")

    # Create a new playlist
    new_playlist = sp.user_playlist_create(user=username, name=playlist_name, public=True)
    new_playlist_id = new_playlist['id']

    # Search
    playlists = sp.search(q=f"genre:{genre_keyword}", limit=10, type='playlist')
    playlist_ids = [playlist['id'] for playlist in playlists['playlists']['items']]
    track_ids = set()
    for pl_id in playlist_ids:
        tracks = sp.playlist_tracks(pl_id)
        track_ids.update([track['track']['id'] for track in tracks['items'] if track['track']])

    track_ids_list = list(track_ids)


    selected_track_ids = random.sample(track_ids_list, min(20, len(track_ids_list)))

    sp.playlist_add_items(new_playlist_id, selected_track_ids)

    print(f"New playlist created: {playlist_name}")
    print(f"Playlist URL: https://open.spotify.com/playlist/{new_playlist_id}")

# Example usage
create_playlist_for_genre(genre)
