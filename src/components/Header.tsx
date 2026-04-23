import { motion } from 'motion/react';

interface HeaderProps {
    entropy: number;
}

export function Header({ entropy }: HeaderProps) {
    return (
        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950 shrink-0">
            <div className="flex items-center gap-3">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-blue-500 glow-blue"
                />
                <span className="font-bold tracking-tight text-lg uppercase font-mono">
                    Stability.OS
                    &nbsp;<span className="text-zinc-500 font-normal ml-1 text-sm tracking-widest">v4.2.0-HYPERVISOR</span>
                    &nbsp;<span className="text-blue-500 font-normal ml-1 text-lg tracking-widest">Разделяй и балансируй</span>
                </span>
            </div>
            <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest font-semibold text-zinc-400">
                <div className="flex flex-col items-end">
                    <span className="text-zinc-600 text-[8px] mb-0.5">Hydraulic Stability</span>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${entropy > 0.85 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        INDEX: {(entropy * 100).toFixed(2)}%
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-zinc-600 text-[8px] mb-0.5">Simulation Epoch</span>
                    <span className="text-zinc-300 font-mono">32.4k_CYCLES</span>
                </div>
            </div>
        </header>
    );
}
