import { motion, AnimatePresence } from 'motion/react';
import { Shield, RefreshCcw } from 'lucide-react';

interface ManifestoOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ManifestoOverlay({ isOpen, onClose }: ManifestoOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 overflow-y-auto custom-scrollbar"
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
                                onClick={onClose}
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
                                    <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-[11px] font-mono text-blue-400/80 leading-relaxed">
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
    );
}
