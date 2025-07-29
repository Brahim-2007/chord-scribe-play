import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Upload } from 'lucide-react';
import { LyricLine } from './AudioPlayer';
import { toast } from 'sonner';

interface LyricsViewerProps {
  lyrics?: LyricLine[];
  currentTime: number;
  songTitle: string;
  onLyricsUpdate?: (lyrics: LyricLine[]) => void;
}

export const LyricsViewer: React.FC<LyricsViewerProps> = ({
  lyrics,
  currentTime,
  songTitle,
  onLyricsUpdate
}) => {
  const [editMode, setEditMode] = useState(false);
  const [lyricsText, setLyricsText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Find current lyric line based on time
  useEffect(() => {
    if (!lyrics) return;

    const activeIndex = lyrics.findIndex((line, index) => {
      const nextLine = lyrics[index + 1];
      return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });

    setCurrentLineIndex(activeIndex);
  }, [currentTime, lyrics]);

  // Auto-scroll to current line
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentLineIndex]);

  const parseLRCFile = (content: string): LyricLine[] => {
    const lines = content.split('\n');
    const lyricsArray: LyricLine[] = [];

    lines.forEach(line => {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const centiseconds = parseInt(match[3]);
        const text = match[4].trim();
        
        const time = minutes * 60 + seconds + centiseconds / 100;
        lyricsArray.push({ time, text });
      }
    });

    return lyricsArray.sort((a, b) => a.time - b.time);
  };

  const handleLRCUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.lrc')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const parsedLyrics = parseLRCFile(content);
        onLyricsUpdate?.(parsedLyrics);
        toast.success('Lyrics uploaded successfully!');
      };
      reader.readAsText(file);
    } else {
      toast.error('Please upload a valid .lrc file');
    }
  };

  const handleManualEdit = () => {
    if (editMode) {
      // Parse manual lyrics (simple format: time|text)
      const lines = lyricsText.split('\n').filter(line => line.trim());
      const parsedLyrics: LyricLine[] = [];

      lines.forEach((line, index) => {
        const parts = line.split('|');
        if (parts.length === 2) {
          const timeStr = parts[0].trim();
          const text = parts[1].trim();
          
          // Parse time in format mm:ss or just seconds
          let time = 0;
          if (timeStr.includes(':')) {
            const [minutes, seconds] = timeStr.split(':');
            time = parseInt(minutes) * 60 + parseFloat(seconds);
          } else {
            time = parseFloat(timeStr);
          }
          
          parsedLyrics.push({ time, text });
        } else {
          // If no time specified, space lyrics evenly
          parsedLyrics.push({ 
            time: index * 3, // 3 seconds apart
            text: line.trim() 
          });
        }
      });

      onLyricsUpdate?.(parsedLyrics);
      toast.success('Lyrics updated!');
    }
    setEditMode(!editMode);
  };

  if (!lyrics && !editMode) {
    return (
      <Card className="p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Lyrics</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload LRC
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualEdit}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Add Lyrics
            </Button>
          </div>
        </div>

        <div className="text-center text-muted-foreground space-y-4">
          <p>No lyrics available for "{songTitle}"</p>
          <div className="text-sm space-y-2">
            <p>You can:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Upload an .lrc file with synchronized lyrics</li>
              <li>Manually add lyrics with timing (format: time|text)</li>
              <li>Add simple lyrics without timing</li>
            </ul>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".lrc"
          onChange={handleLRCUpload}
          className="hidden"
        />
      </Card>
    );
  }

  if (editMode) {
    return (
      <Card className="p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Edit Lyrics</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleManualEdit}>
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Format options:</strong></p>
            <p>• With timing: "1:23|Lyric text here"</p>
            <p>• Without timing: "Just the lyric text"</p>
            <p>• Time can be mm:ss or just seconds</p>
          </div>
          
          <textarea
            value={lyricsText}
            onChange={(e) => setLyricsText(e.target.value)}
            placeholder="Enter lyrics here...&#10;&#10;Example:&#10;0:00|First line of song&#10;0:05|Second line of song&#10;0:10|Third line of song"
            className="w-full h-96 p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Lyrics</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload LRC
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLyricsText(lyrics?.map(l => `${Math.floor(l.time / 60)}:${(l.time % 60).toFixed(2).padStart(5, '0')}|${l.text}`).join('\n') || '');
              setEditMode(true);
            }}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="space-y-4 max-h-96 overflow-y-auto">
        {lyrics?.map((line, index) => (
          <div
            key={index}
            ref={index === currentLineIndex ? activeLineRef : null}
            className={`transition-all duration-300 text-center py-2 px-4 rounded-lg ${
              index === currentLineIndex
                ? 'text-lyrics-highlight font-semibold bg-primary/10 scale-105'
                : 'text-lyrics-text'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".lrc"
        onChange={handleLRCUpload}
        className="hidden"
      />
    </Card>
  );
};