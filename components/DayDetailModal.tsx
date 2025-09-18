import React, { useState, useEffect } from 'react';
import type { LogEntry, ActivityType, ToyType, MediaType, LocationType } from '../types';
import {
    ACTIVITY_CONFIG, TOY_CONFIG, MEDIA_CONFIG, LOCATION_CONFIG,
    ALL_ACTIVITY_TYPES, ALL_TOY_TYPES, ALL_MEDIA_TYPES, ALL_LOCATION_TYPES
} from '../constants';
import IconToggleButton from './IconToggleButton';

interface DayDetailModalProps {
    date: Date;
    log: LogEntry | undefined;
    onClose: () => void;
    onSave: (date: Date, log: LogEntry) => void;
}

const DayDetailModal: React.FC<DayDetailModalProps> = ({ date, log, onClose, onSave }) => {
    const [activities, setActivities] = useState<ActivityType[]>([]);
    const [toys, setToys] = useState<ToyType[]>([]);
    const [media, setMedia] = useState<MediaType[]>([]);
    const [locations, setLocations] = useState<LocationType[]>([]);

    useEffect(() => {
        if (log) {
            setActivities(log.activities || []);
            setToys(log.toys || []);
            setMedia(log.media || []);
            setLocations(log.locations || []);
        } else {
            setActivities([]);
            setToys([]);
            setMedia([]);
            setLocations([]);
        }
    }, [log]);

    const handleSave = () => {
        onSave(date, { activities, toys, media, locations });
    };

    const toggleItem = <T,>(item: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    // FIX: Made children optional to fix "Property 'children' is missing" error.
    const Section = ({ title, children }: { title: string; children?: React.ReactNode }) => (
        <div className="mb-6">
            <h4 className="text-lg font-semibold text-darktext/80 mb-3">{title}</h4>
            <div className="flex flex-wrap gap-3">
                {children}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md animate-bounce-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-primary">
                        {date.toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                    </button>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    <Section title="Активности">
                        {ALL_ACTIVITY_TYPES.map(type => (
                            <IconToggleButton
                                key={type}
                                {...ACTIVITY_CONFIG[type]}
                                isSelected={activities.includes(type)}
                                onToggle={() => toggleItem(type, activities, setActivities)}
                            />
                        ))}
                    </Section>

                    <Section title="Игрушки">
                        {ALL_TOY_TYPES.map(type => (
                            <IconToggleButton
                                key={type}
                                {...TOY_CONFIG[type]}
                                isSelected={toys.includes(type)}
                                onToggle={() => toggleItem(type, toys, setToys)}
                            />
                        ))}
                    </Section>

                    <Section title="Медиа">
                        {ALL_MEDIA_TYPES.map(type => (
                             <IconToggleButton
                                key={type}
                                {...MEDIA_CONFIG[type]}
                                isSelected={media.includes(type)}
                                onToggle={() => toggleItem(type, media, setMedia)}
                            />
                        ))}
                    </Section>

                    <Section title="Место">
                        {ALL_LOCATION_TYPES.map(type => (
                            <IconToggleButton
                                key={type}
                                {...LOCATION_CONFIG[type]}
                                isSelected={locations.includes(type)}
                                onToggle={() => toggleItem(type, locations, setLocations)}
                            />
                        ))}
                    </Section>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 rounded-full text-darktext bg-gray-200 hover:bg-gray-300 transition-colors font-semibold">Отмена</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-full text-white bg-primary hover:bg-opacity-90 transition-colors font-semibold shadow-md">Сохранить</button>
                </div>
            </div>
        </div>
    );
};

export default DayDetailModal;