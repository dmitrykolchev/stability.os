export interface Cluster {
    id: string;
    name: string;
    x: string;
    y: string;
    baseVal: number;
    color: 'amber' | 'blue' | 'red' | 'emerald';
    funding: number; // 0-100
    leverage: number; // 0-100 political support
}

export type ViewMode = 'matrix' | 'vectors' | 'resource';

export interface Protocol {
    id: string;
    name: string;
    status: string;
    color: string;
    description: string;
}
