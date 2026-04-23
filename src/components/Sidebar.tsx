import { Layers, Network, Server, Info } from 'lucide-react';
import { Protocol, ViewMode } from '../types';
import { PROTOCOLS } from '../constants';

interface SidebarProps {
    activeProtocol: string;
    setActiveProtocol: (id: string) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    setIsAboutOpen: (open: boolean) => void;
}

export function Sidebar({ activeProtocol, setActiveProtocol, viewMode, setViewMode, setIsAboutOpen }: SidebarProps) {
    return (
        <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
            <div>
                <h3 className="text-[10px] uppercase text-zinc-500 font-bold mb-4 tracking-[0.2em]">Active Protocols</h3>
                <div className="space-y-3">
                    {PROTOCOLS.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveProtocol(p.id)}
                            className={`w-full p-3 rounded-lg border transition-all text-left group relative overflow-hidden ${activeProtocol === p.id
                                    ? `bg-zinc-900 ${p.id === 'unity' ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]'}`
                                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                }`}
                        >
                            <div className="flex items-center justify-between font-medium mb-1 relative z-10">
                                <span className={`text-sm tracking-tight ${activeProtocol === p.id ? 'text-white' : 'text-zinc-400'}`}>
                                    {p.name}
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${activeProtocol === p.id
                                        ? 'bg-blue-500 text-white'
                                        : p.status === 'RUNNING' || p.status === 'ACTIVE'
                                            ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                            : 'bg-zinc-950 text-zinc-600 border border-zinc-800'
                                    }`}>
                                    {p.status}
                                </span>
                            </div>
                            <p className={`text-[10px] leading-tight relative z-10 ${activeProtocol === p.id ? 'text-blue-400/80' : 'text-zinc-600'}`}>
                                {p.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-[10px] uppercase text-zinc-500 font-bold mb-4 tracking-[0.2em]">Matrix Mode</h3>
                <div className="grid grid-cols-1 gap-2">
                    {[
                        { id: 'matrix', label: 'Entropy Matrix', icon: Layers },
                        { id: 'vectors', label: 'Friction Vectors', icon: Network },
                        { id: 'resource', label: 'Resource Gradient', icon: Server },
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setViewMode(mode.id as ViewMode)}
                            className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${viewMode === mode.id
                                    ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
                                    : 'bg-zinc-950/20 border-transparent text-zinc-600 hover:text-zinc-400'
                                }`}
                        >
                            <mode.icon size={14} className={viewMode === mode.id ? 'text-blue-500' : ''} />
                            {mode.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
                <h4 className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-3">Model Parameters</h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[8px] font-mono text-zinc-400 mb-1">
                            <span>ATOMIZATION</span>
                            <span>0.98</span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[98%]" />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[8px] font-mono text-zinc-400 mb-1 text-red-500">
                            <span>RESISTANCE_FLUX</span>
                            <span>LOW</span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[8%]" />
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsAboutOpen(true)}
                className="w-full py-2 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500 hover:text-white hover:border-zinc-600 transition-all mt-auto shadow-lg"
            >
                <Info size={10} />
                About Stability.OS...
            </button>
        </aside>
    );
}
