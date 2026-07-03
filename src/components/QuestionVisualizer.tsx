import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Zap, AlertTriangle, Moon, Brain, RefreshCw, Eye } from 'lucide-react';

interface QuestionVisualizerProps {
  type: 'reflex' | 'spinal' | 'alcohol' | 'pathway' | 'sleep' | 'stroke';
}

export const QuestionVisualizer: React.FC<QuestionVisualizerProps> = ({ type }) => {
  switch (type) {
    case 'reflex':
      return (
        <div className="flex flex-col items-center justify-center p-3 w-full bg-slate-50 border-2 border-dashed border-indigo-100 rounded-2xl">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Laluan Isyarat Tindakan Refleks</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-center w-full max-w-lg">
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-red-100 border border-red-200 text-red-800 rounded-xl font-bold text-xs flex flex-col items-center gap-1 w-full sm:w-1/3"
            >
              <span className="text-lg">🔥</span>
              <span>Cerek Panas (Rangsangan)</span>
            </motion.div>

            <div className="text-slate-400 font-bold text-sm">➔</div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: ['0px 0px 0px rgba(99, 102, 241, 0)', '0px 0px 10px rgba(99, 102, 241, 0.4)', '0px 0px 0px rgba(99, 102, 241, 0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-indigo-100 border-2 border-indigo-300 text-indigo-800 rounded-xl font-bold text-xs flex flex-col items-center gap-1 w-full sm:w-1/3"
            >
              <Zap className="w-5 h-5 text-indigo-600 animate-pulse" />
              <span>Saraf Tunjang (Pintasan)</span>
              <span className="text-[10px] text-indigo-500 font-normal">(Tanpa Arahan Otak!)</span>
            </motion.div>

            <div className="text-slate-400 font-bold text-sm">➔</div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-green-100 border border-green-200 text-green-800 rounded-xl font-bold text-xs flex flex-col items-center gap-1 w-full sm:w-1/3"
            >
              <span className="text-lg">⚡</span>
              <span>Tarik Tangan (Gerak Balas)</span>
            </motion.div>

          </div>
        </div>
      );

    case 'spinal':
      return (
        <div className="flex flex-col items-center justify-center p-3 w-full bg-slate-50 border-2 border-dashed border-indigo-100 rounded-2xl">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Sistem Saraf Terputus akibat Kecederaan</span>
          <div className="relative flex flex-col items-center gap-3 w-full max-w-md">
            
            <div className="w-full flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-1.5 rounded-lg"><Brain className="w-4 h-4 text-indigo-600" /></div>
                <span className="text-xs font-bold text-slate-700">Otak (Pusat Kawalan)</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">⚡ Isyarat Aktif</span>
            </div>

            <div className="h-6 w-0.5 bg-indigo-300 border-dashed border relative flex items-center justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 bg-rose-500 text-white rounded-full p-1 border-2 border-white">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="w-full flex justify-between items-center bg-rose-50 p-2.5 rounded-xl border-2 border-rose-300">
              <div className="flex items-center gap-2">
                <div className="bg-rose-100 p-1.5 rounded-lg"><ShieldAlert className="w-4 h-4 text-rose-600" /></div>
                <span className="text-xs font-bold text-rose-800">Saraf Tunjang Terjejas</span>
              </div>
              <span className="text-rose-600 text-xs font-extrabold uppercase tracking-wide">Kecederaan Parah!</span>
            </div>

            <div className="h-6 w-0.5 bg-slate-200" />

            <div className="w-full flex justify-between items-center bg-slate-100 p-2.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500">Kaki & Anggota Bawah</span>
              <span className="text-slate-500 text-xs font-bold">🚫 Isyarat Terhalang (Lumpuh)</span>
            </div>

          </div>
        </div>
      );

    case 'alcohol':
      return (
        <div className="flex flex-col items-center justify-center p-3 w-full bg-slate-50 border-2 border-dashed border-indigo-100 rounded-2xl">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Impak Alkohol Terhadap Kelajuan Impuls Saraf</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            
            {/* Normal Speed */}
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-emerald-600">Keadaan Normal</span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Laju (400 km/j)</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative mb-2">
                <motion.div 
                  animate={{ left: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                />
              </div>
              <p className="text-[11px] text-slate-500 font-semibold">Isyarat berjalan sekelip mata. Tindak balas mengelak atau menekan brek sangat pantas.</p>
            </div>

            {/* Affected by Alcohol */}
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-rose-600">Pengaruh Alkohol</span>
                <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Sangat Lambat</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative mb-2">
                <motion.div 
                  animate={{ left: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 bottom-0 w-1/12 bg-gradient-to-r from-rose-400 to-red-500 rounded-full"
                />
              </div>
              <p className="text-[11px] text-slate-500 font-semibold">Bahan perencat melambatkan neuron. Isyarat disekat, mata lambat bertindak balas.</p>
            </div>

          </div>
        </div>
      );

    case 'pathway':
      return (
        <div className="flex flex-col items-center justify-center p-3 w-full bg-slate-50 border-2 border-dashed border-indigo-100 rounded-2xl">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Laluan Isyarat Tindakan Terkawal (Mengelak Bola)</span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-slate-600 w-full max-w-lg">
            
            <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              <span>1. Mata (Deria)</span>
            </div>

            <div className="text-slate-400 font-bold">➔</div>

            <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-1">
              <span>🔌</span>
              <span>2. Saraf Periferi</span>
            </div>

            <div className="text-slate-400 font-bold">➔</div>

            <div className="p-2 bg-purple-50 border border-purple-300 text-purple-700 rounded-lg flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-purple-600" />
              <span>3. Otak (Tafsir)</span>
            </div>

            <div className="text-slate-400 font-bold">➔</div>

            <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-1">
              <span>🔌</span>
              <span>4. Saraf Periferi</span>
            </div>

            <div className="text-slate-400 font-bold">➔</div>

            <div className="p-2 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-lg flex items-center gap-1">
              <span>💪</span>
              <span>5. Otot (Mengelak)</span>
            </div>

          </div>
        </div>
      );

    case 'sleep':
      return (
        <div className="flex flex-col items-center justify-center p-3 w-full bg-slate-50 border-2 border-dashed border-indigo-100 rounded-2xl">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Kesan Tidur Cukup vs Kurang Tidur Terhadap Otak</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            
            {/* Rested Brain */}
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 shadow-sm flex items-start gap-2.5">
              <div className="bg-emerald-100 p-2 rounded-lg text-lg text-emerald-700 shrink-0">
                <Moon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 block">Tidur Cukup (8 Jam+)</span>
                <span className="text-[11px] text-emerald-700 leading-tight block mt-1">
                  Otak menyusun memori baharu, sel neuron diperbaharui, tumpuan tinggi & respons sains sangat tajam semasa periksa.
                </span>
              </div>
            </div>

            {/* Fatigued Brain */}
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 shadow-sm flex items-start gap-2.5">
              <div className="bg-rose-100 p-2 rounded-lg text-lg text-rose-700 shrink-0">
                <RefreshCw className="w-5 h-5 text-rose-600 animate-spin-slow" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-800 block">Kurang Tidur (Letih)</span>
                <span className="text-[11px] text-rose-700 leading-tight block mt-1">
                  Impuls saraf menjadi lembap, otak mengalami "fag" pemikiran lambat, sukar mengingat semula fakta sains yang dihafal.
                </span>
              </div>
            </div>

          </div>
        </div>
      );

    case 'stroke':
      return (
        <div className="flex flex-col items-center justify-center p-3 w-full bg-slate-50 border-2 border-dashed border-indigo-100 rounded-2xl">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Kawalan Silang Sistem Saraf Pusat</span>
          <div className="flex items-center justify-center gap-6 w-full max-w-md bg-white p-3 rounded-xl border border-slate-200">
            
            <div className="flex flex-col items-center text-center w-1/2">
              <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">Otak KIRI Rosak (Strok)</span>
              <div className="text-3xl">🧠💊</div>
            </div>

            <div className="text-slate-400 text-2xl font-bold animate-pulse">➔ ✕</div>

            <div className="flex flex-col items-center text-center w-1/2">
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">Anggota Badan KANAN</span>
              <div className="text-xs font-extrabold text-rose-600">Lemah & Lumpuh ⚠️</div>
            </div>

          </div>
        </div>
      );

    default:
      return null;
  }
};
