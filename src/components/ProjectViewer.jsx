import { FolderGit2, ExternalLink, Check } from 'lucide-react'

/**
 * ProjectViewer — renders a single project's details (Neo-Brutalist skin).
 *
 * Receives the full project object as a prop (the window manager passes it in
 * when a desktop folder is double-clicked). Pure presentational component.
 */
export default function ProjectViewer({ project }) {
  return (
    <div className="space-y-3 text-sm text-black">
      {/* Category + status row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
          {project.category}
        </span>
        {project.status && (
          <span className="win95-outset bg-silver px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
            {project.status}
          </span>
        )}
      </div>

      <p className="leading-relaxed">{project.description}</p>

      {/* Highlights */}
      {project.highlights?.length > 0 && (
        <div>
          <h3 className="mb-1 font-mono text-xs font-bold uppercase tracking-wider text-black/50">
            // highlights
          </h3>
          <ul className="space-y-1">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-1.5 leading-snug">
                <Check size={14} className="mt-0.5 shrink-0 text-online" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="win95-outset bg-silver px-2 py-0.5 font-mono text-xs font-bold"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2 pt-1">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="win95-btn inline-flex items-center gap-1.5 bg-silver px-2.5 py-1 text-xs font-bold uppercase text-black"
          >
            <FolderGit2 size={14} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="win95-btn inline-flex items-center gap-1.5 bg-silver px-2.5 py-1 text-xs font-bold uppercase text-black"
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
      </div>
    </div>
  )
}
