import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-4xl mx-auto p-12 bg-white text-black font-['Times_New_Roman',_serif] leading-tight shadow-sm">
            {/* Minimalist Centered Header */}
            <header className="text-center mb-6 space-y-2 border-b-2 pb-6" style={{ borderColor: accentColor }}>
                <h1 className="text-4xl font-bold uppercase tracking-tight">{data.personal_info?.full_name || "Your Name"}</h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>| {data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>| {data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && <span>| LinkedIn</span>}
                    {data.personal_info?.website && <span>| Portfolio</span>}
                </div>
            </header>

            <div className="space-y-6">
                {/* Work Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Work Experience</h2>
                        <div className="space-y-5">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-bold">{exp.company}</h3>
                                        <span className="text-[11px] font-bold italic">{formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-xs font-bold italic">{exp.position}</p>
                                        <p className="text-[10px] italic">{data.personal_info?.location}</p>
                                    </div>
                                    {exp.description && (
                                        <div className="text-[11px] leading-relaxed whitespace-pre-line pl-2">
                                            {exp.description.split('\n').map((line, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <span className="shrink-0">•</span>
                                                    <span>{line.replace(/^•\s?/, '')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-bold">{edu.institution}</h3>
                                        <span className="text-[11px] font-bold italic">{formatDate(edu.graduation_date)}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-[11px] italic">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                                        <p className="text-[10px] italic">GPA: {edu.gpa || "4.0/4.0"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Certifications */}
                <section>
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Skills & Interests</h2>
                    <div className="text-[11px] leading-relaxed">
                        <div className="flex gap-2">
                            <span className="font-bold">Skills:</span>
                            <span>{data.skills?.join(', ') || "No skills listed"}</span>
                        </div>
                        {data.projects && data.projects.length > 0 && (
                             <div className="flex gap-2 mt-1">
                                <span className="font-bold">Projects:</span>
                                <span>{data.projects.map(p => p.name).join(', ')}</span>
                            </div>
                        )}
                        <div className="flex gap-2 mt-1">
                            <span className="font-bold">Interests:</span>
                            <span>Professional Development, Industry Research, Team Collaboration</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExecutiveTemplate;
