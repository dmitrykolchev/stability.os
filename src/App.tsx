/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SimulationCanvas } from './components/SimulationCanvas';
import { GroupModulator } from './components/GroupModulator';
import { ManifestoOverlay } from './components/ManifestoOverlay';
import { Footer } from './components/Footer';
import { Cluster, ViewMode } from './types';
import { INITIAL_CLUSTERS, INITIAL_LOGS } from './constants';

export default function App() {
    const [activeProtocol, setActiveProtocol] = useState('frag');
    const [entropy, setEntropy] = useState(0.82);
    const [logs, setLogs] = useState(INITIAL_LOGS);
    const [viewMode, setViewMode] = useState<ViewMode>('matrix');
    const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
    const [clusters, setClusters] = useState<Cluster[]>(INITIAL_CLUSTERS);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [lastProtocol, setLastProtocol] = useState('frag');

    // Protocol switch logs
    useEffect(() => {
        if (activeProtocol === lastProtocol) return;
        setLastProtocol(activeProtocol);
        
        let msg = "";
        if (activeProtocol === 'unity') msg = "CRIT: Monolith integrity check FAILED. Convergence vulnerability detected.";
        if (activeProtocol === 'dim_red') msg = "INF: Collapsing social dimensions. State space simplified.";
        if (activeProtocol === 'frag') msg = "AUTH: Managed Fragmentation verified. Dissipation vectors nominal.";
        
        if (msg) {
            setLogs(prev => [...prev.slice(-12), msg]);
        }
    }, [activeProtocol, lastProtocol]);

    // Dynamic stability calculation logic
    useEffect(() => {
        const totalImbalance = clusters.reduce((acc, c) => {
            const risk = (c.funding * 0.6 + c.leverage * 0.4) / 100;
            const weight = c.name.includes('Dissidents') ? 1.5 : 1.0;
            return acc + (risk * weight);
        }, 0) / clusters.length;

        const targetEntropy = 1 - (totalImbalance * 0.3);

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
            <Header entropy={entropy} />

            <div className="flex-1 flex overflow-hidden">
                <Sidebar 
                    activeProtocol={activeProtocol}
                    setActiveProtocol={setActiveProtocol}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    setIsAboutOpen={setIsAboutOpen}
                />

                <main className="flex-1 p-8 flex flex-col gap-8 bg-gradient-to-br from-[#09090b] to-[#0c0c0e] overflow-hidden">
                    <div className="flex justify-between items-end shrink-0">
                        <div>
                            <h2 className="text-3xl font-semibold tracking-tighter text-white uppercase">Hypervisor View: <span className="text-blue-500 font-mono">0x042</span></h2>
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
                        <SimulationCanvas 
                            activeProtocol={activeProtocol}
                            viewMode={viewMode}
                            clusters={clusters}
                            selectedCluster={selectedCluster}
                            setSelectedCluster={setSelectedCluster}
                        />

                        <GroupModulator 
                            selectedData={selectedData}
                            setSelectedCluster={setSelectedCluster}
                            updateCluster={updateCluster}
                        />
                    </div>
                </main>
            </div>

            <ManifestoOverlay 
                isOpen={isAboutOpen}
                onClose={() => setIsAboutOpen(false)}
            />

            <Footer />
        </div>
    );
}
