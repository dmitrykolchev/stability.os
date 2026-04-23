import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { Cluster, ViewMode } from '../types';

interface SimulationCanvasProps {
    activeProtocol: string;
    viewMode: ViewMode;
    clusters: Cluster[];
    selectedCluster: string | null;
    setSelectedCluster: (id: string | null) => void;
    lang: 'ru' | 'en';
}

export function SimulationCanvas({ activeProtocol, viewMode, clusters, selectedCluster, setSelectedCluster, lang }: SimulationCanvasProps) {
    return (
        <section className="flex-1 bg-zinc-900/10 border border-zinc-800/60 rounded-3xl flex flex-col relative overflow-hidden backdrop-blur-md shadow-2xl group">
            {/* Matrix Header */}
            <div className="absolute top-0 inset-x-0 h-10 border-b border-zinc-800/40 bg-zinc-950/40 flex items-center justify-between px-6 z-50 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="text-[9px] text-zinc-400 font-bold flex items-center gap-2 font-mono">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full glow-blue" />
                        {lang === 'ru' ? 'КАДР_СИМ' : 'SIM_FRAME'}: 24,901
                    </div>
                    <div className="text-[9px] text-zinc-600 font-mono">{lang === 'ru' ? 'ТЕЛЕМЕТРИЯ X,Y ВКЛЮЧЕНА' : 'X,Y TELEMETRY ENABLED'}</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-500/50 w-1/3" />
                        <div className="h-full bg-emerald-500/50 w-1/4" />
                        <div className="h-full bg-amber-500/50 w-1/5" />
                    </div>
                    <span className="text-[8px] text-zinc-600 font-black uppercase">{lang === 'ru' ? 'Емкость_Потока' : 'Flux_Capacity'}</span>
                </div>
            </div>

            {/* Simulation Canvas Wrapper */}
            <motion.div
                animate={activeProtocol === 'unity' ? { x: [-1, 1, -1], y: [1, -1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.1 }}
                className="flex-1 relative overflow-hidden bg-black/40"
            >
                {/* Background Noise/Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                {/* View Mode Overlays */}
                <AnimatePresence mode="wait">
                    {viewMode === 'vectors' && (
                        <motion.svg key="vectors" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} className="absolute inset-0 w-full h-full">
                            {clusters.map((c1, i) =>
                                clusters.slice(i + 1).map((c2) => (
                                    <motion.line
                                        key={`${c1.id}-${c2.id}`}
                                        x1={c1.x} y1={c1.y}
                                        x2={c2.x} y2={c2.y}
                                        stroke="rgba(59, 130, 246, 0.4)"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                        animate={{ strokeDashoffset: [0, -20] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                ))
                            )}
                        </motion.svg>
                    )}
                    {viewMode === 'resource' && (
                        <motion.div key="resource" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                <div className="w-full h-px bg-zinc-800" />
                                <div className="h-full w-px bg-zinc-800" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Interface Effects for Protocols */}
                <AnimatePresence>
                    {activeProtocol === 'unity' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40 bg-red-950/20 pointer-events-none border-4 border-red-500/20 flex flex-col items-center justify-center overflow-hidden"
                        >
                            <motion.div
                                animate={{ opacity: [1, 0.4, 1], scale: [1, 1.05, 1] }}
                                transition={{ duration: 0.1, repeat: Infinity }}
                                className="bg-black/80 px-10 py-4 border border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)] flex flex-col items-center gap-2"
                            >
                                <AlertTriangle size={32} className="text-red-500 animate-pulse" />
                                <span className="text-red-500 font-mono text-lg font-black uppercase tracking-[0.4em]">
                                    {lang === 'ru' ? 'КРИТИЧЕСКИЙ_РИСК: ПРОТОКОЛ_МОНОЛИТ' : 'CRITICAL_RISK: MONOLITH_PROTOCOL'}
                                </span>
                                <span className="text-red-500/60 font-mono text-[8px] uppercase tracking-widest text-center">
                                    {lang === 'ru' 
                                        ? 'Единство обнаружено. Целостность фрагментации нарушена. Системная нестабильность приближается к критическому значению.'
                                        : 'Unity detected. Fragmentation integrity compromised. System instability approaching terminal value.'}
                                </span>
                            </motion.div>
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                                        transition={{ duration: Math.random() + 0.3, repeat: Infinity, delay: Math.random() }}
                                        className="absolute w-full h-[2px] bg-red-400 shadow-[0_0_15px_red]"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeProtocol === 'dim_red' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px]" />
                            <div className="absolute inset-0 opacity-30" style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)',
                                backgroundSize: '100% 4px'
                            }} />
                            <div className="absolute top-12 left-6 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                <span className="text-emerald-500 font-mono text-[8px] font-black uppercase">{lang === 'ru' ? 'Картирование_Низкой_Размерности: ВКЛ' : 'Low_Dimension_Mapping: ON'}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Grid Overlay */}
                <div className="absolute inset-0 grid grid-cols-[repeat(12,1fr)] grid-rows-12 opacity-[0.05]">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-r border-b border-zinc-500" />
                    ))}
                </div>

                {/* Cluster Visualizations */}
                {clusters.map((c) => {
                    // Diameter set by Radius range [10, 150] -> Diameter [20, 300]
                    const nodeSize = 20 + (c.leverage / 100) * 280;
                    const fundingFactor = c.funding / 100;
                    
                    return (
                        <motion.div
                            key={c.id}
                            onClick={() => setSelectedCluster(selectedCluster === c.id ? null : c.id)}
                            style={{ 
                                left: c.x, 
                                top: c.y,
                                position: 'absolute',
                                zIndex: 30
                            }}
                            animate={{ 
                                x: [0, (Math.random() - 0.5) * 15, 0], 
                                y: [0, (Math.random() - 0.5) * 15, 0] 
                            }}
                            transition={{ duration: 12 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" }}
                            className="group/node cursor-pointer"
                        >
                            {/* Origin Point Anchor */}
                            <div className="relative pointer-events-none w-0 h-0 flex items-center justify-center">
                                {/* Resource View Mode Gradients */}
                                {viewMode === 'resource' && (
                                    <>
                                        <div
                                            style={{
                                                width: `${c.funding * 4}px`,
                                                height: `${c.funding * 4}px`,
                                                background: `radial-gradient(circle, ${
                                                    c.color === 'emerald' ? 'rgba(16,185,129,0.25)' : 
                                                    c.color === 'red' ? 'rgba(239,68,68,0.25)' : 
                                                    c.color === 'amber' ? 'rgba(245,158,11,0.25)' : 'rgba(59,130,246,0.25)'
                                                } 0%, transparent 70%)`,
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                            className="rounded-full blur-3xl opacity-40"
                                        />
                                        <motion.div
                                            animate={{ 
                                                scale: [1, 2.2], 
                                                opacity: [0, 0.25, 0] 
                                            }}
                                            transition={{ 
                                                duration: 4, 
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{ 
                                                width: `${nodeSize * 1.6}px`, 
                                                height: `${nodeSize * 1.6}px`,
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                x: "-50%",
                                                y: "-50%"
                                            }}
                                            className="rounded-full border border-zinc-700/30"
                                        />
                                    </>
                                )}

                                {/* Resource Flow Ring (Rotating) */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15 - fundingFactor * 12, repeat: Infinity, ease: "linear" }}
                                    style={{ 
                                        width: `${nodeSize + 16}px`, 
                                        height: `${nodeSize + 16}px`,
                                        opacity: 0.1 + fundingFactor * 0.4,
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        x: "-50%",
                                        y: "-50%"
                                    }}
                                    className={`rounded-full border border-dashed flex-shrink-0 aspect-square ${
                                        c.color === 'blue' ? 'border-blue-400' : 
                                        c.color === 'amber' ? 'border-amber-400' : 
                                        c.color === 'red' ? 'border-red-400' : 'border-emerald-400'
                                    }`}
                                />

                                {/* Core Pulse */}
                                <motion.div 
                                    style={{ 
                                        width: `${nodeSize}px`, 
                                        height: `${nodeSize}px`,
                                        boxShadow: selectedCluster === c.id 
                                            ? `0 0 ${30 + fundingFactor * 40}px ${c.color === 'blue' ? 'rgba(37,99,235,0.6)' : c.color === 'amber' ? 'rgba(217,119,6,0.6)' : c.color === 'red' ? 'rgba(220,38,38,0.6)' : 'rgba(5,150,105,0.6)'}`
                                            : `0 0 ${fundingFactor * 20}px ${c.color === 'blue' ? 'rgba(37,99,235,0.4)' : c.color === 'amber' ? 'rgba(217,119,6,0.4)' : c.color === 'red' ? 'rgba(220,38,38,0.4)' : 'rgba(5,150,105,0.4)'}`,
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        x: "-50%",
                                        y: "-50%"
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`rounded-full border-2 border-white/20 z-10 transition-all duration-500 flex-shrink-0 aspect-square pointer-events-auto ${
                                        selectedCluster === c.id ? 'border-white' : ''
                                    } ${
                                        c.color === 'blue' ? 'bg-blue-600' : 
                                        c.color === 'amber' ? 'bg-amber-600' : 
                                        c.color === 'red' ? 'bg-red-600' : 'bg-emerald-600'
                                    }`} 
                                />

                                {/* Diverging Ring */}
                                <motion.div
                                    animate={{ 
                                        scale: [1, 2.5], 
                                        opacity: [0, 0.35, 0] 
                                    }}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    style={{ 
                                        width: `${nodeSize}px`, 
                                        height: `${nodeSize}px`,
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        x: "-50%",
                                        y: "-50%"
                                    }}
                                    className={`rounded-full flex-shrink-0 aspect-square z-0 ${
                                        c.color === 'blue' ? 'bg-blue-500' : 
                                        c.color === 'amber' ? 'bg-amber-500' : 
                                        c.color === 'red' ? 'bg-red-500' : 'bg-emerald-500'
                                    }`}
                                />

                                {/* Label */}
                                <div 
                                    className="absolute whitespace-nowrap z-20 pointer-events-none"
                                    style={{ top: `calc(${nodeSize / 2}px + 12px)`, left: '0', transform: 'translateX(-50%)' }}
                                >
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-xl border transition-colors duration-300 ${
                                        selectedCluster === c.id 
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                                            : 'bg-zinc-950/80 border-zinc-800 text-zinc-500 group-hover/node:text-zinc-300'
                                    }`}>
                                        {c.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Floating Meta Data */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-3 pointer-events-none max-w-[280px] z-50">
                    <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-2xl backdrop-blur-xl shadow-2xl">
                        <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                            {lang === 'ru' ? 'Терминал_Симуляции' : 'Sim_Terminal_Output'}
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
                                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            </div>
                        </div>
                        <div className="font-mono text-[8px] text-zinc-500 space-y-1">
                            <div className="flex gap-2">
                                <span className="text-zinc-700">INF:</span> {lang === 'ru' ? 'Эффективность трения: 92.4%' : 'Friction efficiency at 92.4%'}
                            </div>
                            <div className="flex gap-2">
                                <span className="text-zinc-700">INF:</span> {lang === 'ru' ? 'Равновесие поддерживается.' : 'Equilibrium maintained.'}
                            </div>
                            <div className="flex gap-2">
                                <span className="text-zinc-700">CMD:</span> {lang === 'ru' ? 'Корректировка векторов диссипации.' : 'Adjusting dissipation vectors.'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 text-[8px] font-mono p-4 bg-zinc-950/90 border border-zinc-800 rounded-2xl text-zinc-600 space-y-1 backdrop-blur-xl z-50">
                    <div className="text-blue-500/50 mb-2 uppercase font-black tracking-widest">{lang === 'ru' ? 'Глобальные_Переменные' : 'Global_Variables'}</div>
                    <div>{lang === 'ru' ? 'КОЭФФИЦИЕНТ_ТРЕНИЯ' : 'FRICTION_RATIO'}: 1:1.042</div>
                    <div>{lang === 'ru' ? 'ДИССИПАЦИЯ: ВКЛЮЧЕНА' : 'DISSIPATION: ENABLED'}</div>
                    <div>{lang === 'ru' ? 'ОГРАНИЧЕНИЕ_ОБРАТНОЙ_СВЯЗИ: ВКЛ' : 'FEEDBACK_LOOP: SHIELDED'}</div>
                </div>
            </motion.div>
        </section>
    );
}
