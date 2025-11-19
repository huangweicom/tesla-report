/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PieChart, Activity } from 'lucide-react';

// --- FINANCIAL CHART ---
export const FinancialChart: React.FC = () => {
  // Data derived from page 3/4 of PDF
  const data = {
    q3_24: { rev: 25.18, net: 2.20 },
    q3_25: { rev: 28.10, net: 1.37 }
  };

  // Scaling factor for visual bars
  const scale = 8; 

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200 h-full">
      <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-xl text-tesla-dark">营收 vs 净利润 (十亿美元)</h3>
          <div className="flex gap-4 text-xs font-bold">
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-300"></div> 2024 Q3</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-tesla-red"></div> 2025 Q3</div>
          </div>
      </div>
      
      <div className="flex justify-around items-end h-64 pb-4 border-b border-gray-100 gap-8">
          
          {/* Revenue Group */}
          <div className="flex flex-col items-center gap-2 w-1/3 h-full justify-end group">
              <div className="w-full flex justify-center items-end gap-2 h-full">
                  {/* 2024 Rev */}
                  <motion.div 
                    className="w-12 bg-gray-300 relative group-hover:bg-gray-400 transition-colors"
                    initial={{ height: 0 }}
                    whileInView={{ height: data.q3_24.rev * scale }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        className="absolute -top-6 w-full text-center text-xs font-bold text-gray-500"
                      >
                        ${data.q3_24.rev}
                      </motion.div>
                  </motion.div>
                  {/* 2025 Rev */}
                  <motion.div 
                    className="w-12 bg-tesla-dark relative shadow-lg"
                    initial={{ height: 0 }}
                    whileInView={{ height: data.q3_25.rev * scale }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.3 }}
                        className="absolute -top-6 w-full text-center text-xs font-bold text-tesla-dark"
                      >
                        ${data.q3_25.rev}
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                        className="absolute top-2 right-2 text-[10px] text-white font-bold"
                      >
                        +12%
                      </motion.div>
                  </motion.div>
              </div>
              <span className="text-sm font-bold text-gray-600 mt-2 uppercase tracking-wider">总营收</span>
          </div>

          {/* Net Income Group */}
          <div className="flex flex-col items-center gap-2 w-1/3 h-full justify-end group">
              <div className="w-full flex justify-center items-end gap-2 h-full">
                  {/* 2024 Net */}
                  <motion.div 
                    className="w-12 bg-gray-300 relative group-hover:bg-gray-400 transition-colors" 
                    initial={{ height: 0 }}
                    whileInView={{ height: data.q3_24.net * scale * 3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  >
                       <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.3 }}
                        className="absolute -top-6 w-full text-center text-xs font-bold text-gray-500"
                       >
                        ${data.q3_24.net}
                       </motion.div>
                  </motion.div>
                  {/* 2025 Net */}
                  <motion.div 
                    className="w-12 bg-tesla-red relative shadow-lg"
                    initial={{ height: 0 }}
                    whileInView={{ height: data.q3_25.net * scale * 3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                  >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.3 }}
                        className="absolute -top-6 w-full text-center text-xs font-bold text-tesla-red"
                      >
                        ${data.q3_25.net}
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="absolute -bottom-8 w-full text-center text-[10px] font-bold text-tesla-red bg-red-50 py-1 rounded"
                      >
                        -37%
                      </motion.div>
                  </motion.div>
              </div>
              <span className="text-sm font-bold text-gray-600 mt-2 uppercase tracking-wider">净利润</span>
          </div>
      </div>
      <div className="mt-8 text-xs text-gray-400 italic text-center">
          注：为便于视觉比较，净利润比例尺已放大 3 倍。
      </div>
    </div>
  );
};

// --- SEGMENT GROWTH CHART ---
export const SegmentGrowthChart: React.FC = () => {
  return (
    <div className="flex flex-col p-8 bg-white rounded-xl border border-gray-200 relative overflow-hidden">
        <h3 className="font-bold text-xl text-tesla-dark mb-2 z-10">各板块同比增长率 (YoY)</h3>
        <p className="text-gray-500 text-sm mb-8 z-10">能源业务增速目前是汽车业务的 7 倍。</p>

        <div className="space-y-6 relative z-10">
            {/* Energy Bar */}
            <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                    <span className="text-tesla-red flex items-center gap-2"><Activity size={14}/> 能源生产与存储</span>
                    <span className="text-tesla-red">+44%</span>
                </div>
                <div className="w-full bg-gray-100 h-8 rounded-sm overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }} // Scaled to max
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-red-600 to-tesla-red"
                    />
                </div>
                <div className="text-xs text-gray-400 mt-1 pl-1">高利润率 (Megapack 驱动)</div>
            </div>

            {/* Services Bar */}
            <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                    <span className="text-gray-700">服务及其他</span>
                    <span className="text-gray-700">+25%</span>
                </div>
                 <div className="w-full bg-gray-100 h-8 rounded-sm overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '56%' }} // 25/44 * 100
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-gray-600"
                    />
                </div>
            </div>

            {/* Auto Bar */}
            <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                    <span className="text-gray-500">汽车业务</span>
                    <span className="text-gray-500">+6%</span>
                </div>
                 <div className="w-full bg-gray-100 h-8 rounded-sm overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '13%' }} // 6/44 * 100
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="h-full bg-gray-400"
                    />
                </div>
                <div className="text-xs text-gray-400 mt-1 pl-1">销量驱动，但利润空间被压缩</div>
            </div>
        </div>
    </div>
  );
};

// --- VALUATION TABLE (SOTP) ---
export const ValuationTable: React.FC = () => {
    const [optimism, setOptimism] = useState<'base' | 'bull'>('base');

    const data = {
        base: {
            auto: { val: 400, method: "20倍 EV/EBIT" },
            energy: { val: 100, method: "5倍 市销率" },
            ai: { val: 200, method: "期权价值" },
        },
        bull: {
            auto: { val: 550, method: "30倍 EV/EBIT" },
            energy: { val: 200, method: "10倍 市销率" },
            ai: { val: 800, method: "TAM 贴现" },
        }
    };

    const current = data[optimism];
    const total = current.auto.val + current.energy.val + current.ai.val;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 bg-tesla-dark text-white flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">分部加总估值法 (SOTP)</h3>
                    <p className="text-gray-400 text-xs">交互式估值模型</p>
                </div>
                <div className="flex bg-gray-800 rounded p-1">
                    <button 
                        onClick={() => setOptimism('base')}
                        className={`px-4 py-1 text-sm rounded transition-colors ${optimism === 'base' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        谨慎/基本面
                    </button>
                    <button 
                        onClick={() => setOptimism('bull')}
                        className={`px-4 py-1 text-sm rounded transition-colors ${optimism === 'bull' ? 'bg-tesla-red text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        乐观/AI愿景
                    </button>
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Auto */}
                    <div className="text-center p-4 bg-gray-50 rounded border border-gray-100">
                        <h4 className="text-gray-500 text-sm uppercase font-bold mb-2">汽车业务</h4>
                        <div className="text-3xl font-bold text-gray-800 mb-1">${current.auto.val}亿</div>
                        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded inline-block border border-gray-200">{current.auto.method}</div>
                    </div>
                    
                    {/* Energy */}
                    <div className="text-center p-4 bg-gray-50 rounded border border-gray-100">
                        <h4 className="text-gray-500 text-sm uppercase font-bold mb-2">能源业务</h4>
                        <div className="text-3xl font-bold text-gray-800 mb-1">${current.energy.val}亿</div>
                        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded inline-block border border-gray-200">{current.energy.method}</div>
                    </div>

                    {/* AI */}
                    <div className={`text-center p-4 rounded border transition-colors duration-500 ${optimism === 'bull' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className={`${optimism === 'bull' ? 'text-tesla-red' : 'text-gray-500'} text-sm uppercase font-bold mb-2`}>AI / FSD / 机器人</h4>
                        <div className={`text-3xl font-bold mb-1 transition-all duration-500 ${optimism === 'bull' ? 'text-tesla-red scale-110' : 'text-gray-800'}`}>${current.ai.val}亿</div>
                        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded inline-block border border-gray-200">{current.ai.method}</div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
                    <span className="text-gray-500 font-medium">隐含总估值</span>
                    <div className="text-right">
                         <span className="text-4xl font-bold text-tesla-dark block">${total} 亿美元</span>
                         <span className="text-xs text-gray-400">当前市值 ~8000 亿美元</span>
                    </div>
                </div>
                
                <div className="mt-6 text-xs text-gray-400 leading-relaxed bg-gray-50 p-4 rounded">
                    <span className="font-bold">分析：</span> {optimism === 'bull' ? 
                        "“乐观”情境假设特斯拉彻底解决了L4/L5级自动驾驶问题，释放了 Robotaxi 和 Optimus 巨大的潜在市场规模 (TAM)，从而享受科技公司的估值倍数。" : 
                        "“谨慎”情境主要将特斯拉视为一家成熟的汽车制造商和能源公用事业公司。这暗示当前的股价包含了对 AI 执行力的极高预期溢价。"}
                </div>
            </div>
        </div>
    )
}
