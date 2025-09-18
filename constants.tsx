import React from 'react';
// FIX: Removed 'type' from import to allow enums to be used as values.
import { ActivityType, ToyType, MediaType, LocationType } from './types';

// Icon Components (SVG from lucide-react)
const Hand = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-4a2 2 0 1 1 0-4h4a4 4 0 1 0 0-8Z"/></svg>
);

const Smile = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
);

const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const Waves = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6c.7.5 1.7 1 2.8 1 1.3 0 2.3-.8 3.5-2 1.3-1.3 2.8-2 4.3-2 1.5 0 2.9.7 4.3 2 1.2 1.2 2.2 2 3.5 2 1.1 0 2.1-.5 2.8-1"/><path d="M3 12c.7.5 1.7 1 2.8 1 1.3 0 2.3-.8 3.5-2 1.3-1.3 2.8-2 4.3-2 1.5 0 2.9.7 4.3 2 1.2 1.2 2.2 2 3.5 2 1.1 0 2.1-.5 2.8-1"/><path d="M3 18c.7.5 1.7 1 2.8 1 1.3 0 2.3-.8 3.5-2 1.3-1.3 2.8-2 4.3-2 1.5 0 2.9.7 4.3 2 1.2 1.2 2.2 2 3.5 2 1.1 0 2.1-.5 2.8-1"/></svg>
);

const Target = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const Film = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M21 7.5h-4"/><path d="M21 16.5h-4"/></svg>
);

const Video = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect width="12" height="12" x="2" y="6" rx="2"/></svg>
);

const CookingPot = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/></svg>
);
const Bed = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 4v16"/><path d="M2 10h20"/><path d="M6 8v8"/><path d="M18 8v8"/><path d="M22 4v16"/></svg>
);
const ShowerHead = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m4 4 2.5 2.5"/><path d="M13.5 6.5a4.5 4.5 0 1 1-6.364 6.364"/><path d="M2 22v-2a4 4 0 0 1 4-4h.5"/><path d="M16 16h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z"/><path d="M16 12h.01"/><path d="M16 18h.01"/><path d="M10 16h.01"/><path d="M10 22h.01"/><path d="M13 19h.01"/></svg>
);
const Pipette = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8-1.6-1.6Z"/></svg>
);
const Car = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><path d="M7 17h10"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
);


export const ACTIVITY_CONFIG: { [key in ActivityType]: { label: string; icon: React.FC<any>; } } = {
    [ActivityType.Masturbation]: { label: 'Мастурбация', icon: Hand },
    [ActivityType.Oral]: { label: 'Оральный секс', icon: Smile },
    [ActivityType.Classic]: { label: 'Классический секс', icon: Users },
};

export const TOY_CONFIG: { [key in ToyType]: { label: string; icon: React.FC<any>; } } = {
    [ToyType.ForHer]: { label: 'Для неё (Сквирт)', icon: Waves },
    [ToyType.ForHim]: { label: 'Для него (Страпон/Анальный)', icon: Target },
};

export const MEDIA_CONFIG: { [key in MediaType]: { label: string; icon: React.FC<any>; } } = {
    [MediaType.WatchPorn]: { label: 'Просмотр порно', icon: Film },
    [MediaType.FilmVideo]: { label: 'Съемка видео', icon: Video },
};

export const LOCATION_CONFIG: { [key in LocationType]: { label: string; icon: React.FC<any>; } } = {
    [LocationType.Kitchen]: { label: 'Кухня', icon: CookingPot },
    [LocationType.Bedroom]: { label: 'Спальня', icon: Bed },
    [LocationType.Shower]: { label: 'Душ', icon: ShowerHead },
    [LocationType.Toilet]: { label: 'Туалет', icon: Pipette },
    [LocationType.Car]: { label: 'Автомобиль', icon: Car },
};

export const ALL_ACTIVITY_TYPES = Object.values(ActivityType);
export const ALL_TOY_TYPES = Object.values(ToyType);
export const ALL_MEDIA_TYPES = Object.values(MediaType);
export const ALL_LOCATION_TYPES = Object.values(LocationType);