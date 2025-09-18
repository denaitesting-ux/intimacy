
import React from 'react';

interface NotificationProps {
    show: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const Notification: React.FC<NotificationProps> = ({ show, onClose, title, message }) => {
    if (!show) return null;

    return (
        <div className="fixed bottom-5 right-5 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-4 z-50 animate-bounce-in">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                     <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                </div>
                <div className="ml-3 w-0 flex-1">
                    <p className="text-base font-bold text-primary">{title}</p>
                    <p className="mt-1 text-sm text-darktext/80">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button onClick={onClose} className="inline-flex text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Close</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
