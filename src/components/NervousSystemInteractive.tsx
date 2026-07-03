import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, Play, Pause, ArrowLeft, ArrowRight, RotateCcw, Info, Activity, Eye, ShieldAlert } from 'lucide-react';

interface PathwayStep {
  label: string;
  node: 'otak' | 'tunjang' | 'periferi-tangan' | 'periferi-kaki' | 'mata';
  detail: string;
}

interface ActivityItem {
  id: string;
  name: string;
  emoji: string;
  type: 'Tindakan Terkawal' | 'Tindakan Refleks';
  description: string;
  steps: PathwayStep[];
}

export const NervousSystemInteractive: React.FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>('tulis');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Autoplay active
  const [sequenceStep, setSequenceStep] = useState<number>(0);
  const [animationSpeed, setAnimationSpeed] = useState<number>(2000); // Default to slow/detailed (2000ms)

  const activities: ActivityItem[] = [
    {
      id: 'tulis',
      name: 'Menulis Karangan',
      emoji: '✍️',
      type: 'Tindakan Terkawal',
      description: 'Menulis ialah tindakan terkawal di mana otak anda merancang perkataan dan menghantar arahan fizikal melalui sistem saraf ke jari anda.',
      steps: [
        {
          label: 'Otak (Pusat Kawalan)',
          node: 'otak',
          detail: 'Minda merancang idea karangan. Otak sebagai pusat kawalan membuat keputusan dan menjana isyarat elektrik (impuls saraf) untuk memulakan pergerakan tangan.'
        },
        {
          label: 'Saraf Tunjang (Lebuhraya Saraf)',
          node: 'tunjang',
          detail: 'Impuls bergerak turun dengan selamat dari otak melalui saraf tunjang, iaitu saluran utama penghantaran maklumat di dalam badan kita.'
        },
        {
          label: 'Saraf Periferi (Tangan)',
          node: 'periferi-tangan',
          detail: 'Isyarat beralih ke saraf periferi yang menyambungkan saraf tunjang terus ke otot-otot halus pada tangan dan jari anda.'
        },
        {
          label: 'Otot Jari (Tindak Balas)',
          node: 'periferi-tangan',
          detail: 'Otot jari menerima impuls saraf, bertindak balas dengan mengecut secara terkawal untuk membolehkan pen atau pensel mula menulis huruf di atas kertas.'
        }
      ]
    },
    {
      id: 'sterika',
      name: 'Terkena Seterika Panas',
      emoji: '🔥',
      type: 'Tindakan Refleks',
      description: 'Tindakan kecemasan automatik tanpa kawalan sedar! Isyarat bahaya dipintas terus di saraf tunjang supaya tindakan pantas menyelamatkan anda daripada melecur teruk.',
      steps: [
        {
          label: 'Reseptor Kulit (Kesan Sakit)',
          node: 'periferi-tangan',
          detail: 'Haba melampau dikesan oleh deria sakit pada kulit hujung jari. Rangsangan ini ditukarkan dengan pantas menjadi impuls saraf kecemasan.'
        },
        {
          label: 'Saraf Periferi ke Saraf Tunjang',
          node: 'periferi-tangan',
          detail: 'Impuls bahaya ini berlari selaju kilat melalui saraf periferi tangan menghala terus ke saraf tunjang.'
        },
        {
          label: 'Saraf Tunjang (Keputusan Kilat)',
          node: 'tunjang',
          detail: 'Saraf tunjang menerima isyarat sakit dan MEMINTAS laluan! Tanpa menunggu kelulusan dari otak, saraf tunjang terus menjana isyarat tindak balas kecemasan.'
        },
        {
          label: 'Saraf Periferi ke Otot',
          node: 'periferi-tangan',
          detail: 'Impuls arahan kecemasan ini dikirimkan semula ke otot-otot lengan dengan kelajuan maksimum melalui saraf periferi.'
        },
        {
          label: 'Otot Lengan (Tarik Tangan)',
          node: 'periferi-tangan',
          detail: 'Otot lengan mengecut dengan serta-merta, menarik tangan anda menjauhi seterika panas sekelip mata sebelum otak sempat merasai kesakitan!'
        }
      ]
    },
    {
      id: 'bola',
      name: 'Melihat & Menendang Bola',
      emoji: '⚽',
      type: 'Tindakan Terkawal',
      description: 'Mata mengesan maklumat visual, otak menganalisis taktik menendang, dan saraf menghantar arahan ke kaki untuk melakukan sepakan bertenaga.',
      steps: [
        {
          label: 'Mata (Deria Penglihatan)',
          node: 'mata',
          detail: 'Mata melihat bola yang sedang bergolek ke arah anda. Maklumat visual ditukar kepada impuls saraf penglihatan.'
        },
        {
          label: 'Saraf Optik ke Otak',
          node: 'mata',
          detail: 'Impuls penglihatan dihantar melalui saraf periferi (saraf optik) menuju terus ke pusat penganalisis visual di otak.'
        },
        {
          label: 'Otak (Tafsiran & Taktik)',
          node: 'otak',
          detail: 'Otak mentafsir kelajuan bola, membuat keputusan untuk menyepak, mengira sudut tendangan, dan mencetuskan impuls arahan fizikal.'
        },
        {
          label: 'Saraf Tunjang',
          node: 'tunjang',
          detail: 'Isyarat arahan menendang dialirkan ke bawah melalui saraf tunjang untuk sampai ke saraf bahagian bawah badan.'
        },
        {
          label: 'Saraf Periferi (Kaki)',
          node: 'periferi-kaki',
          detail: 'Saraf periferi di bahagian kaki menyerap isyarat arahan dan meneruskannya ke otot paha dan betis.'
        },
        {
          label: 'Otot Kaki (Tindakan Tendang)',
          node: 'periferi-kaki',
          detail: 'Otot-otot kaki bertindak balas, mengecut dengan bertenaga bagi menghasilkan hayunan kaki yang sempurna untuk menendang bola.'
        }
      ]
    },
    {
      id: 'kunci',
      name: 'Menangkap Kunci Jatuh',
      emoji: '🔑',
      type: 'Tindakan Terkawal',
      description: 'Tindakan koordinasi mata dan tangan yang cepat, dikawal secara sedar oleh otak untuk bertindak balas terhadap objek jatuh.',
      steps: [
        {
          label: 'Mata (Sedar Gerakan)',
          node: 'mata',
          detail: 'Deria penglihatan mengesan kunci tergelincir dari meja. Impuls visual dijana serta-merta.'
        },
        {
          label: 'Otak (Kira Tempoh Reaksi)',
          node: 'otak',
          detail: 'Otak memproses kedudukan kunci, mengira masa tindak balas motor, dan memancarkan impuls arahan untuk bertindak menangkap.'
        },
        {
          label: 'Saraf Tunjang',
          node: 'tunjang',
          detail: 'Isyarat bergerak sepantas kilat ke bawah melalui saraf tunjang untuk menggerakkan saraf bahagian atas badan.'
        },
        {
          label: 'Saraf Periferi (Tangan)',
          node: 'periferi-tangan',
          detail: 'Impuls disalurkan ke saraf periferi lengan, mengalir ke otot tangan bagi bersedia membuka jari.'
        },
        {
          label: 'Otot Lengan & Jari (Menangkap)',
          node: 'periferi-tangan',
          detail: 'Otot-otot lengan mengecut untuk memposisikan tangan, dan jari-jari meraba kunci dengan pantas bagi mencengkamnya daripada jatuh.'
        }
      ]
    }
  ];

  const currentActivity = activities.find(a => a.id === selectedActivityId) || activities[0];

  const playSynthBeep = (freq: number, duration: number = 0.12) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay blocked by browser occasionally, ignore safely
    }
  };

  // Change activity reset handler
  const handleActivityChange = (activityId: string) => {
    setSelectedActivityId(activityId);
    setSequenceStep(0);
    setIsPlaying(false);
    setIsAnimating(false);
    playSynthBeep(440, 0.1);
  };

  // Autoplay effect loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      setIsAnimating(true);
      timer = setTimeout(() => {
        if (sequenceStep < currentActivity.steps.length - 1) {
          setSequenceStep(prev => prev + 1);
          playSynthBeep(550 + (sequenceStep * 80), 0.12);
        } else {
          // Finished cycle
          setIsPlaying(false);
          setIsAnimating(false);
          playSynthBeep(880, 0.35); // Done pitch
        }
      }, animationSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, sequenceStep, currentActivity, animationSpeed]);

  const handleNextStep = () => {
    setIsPlaying(false); // Pause autoplay when interacting manually
    if (sequenceStep < currentActivity.steps.length - 1) {
      const next = sequenceStep + 1;
      setSequenceStep(next);
      setIsAnimating(true);
      playSynthBeep(550 + (next * 80), 0.12);
    }
  };

  const handlePrevStep = () => {
    setIsPlaying(false); // Pause autoplay
    if (sequenceStep > 0) {
      const prev = sequenceStep - 1;
      setSequenceStep(prev);
      setIsAnimating(true);
      playSynthBeep(440 + (prev * 80), 0.1);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      playSynthBeep(350, 0.15);
    } else {
      // If completed, start from step 0
      if (sequenceStep >= currentActivity.steps.length - 1) {
        setSequenceStep(0);
        playSynthBeep(520, 0.15);
        setTimeout(() => setIsPlaying(true), 150);
      } else {
        setIsPlaying(true);
        playSynthBeep(520, 0.15);
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsAnimating(false);
    setSequenceStep(0);
    playSynthBeep(300, 0.2);
  };

  const currentStepInfo = currentActivity.steps[sequenceStep] || currentActivity.steps[0];

  // Helper to check node state
  const getNodeState = (nodeId: string) => {
    const stepNode = currentStepInfo?.node;
    if (stepNode === nodeId) return 'active'; // The current active node
    
    // Check if it was visited in earlier steps
    const stepIndices = currentActivity.steps.map(s => s.node);
    const firstOccur = stepIndices.indexOf(nodeId as any);
    if (firstOccur !== -1 && firstOccur < sequenceStep) {
      return 'visited';
    }
    
    return 'inactive';
  };

  // Helper to color active line paths based on traversed steps
  const isLineGlowing = (fromNode: string, toNode: string) => {
    const fromState = getNodeState(fromNode);
    const toState = getNodeState(toNode);
    return (fromState === 'active' || fromState === 'visited') && (toState === 'active' || toState === 'visited');
  };

  return (
    <div id="nervous-system-sim" className="bg-white rounded-3xl p-5 md:p-6 border-4 border-indigo-200 bubble-shadow">
      
      {/* Header section with pulsating live activity indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-indigo-50 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600 animate-pulse" />
          <h3 className="font-fun font-bold text-base md:text-lg text-slate-800">
            Simulator Aliran Isyarat Saraf (KBAT)
          </h3>
        </div>
        
        {/* Visual Badge */}
        <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-indigo-200 flex items-center gap-1">
          <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500 animate-bounce" />
          Mod Pembelajaran Teliti
        </span>
      </div>

      <p className="text-xs text-slate-500 font-semibold mb-4 leading-relaxed">
        Sistem saraf menghantar isyarat melalui tindakan terkawal atau refleks. Gunakan kawalan di bawah untuk menyaksikan aliran impuls selangkah demi selangkah secara terperinci.
      </p>

      {/* Grid Layout: Control Panel + Responsive Body Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Activity Selector & Animation Player */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Activity buttons */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
              PILIH AKTIVITI HARIAN:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {activities.map((act) => {
                const isSelected = act.id === selectedActivityId;
                return (
                  <button
                    key={act.id}
                    onClick={() => handleActivityChange(act.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between text-xs md:text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-extrabold shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-indigo-200 text-slate-600 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg bg-white p-1 rounded-lg border border-slate-100 shadow-3xs">{act.emoji}</span>
                      <span>{act.name}</span>
                    </div>
                    <span className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                      act.type === 'Tindakan Refleks' 
                        ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {act.type === 'Tindakan Refleks' ? 'Refleks' : 'Terkawal'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Player controls */}
          <div className="bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200/50 space-y-3.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Alatan Kawalan Aliran
              </span>
              
              {/* Speed Controller to satisfy "slower, more detailed" */}
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
                <span className="text-[9px] text-slate-400 font-bold mr-1">Kelajuan:</span>
                <select
                  value={animationSpeed}
                  onChange={(e) => {
                    setAnimationSpeed(Number(e.target.value));
                    playSynthBeep(600, 0.1);
                  }}
                  className="text-[10px] font-extrabold text-indigo-700 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
                >
                  <option value={2800}>Sangat Perlahan (2.8s)</option>
                  <option value={2000}>Perlahan & Teliti (2.0s) ★</option>
                  <option value={1200}>Sederhana (1.2s)</option>
                  <option value={600}>Pantas (0.6s)</option>
                </select>
              </div>
            </div>

            {/* Main playback buttons */}
            <div className="flex items-center gap-2">
              {/* Back step button */}
              <button
                onClick={handlePrevStep}
                disabled={sequenceStep === 0}
                className={`p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all flex items-center justify-center cursor-pointer ${
                  sequenceStep === 0 ? 'opacity-30 cursor-not-allowed' : ''
                }`}
                title="Langkah Sebelumnya"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Pause/Play toggle */}
              <button
                onClick={handleTogglePlay}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer text-white ${
                  isPlaying 
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white" />
                    <span>Jeda Simulasi</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{sequenceStep >= currentActivity.steps.length - 1 ? 'Mula Semula Auto' : 'Main Auto'}</span>
                  </>
                )}
              </button>

              {/* Next step button */}
              <button
                onClick={handleNextStep}
                disabled={sequenceStep === currentActivity.steps.length - 1}
                className={`p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all flex items-center justify-center cursor-pointer ${
                  sequenceStep === currentActivity.steps.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                }`}
                title="Langkah Seterusnya"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Reset button */}
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all flex items-center justify-center cursor-pointer"
                title="Set Semula"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar indicator */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Aliran Isyarat:</span>
                <span>Langkah {sequenceStep + 1} daripada {currentActivity.steps.length}</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${currentActivity.type === 'Tindakan Refleks' ? 'bg-rose-500' : 'bg-indigo-600'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${((sequenceStep + 1) / currentActivity.steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right column: Enhanced glowing body map representation */}
        <div className="lg:col-span-7 bg-slate-950 border-4 border-slate-800 rounded-2xl p-4 flex flex-col justify-between items-center relative overflow-hidden min-h-[340px] shadow-inner text-white">
          
          {/* Interactive glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e1e38_1.2px,transparent_1.2px)] [background-size:14px_14px] opacity-40 pointer-events-none" />

          {/* Type of action indicator */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
            <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase border ${
              currentActivity.type === 'Tindakan Refleks'
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-400'
                : 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300'
            }`}>
              {currentActivity.type}
            </span>
          </div>

          {/* Saraf Tunjang Bypass Alert banner for reflexes */}
          {currentActivity.type === 'Tindakan Refleks' && (getNodeState('tunjang') === 'active') && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute top-3 right-3 bg-rose-600 text-white text-[9px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1.5 shadow-md z-20 animate-pulse border border-rose-400"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Pintasan Refleks! Pintas Otak ⚡</span>
            </motion.div>
          )}

          {/* Centered stylized human nervous system SVG */}
          <svg className="w-48 h-68 relative z-10" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
            
            {/* Human body placeholder outline - styled dark futuristic style */}
            <path
              d="M60,15 C72,15 75,32 72,36 C70,38 78,44 85,50 C92,56 94,65 92,72 C90,75 84,72 84,75 C84,80 82,100 80,115 C78,125 82,145 84,165 C85,172 80,175 75,175 C70,175 68,160 66,145 C64,130 62,130 60,130 C58,130 56,130 54,145 C52,160 50,175 45,175 C40,175 35,172 36,165 C38,145 42,125 40,115 C38,100 36,80 36,75 C36,72 30,75 28,72 C26,65 28,56 35,50 C42,44 50,38 48,36 C45,32 48,15 60,15 Z"
              fill="#0F172A"
              stroke="#1E293B"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Neural pathways lines (glowing lines with animation) */}
            
            {/* 1. Eye connection */}
            <motion.line
              x1="60" y1="28" x2="68" y2="28"
              stroke={isLineGlowing('mata', 'otak') ? '#818CF8' : '#1E293B'}
              strokeWidth="2.5"
              strokeDasharray={isLineGlowing('mata', 'otak') ? '3, 2' : 'none'}
              className="transition-all duration-300"
            />

            {/* 2. Arm Left (Tangan) path */}
            <motion.path
              d="M60,38 Q45,45 32,68"
              fill="none"
              stroke={isLineGlowing('periferi-tangan', 'tunjang') ? '#EC4899' : '#1E293B'}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-300"
            />

            {/* 3. Leg Right (Kaki) path */}
            <motion.path
              d="M60,100 Q68,120 78,160"
              fill="none"
              stroke={isLineGlowing('periferi-kaki', 'tunjang') ? '#10B981' : '#1E293B'}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-300"
            />

            {/* 4. Spinal Cord (Saraf Tunjang) vertical trunk */}
            <motion.line
              x1="60" y1="36" x2="60" y2="105"
              stroke={isLineGlowing('tunjang', 'otak') || isLineGlowing('tunjang', 'tunjang') ? '#4F46E5' : '#1E293B'}
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-all duration-300"
            />

            {/* --- GLOWING & PULSING NODES --- */}
            
            {/* EYE (Mata) */}
            <g>
              {getNodeState('mata') === 'active' && (
                <motion.circle
                  cx="68" cy="28" r="9"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
              <motion.circle
                cx="68" cy="28" r="4.5"
                fill={
                  getNodeState('mata') === 'active' ? '#6366F1' : 
                  getNodeState('mata') === 'visited' ? '#818CF8' : '#334155'
                }
                className="transition-colors duration-300"
              />
            </g>

            {/* BRAIN (Otak) */}
            <g>
              {getNodeState('otak') === 'active' && (
                <motion.ellipse
                  cx="60" cy="24" rx="14" ry="11"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                />
              )}
              <motion.ellipse
                cx="60" cy="24" rx="8" ry="6"
                fill={
                  getNodeState('otak') === 'active' ? '#F59E0B' : 
                  getNodeState('otak') === 'visited' ? '#818CF8' : '#334155'
                }
                className="transition-colors duration-300"
                style={{ filter: getNodeState('otak') === 'active' ? 'drop-shadow(0 0 6px #F59E0B)' : 'none' }}
              />
              <circle cx="60" cy="24" r="1.5" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* SPINAL CORD junctions (Saraf Tunjang) */}
            <g>
              {getNodeState('tunjang') === 'active' && (
                <motion.circle
                  cx="60" cy="78" r="11"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
              <motion.circle
                cx="60" cy="52" r="3"
                fill={
                  getNodeState('tunjang') === 'active' ? '#4F46E5' : 
                  getNodeState('tunjang') === 'visited' ? '#6366F1' : '#334155'
                }
                className="transition-colors duration-300"
              />
              <motion.circle
                cx="60" cy="78" r="3.5"
                fill={
                  getNodeState('tunjang') === 'active' ? '#4F46E5' : 
                  getNodeState('tunjang') === 'visited' ? '#6366F1' : '#334155'
                }
                className="transition-colors duration-300"
              />
              <motion.circle
                cx="60" cy="100" r="3"
                fill={
                  getNodeState('tunjang') === 'active' ? '#4F46E5' : 
                  getNodeState('tunjang') === 'visited' ? '#6366F1' : '#334155'
                }
                className="transition-colors duration-300"
              />
            </g>

            {/* HAND NERVES (Saraf periferi tangan) */}
            <g>
              {getNodeState('periferi-tangan') === 'active' && (
                <motion.circle
                  cx="32" cy="68" r="10"
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.3 }}
                />
              )}
              <motion.circle
                cx="32" cy="68" r="5"
                fill={
                  getNodeState('periferi-tangan') === 'active' ? '#EC4899' : 
                  getNodeState('periferi-tangan') === 'visited' ? '#F472B6' : '#334155'
                }
                className="transition-colors duration-300"
                style={{ filter: getNodeState('periferi-tangan') === 'active' ? 'drop-shadow(0 0 5px #EC4899)' : 'none' }}
              />
            </g>

            {/* LEG NERVES (Saraf periferi kaki) */}
            <g>
              {getNodeState('periferi-kaki') === 'active' && (
                <motion.circle
                  cx="78" cy="160" r="10"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.3 }}
                />
              )}
              <motion.circle
                cx="78" cy="160" r="5"
                fill={
                  getNodeState('periferi-kaki') === 'active' ? '#10B981' : 
                  getNodeState('periferi-kaki') === 'visited' ? '#34D399' : '#334155'
                }
                className="transition-colors duration-300"
                style={{ filter: getNodeState('periferi-kaki') === 'active' ? 'drop-shadow(0 0 5px #10B981)' : 'none' }}
              />
            </g>

          </svg>

          {/* Simple legend overlays on SVG area */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-1 bg-slate-900/90 border border-slate-800 p-2 rounded-lg text-[9px] font-bold z-20">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 block animate-ping" />
              <span className="text-amber-400">Impuls Saraf Semasa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 block" />
              <span className="text-slate-300">Laluan Dilalui</span>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-slate-400 font-extrabold bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500" />
            <span>Paparan Hologram Sistem Saraf</span>
          </div>

        </div>

      </div>

      {/* Description & Step Flow of selected activity - THE "EXPLANATION STATION" */}
      <div className="mt-5 bg-gradient-to-r from-indigo-50/50 to-pink-50/20 border border-indigo-100 rounded-2xl p-4 shadow-3xs">
        
        {/* Step title */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-2 border-b border-indigo-100/50 pb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>STESEN PENERANGAN IMPULS (TELITI)</span>
          </span>
          <span className="bg-indigo-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
            STESEN {sequenceStep + 1} DARIPADA {currentActivity.steps.length}
          </span>
        </div>

        {/* Big step detail display - to let users study carefully */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedActivityId}-${sequenceStep}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-4"
          >
            <h4 className="text-sm font-black text-indigo-950 mb-1 flex items-center gap-1.5">
              <span className="bg-amber-400 text-slate-900 text-xs w-5 h-5 rounded-full inline-flex items-center justify-center font-black shadow-3xs">{sequenceStep + 1}</span>
              <span>{currentStepInfo?.label}</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-indigo-100/30">
              {currentStepInfo?.detail}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Horizontal flow pills representing the complete pathway */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
          {currentActivity.steps.map((step, idx) => {
            const isCurrent = idx === sequenceStep;
            const isVisited = idx < sequenceStep;
            return (
              <React.Fragment key={idx}>
                <button
                  onClick={() => {
                    setSequenceStep(idx);
                    setIsPlaying(false);
                    playSynthBeep(440 + (idx * 80), 0.1);
                  }}
                  className={`text-[9px] md:text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-600 border-indigo-600 text-white scale-105 shadow-md'
                      : isVisited
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                      : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {step.label.split(' (')[0]} {/* Shortened name */}
                </button>
                {idx < currentActivity.steps.length - 1 && (
                  <span className={`text-xs font-bold ${idx < sequenceStep ? 'text-indigo-400' : 'text-slate-300'}`}>➔</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>

    </div>
  );
};
