import React, { useState } from 'react';

interface ColorSet {
    primary: string;
    secondary: string;
}

interface SettingsModalProps {
    currentColors: ColorSet;
    onSave: (colors: ColorSet) => void;
    onClose: () => void;
}

const PREDEFINED_PALETTES: { name: string; colors: ColorSet }[] = [
    { name: 'Стандарт', colors: { primary: '#0059A8', secondary: '#A40EFF' } },
    { name: 'Закат', colors: { primary: '#E63946', secondary: '#F4A261' } },
    { name: 'Лес', colors: { primary: '#283618', secondary: '#606C38' } },
    { name: 'Океан', colors: { primary: '#0077B6', secondary: '#00B4D8' } },
    { name: 'Романтика', colors: { primary: '#D00000', secondary: '#FFBF00' } },
    { name: 'Нежность', colors: { primary: '#FFC0CB', secondary: '#B19CD9' } },
];

const defaultColors = PREDEFINED_PALETTES[0].colors;

const SettingsModal: React.FC<SettingsModalProps> = ({ currentColors, onSave, onClose }) => {
    const [primary, setPrimary] = useState(currentColors.primary);
    const [secondary, setSecondary] = useState(currentColors.secondary);
  
    const handleSave = () => {
        onSave({ primary, secondary });
        onClose();
    };
  
    const handleReset = () => {
        setPrimary(defaultColors.primary);
        setSecondary(defaultColors.secondary);
    };

    const handlePaletteSelect = (colors: ColorSet) => {
        setPrimary(colors.primary);
        setSecondary(colors.secondary);
    };

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-6">
            <h4 className="text-lg font-semibold text-darktext/80 mb-3">{title}</h4>
            {children}
        </div>
    );

    const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <div className="flex items-center justify-between">
            <label className="text-darktext">{label}</label>
            <div className="relative w-24 h-10 rounded-lg border border-gray-300 flex items-center justify-end px-2" style={{ backgroundColor: value }}>
                <span className="font-mono text-sm mix-blend-difference text-white">{value.toUpperCase()}</span>
                <input
                    type="color"
                    value={value}
                    onChange={onChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md animate-bounce-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-primary">Настройки темы</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                    </button>
                </div>
                
                <div className="space-y-4">
                    <Section title="Свой цвет">
                         <div className="space-y-3">
                            <ColorInput label="Основной" value={primary} onChange={(e) => setPrimary(e.target.value)} />
                            <ColorInput label="Дополнительный" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                        </div>
                    </Section>

                    <Section title="Готовые палитры">
                        <div className="flex flex-wrap gap-3">
                            {PREDEFINED_PALETTES.map(palette => (
                                <button key={palette.name} onClick={() => handlePaletteSelect(palette.colors)} className="flex-1 p-2 rounded-lg border-2 hover:border-gray-400 transition-colors min-w-[70px]">
                                    <div className="flex gap-1 h-8">
                                        <div className="w-1/2 rounded" style={{backgroundColor: palette.colors.primary}}></div>
                                        <div className="w-1/2 rounded" style={{backgroundColor: palette.colors.secondary}}></div>
                                    </div>
                                    <span className="text-xs text-darktext/70 mt-1 block">{palette.name}</span>
                                </button>
                            ))}
                        </div>
                    </Section>
                </div>
                
                <div className="mt-8 flex justify-between items-center gap-3">
                     <button onClick={handleReset} className="px-6 py-2 rounded-full text-darktext hover:bg-gray-200 transition-colors font-semibold">Сбросить</button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-6 py-2 rounded-full text-darktext bg-gray-200 hover:bg-gray-300 transition-colors font-semibold">Отмена</button>
                        <button onClick={handleSave} className="px-6 py-2 rounded-full text-white bg-primary hover:bg-opacity-90 transition-colors font-semibold shadow-md">Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;