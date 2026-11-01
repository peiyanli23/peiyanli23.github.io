"use client";

import { useEffect, useState } from "react";
import {
  archiveCategoryOrder,
  getArchiveEntries,
  type ArchiveCategory,
} from "./archive-data";

type Language = "zh" | "en";
type Theme = "light" | "dark";

const copy = {
  en: {
    nav: [
      ["Home", "/"],
      ["Research", "/#research"],
      ["Archive", "/archive/"],
      ["Education", "/#journey"],
      ["Writing", "/#notes"],
      ["Photography", "/#photography"],
      ["Contact", "/#contact"],
    ],
    label: "ACADEMIC & PROJECT ARCHIVE",
    title: "Archive",
    intro:
      "Selected projects, reports, course notes, and presentation materials from different stages of my academic development.",
    categories: {
      projects: "Projects",
      "reports-papers": "Reports & Papers",
      "course-notes": "Course Notes",
      "talks-presentations": "Talks & Presentations",
      "awards-acknowledgements": "Awards & Acknowledgements",
    },
    switchLanguage: "切换至中文",
    switchTheme: "Switch light / dark",
  },
  zh: {
    nav: [
      ["首页", "/"],
      ["研究", "/#research"],
      ["档案", "/archive/"],
      ["教育", "/#journey"],
      ["写作", "/#notes"],
      ["摄影", "/#photography"],
      ["联系", "/#contact"],
    ],
    label: "学术与项目档案",
    title: "档案",
    intro: "收录不同学习阶段中经过筛选的项目、报告、课程笔记与演讲材料。",
    categories: {
      projects: "项目",
      "reports-papers": "报告与论文",
      "course-notes": "课程笔记",
      "talks-presentations": "演讲与展示",
      "awards-acknowledgements": "奖项与认可",
    },
    switchLanguage: "Switch to English",
    switchTheme: "切换深浅色",
  },
} as const;

export default function ArchivePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [languageReady, setLanguageReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const t = copy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("peiyan-language") as Language | null;
    if (savedLanguage === "zh" || savedLanguage === "en") setLanguage(savedLanguage);
    setLanguageReady(true);
    const saved = window.localStorage.getItem("peiyan-theme") as Theme | null;
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("peiyan-theme", next);
  };

  const toggleLanguage = () => {
    const next = language === "zh" ? "en" : "zh";
    setLanguage(next);
    window.localStorage.setItem("peiyan-language", next);
  };

  return (
    <main
      className={`archive-root ${languageReady ? "language-ready" : "language-loading"}`}
      lang={language === "zh" ? "zh-CN" : "en"}
    >
      <header className="site-header">
        <a className="brand" href="/" aria-label="Peiyan Li — home">
          <img src="/images/lotus-avatar.jpg" alt="" />
          <span>PEIYAN LI</span>
        </a>
        <nav aria-label="Primary navigation">
          {t.nav.map(([label, url]) => (
            <a
              className={url === "/archive/" ? "active" : ""}
              href={url}
              aria-current={url === "/archive/" ? "page" : undefined}
              key={url}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="text-toggle"
            onClick={toggleLanguage}
            aria-label={t.switchLanguage}
          >
            {language === "zh" ? "EN" : "中"}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={t.switchTheme}
          >
            <span aria-hidden="true">{theme === "light" ? "●" : "○"}</span>
          </button>
        </div>
      </header>

      <section className="archive-page section-shell">
        <header className="archive-introduction">
          <h1>{t.title}</h1>
        </header>

        <div className="archive-sections">
          {archiveCategoryOrder.map((category) => {
            const entries = getArchiveEntries(category);
            if (entries.length === 0) return null;

            return (
              <section className="archive-section" key={category}>
                <header className="archive-section-heading">
                  <h2>{t.categories[category as ArchiveCategory]}</h2>
                </header>
                <div className="archive-list">
                  {entries.map((entry) => {
                    const entryKey = `${entry.year}-${entry.title}-${entry.order}`;
                    const title =
                      language === "zh" ? entry.titleZh ?? entry.title : entry.title;
                    const subtitle =
                      language === "zh"
                        ? entry.subtitleZh ?? entry.subtitle
                        : entry.subtitle;
                    const note = language === "zh" ? entry.noteZh : entry.note;
                    const dateLabel =
                      language === "zh"
                        ? entry.dateLabelZh ?? entry.dateLabel
                        : entry.dateLabel;
                    const isExpanded = expandedEntry === entryKey;
                    const noteId = `archive-note-${entry.year}-${entry.order}-${category}`;

                    return (
                      <article className="archive-item" key={entryKey}>
                        <time dateTime={String(entry.year)}>{entry.year}</time>
                        <div className="archive-item-copy">
                          <div className="archive-title-row">
                            <h3>{title}</h3>
                            {note && (
                              <button
                                className="archive-note-toggle"
                                type="button"
                                aria-expanded={isExpanded}
                                aria-controls={noteId}
                                aria-label={
                                  language === "zh"
                                    ? `${isExpanded ? "收起" : "展开"}${title}的项目介绍`
                                    : `${isExpanded ? "Collapse" : "Expand"} details for ${title}`
                                }
                                onClick={() =>
                                  setExpandedEntry(isExpanded ? null : entryKey)
                                }
                              >
                                <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                              </button>
                            )}
                          </div>
                          {subtitle && <p>{subtitle}</p>}
                        </div>
                        {dateLabel && (
                          <div className="archive-date-label">{dateLabel}</div>
                        )}
                        {entry.links && entry.links.length > 0 && (
                          <div className="archive-links">
                            {entry.links.map((link) => (
                              <a
                                href={link.url}
                                target={link.url.endsWith(".pptx") ? undefined : "_blank"}
                                rel={link.url.endsWith(".pptx") ? undefined : "noopener noreferrer"}
                                download={link.url.endsWith(".pptx") ? "" : undefined}
                                key={`${link.label}-${link.url}`}
                              >
                                {link.label}
                                <span aria-hidden="true">↗</span>
                              </a>
                            ))}
                          </div>
                        )}
                        {note && (
                          <div
                            className={`archive-note-wrap${isExpanded ? " open" : ""}`}
                            id={noteId}
                            aria-hidden={!isExpanded}
                          >
                            <div className="archive-note-clip">
                              <p>{note}</p>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <footer className="site-footer archive-footer section-shell">
        <strong>李培炎 · Peiyan Li</strong>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
