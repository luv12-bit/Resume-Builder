import { Mail, Phone, MapPin, Linkedin, Globe, User } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[1100px] shadow-2xl font-['Inter'] relative">
            {/* Top Color Banner */}
            <div className="h-40 w-full" style={{ backgroundColor: accentColor }}>
                <div className="max-w-4xl mx-auto h-full flex items-center justify-end px-16">
                    <div className="text-right text-white space-y-1 pt-4">
                        <h1 className="text-5xl font-black tracking-tight">{data.personal_info?.full_name?.split(' ')[0]}</h1>
                        <h2 className="text-6xl font-black tracking-tighter uppercase">{data.personal_info?.full_name?.split(' ').slice(1).join(' ')}</h2>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Left Column (Light Background) */}
                <div className="w-[38%] bg-[#f1f5f9] p-10 pt-20">
                    {/* Overlapping Profile Pic */}
                    <div className="absolute top-16 left-16 size-44 rounded-full border-[6px] border-white overflow-hidden shadow-xl bg-slate-200 flex items-center justify-center">
                        {data.personal_info?.image ? (
                            <img src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="size-24 text-slate-300" />
                        )}
                    </div>

                    <div className="mt-12 space-y-12">
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-2 mb-6">Contacto</h3>
                            <div className="space-y-4 text-[12px] font-semibold text-slate-600">
                                {data.personal_info?.email && <div className="flex items-center gap-3"><Mail className="size-4" /><span>{data.personal_info.email}</span></div>}
                                {data.personal_info?.phone && <div className="flex items-center gap-3"><Phone className="size-4" /><span>{data.personal_info.phone}</span></div>}
                                {data.personal_info?.location && <div className="flex items-center gap-3"><MapPin className="size-4" /><span>{data.personal_info.location}</span></div>}
                            </div>
                        </section>

                        {data.professional_summary && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-2 mb-6">Profile Summary</h3>
                                <p className="text-[12px] leading-relaxed text-slate-500 font-medium">{data.professional_summary}</p>
                            </section>
                        )}

                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-2 mb-6">Skills</h3>
                                <div className="space-y-3">
                                    {data.skills.map((skill, i) => (
                                        <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-600 uppercase">
                                            <div className="size-1.5 rounded-full bg-slate-900" />
                                            <span>{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Right Column (White) */}
                <div className="flex-1 p-12 pt-20 bg-white">
                    <div className="space-y-16">
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-2 mb-8">Professional Experience</h3>
                                <div className="space-y-10">
                                    {data.experience.map((exp, i) => (
                                        <div key={i}>
                                            <h4 className="font-black text-slate-900 text-lg uppercase">{exp.company}</h4>
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-xs font-bold text-slate-400 italic">{exp.position}</p>
                                                <span className="text-[10px] font-black text-slate-300">{formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                            </div>
                                            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.education && data.education.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-2 mb-8">Education</h3>
                                <div className="space-y-8">
                                    {data.education.map((edu, i) => (
                                        <div key={i}>
                                            <h4 className="font-black text-slate-900 text-sm uppercase">{edu.degree}</h4>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs font-bold text-slate-400 italic">{edu.institution}</p>
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{formatDate(edu.graduation_date)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
