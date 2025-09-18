import React from 'react';
import type { BestDay } from '../utils/analytics';
import { ACTIVITY_CONFIG, TOY_CONFIG, MEDIA_CONFIG, LOCATION_CONFIG } from '../constants';

interface AchievementCardProps {
    bestDay: BestDay;
}

const allConfigs = { ...ACTIVITY_CONFIG, ...TOY_CONFIG, ...MEDIA_CONFIG, ...LOCATION_CONFIG };

const AchievementCard: React.FC<AchievementCardProps> = ({ bestDay }) => {
    const formattedDate = new Date(bestDay.date).toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const allItems = [
        ...bestDay.log.activities,
        ...bestDay.log.toys,
        ...bestDay.log.media,
        ...bestDay.log.locations,
    ];

    return (
        <div className="bg-gradient-to-br from-primary to-blue-700 text-white p-6 rounded-2xl shadow-lg animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
                 <svg className="w-8 h-8 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <div>
                    <h3 className="text-xl font-bold">Лучший день в году!</h3>
                    <p className="text-white/80">{formattedDate}</p>
                </div>
            </div>
            <p className="mb-3">В этот день у вас был рекорд: <span className="font-bold text-yellow-300">{bestDay.count}</span> активностей.</p>
            <div className="flex flex-wrap gap-2">
                {allItems.map((item, index) => {
                    const config = allConfigs[item as keyof typeof allConfigs];
                    if (!config) return null;
                    return (
                        <span key={index} className="bg-white/20 text-xs font-medium px-2.5 py-1 rounded-full">{config.label}</span>
                    );
                })}
            </div>
        </div>
    );
};

export default AchievementCard;