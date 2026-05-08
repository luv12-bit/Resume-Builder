import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, User } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[1100px] flex shadow-2xl font-['Inter']">
            {/* Dark Sidebar */}
            <div className="w-[35%] bg-[#2d3436] text-white p-10 flex flex-col items-center">
                <div className="size-40 rounded-full border-4 border-white/20 overflow-hidden mb-8 bg-slate-700 flex items-center justify-center">
                    {data.personal_info?.image ? (
                        <img src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User className="size-20 text-white/20" />
                    )}
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">{data.personal_info?.full_name || "Your Name"}</h1>
                    <p className="text-sm font-medium opacity-60 uppercase tracking-widest" style={{ color: accentColor }}>{data.personal_info?.profession}</p>
                </div>

                <div className="w-full space-y-10">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/10 pb-2 mb-4">Contact</h2>
                        <div className="space-y-4 text-[11px] font-medium opacity-80">
                            {data.personal_info?.phone && <div className="flex items-center gap-3"><Phone className="size-3" /><span>{data.personal_info.phone}</span></div>}
                            {data.personal_info?.email && <div className="flex items-center gap-3"><Mail className="size-3" /><span>{data.personal_info.email}</span></div>}
                            {data.personal_info?.location && <div className="flex items-center gap-3"><MapPin className="size-3" /><span>{data.personal_info.location}</span></div>}
                        </div>
                    </section>

                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/10 pb-2 mb-4">Skills</h2>
                            <ul className="space-y-2 text-[11px] font-medium opacity-80">
                                {data.skills.map((skill, i) => <li key={i} className="flex items-center gap-2"><span>•</span>{skill}</li>)}
                            </ul>
                        </section>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-12 bg-white text-slate-800">
                <div className="space-y-12">
                    {data.professional_summary && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-300 mb-4 flex items-center gap-2">
                                <div className="size-1.5 bg-slate-900 rounded-full" /> Profile
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-600 font-medium">{data.professional_summary}</p>
                        </section>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-300 mb-8 flex items-center gap-2">
                                <div className="size-1.5 bg-slate-900 rounded-full" /> Work Experience
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                                            <span className="text-[10px] font-bold text-slate-400">{formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                        </div>
                                        <p className="text-xs font-bold mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-300 mb-8 flex items-center gap-2">
                                <div className="size-1.5 bg-slate-900 rounded-full" /> Education
                            </h2>
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                                            <span className="text-[10px] font-bold text-slate-400">{formatDate(edu.graduation_date)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500">{edu.institution}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
