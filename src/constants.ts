import { Protocol, Cluster } from './types';

export const PROTOCOLS: Protocol[] = [
    { id: 'frag', name: 'Managed Fragmentation', status: 'RUNNING', color: 'blue', description: 'Horizontal routing of societal friction.' },
    { id: 'unity', name: 'National Unity', status: 'DEPRECATED', color: 'zinc', description: 'High-risk monolithic architecture.' },
    { id: 'dim_red', name: 'Dimensionality Reduction', status: 'ACTIVE', color: 'emerald', description: 'Simplification of societal state variables.' },
];

export const INITIAL_LOGS = [
    "SYSTEM_BOOT: Hypervisor v4.2.0 initialized.",
    "LOG: GRP_67 [VEGAN_RADICALS] collision with GRP_12 [AGRO_LOBBY]",
    "STATUS: Resolved by horizontal friction.",
    "WARN: Resource gradient declining at index 0.84.",
    "PROTOCOL: Managed Fragmentation verified active.",
    "LOG: Analyzing core claim: National unity as a misguided goal.",
    "DEBUG: Entropy maximization successful in segment 7.",
];

export const INITIAL_CLUSTERS: Cluster[] = [
    { id: 'c1', name: 'Traditionalist_Core', x: '25%', y: '65%', baseVal: 0.84, color: 'amber', funding: 65, leverage: 40 },
    { id: 'c2', name: 'Urban_Progressives', x: '70%', y: '20%', baseVal: 0.92, color: 'blue', funding: 50, leverage: 70 },
    { id: 'c3', name: 'Rural_Dissidents', x: '35%', y: '15%', baseVal: 0.65, color: 'red', funding: 20, leverage: 15 },
    { id: 'c4', name: 'Techno_Nomads', x: '80%', y: '75%', baseVal: 0.98, color: 'emerald', funding: 40, leverage: 30 },
];
