import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, RefreshCcw, Languages } from 'lucide-react';

interface ManifestoOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    lang: 'ru' | 'en';
    setLang: (l: 'ru' | 'en') => void;
}

const CONTENT = {
    ru: {
        title: "Stability_OS: Manifesto_0x002A",
        classification: "CLASSIFCATION: EYES_ONLY // HYPERVISOR_UNREALITY_SIMULATION_PROTOCOL",
        sections: [
            {
                id: "I",
                header: "Кризис Монолитной Устойчивости",
                text: "Классическая политическая мысль совершает фундаментальную ошибку, принимая \"народное единство\" за высшее благо. В терминах системной инженерии, монолит — это структура с бесконечным количеством внутренних связей и единственной точкой отказа. Когда в консолидированном обществе возникает резонанс недовольства, он распространяется мгновенно, превращая локальный сбой в системный крах."
            },
            {
                id: "II",
                header: "Архитектура Атомизации",
                text: "Stability.OS реализует концепцию устойчивости через максимизацию социальной энтропии. Мы не пытаемся подавить энергию масс — мы разделяем её на миллионы изолированных векторов. Атомизация электорального пространства превращает потенциальную \"волну\" в \"белый шум\". В такой среде любая попытка вертикальной мобилизации гаснет из-за отсутствия проводящей среды — общего понятийного и ценностного поля."
            },
            {
                id: "III",
                header: "Управляемое Горизонтальное Трение",
                text: "Постмодернистский неомарксизм, радикальный активизм и субкультуры идентичности — это не побочные продукты свободы, а модераторы трения. Создавая бесконечную фрагментацию групп (по гендеру, диете, этике, потреблению), мы гарантируем, что энергия социального недовольства будет расходоваться на горизонтальные конфликты. Группы сражаются друг с другом за микро-привилегии, пока Гипервизор сохраняет стабильность всей платформы."
            },
            {
                id: "IV",
                header: "Эффект Рассеивания (Financial Blur)",
                text: "Финансовое обеспечение групп является динамическим клапаном. Поддержка наиболее радикальных элементов лишь на первый взгляд кажется опасной. На деле, избыток ресурсов в радикальных нишах ускоряет их геттоизацию. Группа, имеющая всё необходимое для внутреннего потребления, теряет стимул к внешней экспансии и структурным изменениям, замыкаясь в собственном инфопузыре."
            },
            {
                id: "V",
                header: "Гипервизор: Модератор Реальности",
                text: "Stability.OS не претендует на управление мыслями; она управляет friction_vectors. Истинная власть в XXI веке — это не запрет, а маршрутизация. Стабильность — это термодинамическая константа, где сумма всех конфликтов и противоречий внутри системы постоянно приводится к нулю через взаимное поглощение."
            },
            {
                quote: "\"Разделяй и балансируй. Единство — это иллюзия, за которой скрывается неизбежный распад. Фрагментация — это реальность, в которой возможен вечный контроль.\""
            }
        ]
    },
    en: {
        title: "Stability_OS: Manifesto_0x002A",
        classification: "CLASSIFICATION: EYES_ONLY // HYPERVISOR_UNREALITY_SIMULATION_PROTOCOL",
        sections: [
            {
                id: "I",
                header: "The Crisis of Monolithic Stability",
                text: "Classical political thought makes a fundamental error in accepting 'people's unity' as the highest good. In systems engineering terms, a monolith is a structure with an infinite number of internal connections and a single point of failure. When resonance of dissent arises in a consolidated society, it spreads instantly, turning a local failure into a systemic collapse."
            },
            {
                id: "II",
                header: "The Architecture of Atomization",
                text: "Stability.OS implements the concept of resilience through maximizing social entropy. We do not attempt to suppress the energy of the masses; we divide it into millions of isolated vectors. The atomization of electoral space turns a potential 'wave' into 'white noise.' In such an environment, any attempt at vertical mobilization fades due to the absence of a conductive medium—a common conceptual and value field."
            },
            {
                id: "III",
                header: "Managed Horizontal Friction",
                text: "Postmodern neo-Marxism, radical activism, and identity subcultures are not byproducts of freedom, but friction moderators. By creating infinite fragmentation of groups (by gender, diet, ethics, consumption), we ensure that the energy of social discontent is spent on horizontal conflicts. Groups fight each other for micro-privileges while the Hypervisor maintains the stability of the entire platform."
            },
            {
                id: "IV",
                header: "The Dissipation Effect (Financial Blur)",
                text: "Financial provisioning of groups serves as a dynamic valve. Support for the most radical elements only seems dangerous at first glance. In reality, the excess of resources in radical niches accelerates their ghettoization. A group that has everything necessary for internal consumption loses the incentive for external expansion and structural changes, becoming locked within its own info-bubble."
            },
            {
                id: "V",
                header: "Hypervisor: Reality Moderator",
                text: "Stability.OS does not claim to manage thoughts; it manages friction_vectors. True power in the 21st century is not prohibition, but routing. Stability is a thermodynamic constant, where the sum of all conflicts and contradictions within the system is constantly brought to zero through mutual absorption."
            },
            {
                quote: "\"Divide and balance. Unity is an illusion behind which inevitable decay is hidden. Fragmentation is the reality in which eternal control is possible.\""
            }
        ]
    }
};

export function ManifestoOverlay({ isOpen, onClose, lang, setLang }: ManifestoOverlayProps) {
    if (!isOpen) return null;

    const t = CONTENT[lang];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl overflow-y-auto custom-scrollbar"
                >
                    <div className="flex flex-col items-center min-h-full pt-16 px-8">
                        <div className="max-w-4xl w-full">
                            <div className="flex justify-between items-center mb-12">
                                <div className="flex items-center gap-4">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                                        <Shield size={32} className="text-blue-500 opacity-50" />
                                    </motion.div>
                                    <div>
                                        <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-300">{t.title}</h1>
                                        <p className="text-[10px] font-mono text-zinc-500">{t.classification}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-1 overflow-hidden">
                                        <button 
                                            onClick={() => setLang('ru')}
                                            className={`px-3 py-1 text-[10px] font-mono rounded-full transition-all ${lang === 'ru' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                                        >
                                            RU
                                        </button>
                                        <button 
                                            onClick={() => setLang('en')}
                                            className={`px-3 py-1 text-[10px] font-mono rounded-full transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                                        >
                                            EN
                                        </button>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-10 h-10 flex items-center justify-center border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors"
                                    >
                                        <RefreshCcw size={16} className="text-zinc-400 rotate-45" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-sans">
                                <div className="space-y-10 leading-relaxed text-zinc-400">
                                    {t.sections.slice(0, 3).map((section) => (
                                        <section key={section.id}>
                                            <h2 className="text-blue-500 font-mono text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-2">
                                                <span className="w-4 h-px bg-blue-500/30" /> {section.id}. {section.header}
                                            </h2>
                                            <p className="text-sm text-zinc-400">
                                                {section.text}
                                            </p>
                                        </section>
                                    ))}
                                </div>

                                <div className="space-y-10 leading-relaxed text-zinc-400 border-l border-zinc-800/50 pl-16">
                                    {t.sections.slice(3, 5).map((section) => (
                                        <section key={section.id}>
                                            <h2 className="text-blue-500 font-mono text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-2">
                                                <span className="w-4 h-px bg-blue-500/30" /> {section.id}. {section.header}
                                            </h2>
                                            <p className="text-sm text-zinc-400">
                                                {section.text}
                                            </p>
                                        </section>
                                    ))}
                                    
                                    <section>
                                        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-[11px] font-mono text-blue-400/80 leading-relaxed italic">
                                            {t.sections[5].quote}
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

                        {/* Spacer to ensure bottom margin */}
                        <div className="h-16 w-full shrink-0" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
