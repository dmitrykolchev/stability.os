import { motion } from 'motion/react';
import { RefreshCcw, Network } from 'lucide-react';

export function Footer() {
    return (
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
    );
}
