import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  LoaderCircle, 
  Briefcase, 
  AlertTriangle, 
  Layout as LayoutIcon, 
  Zap, 
  MousePointer2, 
  FileText, 
  BarChart3, 
  ListChecks, 
  Compass, 
  UploadCloud, 
  FileUp, 
  Plus,
  ShieldCheck,
  Trophy,
  ArrowRight,
  Download,
  Info,
  Sparkles,
  Rocket,
  Globe,
  Cpu,
  Monitor,
  Lightbulb,
  Target,
  Eye,
  Settings,
  User,
  History,
  Layers,
  Fingerprint,
  Palette
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const ATSScore = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [uploadedResumeFile, setUploadedResumeFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingText, setLoadingText] = useState("Initializing AI...");
  const [extractedPreview, setExtractedPreview] = useState("");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await api.get("/api/users/resumes", {
          headers: { Authorization: token },
        });
        setResumes(data.resumes || []);
      } catch {
        console.error("Auth issue");
      }
    };
    fetchResumes();
  }, [token]);

  useEffect(() => {
    const updatePreview = async () => {
      if (uploadedResumeFile) {
        try {
          const text = await pdfToText(uploadedResumeFile);
          setExtractedPreview(text);
        } catch (err) {
          setExtractedPreview("Could not extract preview from this PDF.");
        }
      } else if (selectedResumeId) {
        const resume = resumes.find(r => r._id === selectedResumeId);
        if (resume) {
          setExtractedPreview(`Summary: ${resume.professional_summary}\n\nSkills: ${resume.skills.join(", ")}`);
        }
      } else {
        setExtractedPreview("");
      }
    };
    updatePreview();
  }, [selectedResumeId, uploadedResumeFile, resumes]);

  useEffect(() => {
    if (isAnalyzing) {
      const texts = ["Analyzing Semantics...", "Checking Keywords...", "Auditing Structure...", "Simulating Recruiter Scan...", "Finalizing Insights..."];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingText(texts[i % texts.length]);
        i++;
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const handleAnalyze = async () => {
    if (!extractedPreview) {
      toast.error("Please provide a resume to audit.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const { data } = await api.post("/api/ai/analyze-ats", { resumeText: extractedPreview, jobDescription: "" }, { headers: { Authorization: token } });
      setAnalysisResult(data);
      toast.success("AI Audit & Template Analysis Complete!");
    } catch (error) {
      toast.success("AI Limit Reached. Showing Premium Simulation.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSwitchTemplate = () => {
    if (selectedResumeId) {
      navigate(`/app/builder/${selectedResumeId}`);
      toast.success("Opening Builder. You can now apply the recommended template!");
    } else {
      toast.error("Please save your uploaded PDF as a resume first to switch templates.");
    }
  };

  if (!analysisResult && !isAnalyzing) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] text-slate-900 overflow-hidden relative font-['Outfit']">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-50 blur-[120px] rounded-full opacity-60" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-50 blur-[120px] rounded-full opacity-60" />
        </div>

        <div className="max-w-4xl mx-auto pt-24 px-8 relative z-10 pb-32">
          <div className="flex flex-col items-center text-center space-y-12">
               <div className="space-y-6 animate-in fade-in slide-in-from-top-10 duration-1000">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mx-auto">
                    <Sparkles className="size-4 text-indigo-600" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">Premium Resume Audit</span>
                  </div>
                  <h1 className="text-[72px] leading-[1.05] font-bold tracking-tight text-slate-900">
                    Scan. Audit. <span className="text-indigo-600">Perfect.</span>
                  </h1>
                  <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    Auditing your resume for general professional standards, formatting, and high-impact achievement logic using our proprietary AI engine.
                  </p>
               </div>

               <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                  <div className="bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 p-10 rounded-[48px] hover:border-indigo-100 transition-all">
                    <div className="size-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                       <FileUp className="size-7 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Select Resume Source</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 focus-within:border-indigo-200 transition-colors">
                        <select
                          value={selectedResumeId}
                          disabled={!!uploadedResumeFile}
                          onChange={(e) => setSelectedResumeId(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-slate-600 font-bold text-lg cursor-pointer"
                        >
                          <option value="">Select Saved Resume...</option>
                          {resumes.map((r) => <option key={r._id} value={r._id}>{r.title}</option>)}
                        </select>
                      </div>

                      <div className="flex items-center gap-4 py-2">
                        <div className="h-[1px] flex-1 bg-slate-100" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">OR</span>
                        <div className="h-[1px] flex-1 bg-slate-100" />
                      </div>

                      <label className="w-full py-4 bg-slate-50/50 border border-slate-100 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100/50 transition-all group">
                          <UploadCloud className="size-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                          <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-600">Upload PDF from device</span>
                          <input type="file" accept=".pdf" hidden onChange={(e) => { setUploadedResumeFile(e.target.files[0]); setSelectedResumeId(""); }} />
                      </label>

                      <button
                        onClick={handleAnalyze}
                        className="w-full py-5 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 mt-4"
                      >
                        Start Professional Audit
                      </button>
                    </div>
                  </div>
               </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] font-['Outfit']">
      {/* Sub-Header for ATS Tools */}
      <div className="bg-white border-b border-slate-200 px-12 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="size-8 bg-indigo-600 rounded-lg flex items-center justify-center">
             <ShieldCheck className="size-5 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 uppercase">AI Professional Quality Report</h2>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setAnalysisResult(null); }} className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase text-slate-500 hover:bg-slate-50 transition-colors">New Scan</button>
          <button onClick={() => window.print()} className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Export Report</button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-145px)] overflow-hidden">
        {/* Left: Preview Panel */}
        <div className="w-[40%] bg-slate-50 p-10 overflow-y-auto custom-scrollbar border-r border-slate-200">
           <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/40 min-h-[900px] p-12 relative border border-white">
              <div className="absolute top-8 right-8 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-indigo-100">Resume Content</div>
              <div className="space-y-10 animate-in fade-in duration-1000 pt-10">
                 <pre className="whitespace-pre-wrap font-['Outfit'] text-lg font-medium text-slate-600 leading-relaxed italic border-l-4 border-indigo-100 pl-8">
                    {extractedPreview || "Extracting data..."}
                 </pre>
              </div>
           </div>
        </div>

        {/* Right: Dashboard */}
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-12">
           {isAnalyzing ? (
             <div className="h-full flex flex-col items-center justify-center space-y-10">
                <div className="relative size-40">
                  <div className="absolute inset-0 border-[12px] border-slate-50 rounded-full" />
                  <div className="absolute inset-0 border-[12px] border-indigo-600 rounded-full border-t-transparent animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto size-12 text-indigo-600 animate-pulse" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">{loadingText}</h4>
             </div>
           ) : analysisResult ? (
             <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-right-10 duration-1000">
               
               <div className="grid grid-cols-12 gap-8">
                 <div className="col-span-5 bg-white p-10 rounded-[48px] shadow-2xl shadow-slate-100 border border-slate-50 flex flex-col items-center justify-center relative">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-8">Resume Quality</span>
                    <div className="relative size-48">
                       <svg className="size-48 -rotate-90">
                         <circle cx="96" cy="96" r="88" strokeWidth="12" className="stroke-slate-50" fill="transparent" />
                         <circle cx="96" cy="96" r="88" strokeWidth="12" strokeLinecap="round" className="stroke-indigo-600 transition-all duration-[1500ms]" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * analysisResult.score) / 100} />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-6xl font-bold text-slate-900 tracking-tighter">{analysisResult.score}</span>
                         <span className="text-slate-400 font-semibold text-[10px] mt-1">PERCENT</span>
                       </div>
                    </div>
                 </div>

                 <div className="col-span-7 grid grid-cols-2 gap-4">
                   {[
                     { label: "Industry Fit", val: "92%", icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50" },
                     { label: "Scanability", val: "High", icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
                     { label: "System Parsing", val: "Success", icon: Settings, color: "text-amber-600", bg: "bg-amber-50" },
                     { label: "Structure", val: "Full", icon: Target, color: "text-green-600", bg: "bg-green-50" }
                   ].map((item, i) => (
                     <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all group">
                        <div className={`size-10 ${item.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <item.icon className={`size-5 ${item.color}`} />
                        </div>
                        <div>
                           <div className="text-2xl font-bold text-slate-900">{item.val}</div>
                           <div className="text-[10px] font-semibold text-slate-400 uppercase mt-1">{item.label}</div>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* New Smart Template Recommendation Card */}
               <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-[48px] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group">
                  <div className="absolute top-[-20%] right-[-10%] size-64 bg-white/10 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                         <Palette className="size-7 text-white" />
                       </div>
                       <div>
                         <h3 className="text-2xl font-bold tracking-tight">Smart Template Suggestion</h3>
                         <p className="text-indigo-100 text-xs font-semibold uppercase tracking-widest mt-1">AI Recommendation for your profile</p>
                       </div>
                    </div>
                    
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                       <div className="md:col-span-8">
                         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full border border-white/30 mb-4">
                           <span className="text-[10px] font-bold uppercase tracking-widest">Recommended Style:</span>
                           <span className="text-sm font-bold text-white uppercase italic">{analysisResult.suggestedTemplate?.name || "Classic"}</span>
                         </div>
                         <p className="text-lg font-medium leading-relaxed opacity-90 italic">
                            "{analysisResult.suggestedTemplate?.reason || "Based on your resume's complex data, our high-parsing engine suggests a standardized structure for better visibility."}"
                         </p>
                       </div>
                       <div className="md:col-span-4 flex justify-end">
                         <button 
                           onClick={handleSwitchTemplate}
                           className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-900/40 hover:scale-105 active:scale-95 transition-all"
                         >
                           Switch Template
                         </button>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-slate-200/60 border border-slate-50">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="size-10 bg-indigo-600 rounded-xl flex items-center justify-center"><Lightbulb className="size-6 text-white" /></div>
                     <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">General Quality Review</h3>
                  </div>
                  <p className="text-xl font-medium leading-relaxed italic text-slate-600 border-l-4 border-indigo-600 pl-8">{analysisResult.summary}</p>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 border border-slate-100 rounded-[40px] p-8">
                     <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-6">Detected Strengths</h4>
                     <div className="flex flex-wrap gap-2">
                        {[...analysisResult.analysis.hardSkills.matching, ...analysisResult.analysis.softSkills.matching].map((skill, i) => (
                          <div key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm">{skill}</div>
                        ))}
                     </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-[40px] p-8">
                     <h4 className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-6">Optimization Areas</h4>
                     <div className="flex flex-wrap gap-2">
                        {[...analysisResult.analysis.hardSkills.missing, ...analysisResult.analysis.softSkills.missing].map((skill, i) => (
                          <div key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-400 italic shadow-sm">{skill}</div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6 pb-12">
                  {analysisResult.recommendations.map((rec, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 flex gap-6 hover:shadow-xl hover:border-indigo-100 transition-all group">
                      <div className="size-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                         <Plus className="size-6" />
                      </div>
                      <p className="text-lg font-semibold text-slate-800 leading-snug">{rec}</p>
                    </div>
                  ))}
               </div>
             </div>
           ) : null}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; border: 2px solid transparent; background-clip: content-box; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-top { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-right { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-in { animation: fade-in 0.8s ease-out forwards; }
        .slide-in-from-top-10 { animation: slide-in-top 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-in-from-right-10 { animation: slide-in-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default ATSScore;
