import { Resume } from "@/types/resume";

interface Props {
  resume: Partial<Resume>;
}

function SkillDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= level ? "bg-gray-800" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ResumePreview({ resume }: Props) {
  const { contact, summary, experience, education, skills } = resume;

  return (
    <div className="w-full bg-white shadow-lg text-xs font-sans" style={{ minHeight: "297mm" }}>
      {/* Header */}
      <div className="bg-[#1a2332] text-white px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          {contact?.fullName || "Your Name"}
        </h1>
        <p className="text-sm opacity-80 mt-1">{contact?.title || "Your Title"}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs opacity-70">
          {contact?.location && <span>📍 {contact.location}</span>}
          {contact?.phone && <span>📞 {contact.phone}</span>}
          {contact?.email && <span>✉ {contact.email}</span>}
          {contact?.website && <span>🌐 {contact.website}</span>}
        </div>
      </div>

      <div className="px-8 py-5 space-y-5">
        {/* Summary */}
        {summary && (
          <section>
            <p className="text-gray-600 leading-relaxed text-xs">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wider">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-gray-500 text-xs">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-4">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1 text-xs leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wider">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-500 text-xs">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-4">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wider">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className="text-gray-700 text-xs">{skill.name}</span>
                  <SkillDots level={skill.level} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
