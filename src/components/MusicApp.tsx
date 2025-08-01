import React, { useState, useRef, useEffect } from 'react';
import { AudioPlayer, Song, LyricLine } from './AudioPlayer';
import { SongLibrary } from './SongLibrary';
import { LyricsViewer } from './LyricsViewer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample songs with lyrics for demonstration
const sampleSongs: Song[] = [
  {
  id: 'alida',
  title: 'Alida',
  artist: 'ibroTN19',
  albumArt: alidaCoverImage, // Import your image
  audioSrc: 'audio/1-alida.mp3',
  lyrics: [
    { timestamp: 0, text: 'Soft as the hush when the moon says goodbye' },
    { timestamp: 4, text: 'You fade into light without needing to try' },
    { timestamp: 8, text: 'Seventeen candles, one still aglow' },
    { timestamp: 12, text: 'You carry the night wherever you go' },
    { timestamp: 16, text: '' },
    { timestamp: 18, text: 'Alida…' },
    { timestamp: 22, text: 'The name that sounds like sky' },
    { timestamp: 26, text: 'Like stars exhaling lullabies' },
    { timestamp: 30, text: '' },
    { timestamp: 34, text: 'You were the poem I didn’t yet know' },
    { timestamp: 38, text: 'The echo that taught the silence to glow' },
    { timestamp: 42, text: 'You smiled like a secret too warm to keep' },
    { timestamp: 46, text: 'You danced in my dreams, and stayed in my sleep' },
    { timestamp: 50, text: '' },
    { timestamp: 54, text: 'If I never find the words, let this song be' },
    { timestamp: 58, text: 'A map of all you mean to me' },
    { timestamp: 62, text: 'Alida —' },
    { timestamp: 66, text: 'The moon in my memory' }
  ]
},
{
  id: 'under-the-same-moon',
  title: 'Under the Same Moon',
  artist: 'ibroTN19',
  albumArt: moonCoverImage, // Import your image
  audioSrc: 'audio/2-under-the-same-moon.mp3',
  lyrics: [
    { timestamp: 0, text: 'Seventeen candles, the sky feels wide' },
    { timestamp: 4, text: 'You’re in Tashkent, I’m oceans aside' },
    { timestamp: 8, text: 'You laugh like morning, but your eyes hold night' },
    { timestamp: 12, text: 'Like the moon hiding tears in the quiet twilight' },
    { timestamp: 16, text: '' },
    { timestamp: 18, text: 'You speak like stories written in stars' },
    { timestamp: 22, text: 'English dreams and Korean hearts' },
    { timestamp: 26, text: 'You look like China carved in snow' },
    { timestamp: 30, text: 'But your soul is the light that the eclipse won’t show' },
    { timestamp: 34, text: '' },
    { timestamp: 36, text: 'We met in silence, in digital skies' },
    { timestamp: 40, text: 'Through a screen, I saw your light' },
    { timestamp: 44, text: 'Now I’m counting days that we never touched' },
    { timestamp: 48, text: 'But somehow, somehow, I feel so much' },
    { timestamp: 52, text: '' },
    { timestamp: 54, text: 'Alida, my moon in a faraway place' },
    { timestamp: 58, text: 'The waiting, the missing, I carry your face' },
    { timestamp: 62, text: 'You shine through the distance, you pull like the tide' },
    { timestamp: 66, text: 'Even the sun couldn’t make me hide' },
    { timestamp: 70, text: 'From the future we draw, in the language we learn' },
    { timestamp: 74, text: 'Two friends, two stars — forever we burn' },
    { timestamp: 78, text: 'Even apart, I know it’s true...' },
    { timestamp: 82, text: 'We live under the same moon' },
    { timestamp: 86, text: '' },
    { timestamp: 88, text: 'Smart like silence before it breaks' },
    { timestamp: 92, text: 'Strong like hearts that still ache' },
    { timestamp: 96, text: 'Uzbek skies, Tunisian dreams' },
    { timestamp: 100, text: 'You and I, in between the seams' },
    { timestamp: 104, text: '' },
    { timestamp: 106, text: 'IELTS books and sleepless nights' },
    { timestamp: 110, text: 'We chase tomorrow in different lights' },
    { timestamp: 114, text: 'But you, you’re lovely — a wish in bloom' },
    { timestamp: 118, text: 'A secret shared between sun and moon' },
    { timestamp: 122, text: '' },
    { timestamp: 124, text: 'The meeting was fate, but the distance, a storm' },
    { timestamp: 128, text: 'Yet even in waiting, you keep me warm' },
    { timestamp: 132, text: 'You speak to my soul in a voice so kind' },
    { timestamp: 136, text: 'Even in echoes, you quiet my mind' },
    { timestamp: 140, text: '' },
    { timestamp: 142, text: 'Alida, my moon in a faraway place' },
    { timestamp: 146, text: 'The waiting, the missing, I carry your face' },
    { timestamp: 150, text: 'You shine through the distance, you pull like the tide' },
    { timestamp: 154, text: 'Even the sun couldn’t make me hide' },
    { timestamp: 158, text: 'From the future we draw, in the language we learn' },
    { timestamp: 162, text: 'Two friends, two stars — forever we burn' },
    { timestamp: 166, text: 'Even apart, I know it’s true...' },
    { timestamp: 170, text: 'We live under the same moon' },
    { timestamp: 174, text: '' },
    { timestamp: 176, text: 'Maybe one day we’ll sit and breathe' },
    { timestamp: 180, text: 'The same cold air beneath the trees' },
    { timestamp: 184, text: 'No screens, no space — just time to keep' },
    { timestamp: 188, text: 'A moment where the distance sleeps' },
    { timestamp: 192, text: '' },
    { timestamp: 194, text: 'Alida, the name I sing in the dark' },
    { timestamp: 198, text: 'My moon, my friend, my glowing spark' },
    { timestamp: 202, text: 'The years may pass, and life may bloom' },
    { timestamp: 206, text: 'But I’ll always find you in the moon' },
    { timestamp: 210, text: '' },
    { timestamp: 212, text: 'Seventeen dreams in a world so wide...' },
    { timestamp: 216, text: 'You’re the moon… and I’m the tide.' }
  ]
},
{
  id: 'are-you-happy',
  title: 'Are you happy?',
  artist: 'ibroTN19',
  albumArt: moonchildCoverImage, // Import your image
  audioSrc: 'audio/3-are-you-happy.mp3',
  lyrics: [
    { timestamp: 0, text: 'Seventeen candles in the dark,' },
    { timestamp: 4, text: 'Your light still reaches me, Moonchild.' },
    { timestamp: 8, text: 'Tashkent nights, so far apart,' },
    { timestamp: 12, text: 'But your glow lingers in my sky...' },
    { timestamp: 16, text: '' },
    { timestamp: 18, text: 'You’re the eclipse—half sun, half mystery,' },
    { timestamp: 22, text: 'A face like Seoul but a soul so free.' },
    { timestamp: 26, text: 'IELTS dreams in your fingertips,' },
    { timestamp: 30, text: 'Yet you’re the poem I can’t write...' },
    { timestamp: 34, text: '' },
    { timestamp: 36, text: 'Oceans hum your name,' },
    { timestamp: 40, text: '"When will the meeting come?"' },
    { timestamp: 44, text: 'Time zones play their games,' },
    { timestamp: 48, text: 'But missing you’s my sun...' },
    { timestamp: 52, text: '' },
    { timestamp: 54, text: 'Happy birthday, my Moon,' },
    { timestamp: 58, text: 'I’m just your Tunisian friend in the shadows.' },
    { timestamp: 62, text: 'The distance hums its tune,' },
    { timestamp: 66, text: 'But I’ll keep waiting where the future goes...' },
    { timestamp: 70, text: '' },
    { timestamp: 72, text: 'You paint the stars in Korean ink,' },
    { timestamp: 76, text: 'Your laughter’s a song I replay.' },
    { timestamp: 80, text: 'Smart as the books you love to think,' },
    { timestamp: 84, text: 'Yet you’re the riddle I can’t solve...' },
    { timestamp: 88, text: '' },
    { timestamp: 90, text: 'Maybe one day, no more goodbyes—' },
    { timestamp: 94, text: 'Just hello under the same moonlight.' },
    { timestamp: 98, text: 'Till then, I’m a voice in the static,' },
    { timestamp: 102, text: 'Singing, "Are you happy? Are you happy?"' },
    { timestamp: 106, text: '' },
    { timestamp: 110, text: 'Happy birthday, my Moon,' },
    { timestamp: 112, text: 'I’m just your Tunisian friend in the shadows.' },
    { timestamp: 116, text: 'The distance hums its tune,' },
    { timestamp: 120, text: 'But I’ll keep waiting where the future goes...' },
    { timestamp: 124, text: '' },
    { timestamp: 128, text: 'Seventeen years, but you’re timeless,' },
    { timestamp: 130, text: 'My eclipse, my lovely...' },
    { timestamp: 134, text: 'Blow your wish into the wind,' },
    { timestamp: 138, text: 'Maybe it’ll find me.' }
  ]
},
{
  id: 'midnight-in-tashkent',
  title: 'Midnight in Tashkent',
  artist: 'ibroTN19',
  albumArt: tashkentMidnightImage, // Replace with your image import
  audioSrc: 'audio/4-midnight-in-tashkent.mp3',
  lyrics: [
    // Verse 1 (Soft, observational)
    { timestamp: 0, text: 'City lights on sleepy roads' },
    { timestamp: 4, text: 'You're walking slow, the world unknown' },
    { timestamp: 8, text: 'A hoodie, dreams, and midnight air' },
    { timestamp: 12, text: 'The moon is watching how you stare' },
    { timestamp: 16, text: '' },

    // Verse 2 (Intimate, with subtle motion)
    { timestamp: 18, text: 'Your phone plays V in quiet loops' },
    { timestamp: 22, text: 'You hum the chorus no one knew' },
    { timestamp: 26, text: 'Neon signs in foreign glow' },
    { timestamp: 30, text: 'Reflect a heart that won't let go' },
    { timestamp: 34, text: '' },

    // Pre-Chorus (Whispered vulnerability)
    { timestamp: 36, text: 'You never say too much out loud' },
    { timestamp: 40, text: 'But your thoughts are singing proud' },
    { timestamp: 44, text: 'The sky above is calm and black' },
    { timestamp: 48, text: 'Like all the things you're holding back' },
    { timestamp: 52, text: '' },

    // Chorus (Expansive, yearning)
    { timestamp: 54, text: 'Midnight in Tashkent, and you're alive' },
    { timestamp: 58, text: 'Wearing stars in your silent stride' },
    { timestamp: 62, text: 'No one sees the way you shine' },
    { timestamp: 66, text: 'But I do, from another time' },
    { timestamp: 70, text: 'Every shadow, every street' },
    { timestamp: 74, text: 'Feels like something incomplete' },
    { timestamp: 78, text: 'But you walk like you don't need to pretend…' },
    { timestamp: 82, text: 'It's just you and the night' },
    { timestamp: 86, text: 'In Tashkent again' },
    { timestamp: 90, text: '' },

    // Verse 3 (Questions hanging in the air)
    { timestamp: 92, text: 'Do you miss someone when the sky is still?' },
    { timestamp: 96, text: 'Do your eyes speak what you feel?' },
    { timestamp: 100, text: 'There's magic in the steps you take' },
    { timestamp: 104, text: 'Like you're tracing dreams that never break' },
    { timestamp: 108, text: '' },

    // Verse 4 (Cinematic imagery)
    { timestamp: 110, text: 'The sushi shop is closing down' },
    { timestamp: 114, text: 'You walk alone but wear a crown' },
    { timestamp: 118, text: 'The air is cold, your heart is warm' },
    { timestamp: 122, text: 'You're quiet thunder in a storm' },
    { timestamp: 126, text: '' },

    // Bridge (Transcendent connection)
    { timestamp: 128, text: 'No one hears the silent part' },
    { timestamp: 132, text: 'But I can feel your beating heart' },
    { timestamp: 136, text: 'In every breeze that crosses space' },
    { timestamp: 140, text: 'I picture you in your midnight place' },
    { timestamp: 144, text: '' },

    // Chorus Repeat (Stronger emotional pull)
    { timestamp: 146, text: 'Midnight in Tashkent, and you're alive' },
    { timestamp: 150, text: 'Wearing stars in your silent stride' },
    { timestamp: 154, text: 'No one sees the way you shine' },
    { timestamp: 158, text: 'But I do, from another time' },
    { timestamp: 162, text: 'Every shadow, every street' },
    { timestamp: 166, text: 'Feels like something incomplete' },
    { timestamp: 170, text: 'But you walk like you don't need to pretend…' },
    { timestamp: 174, text: 'It\'s just you and the night' },
    { timestamp: 178, text: 'In Tashkent again' },
    { timestamp: 182, text: '' },

    // Interlude (Fragile, atmospheric)
    { timestamp: 184, text: 'I wonder if you feel me too' },
    { timestamp: 188, text: 'When moonlight touches avenues' },
    { timestamp: 192, text: 'You're there, and I'm far, but somehow near…' },
    { timestamp: 196, text: 'In midnight, you appear' },
    { timestamp: 200, text: '' },

    // Final Chorus (Triumphant yet tender)
    { timestamp: 202, text: 'Midnight in Tashkent, slow and sweet' },
    { timestamp: 206, text: 'You're the rhythm in the city's beat' },
    { timestamp: 210, text: 'A girl the world has yet to know' },
    { timestamp: 214, text: 'But to me, you're already gold' },
    { timestamp: 218, text: 'And when the silence fills the sky' },
    { timestamp: 222, text: 'Just know I'm watching too, nearby' },
    { timestamp: 226, text: 'We're not alone, even in the end...' },
    { timestamp: 230, text: 'You're never alone...' },
    { timestamp: 234, text: 'In Tashkent at 12 again' },
    { timestamp: 238, text: '' },

    // Outro (Fading whisper)
    { timestamp: 240, text: 'Midnight breath…' },
    { timestamp: 244, text: 'You're moonlight dressed.' }
  ]
},
{
  id: 'fashionably-late',
  title: 'Fashionably Late',
  artist: 'ibroTN19',
  albumArt: alidaCatImage, // Replace with your image import
  audioSrc: 'audio/5-fashionably-late.mp3',
  lyrics: [
    // Verse 1 (Playful, teasing)
    { timestamp: 0, text: 'Tick-tock, the clock says 3, but you stroll in at 3:15' },
    { timestamp: 4, text: 'With your hair half-done, and that laugh so free' },
    { timestamp: 8, text: '"Sorry, sorry," but you don’t really mean it' },
    { timestamp: 12, text: '‘Cause time bends when Alida’s in it...' },
    { timestamp: 16, text: '' },

    // Pre-Chorus (Warm, adoring)
    { timestamp: 18, text: 'And I don’t mind, no, I don’t mind' },
    { timestamp: 22, text: 'Watching the world pause when you arrive' },
    { timestamp: 26, text: 'With your kitten purring in your arms' },
    { timestamp: 30, text: 'Like a little queen, wrapped up in your charm...' },
    { timestamp: 34, text: '' },

    // Chorus (Bouncy, affectionate)
    { timestamp: 36, text: 'Fashionably late, with your kitty by your side' },
    { timestamp: 40, text: 'You turn every wait into a sweet lullaby' },
    { timestamp: 44, text: 'Time slows down just to match your pace' },
    { timestamp: 48, text: 'Alida, no one does it like you, no way...' },
    { timestamp: 52, text: '' },

    // Verse 2 (Humorous, endearing)
    { timestamp: 54, text: 'Text says "5 mins," but I know the code' },
    { timestamp: 58, text: 'Means "I’ll be there when the stars explode"' },
    { timestamp: 62, text: 'But then you walk in, with that cat in tow' },
    { timestamp: 66, text: 'And suddenly, I forget that time even flows...' },
    { timestamp: 70, text: '' },

    // Bridge (Whimsical, cosmic)
    { timestamp: 72, text: 'Maybe clocks just hate to rush you' },
    { timestamp: 76, text: 'Maybe the universe loves you too much to' },
    { timestamp: 80, text: 'Let you fade into the crowd' },
    { timestamp: 84, text: 'So it makes you fashionably loud...' },
    { timestamp: 88, text: '' },

    // Chorus Variant (Softer, more intimate)
    { timestamp: 90, text: 'Fashionably late, with your kitty in your lap' },
    { timestamp: 94, text: 'You turn every "when?" into a sweet "oh, that’s that"' },
    { timestamp: 98, text: 'Time’s just a joke when you’re around' },
    { timestamp: 102, text: 'Alida, you own every second, every sound...' },
    { timestamp: 106, text: '' },

    // Outro (Dreamy fade-out)
    { timestamp: 108, text: 'Fashionably you… fashionably true…' },
    { timestamp: 112, text: 'With your kitten eyes and your slow-moon moves…' },
    { timestamp: 116, text: 'Fashionably late… but always worth the wait…' },
    { timestamp: 120, text: '' }
  ]
},
{
  id: 'youre-my-moon',
  title: 'You’re My Moon',
  artist: 'ibroTN19',
  albumArt: moonNovaImage, // Replace with your image import
  audioSrc: 'audio/6-youre-my-moon.mp3',
  lyrics: [
    // Verse 1 (Energetic, adoring)
    { timestamp: 0, text: 'Tashkent nights and Seoul city lights,' },
    { timestamp: 3, text: 'You shine brighter than a supernova.' },
    { timestamp: 6, text: 'Chinese eyes like the starry skies,' },
    { timestamp: 9, text: 'Got me falling over and over.' },
    { timestamp: 12, text: 'Seventeen dreams, a sweet teenage queen,' },
    { timestamp: 15, text: 'Speaking English like it’s magic.' },
    { timestamp: 18, text: 'Yeah, you’re that girl—every heart you unfurl,' },
    { timestamp: 21, text: 'Brilliant and kind, so tragic (in a good way)!' },
    { timestamp: 24, text: '' },

    // Pre-Chorus (Playful, rhythmic)
    { timestamp: 26, text: 'O’zbek qalbi with a K-pop beat,' },
    { timestamp: 29, text: 'Smart and shining—you can’t be beat!' },
    { timestamp: 32, text: 'You’re the moon up high, lighting up my July,' },
    { timestamp: 35, text: 'Alida, you make life complete!' },
    { timestamp: 38, text: '' },

    // Chorus (Explosive, celebratory)
    { timestamp: 40, text: 'You’re my moonlight, my Seoul, my world!' },
    { timestamp: 43, text: 'Seventeen candles, shining so bright!' },
    { timestamp: 46, text: 'You’re the best girl in the whole universe!' },
    { timestamp: 49, text: 'Yeah, you’re smart and cool, breaking every rule,' },
    { timestamp: 52, text: 'Got me singing like a fool!' },
    { timestamp: 55, text: 'Alida, you’re the moon!' },
    { timestamp: 58, text: '' },

    // Verse 2 (Lyrical, dreamy)
    { timestamp: 60, text: 'From Registan to the Han River flow,' },
    { timestamp: 63, text: 'You dance between worlds like a breeze.' },
    { timestamp: 66, text: 'English words make your wisdom glow,' },
    { timestamp: 69, text: 'Beauty that puts my mind at ease.' },
    { timestamp: 72, text: 'Seventeen wishes on a star we’ll kiss,' },
    { timestamp: 75, text: 'With every step, you rise higher.' },
    { timestamp: 78, text: 'My Chinese moon in the Uzbek noon—' },
    { timestamp: 81, text: 'You set this whole world on fire!' },
    { timestamp: 84, text: '' },

    // Bridge (Multilingual, heartfelt)
    { timestamp: 86, text: 'Sen mening oyimsan (You’re my moon),' },
    { timestamp: 89, text: 'Wo de yueliang (My moonlight)!' },
    { timestamp: 92, text: 'Across the miles, I’m sending you:' },
    { timestamp: 95, text: '"사랑해, 생일 축하해!" (I love you, Happy Birthday!)' },
    { timestamp: 98, text: 'Blow those candles, make it true—' },
    { timestamp: 101, text: 'Alida, I adore you!' },
    { timestamp: 104, text: '' },

    // Outro (Festive, inviting)
    { timestamp: 106, text: 'Seventeen! Toyga marhamat!' },
    { timestamp: 109, text: 'Dance with me under the moon!' },
    { timestamp: 112, text: 'Alida—you’re the moon!' },
    { timestamp: 115, text: '' }
  ]
},
{
  id: 'uzbek-girl',
  title: 'Uzbek Girl',
  artist: 'ibroTN19',
  albumArt: hybridCultureImage, // Replace with your image
  audioSrc: 'audio/7-uzbek-girl.mp3',
  lyrics: [
    // Verse 1 (Contrast imagery)
    { timestamp: 0, text: 'Plov steam on your grandma’s stove,' },
    { timestamp: 3, text: 'But your AirPods blast K-R&B gold.' },
    { timestamp: 6, text: '"Oppa!" screams from your TikTok feed,' },
    { timestamp: 9, text: 'While your hands still knead old dough with need...' },
    { timestamp: 12, text: '' },

    // Verse 2 (Defiant pride)
    { timestamp: 14, text: 'They say, "Pick a side," but you just laugh—' },
    { timestamp: 17, text: 'Your heart’s a Seoul-bound aerograph.' },
    { timestamp: 20, text: 'Silk Road blood in K-fashion threads,' },
    { timestamp: 23, text: 'A nomad’s pulse in a studio bed...' },
    { timestamp: 26, text: '' },

    // Chorus (Anthemic)
    { timestamp: 28, text: 'Uzbek girl with a Seoul heart,' },
    { timestamp: 31, text: 'Tashkent roots but K-pop stars!' },
    { timestamp: 34, text: 'You’re the bridge, you’re the art,' },
    { timestamp: 37, text: 'Dancing between worlds apart!' },
    { timestamp: 40, text: 'From Registan to Han River lights,' },
    { timestamp: 43, text: 'You’re the remix that feels just right!' },
    { timestamp: 46, text: '' },

    // Verse 3 (Struggle & triumph)
    { timestamp: 48, text: 'Your tongue trips on Hangul rules,' },
    { timestamp: 51, text: 'But Uzbek lullabies fuel your blues.' },
    { timestamp: 54, text: 'They mock your "accent" when you sing along,' },
    { timestamp: 57, text: 'Till the dorm hears you—and it’s your song...' },
    { timestamp: 60, text: '' },

    // Instrumental Break (Cultural fusion)
    { timestamp: 62, text: '(Dutar twangs into K-pop synth drop)' },
    { timestamp: 70, text: '' },

    // Chorus Repeat (Stronger, with ad-libs)
    { timestamp: 72, text: 'Uzbek girl with a Seoul heart,' },
    { timestamp: 75, text: 'Tashkent roots but K-pop stars! (Yeah!)' },
    { timestamp: 78, text: 'You’re the bridge, you’re the art,' },
    { timestamp: 81, text: 'Dancing between worlds apart! (Go!)' },
    { timestamp: 84, text: 'From Registan to Han River lights,' },
    { timestamp: 87, text: 'You’re the remix that feels just...' },
    { timestamp: 90, text: '' },
  ]
},
{
  id: 'cat-eyes-galaxy-mind',
  title: 'Cat Eyes, Galaxy Mind',
  artist: 'ibroTN19',
  albumArt: nebulaCatImage, // Replace with your image
  audioSrc: 'audio/8-cat-eyes-galaxy-mind.mp3',
  lyrics: [
    // Verse 1 (Quiet observation)
    { timestamp: 0, text: 'She doesn’t speak unless it’s real' },
    { timestamp: 3, text: 'A look from her says what she feels' },
    { timestamp: 6, text: 'Like a cat in a room full of noise' },
    { timestamp: 9, text: 'She watches, quiet, with hidden poise' },
    { timestamp: 12, text: '' },

    // Verse 2 (Celestial imagery)
    { timestamp: 14, text: 'She’s not loud, but she’s not small' },
    { timestamp: 17, text: 'She draws constellations on the wall' },
    { timestamp: 20, text: 'In her mind, it’s never gray' },
    { timestamp: 23, text: 'Just nebula thoughts drifting far away' },
    { timestamp: 26, text: '' },

    // Pre-Chorus (Whispered intrigue)
    { timestamp: 28, text: 'You might miss her in the crowd' },
    { timestamp: 31, text: 'But she’s thinking stars out loud' },
    { timestamp: 34, text: 'Every blink, a hidden sign' },
    { timestamp: 37, text: 'She\'s soft — but she\'s designed' },
    { timestamp: 40, text: '' },

    // Chorus (Expansive wonder)
    { timestamp: 42, text: 'Cat eyes, galaxy mind' },
    { timestamp: 45, text: 'She’s light years ahead but stays behind' },
    { timestamp: 48, text: 'You’ll never guess the world she sees' },
    { timestamp: 51, text: 'While sipping tea and loving peace' },
    { timestamp: 54, text: 'She walks like silence, talks in code' },
    { timestamp: 57, text: 'Carries galaxies in overload' },
    { timestamp: 60, text: 'She’s the calm that breaks your pride…' },
    { timestamp: 63, text: 'Cat eyes, galaxy mind' },
    { timestamp: 66, text: '' },

    // Verse 3 (Mystical insight)
    { timestamp: 68, text: 'She draws in colors you can’t name' },
    { timestamp: 71, text: 'Reads your soul but plays no game' },
    { timestamp: 74, text: 'She learns your heart like second skin' },
    { timestamp: 77, text: 'Then disappears like midnight wind' },
    { timestamp: 80, text: '' },

    // Verse 4 (Duality)
    { timestamp: 82, text: 'She’s into K-dramas, sushi bites' },
    { timestamp: 85, text: 'But her dreams dance in higher heights' },
    { timestamp: 88, text: 'You see a girl — but that’s not all' },
    { timestamp: 91, text: 'She’s the reason stars don’t fall' },
    { timestamp: 94, text: '' },

    // Bridge (Metaphorical depth)
    { timestamp: 96, text: 'She’s the plot twist in the book' },
    { timestamp: 99, text: 'The hidden path you never took' },
    { timestamp: 102, text: 'Underneath that gentle face' },
    { timestamp: 105, text: 'Is a thousand worlds in place' },
    { timestamp: 108, text: '' },

    // Chorus Repeat (Stronger resonance)
    { timestamp: 110, text: 'Cat eyes, galaxy mind' },
    { timestamp: 113, text: 'She’s light years ahead but stays behind' },
    { timestamp: 116, text: 'You’ll never guess the world she sees' },
    { timestamp: 119, text: 'While sipping tea and loving peace' },
    { timestamp: 122, text: 'She walks like silence, talks in code' },
    { timestamp: 125, text: 'Carries galaxies in overload' },
    { timestamp: 128, text: 'She’s the calm that breaks your pride…' },
    { timestamp: 131, text: 'Cat eyes, galaxy mind' },
    { timestamp: 134, text: '' },

    // Interlude (Haunting duality)
    { timestamp: 136, text: 'She’s logic and magic' },
    { timestamp: 139, text: 'Dreamy but static' },
    { timestamp: 142, text: 'She sees what others never find' },
    { timestamp: 145, text: 'Sharp like glass, soft like time' },
    { timestamp: 148, text: '' },

    // Final Chorus (Ethereal fade)
    { timestamp: 150, text: 'Cat eyes, galaxy mind' },
    { timestamp: 153, text: 'She’s from a place you’ll never find' },
    { timestamp: 156, text: 'She doesn’t roar — she doesn’t need' },
    { timestamp: 159, text: 'She lets her silence plant the seed' },
    { timestamp: 162, text: 'In every thought, she holds the skies' },
    { timestamp: 165, text: 'In every word, a sweet disguise' },
    { timestamp: 168, text: 'She’s not just kind… she’s undefined' },
    { timestamp: 171, text: 'Cat eyes… galaxy mind' },
    { timestamp: 174, text: '' },

    // Outro (Cosmic whisper)
    { timestamp: 176, text: 'Galaxy mind…' },
    { timestamp: 179, text: 'Behind those cat eyes…' },
    { timestamp: 182, text: 'She’s already stars.' }
  ]
},
{
  id: 'sakura-and-snow',
  title: 'Sakura and Snow',
  artist: 'ibroTN19',
  albumArt: sakuraSnowImage, // Replace with your image
  audioSrc: 'audio/9-sakura-and-snow.mp3',
  lyrics: [
    // Verse 1 (Soft, atmospheric)
    { timestamp: 0, text: 'In a Seoul café, the steam swirls slow,' },
    { timestamp: 4, text: 'Her tea tastes of dreams she’s yet to know.' },
    { timestamp: 8, text: 'Subtitles glow in the evening’s hush,' },
    { timestamp: 12, text: 'A world unfolds in lyric and brush.' },
    { timestamp: 16, text: '' },

    // Verse 2 (Sensory imagery)
    { timestamp: 18, text: 'Silk against skin, the night breathes in,' },
    { timestamp: 22, text: 'A thousand tales beneath her chin.' },
    { timestamp: 26, text: 'She walks where spring and winter meet,' },
    { timestamp: 30, text: 'Cherry dust clinging to her feet.' },
    { timestamp: 34, text: '' },

    // Verse 3 (Cultural duality)
    { timestamp: 36, text: 'China hums in her headphones’ sway,' },
    { timestamp: 40, text: 'Korea lights her quiet way.' },
    { timestamp: 44, text: 'She’s a whisper of both, yet wholly her own—' },
    { timestamp: 48, text: 'A melody lost, yet never alone.' },
    { timestamp: 52, text: '' },

    // Chorus (Ethereal, expansive)
    { timestamp: 54, text: 'Oh, sakura and snow,' },
    { timestamp: 58, text: 'She’s the hush where soft winds go.' },
    { timestamp: 62, text: 'A heart that blooms in foreign prose,' },
    { timestamp: 66, text: 'Still tender where the Han River flows.' },
    { timestamp: 70, text: 'She reads the sky in cursive clouds,' },
    { timestamp: 74, text: 'Wears silence like a sacred vow.' },
    { timestamp: 78, text: 'Sakura and snow—' },
    { timestamp: 82, text: 'That’s how she glows.' },
    { timestamp: 86, text: '' },

    // Verse 4 (Linguistic grace)
    { timestamp: 88, text: 'A V-line melody, half-sung, half-sighed,' },
    { timestamp: 92, text: 'A Seoul street or Chengdu’s sky.' },
    { timestamp: 96, text: 'Her tongue trips on hanzi grace,' },
    { timestamp: 100, text: 'Yet every word finds its rightful place.' },
    { timestamp: 104, text: '' },

    // Verse 5 (Borderless soul)
    { timestamp: 106, text: 'No borders bind the soul she wears,' },
    { timestamp: 110, text: 'Just moonlight through the maple squares.' },
    { timestamp: 114, text: 'She’s Seoul at dawn, Shanghai at dusk—' },
    { timestamp: 118, text: 'A fleeting touch, an endless trust.' },
    { timestamp: 122, text: '' },

    // Chorus Repeat (Deeper resonance)
    { timestamp: 124, text: 'Oh, sakura and snow,' },
    { timestamp: 128, text: 'She’s the thaw that winter stole.' },
    { timestamp: 132, text: 'A love stitched in two-tone threads,' },
    { timestamp: 136, text: 'East in her veins, West in her steps.' },
    { timestamp: 140, text: 'Ink-stained hands, a lotus gaze,' },
    { timestamp: 144, text: 'She maps the stars in foreign phrase.' },
    { timestamp: 148, text: 'Sakura and snow—' },
    { timestamp: 152, text: 'That’s how she knows.' },
    { timestamp: 156, text: '' },

    // Bridge (Poetic abstraction)
    { timestamp: 158, text: 'She’s the pause before the first snow,' },
    { timestamp: 162, text: 'The blush of dawn on Namsan’s slope.' },
    { timestamp: 166, text: 'She’s the space between "I" and "you,"' },
    { timestamp: 170, text: 'A language only dreamers flu.' },
    { timestamp: 174, text: '' },

    // Final Chorus (Triumphant softness)
    { timestamp: 176, text: 'Oh, sakura and snow,' },
    { timestamp: 180, text: 'She’s the quiet, she’s the glow.' },
    { timestamp: 184, text: 'No need to choose, no need to hide—' },
    { timestamp: 188, text: 'She’s the river, she’s the tide.' },
    { timestamp: 192, text: 'And when the world asks where she’s from,' },
    { timestamp: 196, text: 'She smiles and says, "Where the poets run."' },
    { timestamp: 200, text: 'Sakura and snow—' },
    { timestamp: 204, text: 'That’s Alida’s home.' },
    { timestamp: 208, text: '' },

    // Outro (Fading whisper)
    { timestamp: 210, text: 'Sakura…' },
    { timestamp: 214, text: 'And snow…' }
  ]
},
{
  id: 'taehyungs-shadow',
  title: 'Taehyung’s Shadow',
  artist: 'ibroTN19',
  albumArt: btsVsRealityImage, // Replace with your image
  audioSrc: 'audio/10-taehyungs-shadow.mp3',
  lyrics: [
    // Verse 1 (Playful observation)
    { timestamp: 0, text: 'Your lock screen’s his face, I know,' },
    { timestamp: 3, text: 'That "Winter Bear" poster’s looking worn…' },
    { timestamp: 6, text: 'You sigh when he sings in black-and-white,' },
    { timestamp: 9, text: 'But I’m the one who stays past midnight...' },
    { timestamp: 12, text: '' },

    // Verse 2 (Affectionate challenge)
    { timestamp: 14, text: 'Yeah, he’s got the voice, the jaw, the fame,' },
    { timestamp: 17, text: 'But does he know your middle name?' },
    { timestamp: 20, text: 'Can he taste-test your samsa dough?' },
    { timestamp: 23, text: 'Or make you laugh when your WiFi’s slow?' },
    { timestamp: 26, text: '' },

    // Chorus (Teasing ultimatum)
    { timestamp: 28, text: 'Oh, Taehyung’s shadow’s long,' },
    { timestamp: 31, text: 'But I’m the one who hears your wrong' },
    { timestamp: 34, text: 'Pronounced Korean every night…' },
    { timestamp: 37, text: 'So let’s settle this, my love—' },
    { timestamp: 40, text: 'You can keep his face above your bed,' },
    { timestamp: 43, text: 'If you whisper my name instead.' },
    { timestamp: 46, text: '' },

    // Verse 3 (Intimate details)
    { timestamp: 48, text: 'You replay his "Sweet Night" in the dark,' },
    { timestamp: 51, text: 'But I’ve memorized your sleeping arc—' },
    { timestamp: 54, text: 'How you snort at 3 AM,' },
    { timestamp: 57, text: 'When our memes hit like his high notes do…' },
    { timestamp: 60, text: '' },

    // Bridge (Philosophical twist)
    { timestamp: 62, text: 'Maybe idols are just mirrors…' },
    { timestamp: 65, text: 'Maybe real love’s in the quieter—' },
    { timestamp: 68, text: 'The way you steal my fries and frown,' },
    { timestamp: 71, text: 'The way we fit when the screens go down…' },
    { timestamp: 74, text: '' },

    // Chorus Repeat (Softer resolve)
    { timestamp: 76, text: 'Oh, Taehyung’s shadow’s long,' },
    { timestamp: 79, text: 'But I’m the one who hears your wrong' },
    { timestamp: 82, text: 'Pronounced Korean every night…' },
    { timestamp: 85, text: 'So let’s settle this, my love—' },
    { timestamp: 88, text: 'You can keep his face above your bed,' },
    { timestamp: 91, text: 'If you whisper my name instead…' },
    { timestamp: 94, text: '' },

    // Outro (Unresolved, lingering)
    { timestamp: 96, text: '(Soft hum of "Winter Bear" melody fading)' }
  ]
},
{
  id: 'subtitle-love',
  title: 'Subtitle Love',
  artist: 'ibroTN19',
  albumArt: screenGlowImage, // Replace with your image
  audioSrc: 'audio/11-subtitle-love.mp3',
  lyrics: [
    // Verse 1 (Nocturnal intimacy)
    { timestamp: 0, text: 'Your screen glows blue at 3 AM,' },
    { timestamp: 3, text: 'Eyes tracing lines I can’t comprehend.' },
    { timestamp: 6, text: 'Chinese whispers, Korean sighs,' },
    { timestamp: 9, text: 'You mouth the words like lullabies...' },
    { timestamp: 12, text: '' },

    // Verse 2 (Yearning for clarity)
    { timestamp: 14, text: 'I wish life came with subtitles too,' },
    { timestamp: 17, text: 'So I’d know which “I’m fine” means “I miss you.”' },
    { timestamp: 20, text: 'We’re lost in translation, but your smile’s clear—' },
    { timestamp: 23, text: 'The only script I wanna hear...' },
    { timestamp: 26, text: '' },

    // Chorus (Glitchy romance)
    { timestamp: 28, text: 'Oh, it’s subtitle love,' },
    { timestamp: 31, text: 'Drowning in the pixels of' },
    { timestamp: 34, text: 'A hug that glitches through the screen,' },
    { timestamp: 37, text: 'Voices lost in the in-between...' },
    { timestamp: 40, text: 'Oh, subtitle love,' },
    { timestamp: 43, text: 'One day we’ll sync the way they do above—' },
    { timestamp: 46, text: 'No more “loading,” just us in HD,' },
    { timestamp: 49, text: 'You’re my favorite scene to watch on repeat.' },
    { timestamp: 52, text: '' },

    // Verse 3 (Screen vs. reality)
    { timestamp: 54, text: 'You cry when leads say “goodbye” in rain,' },
    { timestamp: 57, text: 'But our texts stay dry, just… “call again.”' },
    { timestamp: 60, text: 'If we were cast in our own show,' },
    { timestamp: 63, text: 'Would the world binge us in slow-mo?' },
    { timestamp: 66, text: '' },

    // Bridge (Quiet revelation)
    { timestamp: 68, text: 'Maybe love’s not in the dialogue…' },
    { timestamp: 71, text: 'Maybe it’s the way you pause my flaws,' },
    { timestamp: 74, text: 'Rewind my jokes, and never skip' },
    { timestamp: 77, text: 'Through the boring parts of me.' },
    { timestamp: 80, text: '' },

    // Chorus Repeat (Hopeful)
    { timestamp: 82, text: 'Oh, it’s subtitle love,' },
    { timestamp: 85, text: 'Drowning in the pixels of' },
    { timestamp: 88, text: 'A hug that glitches through the screen,' },
    { timestamp: 91, text: 'Voices lost in the in-between...' },
    { timestamp: 94, text: 'Oh, subtitle love,' },
    { timestamp: 97, text: 'One day we’ll sync the way they do above—' },
    { timestamp: 100, text: 'No more “loading,” just us in HD,' },
    { timestamp: 103, text: 'You’re my favorite scene...' },
    { timestamp: 106, text: '' },

    // Outro (Multilingual whisper)
    { timestamp: 108, text: '"因为有你…"' }, // Chinese: "Because of you..."
    { timestamp: 111, text: '(Screen static fades to silence)' }
  ]
},
{
  id: 'bias-and-beat',
  title: 'Bias & Beat',
  artist: 'ibroTN19',
  albumArt: kpopBiasImage, // Replace with your image
  audioSrc: 'audio/12-bias-and-beat.mp3',
  lyrics: [
    // Verse 1 (Stan chaos)
    { timestamp: 0, text: 'Mirror’s your stage, hairbrush mic,' },
    { timestamp: 2.5, text: 'Bias list changes every night…' },
    { timestamp: 5, text: 'Taehyung’s lips or Jungkook’s abs?' },
    { timestamp: 7.5, text: 'Can’t decide so you scream “OT7” fast—' },
    { timestamp: 10, text: '' },

    // Verse 2 (Choreo fails)
    { timestamp: 12, text: 'Dance break! You hit replay,' },
    { timestamp: 14.5, text: 'Sweat dripping in your LED array…' },
    { timestamp: 17, text: '“I’ll just learn this choreo quick”—' },
    { timestamp: 19.5, text: '(Cut to you tripping, yelling “SH—!”)' },
    { timestamp: 22, text: '' },

    // Chorus (Anthemic confession)
    { timestamp: 24, text: 'BIAS & BEAT! (Hey!)' },
    { timestamp: 26, text: 'Heart’s a traitor to your brain! (Hey!)' },
    { timestamp: 28, text: 'One wink from that 4K screen,' },
    { timestamp: 30, text: 'And you’re signing “I DO” in daydreams!' },
    { timestamp: 32, text: 'BIAS & BEAT! (Hey!)' },
    { timestamp: 34, text: 'Stan life’s pain but you’re addicted!' },
    { timestamp: 36, text: 'If love’s a crime, then lock me up—' },
    { timestamp: 38, text: 'Guilty as charged when the bassline hits!' },
    { timestamp: 40, text: '' },

    // Verse 3 (Real vs. idol love)
    { timestamp: 42, text: 'Yeah, you cried at V’s solo vlive,' },
    { timestamp: 44.5, text: 'But who bought your merch when you were skint? (Me!)' },
    { timestamp: 47, text: 'Who learned Hangul just to clown your texts? (Me!)' },
    { timestamp: 49.5, text: 'Face it, noona—I’m your best flex~' },
    { timestamp: 52, text: '' },

    // Bridge (Playful reality check)
    { timestamp: 54, text: 'Maybe idols ain’t the truth…' },
    { timestamp: 56.5, text: 'Maybe real love’s in the booth…' },
    { timestamp: 59, text: 'Where you scream lyrics you misheard,' },
    { timestamp: 61.5, text: 'And I just nod like “Yeah… sure…”' },
    { timestamp: 64, text: '' },

    // Chorus Repeat (With ad-libs)
    { timestamp: 66, text: 'BIAS & BEAT! (Hey! Alida!)' },
    { timestamp: 68, text: 'Heart’s a traitor to your brain! (Hey! Fighting!)' },
    { timestamp: 70, text: 'One wink from that 4K screen,' },
    { timestamp: 72, text: 'And you’re signing “I DO” in daydreams!' },
    { timestamp: 74, text: '' },

    // Post-Chorus (Smirking twist)
    { timestamp: 76, text: '(Whispered with a smirk)' },
    { timestamp: 78, text: 'But tonight… let’s bias you.' },
    { timestamp: 80, text: '' },

    // Outro (K-pop greeting)
    { timestamp: 82, text: '“안녕하세요, 알리다!”' }, // "Hello, Alida!"
    { timestamp: 85, text: '(Bass drop fades into fan chants)' }
  ]
},
{
  id: 'didn't-get-it',
  title: 'Didn't Get It',
  artist: 'ibroTN19',
  albumArt: tunisTashkentImage, // Replace with your image
  audioSrc: 'audio/13-didn't-get-it.mp3',
  lyrics: [
    // Verse 1 (Meeting under shared skies)
    { timestamp: 0, text: 'I met you under Tunis skies,' },
    { timestamp: 3, text: 'August heat and almond eyes.' },
    { timestamp: 6, text: 'You said “barcha” you meant “all”—' },
    { timestamp: 9, text: 'But I mean "a lot"' },
    { timestamp: 12, text: '' },

    // Pre-Chorus (Linguistic play)
    { timestamp: 14, text: 'one word two meaning — between Tunis and Tashkent.' },
    { timestamp: 18, text: 'Where words can bend and still transcend.' },
    { timestamp: 22, text: 'We even resemble each other in this, Holly Molly' },
    { timestamp: 26, text: '' },

    // Chorus (Multilingual declaration)
    { timestamp: 28, text: '"Sen menga barcha narsani anglatasan."' },
    { timestamp: 32, text: '(sen men-GA BAR-cha nar-SA-ni ang-la-TA-san)' },
    { timestamp: 36, text: 'بَرَشَا بَرَشَا يَا مَدّلّل،' },
    { timestamp: 40, text: 'حُبكْ على ڨَلبيِ مسْلّل.' },
    { timestamp: 44, text: 'And suddenly “Masha” wasn’t just a name—' },
    { timestamp: 48, text: 'It echoed love I couldn’t tame.' },
    { timestamp: 52, text: '' },

    // Verse 2 (Memory lane)
    { timestamp: 54, text: 'Oh August, I remember,' },
    { timestamp: 57, text: '네가 나에게 화가 났을 때,' },
    { timestamp: 60, text: 'علاَش؟،' },
    { timestamp: 63, text: 'Потому что я забыл дату 6 (LOL!).' },
    { timestamp: 66, text: 'From "barcha" laughs to “사랑해요” sighs,' },
    { timestamp: 70, text: 'Our love danced across the language lines.' },
    { timestamp: 74, text: '' },

    // Bridge (Geographic romance)
    { timestamp: 76, text: 'We mapped the stars from Seoul to Rome,' },
    { timestamp: 80, text: 'But Tunis always felt like home.' },
    { timestamp: 84, text: 'I spoke your name in every tongue,' },
    { timestamp: 88, text: 'Yet silence still speaks where we begun.' },
    { timestamp: 92, text: '' },

    // Multilingual Interlude
    { timestamp: 94, text: '"Ты — моя нежность."' },
    { timestamp: 98, text: '"너 없는 하루는 상상할 수 없어."' },
    { timestamp: 102, text: '"كيما حلمة، وانتي صاحيتها' },
    { timestamp: 106, text: 'حبيتك برشا و دللّت."' },
    { timestamp: 110, text: 'Google it (huh!)' },
    { timestamp: 114, text: '' },

    // Final Chorus (Nostalgic)
    { timestamp: 116, text: 'Oh August, sing me back to then,' },
    { timestamp: 120, text: 'When hearts were new and words were friends.' },
    { timestamp: 124, text: 'We built our bond in shades and sound,' },
    { timestamp: 128, text: 'Now even lost in time, it’s found.' },
    { timestamp: 132, text: '' },

    // Outro (Eternal)
    { timestamp: 134, text: 'Oh barcha, love, oh Masha’s smile,' },
    { timestamp: 138, text: 'We crossed the globe in just one dial.' },
    { timestamp: 142, text: 'In every language, you’re still mine—' },
    { timestamp: 146, text: 'My forever, in every Xayrli tong.' },
    { timestamp: 150, text: '' },

    // Raw Emotion (Fade-out)
    { timestamp: 152, text: 'حبيبي أيواااااااااااااااا' },
    { timestamp: 158, text: '(Instrumental fade: Oud meets gayageum)' }
  ]
},
{
  id: 'eclipse',
  title: 'Eclipse',
  artist: 'ibroTN19',
  albumArt: eclipseArtImage, // Replace with your image
  audioSrc: 'audio/14-eclipse.mp3',
  lyrics: [
    // Verse 1 (Atmospheric longing)
    { timestamp: 0, text: 'Tunisian dust on my windowpane...' },
    { timestamp: 4, text: 'Seoul rains in your voice, like a quiet prayer.' },
    { timestamp: 8, text: 'Starry silence, IELTS books on the train—' },
    { timestamp: 12, text: 'You’re mapping futures in midnight air.' },
    { timestamp: 16, text: 'Seventeen candles on a screen so dim,' },
    { timestamp: 20, text: 'Time zones away—I’m counting your breaths.' },
    { timestamp: 24, text: 'You’re the moon drowning my lonely hymn,' },
    { timestamp: 28, text: 'Two shadows meeting in a starlit eclipse...' },
    { timestamp: 32, text: '' },

    // Verse 2 (Cultural juxtaposition)
    { timestamp: 34, text: 'O’zbek nights in your K-pop playlists,' },
    { timestamp: 38, text: 'Tunisian tea gone cold on my shelf...' },
    { timestamp: 42, text: 'Oceans deep in these clenched fists,' },
    { timestamp: 46, text: 'But I’d drown the world to find your pulse.' },
    { timestamp: 50, text: '' },

    // Chorus (Raw plea)
    { timestamp: 52, text: 'Alida...' },
    { timestamp: 56, text: 'Does Seoul feel my tears in your rain?' },
    { timestamp: 60, text: 'Seventeen years—yet oceans remain...' },
    { timestamp: 64, text: 'Our eclipse is a ghost in the pane,' },
    { timestamp: 68, text: 'Flickering sarang through the pain...' },
    { timestamp: 72, text: 'Alida...' },
    { timestamp: 76, text: 'You’re the moon to my voiceless sun—' },
    { timestamp: 80, text: 'I’d melt every gun just to see you run...' },
    { timestamp: 84, text: '' },

    // Verse 3 (Fragile reality)
    { timestamp: 86, text: 'The meeting: Just pixels on a cracked phone.' },
    { timestamp: 90, text: 'The future: A visa dream, frayed and thin.' },
    { timestamp: 94, text: 'The missing: A dial tone, alone...' },
    { timestamp: 98, text: 'The waiting: "When does forever begin?"' },
    { timestamp: 102, text: 'But your laugh—like a Seoul subway chime—' },
    { timestamp: 106, text: 'Cracks this frozen hour wide open...' },
    { timestamp: 110, text: 'Seventeen wishes on this broken line,' },
    { timestamp: 114, text: 'You’re my eclipse... my only unspoken.' },
    { timestamp: 118, text: '' },

    // Bridge (Multilingual vow)
    { timestamp: 120, text: 'Sen mening oyimsan... (You’re my moon),' },
    { timestamp: 124, text: 'I’m your su)—' },
    { timestamp: 128, text: 'I trace your name on frozen panes...' },
    { timestamp: 132, text: '"My cosmic queen... just come...' },
    { timestamp: 136, text: '... just come."' },
    { timestamp: 140, text: '' },

    // Outro (Fragmented hope)
    { timestamp: 142, text: 'Seventeen...' },
    { timestamp: 146, text: 'Step into the light?' },
    { timestamp: 150, text: 'But the night’s so long...' },
    { timestamp: 154, text: 'Moon... sun...' },
    { timestamp: 158, text: 'Collide for me—' },
    { timestamp: 160, text: 'Alida...' },
    { timestamp: 164, text: 'You turn distance...' },
    { timestamp: 178, text: '... to gold.' },
    { timestamp: 172, text: '(Instrumental fade: Dutar tremolo meets synth waves)' }
  ]
},
{
  id: 'if-we-ever-met',
  title: 'If We Ever Met',
  artist: 'ibroTN19',
  albumArt: sameMoonImage, // Replace with your image
  audioSrc: 'audio/15-if-we-ever-met.mp3',
  lyrics: [
    // Verse 1 (Celestial longing)
    { timestamp: 0, text: 'Seventeen candles, the sky feels wide' },
    { timestamp: 4, text: 'You’re in Tashkent, I’m oceans aside' },
    { timestamp: 8, text: 'You laugh like morning, but your eyes hold night' },
    { timestamp: 12, text: 'Like the moon hiding tears in the quiet twilight' },
    { timestamp: 16, text: '' },

    // Verse 2 (Cultural mosaic)
    { timestamp: 18, text: 'You speak like stories written in stars' },
    { timestamp: 22, text: 'English dreams and Korean hearts' },
    { timestamp: 26, text: 'You look like China carved in snow' },
    { timestamp: 30, text: 'But your soul is the light that the eclipse won’t show' },
    { timestamp: 34, text: '' },

    // Pre-Chorus (Digital intimacy)
    { timestamp: 36, text: 'We met in silence, in digital skies' },
    { timestamp: 40, text: 'Through a screen, I saw your light' },
    { timestamp: 44, text: 'Now I’m counting days that we never touched' },
    { timestamp: 48, text: 'But somehow, somehow, I feel so much' },
    { timestamp: 52, text: '' },

    // Chorus (Anthemic devotion)
    { timestamp: 54, text: 'Alida, my moon in a faraway place' },
    { timestamp: 58, text: 'The waiting, the missing, I carry your face' },
    { timestamp: 62, text: 'You shine through the distance, you pull like the tide' },
    { timestamp: 66, text: 'Even the sun couldn’t make me hide' },
    { timestamp: 70, text: 'From the future we draw, in the language we learn' },
    { timestamp: 74, text: 'Two friends, two stars — forever we burn' },
    { timestamp: 78, text: 'Even apart, I know it’s true...' },
    { timestamp: 82, text: 'We live under the same moon' },
    { timestamp: 86, text: '' },

    // Verse 3 (Resilient bond)
    { timestamp: 88, text: 'Smart like silence before it breaks' },
    { timestamp: 92, text: 'Strong like hearts that still ache' },
    { timestamp: 96, text: 'Uzbek skies, Tunisian dreams' },
    { timestamp: 100, text: 'You and I, in between the seams' },
    { timestamp: 104, text: '' },

    // Verse 4 (Shared struggles)
    { timestamp: 106, text: 'IELTS books and sleepless nights' },
    { timestamp: 110, text: 'We chase tomorrow in different lights' },
    { timestamp: 114, text: 'But you, you’re lovely — a wish in bloom' },
    { timestamp: 118, text: 'A secret shared between sun and moon' },
    { timestamp: 122, text: '' },

    // Bridge (Quiet hope)
    { timestamp: 124, text: 'The meeting was fate, but the distance, a storm' },
    { timestamp: 128, text: 'Yet even in waiting, you keep me warm' },
    { timestamp: 132, text: 'You speak to my soul in a voice so kind' },
    { timestamp: 136, text: 'Even in echoes, you quiet my mind' },
    { timestamp: 140, text: '' },

    // Chorus Repeat (Fuller instrumentation)
    { timestamp: 142, text: 'Alida, my moon in a faraway place' },
    { timestamp: 146, text: 'The waiting, the missing, I carry your face' },
    { timestamp: 150, text: 'You shine through the distance, you pull like the tide' },
    { timestamp: 154, text: 'Even the sun couldn’t make me hide' },
    { timestamp: 158, text: 'From the future we draw, in the language we learn' },
    { timestamp: 162, text: 'Two friends, two stars — forever we burn' },
    { timestamp: 166, text: 'Even apart, I know it’s true...' },
    { timestamp: 170, text: 'We live under the same moon' },
    { timestamp: 174, text: '' },

    // Outro (Future vision)
    { timestamp: 176, text: 'Maybe one day we’ll sit and breathe' },
    { timestamp: 180, text: 'The same cold air beneath the trees' },
    { timestamp: 184, text: 'No screens, no space — just time to keep' },
    { timestamp: 188, text: 'A moment where the distance sleeps' },
    { timestamp: 192, text: '' },

    // Final Refrain (Whispered resolution)
    { timestamp: 194, text: 'Alida, the name I sing in the dark' },
    { timestamp: 198, text: 'My moon, my friend, my glowing spark' },
    { timestamp: 202, text: 'The years may pass, and life may bloom' },
    { timestamp: 206, text: 'But I’ll always find you in the moon' },
    { timestamp: 210, text: '' },

    // Epilogue (Tidal metaphor)
    { timestamp: 212, text: 'Seventeen dreams in a world so wide...' },
    { timestamp: 216, text: 'You’re the moon… and I’m the tide.' },
    { timestamp: 220, text: '(Instrumental fade: Piano like moonlight on water)' }
  ]
},
{
  id: 'static-between-us',
  title: 'Static Between Us',
  artist: 'ibroTN19',
  albumArt: glitchedHeartImage, // Replace with your image
  audioSrc: 'audio/16-static-between-us.mp3',
  lyrics: [
    // Verse 1 (Digital dissonance)
    { timestamp: 0, text: 'I saw your name light up my screen,' },
    { timestamp: 3, text: 'But it felt more like a glitch.' },
    { timestamp: 6, text: 'Your words came wrapped in pretty fonts,' },
    { timestamp: 9, text: 'But the feeling didn’t stick.' },
    { timestamp: 12, text: '' },

    // Verse 2 (Nostalgic contrast)
    { timestamp: 14, text: 'You used to write like every line' },
    { timestamp: 17, text: 'Would hold my hand from miles away —' },
    { timestamp: 20, text: 'Now every text just fills the time,' },
    { timestamp: 23, text: 'But nothing real to say.' },
    { timestamp: 26, text: '' },

    // Pre-Chorus (Unspoken hurt)
    { timestamp: 28, text: 'You sent a song at 2 AM,' },
    { timestamp: 31, text: 'No caption, but I knew.' },
    { timestamp: 34, text: 'You wanted me to hear your hurt,' },
    { timestamp: 37, text: 'But couldn’t say the truth.' },
    { timestamp: 40, text: '' },

    // Chorus (The static dance)
    { timestamp: 42, text: 'We used to talk like no one else,' },
    { timestamp: 45, text: 'Now silence feels like something safe.' },
    { timestamp: 48, text: 'We’re typing slow to dodge the facts,' },
    { timestamp: 51, text: 'Like maybe slow could make it stay.' },
    { timestamp: 54, text: '' },
    { timestamp: 56, text: 'It’s not the words we didn’t send —' },
    { timestamp: 59, text: 'It’s the ones we never meant.' },
    { timestamp: 62, text: 'We danced in static, lost the beat,' },
    { timestamp: 65, text: 'In echoes of who we used to be.' },
    { timestamp: 68, text: '' },

    // Verse 3 (Fading illusions)
    { timestamp: 70, text: 'I scrolled through jokes from yesterday,' },
    { timestamp: 73, text: 'Pretending that we’re still the same.' },
    { timestamp: 76, text: 'But timing’s off and laughter fades —' },
    { timestamp: 79, text: 'It’s not a game we want to play.' },
    { timestamp: 82, text: '' },

    // Bridge (The breaking point)
    { timestamp: 84, text: 'It’s not the breaks, it’s how they grow —' },
    { timestamp: 87, text: 'A crack, a pause, the undertow.' },
    { timestamp: 90, text: 'We kept pretending we were fine,' },
    { timestamp: 93, text: 'Till even that became a lie.' },
    { timestamp: 96, text: '' },

    // Chorus Repeat (Raw exposure)
    { timestamp: 98, text: 'We used to talk like no one else,' },
    { timestamp: 101, text: 'Now silence feels like something safe.' },
    { timestamp: 104, text: 'We’re typing slow to dodge the facts,' },
    { timestamp: 107, text: 'Like maybe slow could make it stay.' },
    { timestamp: 110, text: '' },
    { timestamp: 112, text: 'It’s not the words we didn’t send —' },
    { timestamp: 115, text: 'It’s the ones we never meant.' },
    { timestamp: 118, text: 'We danced in static, lost the beat,' },
    { timestamp: 121, text: 'In echoes of who we used to be.' },
    { timestamp: 124, text: '' },

    // Outro (Ghostly confession)
    { timestamp: 126, text: 'We danced in static, line by line…' },
    { timestamp: 130, text: 'I still replay you... all the time.' },
    { timestamp: 134, text: '(Instrumental fade: Glitched vocals & dying synth)' }
  ]
},
{
  id: 'love-and-mine',
  title: 'Love & Mine',
  artist: 'ibroTN19',
  albumArt: pixelatedEmbraceImage, // Replace with your image
  audioSrc: 'audio/17-love-and-mine.mp3',
  lyrics: [
    // Verse 1 (Nostalgic prologue)
    { timestamp: 0, text: 'You said: "You can call me Love and I call you mine."' },
    { timestamp: 5, text: 'We stayed up past the moon’s goodbye, just laughing in the dark,' },
    { timestamp: 10, text: 'That was before the clocks rewound time,' },
    { timestamp: 15, text: 'Before the silence slowly grew.' },
    { timestamp: 20, text: '' },

    // Verse 2 (Digital idealism)
    { timestamp: 22, text: 'We thought forever fit in texts,' },
    { timestamp: 26, text: 'A thousand hearts in black and blue.' },
    { timestamp: 30, text: 'But the days turned into distance,' },
    { timestamp: 34, text: 'Like old stars fading out of view.' },
    { timestamp: 38, text: '' },

    // Pre-Chorus (Linguistic intimacy)
    { timestamp: 40, text: 'I taught you the words of home — the Tunisian in-between.' },
    { timestamp: 45, text: 'You taught me “사랑해” and fun.' },
    { timestamp: 49, text: 'Uzbek, Russian — little codes' },
    { timestamp: 53, text: 'That held the weight of what we wrote.' },
    { timestamp: 57, text: '' },

    // Chorus (Anthemic acceptance)
    { timestamp: 59, text: 'We won’t go back, the road is gone —' },
    { timestamp: 63, text: 'But these memories still feel new.' },
    { timestamp: 67, text: 'They echo soft in every line,' },
    { timestamp: 71, text: 'From every smile to every fight,' },
    { timestamp: 75, text: 'We turned our nights into daylight —' },
    { timestamp: 79, text: 'Our phones became our skies.' },
    { timestamp: 83, text: 'And though the past won’t let us through,' },
    { timestamp: 87, text: 'You can call me Love — and I call you Mine.' },
    { timestamp: 91, text: '' },

    // Verse 3 (Geographic longing)
    { timestamp: 93, text: 'The sun would rise for you first light,' },
    { timestamp: 97, text: 'Then slowly make its way to mine.' },
    { timestamp: 101, text: 'And yet we still find time to talk,' },
    { timestamp: 105, text: 'Each moment felt like borrowed time.' },
    { timestamp: 109, text: '' },

    // Verse 4 (Unrealized dreams)
    { timestamp: 111, text: 'We argued, planned a trip to Rome,' },
    { timestamp: 115, text: 'Then flew from Seoul to dreams unknown —' },
    { timestamp: 119, text: 'Beijing, and cafés we never saw,' },
    { timestamp: 123, text: 'But it felt real… so we held on.' },
    { timestamp: 127, text: 'We shared the silly and the deep,' },
    { timestamp: 131, text: 'Laughed until we couldn’t speak.' },
    { timestamp: 135, text: '' },

    // Bridge (Poetic surrender)
    { timestamp: 137, text: 'Maybe we won’t ever be' },
    { timestamp: 141, text: 'The versions we were meant to be.' },
    { timestamp: 145, text: 'But I wouldn’t trade a single breath' },
    { timestamp: 149, text: 'Of the world I had with you...' },
    { timestamp: 153, text: 'Before we left' },
    { timestamp: 157, text: '' },

    // Chorus Variation (Deeper resonance)
    { timestamp: 159, text: 'From late night laughs to silent fights,' },
    { timestamp: 163, text: 'We shared the dark and made it bright.' },
    { timestamp: 167, text: 'We said forever in one breath,' },
    { timestamp: 171, text: 'But life was writing something else.' },
    { timestamp: 175, text: 'Just texting, yet it felt so real,' },
    { timestamp: 179, text: 'Weaving stories none could see.' },
    { timestamp: 183, text: '' },

    // Outro (Eternal echo)
    { timestamp: 185, text: 'All we had were words on screens...' },
    { timestamp: 189, text: 'Our memories won’t fade with time…' },
    { timestamp: 193, text: 'They’re tucked between the quiet lines.' },
    { timestamp: 197, text: 'In every laugh, in every song,' },
    { timestamp: 201, text: 'You live inside — you’re never gone.' },
    { timestamp: 205, text: '(Instrumental fade: Glitching music box melody)' }
  ]
};

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
