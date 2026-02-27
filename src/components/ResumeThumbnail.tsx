import { Resume } from "@/types/resume";

interface Props {
  resume: Resume;
}

export default function ResumeThumbnail({ resume }: Props) {
  const { contact, summary, experience, skills } = resume;

  return (
    <div className="w-full bg-white text-[5px] leading-[7px] p-2 font-sans overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-[#1a2332] text-white p-2 mb-1">
        <div className="font-bold text-[8px]">{contact.fullName}</div>
        <div className="text-[6px] opacity-80">{contact.title}</div>
        <div className="flex gap-3 mt-1 text-[4.5px] opacity-70 flex-wrap">
          <span>📍 {contact.location}</span>
          <span>📞 {contact.phone}</span>
          <span>✉ {contact.email}</span>
          {contact.website && <span>🌐 {contact.website}</span>}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-1">
        <p className="text-[4.5px] text-gray-600 leading-[6px] line-clamp-3">
          {summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-1">
        <div className="font-bold text-[6px] text-gray-800 border-b border-gray-300 mb-0.5">
          Experience
        </div>
        {experience.slice(0, 2).map((exp) => (
          <div key={exp.id} className="mb-0.5">
            <div className="font-semibold text-[5.5px]">{exp.position}</div>
            <div className="text-[4.5px] text-gray-500">{exp.company} · {exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
            <div className="text-[4px] text-gray-600 line-clamp-2">{exp.description}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <div className="font-bold text-[6px] text-gray-800 border-b border-gray-300 mb-0.5">
          Skills
        </div>
        <div className="flex flex-wrap gap-0.5">
          {skills.slice(0, 6).map((skill) => (
            <span key={skill.id} className="text-[4px] bg-gray-100 px-1 py-0.5 rounded">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
