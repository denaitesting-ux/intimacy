import React from 'react';
import type { LogData } from '../types';

interface CalendarViewProps {
    logs: LogData;
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    onDateSelect: (day: number) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ logs, currentDate, setCurrentDate, onDateSelect }) => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Start week on Monday (0 = Monday, 6 = Sunday)
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <h2 className="text-xl font-bold text-primary">
                    {currentDate.toLocaleString('ru-RU', { month: 'long' })} {year}
                </h2>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {weekdays.map(day => (
                    <div key={day} className="font-semibold text-darktext/60 text-sm py-2">{day}</div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const dayNumber = day + 1;
                    const dayDate = new Date(year, month, dayNumber);
                    const dateKey = dayDate.toISOString().split('T')[0];
                    const hasLog = logs[dateKey];
                    const isToday = new Date().toDateString() === dayDate.toDateString();
                    
                    const dayOfWeek = dayDate.getDay(); // 0 = Sunday, 6 = Saturday
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                    return (
                        <button
                            key={dayNumber}
                            onClick={() => onDateSelect(dayNumber)}
                            className={`relative w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:bg-primary/20
                                ${isToday ? 'bg-secondary/20 text-secondary font-bold animate-pulse-ring' : isWeekend ? 'bg-gray-100' : ''}
                                ${hasLog ? 'font-bold' : ''}`}
                        >
                            {dayNumber}
                            {hasLog && (
                                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;