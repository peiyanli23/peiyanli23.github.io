export type ArchiveCategory =
  | "projects"
  | "reports-papers"
  | "course-notes"
  | "talks-presentations"
  | "awards-acknowledgements";

export type ArchiveLinkType =
  | "website"
  | "github"
  | "source-code"
  | "project-report"
  | "technical-report"
  | "competition-paper"
  | "course-report"
  | "code"
  | "slides"
  | "presentation"
  | "supporting-material"
  | "notes"
  | "educational-notes"
  | "seminar-notes";

export type ArchiveLink = {
  label: string;
  url: string;
  type: ArchiveLinkType;
};

export type ArchiveEntry = {
  title: string;
  titleZh?: string;
  year: number;
  category: ArchiveCategory;
  links?: ArchiveLink[];
  subtitle?: string;
  subtitleZh?: string;
  collaborators?: string[];
  note?: string;
  noteZh?: string;
  dateLabel?: string;
  dateLabelZh?: string;
  order: number;
};

export const archiveEntries: ArchiveEntry[] = [
  {
    title: "Fundamental Quantum Mechanics for Beginners",
    titleZh: "面向初学者的基础量子力学",
    year: 2025,
    category: "projects",
    links: [
      {
        label: "Educational Notes",
        url: "/archive/fundamental-quantum-mechanics-for-beginners.pdf",
        type: "educational-notes",
      },
    ],
    note:
      "An independently written introduction to quantum mechanics covering wave functions, operators, representations, canonical model systems, and perturbation theory, with an emphasis on connecting mathematical structure to physical interpretation. This document is a work in progress and will be expanded and revised as my understanding develops.",
    noteZh:
      "一份独立撰写的量子力学导论，内容涵盖波函数、算符、表象、典型模型体系与微扰理论，重点在于将数学结构与物理解释联系起来。本文档仍在持续完善中，将随着理解的深入继续扩充和修订。",
    order: 1,
  },
  {
    title: "MaxCut with Quantum Circuits",
    titleZh: "使用量子电路求解最大割问题",
    year: 2025,
    category: "projects",
    note:
      "Developed a graph-aware variational quantum-circuit construction method for MaxCut using Qiskit and NetworkX. The method detected graph structures to reduce unnecessary gates, adapted circuit construction for non-bipartite and non-Eulerian cases, and incorporated weighted balance and connectivity penalties into the objective for numerical optimization.",
    noteZh:
      "使用 Qiskit 与 NetworkX 开发了一种面向图结构的 MaxCut 变分量子电路构造方法。该方法通过识别图结构减少不必要的量子门，针对非二分图和非欧拉图调整电路构造，并在数值优化目标中加入加权平衡项与连通性惩罚项。",
    order: 2,
  },
  {
    title:
      "Damped Magneto-Mechanical Coupled Oscillations: Classical Modeling, Numerical Simulation, and Fourier Analysis",
    titleZh: "基于经典力学和傅里叶变换的带阻尼磁机械耦合振动分析",
    year: 2023,
    category: "projects",
    links: [
      {
        label: "Project Report",
        url: "/archive/damped-magneto-mechanical-coupled-oscillations-report.pdf",
        type: "project-report",
      },
    ],
    note:
      "We developed a classical model of two magnetically coupled elastic oscillators, incorporating elastic, magnetic, gravitational, and damping effects. We implemented an RK4 numerical solver in Excel, analyzed the simulated and measured signals using FFT, and compared the predicted frequency components with experimental results.",
    noteZh:
      "我们建立了两个磁耦合弹性振子的经典模型，纳入弹性、磁力、重力与阻尼效应；在 Excel 中实现 RK4 数值求解，并使用 FFT 分析模拟信号与实测信号，对比模型预测的频率成分与实验结果。",
    order: 1,
  },
  {
    title:
      "A Regional Planning Scoring System Based on Environmental Compatibility and Population–Industry Gravity Models",
    titleZh: "基于自然条件契合度与人口产业引力模型的地区规划评分系统",
    year: 2023,
    category: "projects",
    links: [
      {
        label: "Competition Paper",
        url: "/archive/regional-planning-environmental-compatibility-gravity-models.pdf",
        type: "competition-paper",
      },
    ],
    note:
      "We developed a quantitative land-use evaluation system combining environmental compatibility, population–industry potential, and surrounding-industry effects. The model incorporated statistical normalization, gravity-inspired spatial integrals, road accessibility, and image filtering of nighttime-light data to compare alternative regional development plans.",
    noteZh:
      "我们建立了一个定量土地利用评价体系，综合考虑环境契合度、人口—产业发展潜力及周边产业效应。模型结合统计归一化、受引力模型启发的空间积分、道路可达性与夜间灯光数据的图像滤波，用于比较不同的区域发展方案。",
    order: 2,
  },
  {
    title:
      "Resource Allocation Decisions Based on Game Theory and Multiple Fairness Criteria",
    titleZh: "基于博弈和多种公平准则的物资分配决策",
    year: 2024,
    category: "projects",
    links: [
      {
        label: "Competition Paper",
        url: "/archive/resource-allocation-game-theory-fairness.pdf",
        type: "competition-paper",
      },
    ],
    note:
      "We developed a modular resource-allocation framework based on several definitions of fairness and efficiency. The models combined dynamic games, penalty-based utility, mutually beneficial exchanges, centroid-based fairness metrics, shared resources, and interactions between related items to explore the trade-off between equality and total utility.",
    noteZh:
      "我们基于多种公平与效率定义建立了模块化物资分配框架。模型结合动态博弈、惩罚型效用、互利交换、基于质心的公平指标、共享资源以及关联物品间的相互作用，用以分析平等程度与总体效用之间的权衡。",
    order: 2,
  },
  {
    title:
      "Robot Logistics Routing Using Road Utility and Graph-Based Optimization",
    titleZh: "基于道路实用性的校园物流集散模型",
    year: 2022,
    category: "projects",
    links: [
      {
        label: "Competition Paper",
        url: "/archive/robot-logistics-road-utility-graph-optimization.pdf",
        type: "competition-paper",
      },
    ],
    note:
      "We represented a campus transportation network as a weighted graph and developed a routing algorithm using Dijkstra shortest paths, decision trees, and greedy optimization. We introduced the concepts of “road utility” and low-accessibility nodes, designed a separate optimization strategy for low remaining loads, and compared the resulting routes and runtime with a conventional CVRP approach.",
    noteZh:
      "我们将校园交通网络表示为加权图，并结合 Dijkstra 最短路径、决策树与贪心优化设计路线算法。项目引入“道路实用性”和低可达性节点的概念，针对低剩余载荷设计独立优化策略，并将所得路线与运行时间同传统 CVRP 方法进行比较。",
    order: 1,
  },
  {
    title:
      "Traveling-Wave Parametric Amplifiers: Principles, Architectures, and Recent Developments",
    titleZh: "行波参量放大器：原理、架构与近期进展",
    year: 2026,
    category: "talks-presentations",
    links: [
      {
        label: "Slides",
        url: "/archive/jpa-and-twpa-seminar.pdf",
        type: "slides",
      },
    ],
    note:
      "An internal technical seminar introducing the operating principles of traveling-wave parametric amplifiers, including nonlinear wave mixing, phase matching, dispersion and impedance engineering, major superconducting device architectures, and recent developments in the field.",
    noteZh:
      "一次内部技术研讨分享，介绍行波参量放大器的工作原理，包括非线性波混频、相位匹配、色散与阻抗工程、主要超导器件架构及该领域的近期进展。",
    order: 1,
  },
  {
    title: "How to Readout Superconducting Qubits",
    titleZh: "如何读取超导量子比特",
    year: 2026,
    category: "talks-presentations",
    links: [
      {
        label: "Slides",
        url: "/archive/how-to-readout-superconducting-qubits.pdf",
        type: "slides",
      },
    ],
    note:
      "I presented a talk in PHYS 496 introducing the readout chain of superconducting qubits.",
    noteZh:
      "我在 PHYS 496 课程中进行了一次演讲，介绍超导量子比特的读取链路。",
    order: 2,
  },
  {
    title: "Dean’s List for Academic Excellence, UIUC",
    titleZh: "UIUC 学业优秀院长名单",
    year: 2026,
    category: "awards-acknowledgements",
    dateLabel: "Spring 2026",
    dateLabelZh: "2026 春季",
    order: 1,
  },
  {
    title: "Grainger College of Engineering Achievement Scholarship, UIUC",
    titleZh: "UIUC Grainger 工程学院成就奖学金",
    year: 2026,
    category: "awards-acknowledgements",
    dateLabel: "May 2026",
    dateLabelZh: "2026 年 5 月",
    order: 2,
  },
  {
    title: "John A. Gardner, Jr. Undergraduate Research Award Nominee, UIUC",
    titleZh: "UIUC John A. Gardner, Jr. 本科生研究奖提名",
    year: 2026,
    category: "awards-acknowledgements",
    dateLabel: "Apr. 2026",
    dateLabelZh: "2026 年 4 月",
    order: 3,
  },
  {
    title: "Dean’s List for Academic Excellence, UIUC",
    titleZh: "UIUC 学业优秀院长名单",
    year: 2025,
    category: "awards-acknowledgements",
    dateLabel: "Fall 2025",
    dateLabelZh: "2025 秋季",
    order: 1,
  },
  {
    title: "Illinois Engineering Achievement Scholarship, UIUC",
    titleZh: "UIUC Illinois Engineering 成就奖学金",
    year: 2025,
    category: "awards-acknowledgements",
    dateLabel: "Sept. 2025",
    dateLabelZh: "2025 年 9 月",
    order: 2,
  },
  {
    title: "Dean’s List for Academic Excellence, UIUC",
    titleZh: "UIUC 学业优秀院长名单",
    year: 2025,
    category: "awards-acknowledgements",
    dateLabel: "Spring 2025",
    dateLabelZh: "2025 春季",
    order: 3,
  },
  {
    title: "Dean’s List for Academic Excellence, UIUC",
    titleZh: "UIUC 学业优秀院长名单",
    year: 2024,
    category: "awards-acknowledgements",
    dateLabel: "Fall 2024",
    dateLabelZh: "2024 秋季",
    order: 1,
  },
  {
    title:
      "Honorable Prize, International Mathematical Modeling Challenge, Greater China",
    titleZh: "国际数学建模挑战赛（大中华赛区）荣誉奖",
    year: 2024,
    category: "awards-acknowledgements",
    dateLabel: "Feb. 2024",
    dateLabelZh: "2024 年 2 月",
    order: 2,
  },
  {
    title:
      "Meritorious Prize, International Mathematical Modeling Challenge, International",
    titleZh: "国际数学建模挑战赛（国际赛）优异奖",
    year: 2023,
    category: "awards-acknowledgements",
    dateLabel: "Feb. 2023",
    dateLabelZh: "2023 年 2 月",
    order: 1,
  },
  {
    title:
      "Meritorious Prize, International Mathematical Modeling Challenge, Greater China",
    titleZh: "国际数学建模挑战赛（大中华赛区）优异奖",
    year: 2022,
    category: "awards-acknowledgements",
    dateLabel: "Dec. 2022",
    dateLabelZh: "2022 年 12 月",
    order: 1,
  },
];

export const archiveCategoryOrder: ArchiveCategory[] = [
  "projects",
  "reports-papers",
  "course-notes",
  "talks-presentations",
  "awards-acknowledgements",
];

export function getArchiveEntries(category: ArchiveCategory) {
  return archiveEntries
    .filter((entry) => entry.category === category)
    .sort((a, b) => b.year - a.year || a.order - b.order);
}
