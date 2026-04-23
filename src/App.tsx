/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Server, 
  Network, 
  AlertTriangle, 
  Terminal, 
  Zap, 
  Layers, 
  Cpu, 
  RefreshCcw,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PROTOCOLS = [
  { id: 'frag', name: 'Managed Fragmentation', status: 'RUNNING', color: 'blue', description: 'Horizontal routing of societal friction.' },
  { id: 'unity', name: 'National Unity', status: 'DEPRECATED', color: 'zinc', description: 'High-risk monolithic architecture.' },
  { id: 'dim_red', name: 'Dimensionality Reduction', status: 'ACTIVE', color: 'emerald', description: 'Simplification of societal state variables.' },
];

const LOGS = [
  "SYSTEM_BOOT: Hypervisor v4.2.0 initialized.",
  "LOG: GRP_67 [VEGAN_RADICALS] collision with GRP_12 [AGRO_LOBBY]",
  "STATUS: Resolved by horizontal friction.",
  "WARN: Resource gradient declining at index 0.84.",
  "PROTOCOL: Managed Fragmentation verified active.",
  "LOG: Analyzing core claim: National unity as a misguided goal.",
  "DEBUG: Entropy maximization successful in segment 7.",
];

interface Cluster {
  id: string;
  name: string;
  x: string;
  y: string;
  baseVal: number;
  color: 'amber' | 'blue' | 'red' | 'emerald';
  funding: number; // 0-100
  leverage: number; // 0-100 political support
}

const INITIAL_CLUSTERS: Cluster[] = [
  { id: 'c1', name: 'Traditionalist_Core', x: '25%', y: '65%', baseVal: 0.84, color: 'amber', funding: 65, leverage: 40 },
  { id: 'c2', name: 'Urban_Progressives', x: '70%', y: '20%', baseVal: 0.92, color: 'blue', funding: 50, leverage: 70 },
  { id: 'c3', name: 'Rural_Dissidents', x: '35%', y: '15%', baseVal: 0.65, color: 'red', funding: 20, leverage: 15 },
  { id: 'c4', name: 'Techno_Nomads', x: '80%', y: '75%', baseVal: 0.98, color: 'emerald', funding: 40, leverage: 30 },
];

export default function App() {
  const [activeProtocol, setActiveProtocol] = useState('frag');
  const [entropy, setEntropy] = useState(0.82);
  const [logs, setLogs] = useState(LOGS);
  const [viewMode, setViewMode] = useState<'matrix' | 'vectors' | 'resource'>('matrix');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [clusters, setClusters] = useState<Cluster[]>(INITIAL_CLUSTERS);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Dynamic stability calculation logic
  useEffect(() => {
    // Stability is high when groups are balanced and not excessively funded/leveraged
    const totalImbalance = clusters.reduce((acc, c) => {
      const risk = (c.funding * 0.6 + c.leverage * 0.4) / 100;
      // Radical/Dissident groups have higher impact on entropy if funded
      const weight = c.name.includes('Dissidents') ? 1.5 : 1.0;
      return acc + (risk * weight);
    }, 0) / clusters.length;

    const targetEntropy = 1 - (totalImbalance * 0.3); // Map to 0.7 - 1.0 range
    
    const interval = setInterval(() => {
      setEntropy(e => {
        const diff = targetEntropy - e;
        const step = diff * 0.1 + (Math.random() - 0.5) * 0.005;
        return Math.max(0.7, Math.min(0.98, e + step));
      });
      
      if (Math.random() > 0.8) {
        setLogs(prev => [
          ...prev.slice(-10),
          `SIM_TICK: Recalculating friction vectors for ${clusters.length} active nodes. Cluster_Resonance: ${(targetEntropy).toFixed(4)}`,
        ]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [clusters]);

  const updateCluster = (id: string, updates: Partial<Cluster>) => {
    setClusters(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const selectedData = clusters.find(c => c.id === selectedCluster);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#09090b] text-zinc-100 font-sans select-none">
      {/* Top Navigation / Status Bar */}
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

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Control Protocols */}
        <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
          <div>
            <h3 className="text-[10px] uppercase text-zinc-500 font-bold mb-4 tracking-[0.2em]">Active Protocols</h3>
            <div className="space-y-3">
              {PROTOCOLS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProtocol(p.id)}
                  className={`w-full p-3 rounded-lg border transition-all text-left group relative overflow-hidden ${
                    activeProtocol === p.id 
                      ? 'bg-zinc-900 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium mb-1 relative z-10">
                    <span className={`text-sm tracking-tight ${activeProtocol === p.id ? 'text-white' : 'text-zinc-400'}`}>
                      {p.name}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      activeProtocol === p.id
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
                  onClick={() => setViewMode(mode.id as any)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${
                    viewMode === mode.id
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

        {/* Main Content Area */}
        <main className="flex-1 p-8 flex flex-col gap-8 bg-gradient-to-br from-[#09090b] to-[#0c0c0e] overflow-hidden">
          
          <div className="flex justify-between items-end shrink-0">
             <div>
                <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Hypervisor View: <span className="text-blue-500 font-mono">0x042</span></h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Activity size={10} />
                    Live_Dissipation: Active
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">ENVIRONMENT: SIMULATED_SOCIETY_v4</div>
                </div>
             </div>
             <div className="flex gap-4 p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg backdrop-blur-sm">
                <div className="px-4 border-r border-zinc-800 text-center">
                  <div className="text-[8px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1">Societal_Equilibrium</div>
                  <div className="text-lg font-mono text-white">{(entropy).toFixed(4)}</div>
                </div>
                <div className="px-4 text-center">
                  <div className="text-[8px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1 font-mono">Nodes_Active</div>
                  <div className="text-lg font-mono text-blue-500">4 / 4</div>
                </div>
             </div>
          </div>

          <div className="flex-1 flex gap-8 min-h-0">
            {/* Stability Matrix Visualization */}
            <section className="flex-1 bg-zinc-900/10 border border-zinc-800/60 rounded-3xl flex flex-col relative overflow-hidden backdrop-blur-md shadow-2xl group">
              {/* Matrix Header */}
              <div className="absolute top-0 inset-x-0 h-10 border-b border-zinc-800/40 bg-zinc-950/40 flex items-center justify-between px-6 z-20 backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className="text-[9px] text-zinc-400 font-bold flex items-center gap-2 font-mono">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full glow-blue" />
                    SIM_FRAME: 24,901
                  </div>
                  <div className="text-[9px] text-zinc-600 font-mono">X,Y TELEMETRY ENABLED</div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-500/50 w-1/3" />
                      <div className="h-full bg-emerald-500/50 w-1/4" />
                      <div className="h-full bg-amber-500/50 w-1/5" />
                   </div>
                   <span className="text-[8px] text-zinc-600 font-black uppercase">Flux_Capacity</span>
                </div>
              </div>

              {/* Simulation Canvas */}
              <div className="flex-1 relative overflow-hidden bg-black/40">
                {/* Background Noise/Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                {/* View Mode Overlays */}
                <AnimatePresence mode="wait">
                  {viewMode === 'vectors' && (
                    <motion.svg key="vectors" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }} className="absolute inset-0 w-full h-full text-blue-500">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <line key={i} x1={Math.random()*100+'%'} y1={Math.random()*100+'%'} x2={Math.random()*100+'%'} y2={Math.random()*100+'%'} stroke="currentColor" strokeWidth="0.5" />
                      ))}
                    </motion.svg>
                  )}
                </AnimatePresence>

                {/* Grid Overlay */}
                <div className="absolute inset-0 grid grid-cols-[repeat(12,1fr)] grid-rows-12 opacity-[0.05]">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="border-r border-b border-zinc-500" />
                  ))}
                </div>

                {/* Cluster Visualizations */}
                {clusters.map((c) => (
                  <motion.div
                    key={c.id}
                    layoutId={`cluster-${c.id}`}
                    onClick={() => setSelectedCluster(selectedCluster === c.id ? null : c.id)}
                    style={{ left: c.x, top: c.y }}
                    animate={{ x: [0, (Math.random()-0.5)*10, 0], y: [0, (Math.random()-0.5)*10, 0] }}
                    transition={{ duration: 8 + Math.random()*4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/node"
                  >
                    {/* Core Pulse */}
                    <div className={`w-4 h-4 rounded-full border-2 border-white/20 relative z-10 transition-transform ${selectedCluster === c.id ? 'scale-150 border-white' : 'group-hover/node:scale-125'} ${
                      c.color === 'blue' ? 'bg-blue-600' : c.color === 'amber' ? 'bg-amber-600' : c.color === 'red' ? 'bg-red-600' : 'bg-emerald-600'
                    }`} />
                    
                    {/* Ring */}
                    <motion.div 
                      animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full ${
                        c.color === 'blue' ? 'bg-blue-500' : c.color === 'amber' ? 'bg-amber-500' : c.color === 'red' ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                    />

                    {/* Label */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                       <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-xl border ${
                         selectedCluster === c.id ? 'bg-blue-600 border-blue-400 text-white' : 'bg-zinc-950/80 border-zinc-800 text-zinc-500 group-hover/node:text-zinc-300'
                       }`}>
                         {c.name}
                       </span>
                    </div>
                  </motion.div>
                ))}

                {/* Floating Meta Data */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-3 pointer-events-none max-w-[280px]">
                  <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-2xl backdrop-blur-xl shadow-2xl">
                    <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                      Sim_Terminal_Output
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                      </div>
                    </div>
                    <div className="font-mono text-[8px] text-zinc-500 space-y-1">
                       <div className="flex gap-2">
                         <span className="text-zinc-700">INF:</span> Friction efficiency at 92.4%
                       </div>
                       <div className="flex gap-2">
                         <span className="text-zinc-700">INF:</span> Equilibrium maintained.
                       </div>
                       <div className="flex gap-2">
                         <span className="text-zinc-700">CMD:</span> Adjusting dissipation vectors.
                       </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 text-[8px] font-mono p-4 bg-zinc-950/90 border border-zinc-800 rounded-2xl text-zinc-600 space-y-1 backdrop-blur-xl">
                   <div className="text-blue-500/50 mb-2 uppercase font-black tracking-widest">Global_Variables</div>
                   <div>FRICTION_RATIO: 1:1.042</div>
                   <div>DISSIPATION: ENABLED</div>
                   <div>FEEDBACK_LOOP: SHIELDED</div>
                </div>
              </div>
            </section>

            {/* Right Column: Group Modulator (The Functional Part) */}
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
                        <h4 className="text-xl font-black text-white italic">{selectedData.name}</h4>
                        <div className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">Object_ID: {selectedData.id}</div>
                      </div>

                      <div className="space-y-10 flex-1">
                        {/* Financial Modulation */}
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
                           <p className="text-[9px] text-zinc-600 leading-tight italic">
                             * Increasing resource flow to radical groups reduces global stability but increases atomization in local segments.
                           </p>
                        </div>

                        {/* Political Modulation */}
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
                           <p className="text-[9px] text-zinc-600 leading-tight italic">
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

              <div className="bg-zinc-900/10 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-md">
                 <div className="flex items-center gap-2 mb-4">
                    <Activity size={14} className="text-blue-500" />
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Dissipative Health</h4>
                 </div>
                 <div className="h-12 flex items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [`${Math.random()*100}%`, `${Math.random()*100}%`] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="flex-1 bg-zinc-800 rounded-t-sm"
                      />
                    ))}
                 </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Manifesto Overlay */}
      <AnimatePresence>
        {isAboutOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 overflow-y-auto"
          >
            <div className="max-w-4xl w-full">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <Shield size={32} className="text-blue-500 opacity-50" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-300">Stability_OS: Manifesto_0x002A</h1>
                    <p className="text-[10px] font-mono text-zinc-500">CLASSIFCATION: EYES_ONLY // HYPERVISOR_UNREALITY_SIMULATION_PROTOCOL</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAboutOpen(false)}
                  className="w-12 h-12 flex items-center justify-center border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors"
                >
                  <RefreshCcw size={16} className="text-zinc-400 rotate-45" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-sans">
                <div className="space-y-10 leading-relaxed text-zinc-400">
                  <section>
                    <h2 className="text-blue-500 font-mono text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-2">
                       <span className="w-4 h-px bg-blue-500/30" /> I. Кризис Монолитной Устойчивости
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Классическая политическая мысль совершает фундаментальную ошибку, принимая "народное единство" за высшее благо. 
                      В терминах системной инженерии, монолит — это структура с бесконечным количеством внутренних связей и <span className="text-blue-400 italic">единственной точкой отказа</span>. 
                      Когда в консолидированном обществе возникает резонанс недовольства, он распространяется мгновенно, превращая локальный сбой в системный крах.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-blue-500 font-mono text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-2">
                       <span className="w-4 h-px bg-blue-500/30" /> II. Архитектура Атомизации
                    </h2>
                    <p className="text-sm text-zinc-400">
                       Stability.OS реализует концепцию устойчивости через <span className="text-white font-bold italic">максимизацию социальной энтропии</span>. 
                      Мы не пытаемся подавить энергию масс — мы разделяем её на миллионы изолированных векторов. 
                      Атомизация электорального пространства превращает потенциальную "волну" в "белый шум". 
                      В такой среде любая попытка вертикальной мобилизации гаснет из-за отсутствия проводящей среды — общего понятийного и ценностного поля.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-blue-500 font-mono text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-2">
                       <span className="w-4 h-px bg-blue-500/30" /> III. Управляемое Горизонтальное Трение
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Постмодернистский неомарксизм, радикальный активизм и субкультуры идентичности — это не побочные продукты свободы, а <span className="text-blue-500">модераторы трения</span>. 
                      Создавая бесконечную фрагментацию групп (по гендеру, диете, этике, потреблению), мы гарантируем, что энергия социального недовольства будет расходоваться на горизонтальные конфликты. 
                      Группы сражаются друг с другом за микро-привилегии, пока Гипервизор сохраняет стабильность всей платформы.
                    </p>
                  </section>
                </div>

                <div className="space-y-10 leading-relaxed text-zinc-400 border-l border-zinc-800/50 pl-16">
                  <section>
                    <h2 className="text-blue-500 font-mono text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-2">
                       <span className="w-4 h-px bg-blue-500/30" /> IV. Эффект Рассеивания (Financial Blur)
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Финансовое обеспечение групп является динамическим клапаном. Поддержка наиболее радикальных элементов 
                      лишь на первый взгляд кажется опасной. На деле, избыток ресурсов в радикальных нишах ускоряет 
                      их <span className="text-emerald-400">геттоизацию</span>. Группа, имеющая всё необходимое для внутреннего потребления, 
                      теряет стимул к внешней экспансии и структурным изменениям, замыкаясь в собственном инфопузыре.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-blue-500 font-mono text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-2">
                       <span className="w-4 h-px bg-blue-500/30" /> V. Гипервизор: Модератор Реальности
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Stability.OS не претендует на управление мыслями; она управляет <span className="text-blue-500 font-mono">friction_vectors</span>. 
                      Истинная власть в XXI веке — это не запрет, а маршрутизация. 
                      Стабильность — это термодинамическая константа, где сумма всех конфликтов и противоречий внутри системы 
                      постоянно приводится к нулю через взаимное поглощение. 
                    </p>
                    <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-[11px] font-mono text-blue-400/80 leading-relaxed italic">
                      "Разделяй и балансируй. Единство — это иллюзия, за которой скрывается неизбежный распад. 
                      Фрагментация — это реальность, в которой возможен вечный контроль."
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-20 pt-8 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>Created: DIVISION_BY_ZERO</span>
                <span>System_Hash: 7b502c3a1f48c8609ae212cdfb639dee39673f5e</span>
                <span className="text-blue-900 font-black">Ad_Victoria_Stabilitas</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Console */}
      <footer className="h-10 bg-zinc-950 border-t border-zinc-800 px-6 flex items-center justify-between font-mono text-[10px] text-zinc-500 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <span className="text-zinc-600">[root@stability.os]</span>
            <span className="text-zinc-400"># initiate_rebalance.sh --node-all</span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-3 bg-zinc-400" />
          </div>
        </div>
        <div className="flex gap-10 items-center overflow-hidden">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
             <span className="flex items-center gap-1.5"><RefreshCcw size={10} className="animate-spin-slow" /> REFRESHING_CACHES</span>
             <span className="flex items-center gap-1.5"><Network size={10} /> NODES_SYNCED: 4/4</span>
             <span className="text-blue-500/50">SYSTEM_HEALTH: 98.42%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
