import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PeerReview } from '../types';
import { Award, BookOpen, Star, Sparkles, MessageCircle, Heart, CheckCircle2, User, Landmark } from 'lucide-react';

interface PedagogyModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: PeerReview[];
  onAddReview: (review: Omit<PeerReview, 'id' | 'timestamp'>) => void;
}

export const PedagogyModal: React.FC<PedagogyModalProps> = ({ isOpen, onClose, reviews, onAddReview }) => {
  const [activeTab, setActiveTab] = useState<'justifikasi' | 'kppb' | 'penilaian'>('justifikasi');
  
  // Form State for Peer Review
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('Rakan Kuliah');
  const [ratingEngagement, setRatingEngagement] = useState<number>(5);
  const [ratingEnhancement, setRatingEnhancement] = useState<number>(5);
  const [ratingExtension, setRatingExtension] = useState<number>(5);
  const [comments, setComments] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comments.trim()) return;

    onAddReview({
      reviewerName,
      reviewerRole,
      ratingEngagement,
      ratingEnhancement,
      ratingExtension,
      comments
    });

    // Reset Form
    setReviewerName('');
    setComments('');
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 4000);
  };

  const renderStars = (rating: number, interactive = false, onSelect?: (r: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onSelect && onSelect(star)}
            className={`${interactive ? 'hover:scale-125 transition-transform cursor-pointer' : ''}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col border-4 border-indigo-200 shadow-2xl overflow-hidden"
        >
          {/* Modal Header */}
          <div className="bg-indigo-50 p-5 md:p-6 border-b-2 border-indigo-100 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💡</span>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-indigo-800 font-fun">Dokumentasi Pentaksiran Formatif (PLE)</h2>
                <p className="text-xs text-slate-500 font-semibold">Kerangka KPPB, 3E & Justifikasi Pedagogi Sains</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-2xl font-bold p-1 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-indigo-100 bg-slate-50 shrink-0">
            <button
              onClick={() => setActiveTab('justifikasi')}
              className={`flex-1 py-3 px-2 text-xs md:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'justifikasi'
                  ? 'border-indigo-600 text-indigo-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Pedagogi & AfL</span>
            </button>
            <button
              onClick={() => setActiveTab('kppb')}
              className={`flex-1 py-3 px-2 text-xs md:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'kppb'
                  ? 'border-indigo-600 text-indigo-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Reka Bentuk KPPB</span>
            </button>
            <button
              onClick={() => setActiveTab('penilaian')}
              className={`flex-1 py-3 px-2 text-xs md:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 relative cursor-pointer ${
                activeTab === 'penilaian'
                  ? 'border-indigo-600 text-indigo-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>Penilaian 3E Rakan</span>
              <span className="absolute top-1 right-2 bg-pink-500 text-[9px] text-white px-1.5 py-0.5 rounded-full font-bold">
                {reviews.length}
              </span>
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 md:p-6 overflow-y-auto flex-grow space-y-6 text-slate-700">
            
            {/* TAB 1: JUSTIFIKASI PEDAGOGI */}
            {activeTab === 'justifikasi' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 rounded-xl text-indigo-700">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-900 font-fun text-sm md:text-base">Misi Pendidikan Bermakna</h3>
                    <p className="text-xs md:text-sm text-indigo-700 mt-1 leading-relaxed">
                      Aplikasi <strong>Kembara Saraf Cilik</strong> dirancang sebagai bahan pembelajaran digital interaktif sains sekolah rendah (KSSR Tahun 6). Ia mensasarkan kefahaman konseptual yang mendalam tentang anatomi & fisiologi sistem saraf, sekali gus membasmi salah faham lazim (alternative conceptions).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-xs md:text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5 text-indigo-600">
                      🎯 Pentaksiran Formatif Digital (AfL)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Bukan sekadar kuiz, program ini menyediakan <strong>Maklum Balas Terperinci Serta-Merta</strong> bagi setiap pilihan jawapan betul atau salah. Ini membolehkan murid memahami "mengapa" sains itu begitu, mengukuhkan konsep biologi secara langsung semasa bermain.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-xs md:text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5 text-indigo-600">
                      🔥 Soalan Aras Tinggi (KBAT)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Soalan dibina berasaskan <strong>senario dunia sebenar</strong> (tindakan refleks kecemasan, kesan alkohol ke atas masa tindak balas, kemalangan saraf tunjang, kerosakan strok kawalan silang). Ini mencabar keupayaan berfikir kritis dan memindahkan maklumat sains ke situasi praktikal.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-bold text-slate-800 text-sm mb-2">Mengapa Pembelajaran Format Pintar (Formative Assessment Loop)?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kajian menunjukkan murid sekolah rendah lebih mudah mengingati konsep abstrak (seperti impuls elektrik saraf) apabila dibantu dengan analogi visual dan tindak balas langsung. Apabila tersalah pilih, sistem membentangkan penjelasan mesra murid ("Saraf tunjang bertindak sebagai pintasan keselamatan..."), membetulkan miskonsepsi serta-merta tanpa menghukum keyakinan diri murid.
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 2: REKA BENTUK KPPB */}
            {activeTab === 'kppb' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100 flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 font-fun text-sm md:text-base">Dimensi Kapasiti Pedagogi Pembelajaran Bermakna (KPPB)</h3>
                    <p className="text-xs md:text-sm text-emerald-700 mt-1 leading-relaxed">
                      Sistem ini memupuk kemahiran alaf baharu dan kompetensi pembelajaran mendalam melalui tiga komponen teras KPPB:
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex gap-3">
                    <span className="text-2xl mt-0.5">🚀</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Pembelajaran Terarah Kendiri (Self-Directed Learning)</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Murid memegang autonomi penuh dalam kembara pembelajaran ini. Mereka mengurus kelajuan kemajuan soalan, berpeluang meneliti maklum balas pembetulan secara mandiri, dan mencuba semula untuk memperbaiki skor tanpa tekanan masa atau hukuman akademik tradisional.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex gap-3">
                    <span className="text-2xl mt-0.5">🤝</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Rakan Pembelajaran (Learning Partnership)</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Aplikasi ini direka untuk merangsang kerjasama interaktif dalam bilik darjah. Murid boleh berkongsi peranti, membandingkan keputusan, membincangkan justifikasi grafik bersama rakan sebaya, atau bertindak sebagai penguji kritikal (peer reviewer) menggunakan instrumen 3E terbina.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex gap-3">
                    <span className="text-2xl mt-0.5">🧠</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Metakognisi & Refleksi</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Dengan memaparkan lencana pencapaian (Wira Saraf Agung, Perantis, dll) di hujung sesi, murid digalakkan menilai keupayaan kognitif diri mereka sendiri, memikirkan konsep yang masih lemah, dan merancang tindakan susulan secara reflektif.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PENILAIAN RAKAN (3E FRAMEWORK & FORM) */}
            {activeTab === 'penilaian' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                  <h3 className="font-bold text-amber-900 font-fun text-sm flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    <span>Penilaian Rakan Kuliah (Framework 3E Liz Kolb)</span>
                  </h3>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    Sila berikan maklum balas penilaian anda mengenai sejauh mana aplikasi ini memenuhi elemen <strong>Engagement (Keterlibatan)</strong>, <strong>Enhancement (Penambahbaikan)</strong>, dan <strong>Extension (Perluasan)</strong> pembelajaran sains.
                  </p>
                </div>

                {/* Submit Form */}
                <form onSubmit={handleSubmitReview} className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="font-bold text-slate-800 text-xs md:text-sm uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>Tulis Penilaian Baharu</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Nama Penilai</label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="Contoh: Cikgu Hazim"
                        className="w-full text-xs md:text-sm p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Peranan/Kategori</label>
                      <select
                        value={reviewerRole}
                        onChange={(e) => setReviewerRole(e.target.value)}
                        className="w-full text-xs md:text-sm p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Rakan Kuliah">Rakan Kuliah</option>
                        <option value="Guru Sains">Guru Sains</option>
                        <option value="Pensyarah IPG/Universiti">Pensyarah IPG/Universiti</option>
                        <option value="Ibu bapa">Ibu bapa</option>
                        <option value="Murid Sekolah">Murid Sekolah</option>
                      </select>
                    </div>
                  </div>

                  {/* 3E Star Pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded-xl border border-slate-100">
                    <div className="flex flex-col items-center p-2 text-center">
                      <span className="text-xs font-bold text-slate-700">🌟 Engagement</span>
                      <span className="text-[10px] text-slate-400 mb-1.5">Fokus & Keterlibatan</span>
                      {renderStars(ratingEngagement, true, setRatingEngagement)}
                    </div>
                    <div className="flex flex-col items-center p-2 text-center">
                      <span className="text-xs font-bold text-slate-700">🚀 Enhancement</span>
                      <span className="text-[10px] text-slate-400 mb-1.5">Faham Konsep Lebih Baik</span>
                      {renderStars(ratingEnhancement, true, setRatingEnhancement)}
                    </div>
                    <div className="flex flex-col items-center p-2 text-center">
                      <span className="text-xs font-bold text-slate-700">🌍 Extension</span>
                      <span className="text-[10px] text-slate-400 mb-1.5">Hubungan Dunia Realiti</span>
                      {renderStars(ratingExtension, true, setRatingExtension)}
                    </div>
                  </div>

                  {/* Comments Box */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Ulasan & Cadangan Konstruktif</label>
                    <textarea
                      required
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Tulis maklum balas penilaian anda di sini..."
                      rows={3}
                      className="w-full text-xs md:text-sm p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end items-center gap-3">
                    {showSuccessMsg && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-emerald-600 font-bold flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Penilaian Berjaya Disimpan!</span>
                      </motion.span>
                    )}
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-bold py-2.5 px-5 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      Hantar Penilaian 👍
                    </button>
                  </div>
                </form>

                {/* Saved reviews list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-xs md:text-sm uppercase tracking-wider mb-2 text-indigo-700 flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Maklum Balas Rakan ({reviews.length})</span>
                  </h4>

                  <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-2">
                    {reviews.map((rev) => (
                      <motion.div
                        key={rev.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs space-y-2.5 text-xs"
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-slate-100 pb-2">
                          <div>
                            <span className="font-bold text-slate-800 text-sm block">{rev.reviewerName}</span>
                            <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block mt-0.5">{rev.reviewerRole}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">{rev.timestamp}</span>
                        </div>

                        {/* Star display */}
                        <div className="grid grid-cols-3 gap-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 text-center">
                          <div>
                            <span className="block text-[9px] text-slate-400 font-medium">Engagement</span>
                            <div className="flex justify-center mt-0.5">{renderStars(rev.ratingEngagement)}</div>
                          </div>
                          <div>
                            <span className="block text-[9px] text-slate-400 font-medium">Enhancement</span>
                            <div className="flex justify-center mt-0.5">{renderStars(rev.ratingEnhancement)}</div>
                          </div>
                          <div>
                            <span className="block text-[9px] text-slate-400 font-medium">Extension</span>
                            <div className="flex justify-center mt-0.5">{renderStars(rev.ratingExtension)}</div>
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed font-medium italic">
                          "{rev.comments}"
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="bg-indigo-50 p-4 border-t-2 border-indigo-100 text-right sticky bottom-0 z-10 shrink-0">
            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all active:translate-y-0.5 cursor-pointer text-sm"
            >
              Tutup Maklumat Pedagogi
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
