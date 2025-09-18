
export enum ActivityType {
    Masturbation = 'Masturbation',
    Oral = 'Oral',
    Classic = 'Classic',
}

export enum ToyType {
    ForHer = 'For Her',
    ForHim = 'For Him / Anal',
}

export enum MediaType {
    WatchPorn = 'Watch Porn',
    FilmVideo = 'Film Video',
}

export enum LocationType {
    Kitchen = 'Kitchen',
    Bedroom = 'Bedroom',
    Shower = 'Shower',
    Toilet = 'Toilet',
    Car = 'Car',
}

export interface LogEntry {
    activities: ActivityType[];
    toys: ToyType[];
    media: MediaType[];
    locations: LocationType[];
}

export interface LogData {
    [date: string]: LogEntry;
}
