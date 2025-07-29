import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { Song } from './AudioPlayer';

interface SongLibraryProps {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  onSongSelect: (index: number) => void;
  onPlayPause: () => void;
}

export const SongLibrary: React.FC<SongLibraryProps> = ({
  songs,
  currentSongIndex,
  isPlaying,
  onSongSelect,
  onPlayPause
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSongClick = (index: number) => {
    if (index === currentSongIndex) {
      onPlayPause();
    } else {
      onSongSelect(index);
    }
  };

  if (songs.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Your Music Library</h3>
        <p className="text-muted-foreground mb-6">
          Upload your first song to get started. You can add songs via file upload or by adding them to the code.
        </p>
        <div className="bg-card rounded-lg p-6 max-w-md mx-auto">
          <h4 className="font-semibold mb-2">Adding Songs via Code:</h4>
          <code className="bg-muted p-2 rounded text-sm block">
            &lt;source src="audio/song-name.mp3" type="audio/mpeg" /&gt;
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Library</h2>
      
      <div className="space-y-2">
        {songs.map((song, index) => (
          <Card
            key={song.id}
            className={`p-4 transition-all duration-200 cursor-pointer hover:bg-secondary/50 ${
              index === currentSongIndex ? 'bg-secondary border-primary/50' : ''
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleSongClick(index)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-card rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary/20 rounded-full" />
                </div>
                
                {/* Play/Pause Overlay */}
                {(hoveredIndex === index || index === currentSongIndex) && (
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSongClick(index);
                      }}
                    >
                      {index === currentSongIndex && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${
                  index === currentSongIndex ? 'text-primary' : 'text-foreground'
                }`}>
                  {song.title}
                </h3>
                <p className="text-muted-foreground text-sm truncate">{song.artist}</p>
              </div>

              <div className="flex items-center space-x-2">
                {index === currentSongIndex && isPlaying && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-primary rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};