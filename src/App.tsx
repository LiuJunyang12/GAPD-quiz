import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Award, Volume2, Sparkles, ArrowRight, RefreshCw, GraduationCap, Zap, BookOpen } from 'lucide-react';
import { Question, PeerReview } from './types';
import { questionsData, initialPeerReviews } from './data';
import { NeoMascot } from './components/NeoMascot';
import { QuestionVisualizer } from './components/QuestionVisualizer';
import { PedagogyModal } from './components/PedagogyModal';
import { ConfettiEffect } from './components/ConfettiEffect';
import { NervousSystemInteractive } from './components/NervousSystemInteractive';

export default function App() {
  // Screens: 'start' | 'game' | 'result'
  const [screen, setScreen] = useState<'start' | 'game' | 'result'>('start');
  const [activeTab, setActiveTab] = useState<'kuiz' | 'simulasi'>('kuiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  
  // Quiz State
  const [answered, setAnswered] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // Mascot state
  const [mascotExpression, setMascotExpression] = useState<'normal' | 'correct' | 'wrong' | 'complete'>('normal');
  const [mascotDialogue, setMascotDialogue] = useState<string>('Hi! Saya Neo si Neuron. Mari bantu saya selesaikan kembara sains ini!');

  // Pedagogy modal state
  const [isPedagogyModalOpen, setIsPedagogyModalOpen] = useState(false);
  
  // Confetti celebration state
  const [confettiActive, setConfettiActive] = useState(false);

  // Peer reviews state (persisted in local storage)
  const [reviews, setReviews] = useState<PeerReview[]>([]);

  // Sound Synth Engine
  const playTone = (freq: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Browser blocked autoplay audio
    }
  };

  const playIntroSound = () => {
    playTone(523.25, 0.15); // C5
    setTimeout(() => playTone(659.25, 0.15), 150); // E5
    setTimeout(() => playTone(783.99, 0.3), 300); // G5
  };

  const playCorrectSound = () => {
    playTone(587.33, 0.1); // D5
    setTimeout(() => playTone(880, 0.25), 100); // A5
  };

  const playWrongSound = () => {
    playTone(293.66, 0.2, 'triangle'); // D4
    setTimeout(() => playTone(220, 0.3, 'triangle'), 150); // A3
  };

  const playVictorySound = () => {
    playTone(523.25, 0.15); // C5
    setTimeout(() => playTone(659.25, 0.15), 150); // E5
    setTimeout(() => playTone(783.99, 0.15), 300); // G5
    setTimeout(() => playTone(1046.5, 0.5), 450); // C6 (high pitch!)
  };

  // Load reviews on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem('kembara_saraf_reviews');
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (e) {
        setReviews(initialPeerReviews);
      }
    } else {
      setReviews(initialPeerReviews);
      localStorage.setItem('kembara_saraf_reviews', JSON.stringify(initialPeerReviews));
    }
  }, []);

  // Add peer review handler
  const handleAddReview = (newReviewData: Omit<PeerReview, 'id' | 'timestamp'>) => {
    const timestamp = new Date().toLocaleString('ms-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newReview: PeerReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      timestamp
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('kembara_saraf_reviews', JSON.stringify(updatedReviews));
  };

  // Game action controls
  const handleStartGame = () => {
    setScreen('game');
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(3);
    setAnswered(false);
    setSelectedOptionIndex(null);
    setMascotExpression('normal');
    setMascotDialogue('Cabaran bermula! Baca soalan dengan teliti ya, wira sains.');
    playIntroSound();
  };

  const handleSelectOption = (optionIndex: number, isCorrect: boolean) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOptionIndex(optionIndex);

    const currentQuestion = questionsData[currentQuestionIndex];

    if (isCorrect) {
      playCorrectSound();
      setScore((prev) => prev + 100);
      setMascotExpression('correct');
      setMascotDialogue('Hebat sekali! Laluan isyarat saraf anda tersambung sempurna! ⚡');
    } else {
      playWrongSound();
      setLives((prev) => Math.max(0, prev - 1));
      setMascotExpression('wrong');
      setMascotDialogue('Alamak! Isyarat terputus. Jangan putus asa, mari belajar dari maklum balas di bawah!');
    }
  };

  const handleNextQuestion = () => {
    // If we have 0 lives, go to results directly
    if (lives <= 0) {
      handleEndGame();
      return;
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questionsData.length) {
      setCurrentQuestionIndex(nextIndex);
      setAnswered(false);
      setSelectedOptionIndex(null);
      setMascotExpression('normal');
      setMascotDialogue(`Kita ke cabaran ${nextIndex + 1}! Mari teruskan kembara.`);
      playTone(600, 0.1);
    } else {
      handleEndGame();
    }
  };

  const handleEndGame = () => {
    setScreen('result');
    const finalScore = score + (lives * 30); // Bonus score for lives saved!
    
    if (lives > 0 && score >= 500) {
      setMascotExpression('complete');
      setMascotDialogue('Luar biasa! Anda ditauliahkan sebagai Hero Saraf Agung! 👑');
      setConfettiActive(true);
      playVictorySound();
    } else if (lives > 0) {
      setMascotExpression('normal');
      setMascotDialogue('Tahniah! Anda lulus kembara sains sistem saraf ini dengan baik!');
      playIntroSound();
    } else {
      setMascotExpression('wrong');
      setMascotDialogue('Misi tamat. Tapi tidak apa, otak kita boleh belajar dan berkembang semula! Cuba lagi ya.');
    }
  };

  useEffect(() => {
    if (screen === 'start') {
      if (activeTab === 'simulasi') {
        setMascotExpression('normal');
        setMascotDialogue('Mari uji aliran isyarat saraf! Pilih mana-mana aktiviti harian di sebelah untuk memulakan simulasi.');
      } else {
        setMascotExpression('normal');
        setMascotDialogue('Hi! Saya Neo si Neuron. Mari bantu saya selesaikan kembara sains ini!');
      }
    }
  }, [activeTab, screen]);

  const currentQuestion: Question = questionsData[currentQuestionIndex];

  return (
    <div className="bg-indigo-50/50 min-h-screen flex flex-col justify-between selection:bg-indigo-200">
      
      {/* Sparkly Confetti Overlay */}
      <ConfettiEffect active={confettiActive} />

      {/* TOP HEADER BAR */}
      <header className="bg-white border-b-4 border-indigo-100 p-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Cute Brain SVG icon */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center border-2 border-pink-300 shadow-xs"
            >
              <span className="text-xl">🧠</span>
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-indigo-600 tracking-wide font-fun">Kembara Saraf Cilik!</h1>
              <p className="text-xs text-slate-500 font-bold">Cabaran Isyarat Sistem Saraf Manusia (KSSR Tahun 6)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPedagogyModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full text-xs md:text-sm shadow-md transition-all active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Showcase & KPPB Info</span>
            </button>
            <button
              onClick={playIntroSound}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-2 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border border-indigo-100"
              title="Mainkan Bunyi"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden md:inline">Bunyi</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto p-4 md:p-6 w-full flex-grow flex flex-col justify-center">
        
        {/* Responsive Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT PANEL: Mascot (Neo si Neuron) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <NeoMascot
              expression={mascotExpression}
              dialogue={mascotDialogue}
            />
          </div>

          {/* RIGHT PANEL: Interactive Game Board */}
          <div className="lg:col-span-8 w-full">
            
            {/* Mode Switcher Tabs (Only visible when not actively playing a game) */}
            {screen === 'start' && (
              <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-4 border border-indigo-100 max-w-xs mx-auto shadow-xs">
                <button
                  onClick={() => {
                    setActiveTab('kuiz');
                    playTone(550, 0.08);
                  }}
                  className={`flex-1 py-2 px-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'kuiz'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-indigo-600'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Cabaran Kuiz</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('simulasi');
                    playTone(650, 0.08);
                  }}
                  className={`flex-1 py-2 px-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'simulasi'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-indigo-600'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Simulator Impuls</span>
                </button>
              </div>
            )}

            {/* SCREEN 1: START SCREEN */}
            {screen === 'start' && (
              activeTab === 'kuiz' ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 md:p-10 border-4 border-indigo-200 bubble-shadow text-center relative overflow-hidden"
                >
                  {/* Visual decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full opacity-60 pointer-events-none" />
                  
                  <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-900 inline-block rotate-3 mb-4 shadow-sm">
                    🎯 KBAT / KSSR Sains Tahun 6
                  </span>

                  <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3 leading-tight font-fun">
                    Adakah Anda Pakar Sistem Saraf?
                  </h2>
                  <p className="text-slate-500 font-semibold mb-8 text-sm md:text-base max-w-lg mx-auto">
                    Mari bantu <span className="text-pink-500 font-bold">Neo si Neuron</span> menyelesaikan misi kembara isyarat badan melalui 6 cabaran KBAT yang menyeronokkan!
                  </p>

                  <div className="space-y-4 max-w-sm mx-auto">
                    <button
                      onClick={handleStartGame}
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-lg md:text-xl py-4 px-6 rounded-2xl border-b-4 border-yellow-600 transition-all active:translate-y-1 active:border-b-0 flex items-center justify-center gap-2 cursor-pointer btn-yellow-pop"
                    >
                      🚀 MULA KEMBARA
                    </button>
                    
                    <div className="flex justify-between text-[11px] text-indigo-600 font-extrabold tracking-wider pt-2 uppercase">
                      <span>⚡ Refleks & Impuls</span>
                      <span>⭐ 6 Cabaran Kbat</span>
                      <span>📈 Penilaian Formatif</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <NervousSystemInteractive />
                </motion.div>
              )
            )}

            {/* SCREEN 2: GAMEPLAY (QUESTIONS) */}
            {screen === 'game' && currentQuestion && (
              <div className="space-y-4">
                
                {/* Stats Bar */}
                <div className="bg-white rounded-2xl p-4 border-2 border-indigo-100 flex flex-col md:flex-row justify-between items-center gap-3 shadow-xs">
                  
                  {/* Progress Indicator */}
                  <div className="w-full md:w-1/2">
                    <div className="flex justify-between text-xs font-extrabold text-indigo-600 mb-1.5 uppercase">
                      <span>Proses Kembara Saraf</span>
                      <span>Cabaran {currentQuestionIndex + 1} daripada {questionsData.length}</span>
                    </div>
                    <div className="w-full bg-indigo-50 rounded-full h-3 overflow-hidden border border-indigo-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / questionsData.length) * 100}%` }}
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Lives & Score */}
                  <div className="flex gap-4 text-xs md:text-sm font-extrabold w-full md:w-auto justify-end">
                    <div className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl flex items-center gap-1 border border-rose-200">
                      <Heart className={`w-4 h-4 fill-rose-500 text-rose-500 ${lives === 1 ? 'animate-bounce' : ''}`} />
                      <span>Nyawa:</span>
                      <span className="text-sm font-black tracking-wide">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i}>{i < lives ? '❤️' : '💔'}</span>
                        ))}
                      </span>
                    </div>
                    <div className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl flex items-center gap-1 border border-amber-200">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span>Skor:</span>
                      <span className="text-sm font-black text-amber-600">{score}</span>
                    </div>
                  </div>
                </div>

                {/* Question & Options Card */}
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-3xl p-5 md:p-8 border-4 border-indigo-200 bubble-shadow relative"
                >
                  <div className="absolute -top-3.5 left-6 bg-indigo-500 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest border border-indigo-600 shadow-sm">
                    Aras Minda: KBAT / HOTS
                  </div>

                  {/* Question Prompt */}
                  <div className="mb-5 mt-2">
                    <h3 className="text-base md:text-lg font-bold text-slate-800 leading-relaxed">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  {/* Interactive Diagram/Visualizer */}
                  <div className="mb-5">
                    <QuestionVisualizer type={currentQuestion.graphicType} />
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = selectedOptionIndex === idx;
                      const isCorrectAnswer = opt.correct;
                      
                      let btnClass = "w-full text-left bg-slate-50 hover:bg-indigo-50/50 active:bg-indigo-100/60 border-2 border-slate-200 p-3.5 rounded-2xl font-bold transition-all flex items-start gap-2.5 text-xs md:text-sm cursor-pointer shadow-xs";
                      let indicatorClass = "bg-slate-200 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5";

                      if (answered) {
                        if (isCorrectAnswer) {
                          // Green highlight for correct answers
                          btnClass = "w-full text-left bg-emerald-50 border-2 border-emerald-400 p-3.5 rounded-2xl font-bold transition-all flex items-start gap-2.5 text-xs md:text-sm text-emerald-800 shadow-xs";
                          indicatorClass = "bg-emerald-200 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5";
                        } else if (isSelected) {
                          // Red highlight for incorrect selected answer
                          btnClass = "w-full text-left bg-rose-50 border-2 border-rose-400 p-3.5 rounded-2xl font-bold transition-all flex items-start gap-2.5 text-xs md:text-sm text-rose-800 shadow-xs";
                          indicatorClass = "bg-rose-200 text-rose-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5";
                        } else {
                          // Muted opacity for others
                          btnClass = "w-full text-left bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl font-bold transition-all flex items-start gap-2.5 text-xs md:text-sm text-slate-400 cursor-not-allowed shadow-none opacity-50";
                          indicatorClass = "bg-slate-100 text-slate-400 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={answered}
                          onClick={() => handleSelectOption(idx, isCorrectAnswer)}
                          className={btnClass}
                        >
                          <span className={indicatorClass}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-tight pt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Panel (AfL) */}
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl p-4 border-2 transition-all duration-300 mb-5 ${
                        selectedOptionIndex !== null && currentQuestion.options[selectedOptionIndex].correct
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-rose-50 border-rose-300 text-rose-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">
                          {selectedOptionIndex !== null && currentQuestion.options[selectedOptionIndex].correct ? '🏆' : '💡'}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm md:text-base">
                            {selectedOptionIndex !== null && currentQuestion.options[selectedOptionIndex].correct
                              ? 'Tahniah! Jawapan Anda Tepat!'
                              : 'Alamak, Kurang Tepat! Info Tambahan:'}
                          </h4>
                          <p className="text-xs md:text-sm mt-1 leading-relaxed opacity-95">
                            {selectedOptionIndex !== null && currentQuestion.options[selectedOptionIndex].correct
                              ? currentQuestion.feedback.correct
                              : currentQuestion.feedback.wrong}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action/Next Button */}
                  {answered && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-1.5 cursor-pointer btn-green-pop text-sm"
                      >
                        <span>
                          {lives <= 0 || currentQuestionIndex === questionsData.length - 1
                            ? 'Lihat Keputusan Misi'
                            : 'Teruskan Kembara'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </motion.div>
              </div>
            )}

            {/* SCREEN 3: RESULTS SCREEN */}
            {screen === 'result' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-6 md:p-8 border-4 border-indigo-200 bubble-shadow text-center max-w-xl mx-auto"
              >
                {/* Score badge */}
                <div className="mb-6">
                  {score >= 500 ? (
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-amber-100 border-4 border-amber-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <span className="text-5xl">👑</span>
                      </div>
                      <p className="text-xs font-extrabold text-amber-600 mt-2.5">Lencana: Wira Saraf Agung</p>
                    </div>
                  ) : score >= 300 ? (
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-blue-100 border-4 border-blue-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <span className="text-5xl">🎓</span>
                      </div>
                      <p className="text-xs font-extrabold text-blue-600 mt-2.5">Lencana: Perantis Saraf Pintar</p>
                    </div>
                  ) : (
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-slate-100 border-4 border-slate-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <span className="text-5xl">🌱</span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-500 mt-2.5">Lencana: Sel Saraf Pemula</p>
                    </div>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 font-fun">
                  Misi Selesai! 🎉
                </h2>
                <p className="text-slate-500 text-xs md:text-sm font-semibold mb-6">
                  Syabas! Anda telah tamat mengembara di dalam rangkaian sistem saraf badan manusia.
                </p>

                <div className="bg-indigo-50 rounded-2xl p-5 mb-6 border-2 border-indigo-100">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Keputusan</span>
                      <span className="text-lg md:text-xl font-black text-indigo-600 mt-1 block">
                        {questionsData.length - (3 - Math.max(0, lives))}/{questionsData.length}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Skor Markah</span>
                      <span className="text-lg md:text-xl font-black text-amber-500 mt-1 block">
                        {score}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Pangkat</span>
                      <span className="text-xs md:text-sm font-black text-emerald-600 mt-1.5 block leading-tight">
                        {score >= 500 ? 'Hero Saraf' : score >= 300 ? 'Saraf Perantis' : 'Ulang Kaji'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleStartGame}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all active:translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Cuba Lagi</span>
                  </button>
                  <button
                    onClick={() => {
                      setScreen('start');
                      setActiveTab('simulasi');
                      setConfettiActive(false);
                      playTone(650, 0.1);
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all active:translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer text-sm animate-bounce"
                  >
                    <Zap className="w-4 h-4 fill-white text-white" />
                    <span>Cuba Simulator</span>
                  </button>
                  <button
                    onClick={() => setIsPedagogyModalOpen(true)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all active:translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer text-sm"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Lihat Justifikasi</span>
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </main>

      {/* PEDAGOGICAL DOCUMENTATION MODAL */}
      <PedagogyModal
        isOpen={isPedagogyModalOpen}
        onClose={() => setIsPedagogyModalOpen(false)}
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      {/* FOOTER */}
      <footer className="bg-white p-4 border-t-4 border-indigo-100 text-center text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Kembara Saraf Cilik © 2026</span>
          <span className="text-indigo-500 font-black">Pentaksiran Formatif Interaktif (KSSR Sains Tahun 6)</span>
        </div>
      </footer>

    </div>
  );
}
