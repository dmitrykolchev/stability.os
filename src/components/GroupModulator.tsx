import { motion, AnimatePresence } from 'motion/react';
import { Zap, RefreshCcw, Shield, ChevronRight } from 'lucide-react';
import { Cluster } from '../types';

interface GroupModulatorProps {
    selectedData: Cluster | undefined;
    setSelectedCluster: (id: string | null) => void;
    updateCluster: (id: string, updates: Partial<Cluster>) => void;
}

export function GroupModulator({ selectedData, setSelectedCluster, updateCluster }: GroupModulatorProps) {
    return (
        <section className="w-80 flex flex-col gap-6 shrink-0 h-full">
            <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-amber-500" />
                        <h3 className="text-[10px] font-bold text-zinc-100 uppercase tracking-[0.2em]">Group Modulator</h3>
                    </div>
                    <div className="text-[8px] text-zinc-600 font-mono">STATUS: CMD_READY</div>
                </div>

                <AnimatePresence mode="wait">
                    {selectedData ? (
                        <motion.div
                            key={selectedData.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="mb-8">
                                <div className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Target Cluster</div>
                                <h4 className="text-xl font-black text-white">{selectedData.name}</h4>
                                <div className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">Object_ID: {selectedData.id}</div>
                            </div>

                            <div className="space-y-10 flex-1">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <RefreshCcw size={12} className="text-zinc-500" />
                                            Financial_Allocation
                                        </div>
                                        <span className="text-blue-500 font-mono">{selectedData.funding}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={selectedData.funding}
                                        onChange={(e) => updateCluster(selectedData.id, { funding: parseInt(e.target.value) })}
                                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                    <p className="text-[9px] text-zinc-600 leading-tight">
                                        * Increasing resource flow to radical groups reduces global stability but increases atomization in local segments.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <Shield size={12} className="text-zinc-500" />
                                            Political_Leverage
                                        </div>
                                        <span className="text-emerald-500 font-mono">{selectedData.leverage}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={selectedData.leverage}
                                        onChange={(e) => updateCluster(selectedData.id, { leverage: parseInt(e.target.value) })}
                                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <p className="text-[9px] text-zinc-600 leading-tight">
                                        * Political legacy support buffers against vertical mobilization but creates "Monolith Risks" if exceeding 70%.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-zinc-800 bg-zinc-950/20 -mx-6 px-6 pb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[9px] font-black uppercase text-zinc-500">Calculated Friction</span>
                                    <span className="text-[9px] font-mono text-emerald-500">OPTIMIZED</span>
                                </div>
                                <button
                                    onClick={() => setSelectedCluster(null)}
                                    className="w-full py-4 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors"
                                >
                                    Reset Target Selection
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 flex flex-col items-center justify-center text-center opacity-40 px-8"
                        >
                            <div className="w-16 h-16 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-6">
                                <ChevronRight size={32} className="text-zinc-600" />
                            </div>
                            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                                Select a cluster from the Stability Matrix to begin modulation and simulate resource redirection.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Small activity chart below */}
            <div className="bg-zinc-900/10 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Dissipative Health</h4>
                </div>
                <div className="h-12 flex items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="flex-1 bg-zinc-800 rounded-t-sm"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
