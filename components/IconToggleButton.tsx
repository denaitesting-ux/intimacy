
import React from 'react';

interface IconToggleButtonProps {
    label: string;
    icon: React.FC<any>;
    isSelected: boolean;
    onToggle: () => void;
}

const IconToggleButton: React.FC<IconToggleButtonProps> = ({ label, icon: Icon, isSelected, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`flex flex-col items-center justify-center p-3 w-24 h-24 rounded-xl border-2 transition-all duration-300 ease-in-out transform
                ${isSelected 
                    ? 'bg-secondary/10 border-secondary text-secondary shadow-lg scale-105' 
                    : 'bg-gray-100 border-transparent text-darktext/70 hover:bg-gray-200 hover:scale-105'
                }`}
        >
            <Icon className={`w-8 h-8 mb-1 transition-transform duration-300 ${isSelected ? 'animate-tada' : ''}`} />
            <span className="text-xs font-semibold text-center">{label}</span>
        </button>
    );
};

export default IconToggleButton;