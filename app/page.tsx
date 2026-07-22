"use client";

import { useEffect, useState } from "react";

type Language = "zh" | "en";
type Theme = "light" | "dark";
type SectionTab = "home" | "research" | "journey" | "photography" | "notes" | "contact";
type LightboxState = { projectIndex: number; imageIndex: number } | null;

const copy = {
  zh: {
    nav: [
      ["首页", "home"],
      ["研究", "research"],
      ["经历", "journey"],
      ["摄影", "photography"],
      ["写作", "notes"],
      ["联系", "contact"],
    ],
    eyebrow: "物理学 · 量子器件 · 摄影",
    heroLine1: "李培炎",
    heroLine2: "物理与超导量子计算",
    intro:
      "物理学本科生；参与超导量子器件研究，使用微波测量与材料加工方法。北京 / Urbana。",
    viewWork: "查看研究",
    download: "简历可邮件索取",
    locations: "北京  ⇄  Urbana",
    portraitCaption: "2025 · 中国黄山",
    aboutLabel: "01 / 关于",
    aboutTitle: "研究方向与背景",
    aboutBody:
      "超导薄膜与微波器件、量子系统建模、材料表征与低温测量。",
    current: "教育",
    currentBody: "物理学本科 · UIUC\n数学与电气计算机工程辅修",
    focus: "研究与技能",
    focusBody: "超导量子器件\n微波测量 · 材料与加工",
    researchLabel: "02 / 研究与项目",
    researchTitle: "超导量子计算与器件",
    researchIntro:
      "高动能电感器件、行波参量放大器、超导谐振器与量子系统建模。",
    selected: "精选工作",
    galleryOpen: "查看图片",
    galleryClose: "收起照片",
    tinGallery: [
      ["/images/tin/mla150.jpg", "MLA 150 无掩模光刻设备"],
      ["/images/tin/icp-rie.jpg", "ICP-RIE 干法刻蚀设备"],
      ["/images/tin/rta-furnace.jpg", "RTA 退火炉"],
      ["/images/tin/ppms.jpg", "Quantum Design PPMS"],
      ["/images/tin/cryogenic-lab.jpg", "低温实验室"],
    ],
    jtwpaGallery: [
      ["/images/jtwpa/sample-wirebonding.jpg", "显微镜下的样品引线键合"],
      ["/images/jtwpa/seminar-title.png", "Seminar 分享：Josephson 参量放大器与行波参量放大器"],
    ],
    qutipGallery: [
      ["/images/qutip/single-qubit-y-gate.png", "单量子比特 Y 门动力学与 Bloch 球轨迹"],
      ["/images/qutip/cz-pulse-comparison.png", "CZ 门脉冲与泄漏模拟比较"],
      ["/images/qutip/cz-leakage-maps.png", "重复 CZ 门的泄漏优化图"],
      ["/images/qutip/dilution-refrigerator.png", "稀释制冷机结构与运行回路"],
      ["/images/qutip/two-qubit-simulation.png", "双量子比特相互作用数值模拟"],
    ],
    oscillatorGallery: [
      ["/images/oscillator/simulation-experiment.png", "磁—机械振子的数值模拟与实验结果对比"],
    ],
    researchCards: [
      {
        year: "2025—至今",
        tag: "超导器件",
        title: "超薄 TiN 谐振器的微波损耗",
        body: "结合薄膜加工、材料表征、器件制备与低温微波测量，研究工艺和表面引起的损耗。",
      },
      {
        year: "2026—至今",
        tag: "量子放大器",
        title: "行波参量放大器设计迭代",
        body: "负责 CP-JTWPA 版图与设计迭代，用电路模型对照实验响应。",
      },
      {
        year: "2025",
        tag: "量子建模",
        title: "用 QuTiP 连接哈密顿量与实验",
        body: "建立 transmon 与 fluxonium 的控制、读出和量子门模型；搭建并校准微波链路。",
      },
      {
        year: "2023",
        tag: "计算物理",
        title: "阻尼磁—机械耦合振子",
        body: "建立阻尼耦合模型，以数值求解和傅里叶分析对照实验。",
      },
    ],
    skills: [
      "Python / C++ / Mathematica",
      "QuTiP / HFSS / COMSOL",
      "低温微波测量",
      "器件版图与微纳加工",
      "XPS / PPMS / AFM",
      "科学写作与教学",
    ],
    journeyLabel: "03 / 路径",
    journeyTitle: "教育与经历",
    journeyGroups: [
      {
        level: "大学",
        date: "2024—至今",
        school: "University of Illinois Urbana-Champaign",
        program: "物理学本科 · 数学与电气计算机工程辅修",
        items: [
          {
            date: "2025—至今",
            title: "KouBit Lab",
            body: "参与超导量子器件研究，包括器件设计、材料与加工、低温微波测量和量子系统建模。",
          },
        ],
      },
      {
        level: "高中",
        date: "2021—2024",
        school: "北京十一学校",
        program: "高中阶段经历",
        items: [
          {
            date: "2023—2024",
            title: "AP Physics C 助教",
            body: "设计练习题，并组织力学与电磁学复习课。",
          },
          {
            date: "2024",
            title: "数学建模比赛命题人与学生评委",
            body: "设计景观资源分配问题，评阅作品并在颁奖活动中讲解建模思路。",
          },
          {
            date: "2021—2024",
            title: "骑行社社长",
            body: "组织每周骑行、安全培训、社服制作，并为师生提供自行车维修支持。",
          },
        ],
      },
    ],
    noteLabel: "写作 / WRITING",
    noteTitle: "光速甩弹簧",
    noteBody:
      "微信公众号，分享物理与学习笔记。",
    scan: "微信扫码关注",
    photographyLabel: "04 / 摄影",
    photographyTitle: "摄影作品",
    photographyIntro: "个人摄影作品。",
    photoNames: ["白荷", "月食", "彗星", "花苞"],
    cycling: "骑行",
    cyclingBody:
      "长期兴趣。曾任北京十一学校骑行社社长。",
    contactLabel: "05 / 联系",
    contactTitle: "联系我",
    personal: "个人邮箱",
    school: "学校邮箱",
    footer: "李培炎 · Peiyan Li",
    switchLanguage: "Switch to English",
    switchTheme: "切换深浅色",
  },
  en: {
    nav: [
      ["Home", "home"],
      ["Research", "research"],
      ["Journey", "journey"],
      ["Photography", "photography"],
      ["Writing", "notes"],
      ["Contact", "contact"],
    ],
    eyebrow: "PHYSICS · QUANTUM DEVICES · PHOTOGRAPHY",
    heroLine1: "Peiyan Li",
    heroLine2: "Physics & Superconducting Quantum Computing",
    intro:
      "Physics undergraduate conducting research on superconducting quantum devices using microwave measurement and materials processing. Beijing / Urbana.",
    viewWork: "View research",
    download: "CV available by email",
    locations: "Beijing  ⇄  Urbana",
    portraitCaption: "2025 · Huangshan, China",
    aboutLabel: "01 / ABOUT",
    aboutTitle: "Research & technical background",
    aboutBody:
      "Superconducting films and microwave devices, quantum-system modeling, materials characterization, and cryogenic measurement.",
    current: "EDUCATION",
    currentBody: "B.S. Physics · UIUC\nMinors in Mathematics and ECE",
    focus: "RESEARCH & SKILLS",
    focusBody: "Superconducting quantum devices\nMicrowave measurement · materials",
    researchLabel: "02 / RESEARCH & PROJECTS",
    researchTitle: "Superconducting quantum computing & devices",
    researchIntro:
      "High-kinetic-inductance devices, traveling-wave parametric amplifiers, superconducting resonators, and quantum-system modeling.",
    selected: "SELECTED WORK",
    galleryOpen: "View images",
    galleryClose: "Close gallery",
    tinGallery: [
      ["/images/tin/mla150.jpg", "MLA 150 maskless aligner"],
      ["/images/tin/icp-rie.jpg", "ICP-RIE system"],
      ["/images/tin/rta-furnace.jpg", "RTA furnace"],
      ["/images/tin/ppms.jpg", "Quantum Design PPMS"],
      ["/images/tin/cryogenic-lab.jpg", "Cryogenic laboratory"],
    ],
    jtwpaGallery: [
      ["/images/jtwpa/sample-wirebonding.jpg", "Sample wire-bonding under a microscope"],
      ["/images/jtwpa/seminar-title.png", "Seminar on Josephson and traveling-wave parametric amplifiers"],
    ],
    qutipGallery: [
      ["/images/qutip/single-qubit-y-gate.png", "Single-qubit Y-gate dynamics and Bloch-sphere trajectories"],
      ["/images/qutip/cz-pulse-comparison.png", "CZ-gate pulse and leakage simulation comparison"],
      ["/images/qutip/cz-leakage-maps.png", "Leakage-optimization maps for repeated CZ gates"],
      ["/images/qutip/dilution-refrigerator.png", "Dilution refrigerator structure and operating circuits"],
      ["/images/qutip/two-qubit-simulation.png", "Numerical simulation of two interacting qubits"],
    ],
    oscillatorGallery: [
      ["/images/oscillator/simulation-experiment.png", "Comparison between numerical simulation and experiment for the magnetic–mechanical oscillator"],
    ],
    researchCards: [
      {
        year: "2025—NOW",
        tag: "SUPERCONDUCTING DEVICES",
        title: "Microwave loss in ultrathin TiN resonators",
        body: "Combining thin-film processing, characterization, fabrication, and cryogenic microwave measurement to study process- and surface-induced loss.",
      },
      {
        year: "2026—NOW",
        tag: "QUANTUM AMPLIFIERS",
        title: "Traveling-wave parametric amplifier iteration",
        body: "Leading CP-JTWPA layout and design iteration, comparing circuit models with measured response.",
      },
      {
        year: "2025",
        tag: "QUANTUM MODELING",
        title: "Connecting Hamiltonians to experiments with QuTiP",
        body: "Modeling transmon and fluxonium control, readout, and gates; building and calibrating a microwave chain.",
      },
      {
        year: "2023",
        tag: "COMPUTATIONAL PHYSICS",
        title: "Damped magnetic–mechanical oscillator",
        body: "Developed a damped coupled model and compared numerical and Fourier analysis with experiments.",
      },
    ],
    skills: [
      "Python / C++ / Mathematica",
      "QuTiP / HFSS / COMSOL",
      "Cryogenic microwave measurement",
      "Device layout & nanofabrication",
      "XPS / PPMS / AFM",
      "Scientific writing & teaching",
    ],
    journeyLabel: "03 / JOURNEY",
    journeyTitle: "Education & experience",
    journeyGroups: [
      {
        level: "UNIVERSITY",
        date: "2024—PRESENT",
        school: "University of Illinois Urbana-Champaign",
        program: "B.S. Physics · Minors in Mathematics and ECE",
        items: [
          {
            date: "2025—PRESENT",
            title: "KouBit Lab",
            body: "Research on superconducting quantum devices across device design, materials processing, cryogenic microwave measurement, and quantum-system modeling.",
          },
        ],
      },
      {
        level: "HIGH SCHOOL",
        date: "2021—2024",
        school: "Beijing National Day School",
        program: "Selected activities and roles",
        items: [
          {
            date: "2023—2024",
            title: "Teaching Assistant, AP Physics C",
            body: "Created practice problems and led review sessions in mechanics and electromagnetism.",
          },
          {
            date: "2024",
            title: "Mathematical modeling competition problem writer & student judge",
            body: "Designed a landscape-resource allocation problem, evaluated submissions, and presented modeling approaches.",
          },
          {
            date: "2021—2024",
            title: "President, Cycling Club",
            body: "Organized weekly rides, safety training, uniform production, and bicycle repair support for the community.",
          },
        ],
      },
    ],
    noteLabel: "WRITING / 微信公众号",
    noteTitle: "光速甩弹簧",
    noteBody:
      "A WeChat public account for notes on physics and learning.",
    scan: "SCAN IN WECHAT",
    photographyLabel: "04 / PHOTOGRAPHY",
    photographyTitle: "Photography",
    photographyIntro: "Selected personal photography.",
    photoNames: ["White Lotus", "Lunar Eclipse", "Comet", "Lotus Bud"],
    cycling: "CYCLING",
    cyclingBody:
      "A long-term interest. Former president of the BNDS Cycling Club.",
    contactLabel: "05 / CONTACT",
    contactTitle: "Contact",
    personal: "PERSONAL",
    school: "UNIVERSITY",
    footer: "李培炎 · Peiyan Li",
    switchLanguage: "切换至中文",
    switchTheme: "Switch light / dark",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [activeTab, setActiveTab] = useState<SectionTab>("home");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const t = copy[language];
  const projectGalleries = [t.tinGallery, t.jtwpaGallery, t.qutipGallery, t.oscillatorGallery] as const;
  const projectCovers = ["/images/tin/mla150.jpg", "/images/jtwpa/sample-wirebonding.jpg", "/images/qutip/single-qubit-y-gate.png", "/images/oscillator/simulation-experiment.png"] as const;

  useEffect(() => {
    const saved = window.localStorage.getItem("peiyan-theme") as Theme | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    const requestedTab = window.location.hash.slice(1) as SectionTab;
    if (["research", "journey", "photography", "notes", "contact"].includes(requestedTab)) {
      setActiveTab(requestedTab);
    }
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const galleryLength = projectGalleries[lightbox.projectIndex].length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") setLightbox((current) => current ? { ...current, imageIndex: (current.imageIndex - 1 + galleryLength) % galleryLength } : null);
      if (event.key === "ArrowRight") setLightbox((current) => current ? { ...current, imageIndex: (current.imageIndex + 1) % galleryLength } : null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, language]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("peiyan-theme", next);
  };

  const switchTab = (tab: SectionTab) => {
    setActiveTab(tab);
    const target = tab === "home" ? window.location.pathname : `#${tab}`;
    window.history.replaceState(null, "", target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main lang={language === "zh" ? "zh-CN" : "en"}>
      <header className="site-header">
        <button className="brand" onClick={() => switchTab("home")} aria-label="Peiyan Li — home">
          <img src="/images/lotus-avatar.jpg" alt="" />
          <span>PEIYAN LI</span>
        </button>
        <nav aria-label="Primary navigation">
          {t.nav.map(([label, tab]) => (
            <button className={activeTab === tab ? "active" : ""} onClick={() => switchTab(tab as SectionTab)} key={tab}>{label}</button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="text-toggle" onClick={() => setLanguage(language === "zh" ? "en" : "zh")} aria-label={t.switchLanguage}>
            {language === "zh" ? "EN" : "中"}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={t.switchTheme}>
            <span aria-hidden="true">{theme === "light" ? "●" : "○"}</span>
          </button>
        </div>
      </header>

      {activeTab === "home" && <>
      <section className="hero section-shell" id="top">
        <figure className="profile-portrait">
          <img src="/images/portrait-outdoor.jpg" alt={language === "zh" ? "李培炎在黄山西海大峡谷" : "Peiyan Li at the West Sea Grand Canyon, Huangshan"} />
          <figcaption>{t.portraitCaption}</figcaption>
        </figure>
        <div className="hero-copy">
          <h1><span>{t.heroLine1}</span><span className="serif-italic">{t.heroLine2}</span></h1>
          <div className="profile-summary">
            <p>{t.aboutBody}</p>
            <div className="fact-grid">
              <div><span>{t.current}</span><p>{t.currentBody}</p></div>
              <div><span>{t.focus}</span><p>{t.focusBody}</p></div>
            </div>
          </div>
          <div className="hero-actions">
            <button className="button primary" onClick={() => switchTab("research")}>{t.viewWork} <span aria-hidden="true">→</span></button>
            <button className="button secondary" onClick={() => switchTab("contact")}>{t.download} <span aria-hidden="true">→</span></button>
          </div>
          <div className="location-line"><span className="pulse" />{t.locations}</div>
        </div>
      </section>
      </>}

      {activeTab === "research" && (
      <section className="research" id="research">
        <div className="section-shell">
          <div className="section-heading light-on-dark">
            <div><p className="section-label">{t.researchLabel}</p><h2>{t.researchTitle}</h2></div>
            <p>{t.researchIntro}</p>
          </div>
          <div className="research-kicker"><span>{t.selected}</span><span>2023—2026</span></div>
          <div className="research-grid">
            {t.researchCards.map((card, index) => {
              const gallery = projectGalleries[index];
              const coverImage = projectCovers[index];
              const galleryId = `project-gallery-${index}`;
              const hasGallery = gallery !== null;
              const isExpanded = expandedProject === index;
              return (
                <article className={`research-card${hasGallery ? " has-gallery" : ""}${isExpanded ? " expanded" : ""}`} key={card.title}>
                  <div className="card-index">0{index + 1}</div>
                  <div className="card-meta"><span>{card.year}</span><span>{card.tag}</span></div>
                  <div className="research-card-copy">
                    <h3>{card.title}</h3><p>{card.body}</p>
                    {hasGallery && (
                      <button className="project-toggle" aria-expanded={isExpanded} aria-controls={galleryId} onClick={() => setExpandedProject(isExpanded ? null : index)}>
                        <span>{isExpanded ? t.galleryClose : t.galleryOpen}</span><b aria-hidden="true">{isExpanded ? "−" : "+"}</b>
                      </button>
                    )}
                  </div>
                  {hasGallery && (
                    <button className="project-cover" aria-label={isExpanded ? t.galleryClose : t.galleryOpen} aria-expanded={isExpanded} aria-controls={galleryId} onClick={() => setExpandedProject(isExpanded ? null : index)}>
                      <img src={coverImage} alt="" />
                    </button>
                  )}
                  {hasGallery && (
                    <div className={`project-gallery-wrap${isExpanded ? " open" : ""}`} id={galleryId} aria-hidden={!isExpanded}>
                      <div className="project-gallery-clip">
                        <div className="project-gallery">
                          {gallery.map(([src, caption], imageIndex) => (
                            <figure key={src}><button className="gallery-thumbnail" disabled={!isExpanded} onClick={() => setLightbox({ projectIndex: index, imageIndex })} aria-label={caption}><img src={src} alt={caption} loading="lazy" /></button><figcaption>{caption}</figcaption></figure>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {activeTab === "journey" && (
      <section className="journey section-shell" id="journey">
        <div className="section-heading">
          <div><p className="section-label">{t.journeyLabel}</p><h2>{t.journeyTitle}</h2></div>
        </div>
        <div className="education-groups">
          {t.journeyGroups.map((group, groupIndex) => (
            <section className="education-group" key={group.level}>
              <header className="education-header">
                <span className="timeline-number">0{groupIndex + 1}</span>
                <div><p>{group.level}</p><h3>{group.school}</h3><span>{group.program}</span></div>
                <span className="timeline-date">{group.date}</span>
              </header>
              <div className="education-items">
                {group.items.map((item) => (
                  <article className="education-item" key={item.title}>
                    <span>{item.date}</span>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      )}

      {activeTab === "notes" && (
      <section className="wechat-section section-shell">
        <div className="wechat-card">
          <div className="wechat-copy">
            <p className="section-label">{t.noteLabel}</p>
            <h2>{t.noteTitle}</h2>
            <p>{t.noteBody}</p>
          </div>
          <div className="spring-mark" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <div className="qr-wrap">
            <img src="/images/wechat-qr.jpg" alt={language === "zh" ? "光速甩弹簧微信公众号二维码" : "QR code for the WeChat public account 光速甩弹簧"} />
            <span>{t.scan}</span>
          </div>
        </div>
      </section>
      )}

      {activeTab === "photography" && (
      <section className="photography" id="photography">
        <div className="section-shell">
          <div className="section-heading photo-heading">
            <div><p className="section-label">{t.photographyLabel}</p><h2>{t.photographyTitle}</h2></div>
            <p>{t.photographyIntro}</p>
          </div>
          <div className="photo-grid">
            {[
              ["/images/lotus-white.jpg", t.photoNames[0], "photo-wide"],
              ["/images/lunar-eclipse.jpg", t.photoNames[1], "photo-tall"],
              ["/images/comet.jpg", t.photoNames[2], "photo-wide"],
              ["/images/lotus-bud.jpg", t.photoNames[3], "photo-tall"],
            ].map(([src, title, className], index) => (
              <figure className={`photo-card ${className}`} key={src}>
                <img src={src} alt={title} />
                <figcaption><span>0{index + 1}</span><span>{title}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="cycling-note">
            <span className="wheel" aria-hidden="true" />
            <div><p className="section-label">{t.cycling}</p><p>{t.cyclingBody}</p></div>
          </div>
        </div>
      </section>
      )}

      {activeTab === "contact" && (
      <section className="contact section-shell" id="contact">
        <p className="section-label">{t.contactLabel}</p>
        <h2>{t.contactTitle}</h2>
        <div className="contact-grid">
          <a href="mailto:Li_Peiyan@outlook.com"><span>{t.personal}</span><strong>Li_Peiyan@outlook.com</strong><b aria-hidden="true">↗</b></a>
          <a href="mailto:peiyanl2@illinois.edu"><span>{t.school}</span><strong>peiyanl2@illinois.edu</strong><b aria-hidden="true">↗</b></a>
          <a href="https://github.com/peiyanli23" target="_blank" rel="noreferrer"><span>GITHUB</span><strong>@peiyanli23</strong><b aria-hidden="true">↗</b></a>
          <a href="https://linkedin.com/in/peiyanli23" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>/in/peiyanli23</strong><b aria-hidden="true">↗</b></a>
        </div>
      </section>
      )}

      {lightbox && (() => {
        const gallery = projectGalleries[lightbox.projectIndex];
        const [src, caption] = gallery[lightbox.imageIndex];
        const move = (direction: number) => setLightbox((current) => current ? { ...current, imageIndex: (current.imageIndex + direction + gallery.length) % gallery.length } : null);
        return (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={caption} onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label={language === "zh" ? "关闭大图" : "Close image"}>×</button>
            <button className="lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label={language === "zh" ? "上一张" : "Previous image"}>←</button>
            <figure onClick={(event) => event.stopPropagation()}>
              <img src={src} alt={caption} />
              <figcaption><span>{caption}</span><b>{lightbox.imageIndex + 1} / {gallery.length}</b></figcaption>
            </figure>
            <button className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label={language === "zh" ? "下一张" : "Next image"}>→</button>
          </div>
        );
      })()}

      <footer className="site-footer section-shell">
        <strong>{t.footer}</strong><span>© 2026</span>
      </footer>
    </main>
  );
}
