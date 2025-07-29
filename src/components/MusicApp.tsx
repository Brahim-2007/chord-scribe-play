import React, { useState, useRef, useEffect } from 'react';
import { AudioPlayer, Song, LyricLine } from './AudioPlayer';
import { SongLibrary } from './SongLibrary';
import { LyricsViewer } from './LyricsViewer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample songs with lyrics for demonstration
const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Sample Song 1',
    artist: 'Demo Artist',
    src: '/audio/sample1.mp3', // You can replace with actual audio files
    lyrics: [
      { time: 0, text: "Welcome to our music player" },
      { time: 3, text: "This is a synchronized lyric line" },
      { time: 6, text: "The lyrics follow the audio timing" },
      { time: 9, text: "Just like Spotify!" },
      { time: 12, text: "Upload your own songs and lyrics" },
    ]
  },
  {
    id: '2',
    title: 'Another Song',
    artist: 'Another Artist',
    src: '/audio/sample2.mp3',
    lyrics: [
      { time: 0, text: "This is another sample song" },
      { time: 4, text: "With different lyrics and timing" },
      { time: 8, text: "You can add your own music files" },
      { time: 12, text: "And create custom lyrics" },
    ]
  }
];

export const MusicApp: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>(sampleSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update current time from audio player
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updatePlayState = () => setIsPlaying(!audio.paused);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', updatePlayState);
    audio.addEventListener('pause', updatePlayState);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('play', updatePlayState);
      audio.removeEventListener('pause', updatePlayState);
    };
  }, []);

  const handleSongChange = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
  };

  const handleSongAdd = (newSong: Song) => {
    setSongs(prev => [...prev, newSong]);
    if (songs.length === 0) {
      setCurrentSongIndex(0);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLyricsUpdate = (lyrics: LyricLine[]) => {
    setSongs(prev => prev.map((song, index) => 
      index === currentSongIndex 
        ? { ...song, lyrics }
        : song
    ));
  };

  const currentSong = songs[currentSongIndex];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hidden audio element for time tracking */}
      <audio
        ref={audioRef}
        src={currentSong?.src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
      />

      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            🎵 MusicStream
          </h1>
          <p className="text-muted-foreground">Your personal Spotify-like music player</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Sidebar - Song Library */}
        <aside className="w-80 bg-card border-r border-border overflow-y-auto">
          <SongLibrary
            songs={songs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            onSongSelect={handleSongChange}
            onPlayPause={handlePlayPause}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="lyrics" className="h-full">
            <TabsList className="mb-6">
              <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
              <TabsTrigger value="info">Song Info</TabsTrigger>
            </TabsList>

            <TabsContent value="lyrics" className="h-full">
              <LyricsViewer
                lyrics={currentSong?.lyrics}
                currentTime={currentTime}
                songTitle={currentSong?.title || 'No Song Selected'}
                onLyricsUpdate={handleLyricsUpdate}
              />
            </TabsContent>

            <TabsContent value="info">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Now Playing</h3>
                {currentSong ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-32 bg-gradient-card rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{currentSong.title}</h2>
                        <p className="text-xl text-muted-foreground">{currentSong.artist}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {currentSong.lyrics ? `${currentSong.lyrics.length} lyric lines` : 'No lyrics'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">How to add songs:</h4>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <p className="text-sm"><strong>1. Via File Upload:</strong> Use the upload button in the player</p>
                        <p className="text-sm"><strong>2. Via Code:</strong> Add songs to the sampleSongs array:</p>
                        <code className="block bg-background p-2 rounded text-xs mt-2">
                          {`{
  id: 'unique-id',
  title: 'Song Title',
  artist: 'Artist Name',
  src: 'audio/song-name.mp3',
  lyrics: [
    { time: 0, text: "First line" },
    { time: 5, text: "Second line" }
  ]
}`}
                        </code>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No song selected. Upload a song to get started!</p>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Audio Player - Fixed at bottom */}
      <AudioPlayer
        songs={songs}
        currentSongIndex={currentSongIndex}
        onSongChange={handleSongChange}
        onSongAdd={handleSongAdd}
      />
    </div>
  );
};