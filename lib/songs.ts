export type SongPick = {
  title: string
  youtubeUrl: string
}

export const SONGS: Record<string, SongPick[]> = {
  degen: [
    {
      title: 'Travis Scott - HIGHEST IN THE ROOM',
      youtubeUrl: 'https://www.youtube.com/watch?v=tp4fUH2E8Bs',
    },
    {
      title: 'Skrillex - Bangarang',
      youtubeUrl: 'https://www.youtube.com/watch?v=YJVmu6yttiw',
    },
  ],
  whale: [
    {
      title: 'Rick Ross - Hustlin’',
      youtubeUrl: 'https://www.youtube.com/watch?v=CdyYH1f3XAM',
    },
    {
      title: 'Dr. Dre - Still D.R.E.',
      youtubeUrl: 'https://www.youtube.com/watch?v=_CL6n0FJZpk',
    },
  ],
  normie: [
    {
      title: 'Daft Punk - Get Lucky',
      youtubeUrl: 'https://www.youtube.com/watch?v=5NV6Rdv1a3I',
    },
    {
      title: 'The Weeknd - Blinding Lights',
      youtubeUrl: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
    },
  ],
}
