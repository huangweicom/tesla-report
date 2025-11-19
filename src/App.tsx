/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NeuralNetScene } from './components/QuantumScene';
import { FinancialChart, SegmentGrowthChart, ValuationTable } from './components/Diagrams';
import { ArrowDown, ArrowUp, Menu, X, TrendingUp, TrendingDown, Battery, Zap, Brain, Car, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KpiCard = ({ label, value, change, isPositive, delay }: { label: string, value: string, change: string, isPositive: boolean, delay: string }) => {
  return (
    <div className="flex flex-col animate-fade-in-up p-6 bg-white rounded-none border-l-4 border-tesla-red shadow-sm hover:shadow-lg transition-all duration-300 w-full" style={{ animationDelay: delay }}>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-2">{label}</p>
      <h3 className="text-3xl font-bold text-tesla-dark mb-2">{value}</h3>
      <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
        {change}
      </div>
    </div>
  );
};

const CapitalAllocationWidget = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');

  const data = {
    current: {
      auto: { height: 45, opacity: 0.8, desc: "传统车型迭代与降本" },
      factory: { height: 60, opacity: 0.8, desc: "全球产能扩张 (墨西哥/柏林)" },
      ai: { height: 25, opacity: 1, glow: false, desc: "Dojo 早期集群搭建" }
    },
    future: {
      auto: { height: 30, opacity: 0.4, desc: "维护性投入" },
      factory: { height: 40, opacity: 0.4, desc: "特定产线升级" },
      ai: { height: 95, opacity: 1, glow: true, desc: "大规模 GPU 集群与算力中心" }
    }
  };

  const currentData = data[activeTab];

  return (
    <div className="bg-black/40 backdrop-blur-md border border-gray-800 p-8 rounded-xl overflow-hidden relative shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="text-tesla-red" size={20} /> 资本配置演变
            </h3>
            <p className="text-xs text-gray-400 mt-1">研发投入重心转移预测</p>
        </div>
        <div className="flex bg-gray-900/80 p-1 rounded-lg border border-gray-700">
            <button
                onClick={() => setActiveTab('current')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'current' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
                2024-2025
            </button>
            <button
                onClick={() => setActiveTab('future')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'future' ? 'bg-tesla-red text-white shadow-[0_0_15px_rgba(227,25,55,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
            >
                2026+ (愿景)
            </button>
        </div>
      </div>

      <div className="flex items-end justify-around h-56 mb-6 px-2 sm:px-8 gap-6">
        {/* Auto Bar */}
        <div className="w-1/3 flex flex-col items-center h-full justify-end group cursor-pointer">
            <motion.div
                initial={false}
                animate={{ height: `${currentData.auto.height}%`, opacity: currentData.auto.opacity }}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.2)" }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full max-w-[60px] bg-gray-600 rounded-t-sm relative"
            >
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-gray-800 px-3 py-1.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-lg border border-gray-700">
                  {currentData.auto.desc}
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-b border-r border-gray-700"></div>
               </div>
            </motion.div>
            <span className="text-xs text-gray-400 mt-3 font-bold tracking-wider text-center">汽车硬件</span>
        </div>

        {/* Factory Bar */}
        <div className="w-1/3 flex flex-col items-center h-full justify-end group cursor-pointer">
            <motion.div
                initial={false}
                animate={{ height: `${currentData.factory.height}%`, opacity: currentData.factory.opacity }}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.2)" }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
                className="w-full max-w-[60px] bg-gray-500 rounded-t-sm relative"
            >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-gray-800 px-3 py-1.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-lg border border-gray-700">
                  {currentData.factory.desc}
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-b border-r border-gray-700"></div>
               </div>
            </motion.div>
            <span className="text-xs text-gray-400 mt-3 font-bold tracking-wider text-center">超级工厂</span>
        </div>

        {/* AI Bar */}
        <div className="w-1/3 flex flex-col items-center h-full justify-end group cursor-pointer">
            <motion.div
                initial={false}
                animate={{
                    height: `${currentData.ai.height}%`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
                className="w-full max-w-[60px] relative"
            >
                 {/* Glow effect (Back) */}
                {activeTab === 'future' && (
                    <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-tesla-red blur-xl -z-10 rounded-t-sm"
                    />
                )}

                {/* The Visual Bar Content (Clipped) */}
                <motion.div 
                    className="absolute inset-0 rounded-t-sm overflow-hidden"
                    animate={{ 
                        backgroundColor: activeTab === 'future' ? '#E31937' : '#4B5563',
                        boxShadow: activeTab === 'future' ? 'inset 0 0 20px rgba(255,255,255,0.3)' : 'none'
                    }}
                >
                     {/* Future Animations inside the bar */}
                    {activeTab === 'future' && (
                        <>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20"
                            />
                            {/* Scanline Effect */}
                            <motion.div
                                className="absolute w-full h-[40%] bg-gradient-to-t from-transparent via-white/40 to-transparent blur-sm"
                                animate={{ top: ['100%', '-40%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </>
                    )}
                </motion.div>

                 {/* Tooltip */}
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-tesla-red px-3 py-1.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-[0_4px_14px_rgba(227,25,55,0.5)] font-bold">
                  {currentData.ai.desc}
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-tesla-red rotate-45"></div>
               </div>
            </motion.div>
            <span className={`text-xs mt-3 font-bold tracking-wider text-center transition-colors ${activeTab === 'future' ? 'text-tesla-red animate-pulse' : 'text-gray-400'}`}>AI 基础设施</span>
        </div>
      </div>

      <div className="bg-gray-900/50 p-4 rounded border border-gray-800 min-h-[80px] flex items-center justify-center text-center">
          <AnimatePresence mode='wait'>
            <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm text-gray-300 leading-relaxed"
            >
                {activeTab === 'current'
                    ? "当前：资本支出仍主要用于支持 Model Y 产能爬坡及得州/柏林工厂建设，AI 投入占比适中。"
                    : "未来：随着 FSD 训练需求激增，资本支出将“大幅增加”并向算力倾斜。数十亿美元将用于购买 Nvidia GPU 和 Dojo 集群建设。"}
            </motion.p>
          </AnimatePresence>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowBackToTop(scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-tesla-dark selection:bg-tesla-red selection:text-white font-sans relative">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-gray-100' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="text-tesla-red font-bold text-2xl tracking-tighter">TESLA <span className="text-tesla-dark font-light">REPORT</span></div>
            <div className="hidden md:block w-[1px] h-6 bg-gray-300 mx-2"></div>
            <span className="hidden md:block text-xs font-bold tracking-[0.2em] text-gray-500">2025 Q3 深度分析</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-gray-600">
            <a href="#summary" onClick={scrollToSection('summary')} className="hover:text-tesla-red transition-colors cursor-pointer uppercase">摘要</a>
            <a href="#financials" onClick={scrollToSection('financials')} className="hover:text-tesla-red transition-colors cursor-pointer uppercase">财务分析</a>
            <a href="#segments" onClick={scrollToSection('segments')} className="hover:text-tesla-red transition-colors cursor-pointer uppercase">业务板块</a>
            <a href="#strategy" onClick={scrollToSection('strategy')} className="hover:text-tesla-red transition-colors cursor-pointer uppercase">AI战略</a>
            <a href="#valuation" onClick={scrollToSection('valuation')} className="hover:text-tesla-red transition-colors cursor-pointer uppercase">估值模型</a>
          </div>

          <button className="md:hidden text-tesla-dark p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-lg font-medium animate-fade-in">
            <a href="#summary" onClick={scrollToSection('summary')} className="hover:text-tesla-red transition-colors">摘要</a>
            <a href="#financials" onClick={scrollToSection('financials')} className="hover:text-tesla-red transition-colors">财务分析</a>
            <a href="#segments" onClick={scrollToSection('segments')} className="hover:text-tesla-red transition-colors">业务板块</a>
            <a href="#strategy" onClick={scrollToSection('strategy')} className="hover:text-tesla-red transition-colors">AI战略</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-tesla-dark text-white">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-tesla-dark" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl">
            {/* Branding Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-in-up">
                <div className="px-4 py-1.5 bg-tesla-red text-white text-sm font-bold tracking-wider shadow-[0_0_15px_rgba(227,25,55,0.3)]">
                  黄伟智库™
                </div>
                <div className="px-4 py-1.5 border border-gray-600 text-gray-300 text-sm tracking-[0.2em] font-bold backdrop-blur-sm bg-black/30">
                  深度财报分析
                </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 drop-shadow-lg">
              销量与愿景的<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">十字路口</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-12 border-l-2 border-tesla-red pl-6">
              特斯拉2025年第三季度财报深度分析：从硬件销量驱动的汽车制造商，向AI与机器人科技巨头的关键转型。
            </p>
            
            <a href="#summary" onClick={scrollToSection('summary')} className="group inline-flex items-center gap-3 text-sm font-bold text-white hover:text-tesla-red transition-colors cursor-pointer tracking-widest">
                向下滚动探索
                <ArrowDown size={16} className="animate-bounce" />
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Executive Summary */}
        <section id="summary" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <h2 className="text-4xl font-bold mb-6 text-tesla-dark">深刻而复杂的矛盾</h2>
                    <div className="w-20 h-1.5 bg-tesla-red mb-8"></div>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Q3 2025 呈现出冰火两重天：<strong className="text-tesla-dark">创纪录的营收</strong> 与 <strong className="text-tesla-dark">利润率挤压</strong> 并存。
                    </p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-8 border-t-2 border-gray-200">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="text-tesla-red"/> 强劲增长</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            在创纪录的交付量和能源业务飙升的推动下，总营收达到历史最高的 <strong>281 亿美元 (+12%)</strong>。自由现金流也达到了惊人的 40 亿美元。
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 border-t-2 border-gray-200">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingDown className="text-gray-500"/> 利润承压</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            净利润下滑至 <strong>13.7 亿美元 (-37%)</strong>。由于激进的降价策略、关税影响以及对 AI 的巨额投入，营业利润率腰斩至 5.8%。
                        </p>
                    </div>
                    <div className="md:col-span-2 bg-tesla-dark text-white p-8 mt-4 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-tesla-red opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                         <h3 className="text-xl font-bold mb-2 relative z-10">核心投资论点</h3>
                         <p className="text-gray-300 relative z-10">
                             当前投资特斯拉是一项双重押注：其一是对核心汽车业务在价格战中保持韧性的中期赌注，其二是对“现实世界AI”（FSD、Optimus机器人）这一高风险、高回报未来的长期赌注。
                         </p>
                    </div>
                </div>
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                <KpiCard label="总营收 (Total Revenue)" value="$281 亿" change="+12% YoY" isPositive={true} delay="0s" />
                <KpiCard label="净利润 (Net Income)" value="$13.7 亿" change="-37% YoY" isPositive={false} delay="0.1s" />
                <KpiCard label="营业利润率 (Operating Margin)" value="5.8%" change="-500 基点" isPositive={false} delay="0.2s" />
                <KpiCard label="自由现金流 (Free Cash Flow)" value="$40 亿" change="+46% YoY" isPositive={true} delay="0.3s" />
            </div>
          </div>
        </section>

        {/* Financials & Operations */}
        <section id="financials" className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                         <div className="inline-block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">财务深度剖析</div>
                         <h2 className="text-4xl font-bold text-tesla-dark">业绩：冰火两重天</h2>
                    </div>
                    <p className="max-w-md text-gray-600 text-sm">
                        营收增长的熊熊烈火，难掩利润结冰的寒意。公司正通过牺牲短期利润来换取市场份额和未来技术。
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                        <FinancialChart />
                    </div>
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-lg mb-3">“需求前置”效应</h4>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                第三季度创纪录的 49.7 万辆交付量，在很大程度上是由美国 7500 美元税收抵免即将于 2025 年 9 月到期驱动的。这可能导致 2025 年底出现“需求悬崖”。
                            </p>
                            <div className="w-full bg-gray-100 h-1.5 mt-2">
                                <div className="bg-tesla-dark h-1.5 w-[75%]"></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1 text-gray-500">
                                <span>政策激励期</span>
                                <span>2025 Q3 到期</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 shadow-sm border border-gray-100">
                             <h4 className="font-bold text-lg mb-3">库存优化与现金流</h4>
                             <p className="text-sm text-gray-600 leading-relaxed">
                                产量（44.7万）刻意低于交付量（49.7万），成功去化库存，这是本季度产生 40 亿美元自由现金流的主要驱动力，而非核心盈利能力的提升。
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Business Segments */}
        <section id="segments" className="py-24 bg-white">
             <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">双引擎叙事</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        汽车业务利润承压，而能源存储业务正在迅速崛起，成为新的增长引擎。
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <SegmentGrowthChart />
                    </div>
                    <div className="space-y-8">
                         <div className="flex gap-4 items-start">
                            <div className="p-3 bg-gray-100 rounded text-gray-600"><Car size={24} /></div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">汽车业务：承压的核心</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                    营收仅增长 6% ($212亿)。剔除积分后的毛利率滑落至 ~15.4%。
                                </p>
                                <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                                    <li>激烈的全球价格战（如比亚迪等竞争对手）</li>
                                    <li>关税成本直接侵蚀利润（约2亿美元）</li>
                                    <li>高利润的监管信贷收入大幅下降 44%</li>
                                </ul>
                            </div>
                         </div>

                         <div className="flex gap-4 items-start">
                            <div className="p-3 bg-tesla-red/10 rounded text-tesla-red"><Battery size={24} /></div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">能源业务：被低估的催化剂</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                    营收飙升 44% ($34.2亿)。储能部署量暴增 81% (12.5 GWh)。
                                </p>
                                <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                                    <li>Megapack 毛利率据称超过 30%</li>
                                    <li>受益于 AI 数据中心和电网转型的巨大需求</li>
                                    <li>商业模式更稳定（B2B 长期合同）</li>
                                </ul>
                            </div>
                         </div>
                    </div>
                </div>
             </div>
        </section>

        {/* Strategy / AI */}
        <section id="strategy" className="py-24 bg-tesla-dark text-white overflow-hidden relative">
            {/* Abstract Neural Net Background */}
            <div className="absolute inset-0 opacity-20">
                <NeuralNetScene />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5">
                        <div className="inline-block px-3 py-1 border border-tesla-red text-tesla-red text-[10px] font-bold tracking-widest uppercase mb-6">
                            战略转向
                        </div>
                        <h2 className="text-5xl font-bold mb-6 leading-tight">现实世界 AI</h2>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            管理层正在重塑核心叙事：特斯拉不再仅仅是一家汽车制造商，而是一家 AI 和机器人公司。巨额资本支出是一场豪赌。
                        </p>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-4 border-l border-gray-700 hover:border-tesla-red transition-colors">
                                <div className="flex items-center gap-2 mb-2 text-white font-bold"><Brain size={18}/> FSD & Robotaxi</div>
                                <p className="text-sm text-gray-400">FSD V14 "精简版" 即将推出。Robotaxi 计划 2025 年底扩展至 8-10 个城市。Cybercab 计划 2026 年投产。</p>
                            </div>
                            <div className="p-4 border-l border-gray-700 hover:border-tesla-red transition-colors">
                                <div className="flex items-center gap-2 mb-2 text-white font-bold"><Zap size={18}/> Optimus 人形机器人</div>
                                <p className="text-sm text-gray-400">被视为“有史以来最伟大的产品”。V3 原型机 2026 Q1 亮相。马斯克预计其将贡献 80% 的长期价值。</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Interactive Capital Allocation Widget */}
                    <div className="lg:col-span-7">
                        <CapitalAllocationWidget />
                    </div>

                 </div>
            </div>
        </section>

        {/* Valuation (SOTP) */}
        <section id="valuation" className="py-24 bg-gray-50 border-t border-gray-200">
           <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-tesla-dark">估值框架</h2>
                    <p className="text-gray-600">
                        分部加总估值法 (SOTP) 将成熟的汽车业务与高增长的能源业务及投机性的 AI 愿景分开评估，为投资者提供更清晰的视角。
                    </p>
                </div>
                
                <ValuationTable />

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500 italic max-w-2xl mx-auto">
                        * 本分析基于 2025 Q3 财报数据，仅供学习研究，不构成投资建议。
                    </p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-white border-t border-gray-200 text-tesla-dark py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
                <div className="text-tesla-red font-bold text-xl mb-1">TESLA REPORT</div>
                <p className="text-xs text-gray-500">黄伟智库™《特斯拉2025Q3财报深度分析报告》可视化概览</p>
            </div>
            <div className="text-xs text-gray-400">
                数据来源：特斯拉 2025Q3 财务报告<br />
                分析来源：黄伟智库™深度分析报告
            </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-tesla-red text-white rounded-full shadow-lg z-40 transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tesla-red ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="回到顶部"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;