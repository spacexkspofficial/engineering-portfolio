import type { FileLink } from "../../data/projects";
import { asset } from "../../utils/assets";

function resolve(href: string): string {
  return /^https?:/i.test(href) ? href : asset(href);
}

/** A plain register of downloadable files and outbound links. */
export function FileList({ files, label }: { files: FileLink[]; label: string }) {
  return (
    <ul className="file-list" aria-label={label}>
      {files.map((file) => {
        const external = /^https?:/i.test(file.href);
        return (
          <li key={file.href}>
            <a href={resolve(file.href)} {...(external ? { rel: "noreferrer" } : {})}>
              <span className="file-list__type">{file.type}</span>
              <span className="file-list__label">{file.label}</span>
              {file.note && <span className="file-list__note">{file.note}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
