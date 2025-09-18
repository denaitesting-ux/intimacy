import React, { useState, useMemo, useEffect } from 'react';
import type { LogData } from './types';
import { findBestDayOfYear, checkSevenDayLull } from './utils/analytics';
import useLocalStorage from './hooks/useLocalStorage';
import CalendarView from './components/CalendarView';
import DayDetailModal from './components/DayDetailModal';
import AnalyticsView from './components/AnalyticsView';
import Notification from './components/Notification';
import AchievementCard from './components/AchievementCard';
import SettingsModal from './components/SettingsModal';

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.4l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const App: React.FC = () => {
    const [logs, setLogs] = useLocalStorage<LogData>('intimacyLogs', {});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showLullNotification, setShowLullNotification] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [colors, setColors] = useLocalStorage('themeColors', { 
        primary: '#0059A8', 
        secondary: '#A40EFF' 
    });

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-secondary', colors.secondary);
        
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors.primary);
    }, [colors]);

    const bestDay = useMemo(() => findBestDayOfYear(logs, currentDate.getFullYear()), [logs, currentDate]);

    useEffect(() => {
        setShowLullNotification(checkSevenDayLull(logs));
    }, [logs]);

    const handleDateSelect = (day: number) => {
        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    };

    const handleModalClose = () => {
        setSelectedDate(null);
    };

    const handleSaveLog = (date: Date, updatedLog: LogData[string]) => {
        const dateKey = date.toISOString().split('T')[0];
        const newLogs = { ...logs };

        if (updatedLog.activities.length === 0 && updatedLog.toys.length === 0 && updatedLog.media.length === 0 && updatedLog.locations.length === 0) {
            delete newLogs[dateKey];
        } else {
            newLogs[dateKey] = updatedLog;
        }
        
        setLogs(newLogs);
        handleModalClose();
    };

    return (
        <div className="min-h-screen bg-light font-sans p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-8 relative">
                <h1 className="text-4xl font-bold text-primary">Календарь близости</h1>
                <p className="text-darktext/70 mt-2">Ваш личный календарь страсти</p>
                <button 
                    onClick={() => setShowSettings(true)}
                    className="absolute top-0 right-0 p-2 rounded-full text-darktext/60 hover:bg-gray-200 hover:text-darktext transition-colors"
                    aria-label="Настройки"
                >
                    <SettingsIcon className="w-6 h-6" />
                </button>
            </header>
            
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CalendarView
                        logs={logs}
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        onDateSelect={handleDateSelect}
                    />
                </div>
                <div className="flex flex-col gap-8">
                    {bestDay && <AchievementCard bestDay={bestDay} />}
                    <AnalyticsView logs={logs} currentDate={currentDate} />
                </div>
            </main>

            {selectedDate && (
                <DayDetailModal
                    date={selectedDate}
                    log={logs[selectedDate.toISOString().split('T')[0]]}
                    onClose={handleModalClose}
                    onSave={handleSaveLog}
                />
            )}

            {showSettings && (
                <SettingsModal 
                    currentColors={colors}
                    onSave={setColors}
                    onClose={() => setShowSettings(false)}
                />
            )}

            <Notification
                show={showLullNotification}
                onClose={() => setShowLullNotification(false)}
                title="Затишье?"
                message="Прошло 7 дней с вашего последнего интимного момента... Может, пора что-то изменить?"
            />
        </div>
    );
};

export default App;