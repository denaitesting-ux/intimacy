
import type { LogData, LogEntry } from '../types';

export interface BestDay {
    date: string;
    count: number;
    log: LogEntry;
}

export const findBestDayOfYear = (logs: LogData, year: number): BestDay | null => {
    let bestDay: BestDay | null = null;
    let maxCount = 0;

    for (const dateKey in logs) {
        if (new Date(dateKey).getFullYear() === year) {
            const log = logs[dateKey];
            const count = log.activities.length + log.toys.length + log.media.length + log.locations.length;
            if (count > maxCount) {
                maxCount = count;
                bestDay = {
                    date: dateKey,
                    count: count,
                    log: log,
                };
            }
        }
    }

    return bestDay;
};

export const checkSevenDayLull = (logs: LogData): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let hasActivityInLast7Days = false;
    for (let i = 0; i < 7; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateKey = checkDate.toISOString().split('T')[0];
        if (logs[dateKey]) {
            hasActivityInLast7Days = true;
            break;
        }
    }

    return !hasActivityInLast7Days;
};

export const countActivities = (logs: LogData, period: 'month' | 'year', currentDate: Date) => {
    const counts: { [key: string]: number } = {};

    for (const dateKey in logs) {
        const logDate = new Date(dateKey);
        const isInPeriod = period === 'month'
            ? logDate.getFullYear() === currentDate.getFullYear() && logDate.getMonth() === currentDate.getMonth()
            : logDate.getFullYear() === currentDate.getFullYear();

        if (isInPeriod) {
            const log = logs[dateKey];
            [...log.activities, ...log.toys, ...log.media, ...log.locations].forEach(item => {
                counts[item] = (counts[item] || 0) + 1;
            });
        }
    }
    return counts;
};
