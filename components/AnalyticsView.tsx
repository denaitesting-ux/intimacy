import React, { useMemo } from 'react';
import type { LogData } from '../types';
import { countActivities } from '../utils/analytics';
import { ACTIVITY_CONFIG, TOY_CONFIG, MEDIA_CONFIG, LOCATION_CONFIG } from '../constants';

interface AnalyticsViewProps {
    logs: LogData;
    currentDate: Date;
}

const allConfigs = { ...ACTIVITY_CONFIG, ...TOY_CONFIG, ...MEDIA_CONFIG, ...LOCATION_CONFIG };

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ logs, currentDate }) => {
    const monthlyCounts = useMemo(() => countActivities(logs, 'month', currentDate), [logs, currentDate]);
    const yearlyCounts = useMemo(() => countActivities(logs, 'year', currentDate), [logs, currentDate]);
    
    // FIX: Cast sort values to number to allow subtraction.
    const sortedMonthly = Object.entries(monthlyCounts).sort(([, a], [, b]) => (b as number) - (a as number));
    // FIX: Cast sort values to number to allow subtraction.
    const sortedYearly = Object.entries(yearlyCounts).sort(([, a], [, b]) => (b as number) - (a as number));

    const StatList = ({ title, data }: { title: string, data: [string, number][]}) => (
        <div>
            <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
            {data.length > 0 ? (
                <ul className="space-y-2">
                    {data.map(([item, count]) => {
                        const config = allConfigs[item as keyof typeof allConfigs];
                        if (!config) return null;
                        const Icon = config.icon;
                        return (
                            <li key={item} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 text-secondary" />
                                    <span className="text-darktext">{config.label}</span>
                                </div>
                                <span className="font-bold text-primary">{count}</span>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-darktext/60 italic">Нет данных за этот период.</p>
            )}
        </div>
    );
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-darktext mb-6 text-center">Аналитика</h2>
            <div className="space-y-6">
                <StatList title={`Этот месяц (${currentDate.toLocaleString('ru-RU', { month: 'long' })})`} data={sortedMonthly} />
                <hr/>
                <StatList title={`Этот год (${currentDate.getFullYear()})`} data={sortedYearly} />
            </div>
        </div>
    );
};

export default AnalyticsView;