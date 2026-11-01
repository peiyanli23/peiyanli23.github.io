"use client";

import { useEffect, useState } from "react";

type Language = "zh" | "en";
type Theme = "light" | "dark";
type SectionTab = "home" | "research" | "journey" | "photography" | "notes" | "contact";
type LightboxState = { projectIndex: number; imageIndex: number } | null;
type GalleryItem = readonly [string, string];

const copy = {
  zh: {
    nav: [
      ["首页", "home"],
      ["研究", "research"],
      ["档案", "archive"],
      ["教育", "journey"],
      ["写作", "notes"],
      ["摄影", "photography"],
      ["联系", "contact"],
    ],
    eyebrow: "物理学 · 量子器件 · 摄影",
    heroLine1: "李培炎",
    heroLine2: "",
    intro:
      "物理学本科生；参与超导量子器件研究，使用微波测量与材料加工方法。北京 / Urbana。",
    viewWork: "查看研究",
    download: "简历可邮件索取",
    portraitCaption: "2025 · 中国黄山",
    aboutLabel: "01 / 关于",
    aboutTitle: "研究方向与背景",
    aboutBody:
      "李培炎是伊利诺伊大学厄巴纳－香槟分校物理学专业本科生，目前在 Angela Kou 教授的研究组开展超导量子计算研究。他最初通过使用 QuTiP 进行数值模拟进入这一领域，通过复现已发表研究中的结果，逐步理解超导量子电路的基本模型与理论概念。\n\n2025 年 9 月，他在 Kou Lab 开始实验研究，从事超导材料、器件制备与微波表征工作。2026 年夏季，他还在北京量子信息科学研究院于海峰研究组开展研究，主要研究约瑟夫森行波参量放大器的设计与实验表征。\n\n他目前的研究聚焦于面向量子电路应用的高动能电感超导材料，尤其是氮化钛（TiN）。他研究降低微波损耗、提升器件性能的材料处理与制备方法，并探索动能电感在新型超导电路元件中的应用。这些工作连接材料优化、器件制备、微波设计与低温表征。",
    homeEducation: "教育",
    homeEducationBody: "伊利诺伊大学厄巴纳－香槟分校",
    biography: "个人简介",
    current: "教育",
    currentBody: "物理学本科 · UIUC\n辅修：量子信息科学；电气与计算机工程；数学",
    focus: "研究与技能",
    focusBody: "超导量子器件\n微波测量 · 材料与加工",
    researchLabel: "02 / 研究与项目",
    researchTitle: "研究",
    researchIntro: "当前研究经历与项目。",
    selected: "精选工作",
    affiliations: [
      ["Kou Lab | University of Illinois Urbana-Champaign", "本科研究员 | 2025 年 9 月—至今"],
      ["量子计算云平台硬件研发组 | 北京量子信息科学研究院", "本科研究员 | 2026 年 5 月—至今"],
    ],
    pastGroup: "过往项目",
    pastRole: "计算物理项目 | 2023",
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
        tag: "KOU LAB · UIUC",
        title: "TiN 材料处理与微波损耗",
        body: "氮化钛（TiN）是超导量子电路，尤其是使用动能电感的器件中一种很有前景的材料。然而，材料无序、表面氧化物以及制备过程引入的缺陷可能造成微波损耗，并限制器件性能。我目前正在研究不同的处理技术，以改善 TiN 薄膜的材料和表面性质。通过表面处理和可控刻蚀工艺，我们探索了减少表面氧化并提高超导谐振器内品质因数的方法。我也对超导和电学性质的变化进行表征，以进一步理解这些工艺的影响。此外，我为不同厚度的 TiN 薄膜设计共面波导谐振器，用于表征其微波性能并评估制备工艺改进的效果。这项工作旨在建立高品质 TiN 微波器件的可靠制备方法，并支持基于 TiN 的超导量子比特开发。",
      },
      {
        year: "2025—至今",
        tag: "KOU LAB · UIUC",
        title: "超导钽空气桥制备",
        body: "空气桥广泛用于超导微波电路，以抑制不需要的电磁模式并改善器件性能。然而，制备机械稳定的长跨度超导空气桥仍具有挑战性，尤其是在需要兼容现有器件制备流程的情况下。在这个项目中，我开发一种基于室温溅射超导 α 相钽的空气桥制备工艺。我研究光刻图形化、桥体形成和释放技术，同时设计并评估不同的桥体几何结构，以提高结构稳定性和制备良率。我们目前的工作重点是建立可重复的长跨度钽空气桥工艺，并将其集成到超导微波电路中，以减少寄生电磁效应并可能改善器件相干性。",
      },
      {
        year: "2025—至今",
        tag: "KOU LAB · UIUC",
        title: "TiN 纳米线 Transmon",
        body: "TiN 的高动能电感为开发非线性超导电路元件提供了机会。动能电感非线性已经广泛应用于超导参量放大器及其他微波器件。传统 transmon 量子比特依靠约瑟夫森结提供强非线性，但结中的非晶氧化物势垒可能引入缺陷和介电损耗。以超导纳米线替代约瑟夫森结，为实现无氧化物势垒量子比特提供了一条潜在路径。然而，在保持较低微波损耗的同时获得足够的非谐性仍然具有挑战，尤其对于超薄 TiN 薄膜。在这个项目中，我们正在研究改善 TiN 纳米线性质的制备和材料处理方法，希望为超导量子比特应用在非线性与相干性之间取得良好平衡。",
      },
      {
        year: "2026—至今",
        tag: "BAQIS · 于海峰研究组",
        title: "约瑟夫森行波参量放大器",
        body: "约瑟夫森行波参量放大器（JTWPA）对于超导量子测量系统中微弱微波信号的宽带、低噪声放大十分重要。实现稳定放大需要精确控制器件中的非线性波传播、相位匹配和阻抗匹配。在这个项目中，我从事基于约瑟夫森结阵列的电容相位匹配 JTWPA 的设计与实验表征。我开发包含阻抗工程和相位匹配结构的电路版图，并研究微波传输及泵浦依赖的放大行为。通过结合理论分析与实验观察，我发现了改善约瑟夫森结制备工艺的机会，并在实验中观察到放大器增益的提升。我们目前继续优化器件设计和制备，以实现稳定的宽带参量增益。",
      },
      {
        year: "2025",
        tag: "PAST PROJECT",
        title: "使用 QuTiP 熟悉超导量子比特",
        body: "使用 QuTiP 对超导量子电路中的基本模型、控制、读出和量子门进行数值模拟，并通过复现已发表研究中的结果建立对相关理论概念的理解。",
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
    journeyTitle: "教育",
    journeyGroups: [
      {
        level: "大学",
        date: "2024—至今",
        school: "University of Illinois Urbana-Champaign",
        program: "物理学本科 · 辅修：量子信息科学；电气与计算机工程；数学",
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
        program: "高中",
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
      "我正在运营微信公众号“光速甩弹簧”，分享物理知识和学习笔记。",
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
      ["Archive", "archive"],
      ["Education", "journey"],
      ["Writing", "notes"],
      ["Photography", "photography"],
      ["Contact", "contact"],
    ],
    eyebrow: "PHYSICS · QUANTUM DEVICES · PHOTOGRAPHY",
    heroLine1: "Peiyan Li",
    heroLine2: "",
    intro:
      "Physics undergraduate conducting research on superconducting quantum devices using microwave measurement and materials processing. Beijing / Urbana.",
    viewWork: "View research",
    download: "CV available by email",
    portraitCaption: "2025 · Huangshan, China",
    aboutLabel: "01 / ABOUT",
    aboutTitle: "Research & technical background",
    aboutBody:
      "Peiyan Li is an undergraduate student majoring in Physics at the University of Illinois Urbana-Champaign. He is currently conducting research in superconducting quantum computing in Prof. Angela Kou's research group. He first entered this field through numerical simulations using QuTiP, reproducing results from published research to develop an understanding of fundamental models and theoretical concepts in superconducting quantum circuits.\n\nIn September 2025, he began his experimental research at Kou Lab, working on superconducting materials, device fabrication, and microwave characterization. During the summer of 2026, he also conducted research in Haifeng Yu's group at the Beijing Academy of Quantum Information Sciences (BAQIS), focusing on the design and experimental characterization of Josephson traveling-wave parametric amplifiers.\n\nHis current research focuses on high-kinetic-inductance superconducting materials, particularly titanium nitride (TiN), for quantum circuit applications. He investigates material processing and fabrication techniques to reduce microwave losses and improve device performance, while exploring the use of kinetic inductance in novel superconducting circuit elements. His work connects material optimization with device fabrication, microwave design, and cryogenic characterization.",
    homeEducation: "Education",
    homeEducationBody: "University of Illinois Urbana-Champaign",
    biography: "Biography",
    current: "EDUCATION",
    currentBody:
      "B.S. Physics · UIUC\nMinors in Quantum Information Science; Electrical and Computer Engineering; Mathematics",
    focus: "RESEARCH & SKILLS",
    focusBody: "Superconducting quantum devices\nMicrowave measurement · materials",
    researchLabel: "02 / RESEARCH & PROJECTS",
    researchTitle: "Research",
    researchIntro: "Current research experience and selected projects.",
    selected: "SELECTED WORK",
    affiliations: [
      ["Kou Lab | University of Illinois Urbana-Champaign", "Undergraduate Researcher | September 2025 – Present"],
      ["Quantum Computing Cloud Platform Hardware R&D Group | Beijing Academy of Quantum Information Sciences", "Undergraduate Researcher | May 2026 – Present"],
    ],
    pastGroup: "Past Project",
    pastRole: "Computational Physics Project | 2023",
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
        tag: "KOU LAB · UIUC",
        title: "TiN Materials Processing and Microwave Loss",
        body: "Titanium nitride (TiN) is a promising material for superconducting quantum circuits, particularly for devices utilizing kinetic inductance. However, material disorder, surface oxides, and fabrication-induced defects can introduce microwave losses that limit device performance. I'm currently investigating different processing techniques to improve the material and surface properties of TiN thin films. Through surface treatments and controlled etching processes, we have explored ways to reduce surface oxidation and improve the internal quality factors of superconducting resonators. I also characterize changes in superconducting and electrical properties to better understand the effects of these processes. In addition, I design coplanar waveguide resonators for TiN films of different thicknesses to characterize their microwave performance and evaluate the effectiveness of fabrication improvements. This work aims to establish reliable fabrication approaches for high-quality TiN microwave devices and support the development of TiN-based superconducting qubits.",
      },
      {
        year: "2025—NOW",
        tag: "KOU LAB · UIUC",
        title: "Superconducting Ta Air-Bridge Fabrication",
        body: "Air bridges are widely used in superconducting microwave circuits to suppress unwanted electromagnetic modes and improve device performance. However, fabricating mechanically stable, long-span superconducting air bridges remains challenging, particularly when compatibility with existing device fabrication processes is required. In this project, I develop an air-bridge fabrication process based on room-temperature sputtering of superconducting α-phase tantalum. I investigate lithographic patterning, bridge formation, and release techniques, while designing and evaluating different bridge geometries to improve structural stability and fabrication yield. Our ongoing work focuses on establishing a reproducible process for long-span tantalum air bridges and integrating them into superconducting microwave circuits to reduce parasitic electromagnetic effects and potentially improve device coherence.",
      },
      {
        year: "2025—NOW",
        tag: "KOU LAB · UIUC",
        title: "TiN Nanowire Transmons",
        body: "The high kinetic inductance of TiN offers opportunities for developing nonlinear superconducting circuit elements. Kinetic-inductance nonlinearity has already been widely explored in superconducting parametric amplifiers and other microwave devices. Conventional transmon qubits rely on Josephson junctions to provide strong nonlinearity, but the amorphous oxide barriers used in these junctions can introduce defects and dielectric loss. Replacing Josephson junctions with superconducting nanowires offers a potential route toward oxide-barrier-free qubits. However, achieving sufficient anharmonicity while maintaining low microwave loss remains a challenge, particularly for ultrathin TiN films. In this project, we are investigating fabrication and material-processing approaches to improve the properties of TiN nanowires, aiming to achieve a favorable balance between nonlinearity and coherence for superconducting qubit applications.",
      },
      {
        year: "2026—NOW",
        tag: "BAQIS · HAIFENG YU GROUP",
        title: "Josephson Traveling-Wave Parametric Amplifiers",
        body: "Josephson traveling-wave parametric amplifiers (JTWPAs) are important for broadband, low-noise amplification of weak microwave signals in superconducting quantum measurement systems. Achieving stable amplification requires careful control of nonlinear wave propagation, phase matching, and impedance matching across the device. In this project, I work on the design and experimental characterization of capacitively phase-matched JTWPAs based on Josephson junction arrays. I develop circuit layouts incorporating impedance engineering and phase-matching structures, and investigate microwave transmission and pump-dependent amplification behavior. By combining theoretical analysis with experimental observations, I identified opportunities to improve the Josephson junction fabrication process, leading to experimentally observed improvements in amplifier gain. Our ongoing work focuses on further optimizing device design and fabrication toward stable broadband parametric gain.",
      },
      {
        year: "2025",
        tag: "PAST PROJECT",
        title: "Getting Familiar with Superconducting Qubits via QuTiP",
        body: "Used QuTiP to numerically explore fundamental models, control, readout, and quantum gates in superconducting quantum circuits, reproducing results from published research to develop an understanding of the underlying theoretical concepts.",
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
    journeyTitle: "Education",
    journeyGroups: [
      {
        level: "UNIVERSITY",
        date: "2024—PRESENT",
        school: "University of Illinois Urbana-Champaign",
        program:
          "B.S. Physics · Minors in Quantum Information Science; Electrical and Computer Engineering; Mathematics",
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
        program: "High School",
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
      "I am running a personal WeChat public account, 光速甩弹簧, where I share physics concepts and study notes.",
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
  const [languageReady, setLanguageReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [activeTab, setActiveTab] = useState<SectionTab>("home");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const t = copy[language];
  const researchGroups = [
    { name: t.affiliations[0][0], role: t.affiliations[0][1], projects: t.researchCards.slice(0, 3), gallery: t.tinGallery },
    { name: t.affiliations[1][0], role: t.affiliations[1][1], projects: t.researchCards.slice(3, 4), gallery: t.jtwpaGallery },
    { name: t.pastGroup, role: t.pastRole, projects: t.researchCards.slice(4, 6), gallery: null },
  ] as const;
  const projectGalleries: readonly (readonly GalleryItem[])[] = [t.tinGallery, t.jtwpaGallery, t.qutipGallery, t.oscillatorGallery];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("peiyan-language") as Language | null;
    if (savedLanguage === "zh" || savedLanguage === "en") setLanguage(savedLanguage);
    setLanguageReady(true);
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
    const galleryLength = projectGalleries[lightbox.projectIndex]!.length;
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

  const toggleLanguage = () => {
    const next = language === "zh" ? "en" : "zh";
    setLanguage(next);
    window.localStorage.setItem("peiyan-language", next);
  };

  const switchTab = (tab: SectionTab) => {
    setActiveTab(tab);
    const target = tab === "home" ? window.location.pathname : `#${tab}`;
    window.history.replaceState(null, "", target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={languageReady ? "language-ready" : "language-loading"} lang={language === "zh" ? "zh-CN" : "en"}>
      <header className="site-header">
        <button className="brand" onClick={() => switchTab("home")} aria-label="Peiyan Li — home">
          <img src="/images/lotus-avatar.jpg" alt="" />
          <span>PEIYAN LI</span>
        </button>
        <nav aria-label="Primary navigation">
          {t.nav.map(([label, tab]) => tab === "archive" ? (
            <a href="/archive/" key={tab}>{label}</a>
          ) : (
            <button className={activeTab === tab ? "active" : ""} onClick={() => switchTab(tab as SectionTab)} key={tab}>{label}</button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="text-toggle" onClick={toggleLanguage} aria-label={t.switchLanguage}>
            {language === "zh" ? "EN" : "中"}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={t.switchTheme}>
            <span aria-hidden="true">{theme === "light" ? "●" : "○"}</span>
          </button>
        </div>
      </header>

      {activeTab === "home" && <>
      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <figure className="profile-portrait">
            <img src="/images/portrait-outdoor.jpg" alt={language === "zh" ? "李培炎在黄山西海大峡谷" : "Peiyan Li at the West Sea Grand Canyon, Huangshan"} />
            <figcaption className="portrait-links">
              <button onClick={() => switchTab("research")}>{t.viewWork} <span aria-hidden="true">→</span></button>
              <a href="mailto:Li_Peiyan@outlook.com">{t.download} <span aria-hidden="true">→</span></a>
            </figcaption>
          </figure>
          <h1><span>{t.heroLine1}</span></h1>
          <div className="profile-summary">
            <section className="home-education"><h2>{t.homeEducation}</h2><p>{t.homeEducationBody}</p></section>
            <h2>{t.biography}</h2>
            <p>{t.aboutBody}</p>
          </div>
        </div>
      </section>
      </>}

      {activeTab === "research" && (
      <section className="research" id="research">
        <div className="section-shell">
          <div className="research-page-title"><h2>{t.researchTitle}</h2></div>
          <div className="research-groups">
            {researchGroups.map((group, groupIndex) => {
              const galleryId = `research-group-gallery-${groupIndex}`;
              const isExpanded = expandedProject === groupIndex;
              return (
                <section className="research-group" key={group.name}>
                  <header className="research-group-header">
                    <div><h3>{group.name}</h3><p>{group.role}</p></div>
                  </header>
                  <div className="research-group-projects">
                    {group.projects.map((card, projectIndex) => {
                      const isPastProject = groupIndex === 2;
                      const galleryIndex = isPastProject ? projectIndex + 2 : groupIndex;
                      const projectGalleryId = `past-project-gallery-${projectIndex}`;
                      const isProjectExpanded = expandedProject === galleryIndex;
                      return (
                      <article className="research-project" key={card.title}>
                        <div><h4>{card.title}</h4><p>{card.body}</p></div>
                        {isPastProject && <>
                          <button className="project-toggle" aria-expanded={isProjectExpanded} aria-controls={projectGalleryId} onClick={() => setExpandedProject(isProjectExpanded ? null : galleryIndex)}>
                            <span>{isProjectExpanded ? t.galleryClose : t.galleryOpen}</span><b aria-hidden="true">{isProjectExpanded ? "−" : "+"}</b>
                          </button>
                          <div className={`project-gallery-wrap${isProjectExpanded ? " open" : ""}`} id={projectGalleryId} aria-hidden={!isProjectExpanded}>
                            <div className="project-gallery-clip"><div className="project-gallery">
                              {projectGalleries[galleryIndex].map(([src, caption], imageIndex) => (
                                <figure key={src}><button className="gallery-thumbnail" disabled={!isProjectExpanded} onClick={() => setLightbox({ projectIndex: galleryIndex, imageIndex })} aria-label={caption}><img src={src} alt={caption} loading="lazy" /></button><figcaption>{caption}</figcaption></figure>
                              ))}
                            </div></div>
                          </div>
                        </>}
                      </article>
                    );})}
                  </div>
                  {group.gallery && <div className="research-group-media">
                    <button className="project-toggle" aria-expanded={isExpanded} aria-controls={galleryId} onClick={() => setExpandedProject(isExpanded ? null : groupIndex)}>
                      <span>{isExpanded ? t.galleryClose : t.galleryOpen}</span><b aria-hidden="true">{isExpanded ? "−" : "+"}</b>
                    </button>
                  </div>
                  }{group.gallery && <div className={`project-gallery-wrap${isExpanded ? " open" : ""}`} id={galleryId} aria-hidden={!isExpanded}>
                    <div className="project-gallery-clip"><div className="project-gallery">
                      {group.gallery.map(([src, caption], imageIndex) => (
                        <figure key={src}><button className="gallery-thumbnail" disabled={!isExpanded} onClick={() => setLightbox({ projectIndex: groupIndex, imageIndex })} aria-label={caption}><img src={src} alt={caption} loading="lazy" /></button><figcaption>{caption}</figcaption></figure>
                      ))}
                    </div></div>
                  </div>}
                </section>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {activeTab === "journey" && (
      <section className="journey section-shell" id="journey">
        <div className="section-heading">
          <div><h2>{t.journeyTitle}</h2></div>
        </div>
        <div className="education-groups">
          {t.journeyGroups.map((group) => (
            <section className="education-group" key={group.level}>
              <header className="education-header">
                <div><h3>{group.school}</h3>{group.program && <span>{group.program}</span>}</div>
                <span className="timeline-date">{group.date}</span>
              </header>
              <div className="education-items">
                {group.items.map((item) => (
                  <article className="education-item" key={item.title}>
                    <h4>{item.title}</h4>
                    {item.title === "KouBit Lab" && (
                      <button className="education-research-link" onClick={() => switchTab("research")}>{t.viewWork} <span aria-hidden="true">→</span></button>
                    )}
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
            <div><h2>{t.photographyTitle}</h2></div>
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
            <div><p className="section-label">{t.cycling}</p></div>
          </div>
        </div>
      </section>
      )}

      {activeTab === "contact" && (
      <section className="contact section-shell" id="contact">
        <h2>{t.contactTitle}</h2>
        <div className="contact-list">
          <a href="mailto:Li_Peiyan@outlook.com"><span>{t.personal}</span><strong>Li_Peiyan@outlook.com</strong><b aria-hidden="true">↗</b></a>
          <a href="mailto:peiyanl2@illinois.edu"><span>{t.school}</span><strong>peiyanl2@illinois.edu</strong><b aria-hidden="true">↗</b></a>
          <a href="https://github.com/peiyanli23" target="_blank" rel="noreferrer"><span>GITHUB</span><strong>@peiyanli23</strong><b aria-hidden="true">↗</b></a>
          <a href="https://linkedin.com/in/peiyanli23" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>/in/peiyanli23</strong><b aria-hidden="true">↗</b></a>
        </div>
      </section>
      )}

      {lightbox && (() => {
        const gallery = projectGalleries[lightbox.projectIndex]!;
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
