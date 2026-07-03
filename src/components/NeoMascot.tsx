import React from 'react';
import { motion } from 'motion/react';

interface NeoMascotProps {
  expression: 'normal' | 'correct' | 'wrong' | 'complete';
  dialogue?: string;
}

export const NeoMascot: React.FC<NeoMascotProps> = ({ expression, dialogue }) => {
  // Define color themes based on expressions
  const getBrainColor = () => {
    switch (expression) {
      case 'correct':
        return '#4ADE80'; // vibrant green
      case 'wrong':
        return '#FB7185'; // soft pinkish red
      case 'complete':
        return '#FBBF24'; // beautiful gold
      default:
        return '#FF8DA1'; // cute pink
    }
  };

  const getStrokeColor = () => {
    switch (expression) {
      case 'correct':
        return '#15803D';
      case 'wrong':
        return '#BE123C';
      case 'complete':
        return '#B45309';
      default:
        return '#E11D48';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-28 h-28 md:w-32 md:h-32">
        {/* Decorative background glow based on expression */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 rounded-full blur-xl filter ${
            expression === 'correct'
              ? 'bg-emerald-300'
              : expression === 'wrong'
              ? 'bg-rose-300'
              : expression === 'complete'
              ? 'bg-yellow-300'
              : 'bg-indigo-200'
          }`}
        />

        {/* Crown for complete state */}
        {expression === 'complete' && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 text-4xl"
          >
            👑
          </motion.div>
        )}

        {/* Main Mascot SVG */}
        <motion.svg
          key={expression}
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="w-full h-full relative z-10"
          viewBox="0 0 100 100"
        >
          {/* Sparkles around mascot */}
          {expression === 'correct' && (
            <>
              <motion.path
                animate={{ scale: [0.5, 1, 0.5], opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                d="M10,25 L15,20 M10,20 L15,25"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <motion.path
                animate={{ scale: [0.5, 1, 0.5], opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                d="M85,20 L90,25 M85,25 L90,20"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          )}

          {/* Brain Body Shape */}
          <path
            d="M30,50 C20,50 20,30 35,30 C35,20 50,15 60,25 C75,20 80,35 75,45 C85,50 80,70 65,70 C55,80 35,75 30,65 C15,65 20,50 30,50 Z"
            fill={getBrainColor()}
            stroke={getStrokeColor()}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Facial features based on state */}
          {expression === 'correct' && (
            <>
              {/* Starry eyes */}
              <path d="M40,43 L43,46 L46,43 L43,40 Z" fill="#065F46" />
              <path d="M54,43 L57,46 L60,43 L57,40 Z" fill="#065F46" />
              {/* Cute wide smile */}
              <path
                d="M45,51 Q50,58 55,51"
                stroke="#065F46"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Rosy blush */}
              <ellipse cx="36" cy="48" rx="4" ry="2" fill="#86EFAC" />
              <ellipse cx="64" cy="48" rx="4" ry="2" fill="#86EFAC" />
            </>
          )}

          {expression === 'wrong' && (
            <>
              {/* Dizzy/worried spiral eyes */}
              <path
                d="M38,44 Q43,44 43,41 T38,41 T41,44"
                stroke="#9F1239"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M57,44 Q62,44 62,41 T57,41 T60,44"
                stroke="#9F1239"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Disappointed/wobbly mouth */}
              <path
                d="M44,53 Q50,48 56,53"
                stroke="#9F1239"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Sweat drop */}
              <motion.path
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                d="M26,38 C26,38 23,41 23,43 C23,45 24.5,46 26,46 C27.5,46 29,45 29,43 C29,41 26,38 26,38 Z"
                fill="#38BDF8"
              />
            </>
          )}

          {expression === 'complete' && (
            <>
              {/* Sparkle happy eyes */}
              <path d="M38,46 Q43,40 43,46" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M57,46 Q62,40 62,46" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Ecstatic open mouth with tongue */}
              <path d="M44,52 Q50,60 56,52 Z" fill="#78350F" />
              <path d="M47,55 Q50,59 53,55" fill="#F43F5E" />
              {/* Star gold blush */}
              <ellipse cx="34" cy="51" rx="4" ry="2" fill="#FDE047" />
              <ellipse cx="66" cy="51" rx="4" ry="2" fill="#FDE047" />
            </>
          )}

          {expression === 'normal' && (
            <>
              {/* Cute round shiny eyes */}
              <circle cx="41" cy="44" r="4.5" fill="#1E293B" />
              <circle cx="59" cy="44" r="4.5" fill="#1E293B" />
              <circle cx="43" cy="42" r="1.5" fill="#FFFFFF" />
              <circle cx="61" cy="42" r="1.5" fill="#FFFFFF" />
              {/* Happy smile */}
              <path
                d="M46,51 Q50,55 54,51"
                stroke="#1E293B"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Blush */}
              <ellipse cx="36" cy="48" rx="3.5" ry="1.8" fill="#FDA4AF" />
              <ellipse cx="64" cy="48" rx="3.5" ry="1.8" fill="#FDA4AF" />
            </>
          )}
        </motion.svg>
      </div>

      {dialogue && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-white border-2 border-indigo-200 rounded-2xl px-4 py-2.5 shadow-sm text-center relative max-w-xs"
        >
          {/* speech bubble pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-indigo-200 rotate-45" />
          <p className="text-sm font-bold text-slate-700 relative z-10 leading-snug">
            {dialogue}
          </p>
        </motion.div>
      )}
    </div>
  );
};
