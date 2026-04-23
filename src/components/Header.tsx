import { motion } from 'motion/react';

interface HeaderProps {
    entropy: number;
    lang: 'ru' | 'en';
    setLang: (l: 'ru' | 'en') => void;
}

export function Header({ entropy, lang, setLang }: HeaderProps) {
    return (
        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950 shrink-0">
            <div className="flex items-center gap-3">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-blue-500 glow-blue"
                />
                <span className="font-bold tracking-tight text-lg uppercase font-mono flex items-center">
                    Stability.OS
                    &nbsp;<span className="text-zinc-500 font-normal ml-1 text-sm tracking-widest hidden sm:inline">v4.2.0-HYPERVISOR</span>
                    &nbsp;<span className="text-blue-500 font-normal ml-3 text-lg tracking-widest hidden lg:inline">
                        {lang === 'ru' ? 'Разделяй и балансируй' : 'Divide and Balance'}
                    </span>
                </span>
            </div>
            
            <div className="flex items-center gap-8">
                <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-0.5 overflow-hidden scale-90">
                    <button 
                        onClick={() => setLang('ru')}
                        className={`px-3 py-1 text-[9px] font-bold rounded-full transition-all ${lang === 'ru' ? 'bg-blue-600 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                        RU
                    </button>
                    <button 
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 text-[9px] font-bold rounded-full transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                        EN
                    </button>
                </div>

                <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest font-semibold text-zinc-400 border-l border-zinc-800 pl-8">
                    <div className="flex flex-col items-end">
                        <span className="text-zinc-600 text-[8px] mb-0.5">{lang === 'ru' ? 'Гидравлическая Устойчивость' : 'Hydraulic Stability'}</span>
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${entropy > 0.85 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            INDEX: {(entropy * 100).toFixed(2)}%
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-zinc-600 text-[8px] mb-0.5">{lang === 'ru' ? 'Эпоха Симуляции' : 'Simulation Epoch'}</span>
                        <span className="text-zinc-300 font-mono">32.4k_CYCLES</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
