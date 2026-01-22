// Importing assets
import projectTemplate from "../assets/Project_template.png";
import mermaidRender from "../assets/mermaid渲染.png";
import checkGui from "../assets/截屏2026-01-22 12.41.18.png";
import checkResults from "../assets/截屏2026-01-22 12.41.44.png";
import aiConversation from "../assets/截屏2026-01-22 17.03.45.png";
import adpResult from "../assets/截屏2026-01-22 17.06.43.png";

export type Consultant = {
  name: string;
  role: string;
  avatar: string;
  color: string;
};

export type Message = {
  id: string;
  speaker: "cyrus" | "lea";
  content: string;
  trigger_view: string;
  section?: string;
};

export type EvidenceItem = {
  type: "stat_card" | "alert_card" | "chart" | "image" | "comparison" | "gallery" | "mermaid" | "iframe";
  title?: string;
  value?: string | number;
  trend?: string;
  trend_direction?: "up" | "down";
  description?: string;
  metrics?: { label: string; status: "Critical" | "Warning" | "Good"; value: string }[];
  chart_type?: "bar";
  data?: { label: string; value: number }[];
  src?: string;
  images?: string[];
  caption?: string;
  before?: { label: string; desc: string };
  after?: { label: string; desc: string };
  chart_code?: string;
};

export const consultants: Record<"cyrus" | "lea", Consultant> = {
  cyrus: {
    name: "Cyrus",
    role: "年终判官",
    avatar: "/chatroom2025/avatars/avatar.svg",
    color: "text-wisteria-400", // Wisteria
  },
  lea: {
    name: "Lea",
    role: "UX 部门负责人",
    avatar: "/chatroom2025/avatars/avatar.svg",
    color: "text-lemon-400", // Lemon
  },
};

export const dialogue: Message[] = [
  // PART 1: REVIEW
  {
    id: "msg_01",
    section: "PART 1: 2025 年度回顾",
    speaker: "cyrus",
    content: "我看过 2025 年的吞吐量数据了。表面上看，这似乎是一场生产力的胜利。",
    trigger_view: "view_workload_summary",
  },
  {
    id: "msg_02",
    speaker: "lea",
    content: "确实。下半年交付了 172 个核心项目，增长 16%。但我们都知道数据背后的代价。",
    trigger_view: "view_workload_summary",
  },
  {
    id: "msg_03",
    speaker: "cyrus",
    content: "没错。**质量指标**在报警。『误操作率』飙升，关键体验评分跌破 7 分。这是不可持续的。",
    trigger_view: "view_quality_metrics",
  },
  {
    id: "msg_04",
    speaker: "lea",
    content: "这并非能力问题，而是**结构性错位**。看看『逻辑密度』指标——常规任务耗时增加了 45%。",
    trigger_view: "view_logic_density_chart",
  },
  {
    id: "msg_05",
    speaker: "cyrus",
    content: "因为他们在处理更难的问题？",
    trigger_view: "view_logic_density_chart",
  },
  {
    id: "msg_06",
    speaker: "lea",
    content: "是的。业务重心转向私有云、IPv6 等复杂 B2B 逻辑。我们在用 UI 绘图工具解逻辑题，这就是摩擦的根源。",
    trigger_view: "view_complexity_breakdown",
  },

  // PART 2: RESULTS (AI & CASES)
  {
    id: "msg_07",
    section: "PART 2: AI 破局与成果",
    speaker: "cyrus",
    content: "如果仅仅增加人手，只会放大这种混乱。你们的破局策略是什么？",
    trigger_view: "view_efficiency_strategy",
  },
  {
    id: "msg_08",
    speaker: "lea",
    content: "**AI 增强提效**。不是噱头，而是实战。比如这个『404 检查器』项目。",
    trigger_view: "view_ai_coding_demo",
  },
  {
    id: "msg_09",
    speaker: "cyrus",
    content: "听起来像个小工具。这能代表什么？",
    trigger_view: "view_ai_coding_demo",
  },
  {
    id: "msg_10",
    speaker: "lea",
    content: "它代表了**流程的重构**。我只用自然语言描述需求，Cursor 就在 30 分钟内生成了整个应用。从前端 UI 到后端逻辑。",
    trigger_view: "view_ai_coding_demo",
  },
  {
    id: "msg_dashboard_intro",
    speaker: "lea",
    content: "不仅如此，我们还用 AI 重构了复杂的 Dashboard。这是我们最新的 **AI Dashboard V6**，完全由我（设计师）主导开发，集成了 React Three Fiber 3D 引擎。",
    trigger_view: "view_ai_dashboard_demo",
  },
  {
    id: "msg_dashboard_demo",
    speaker: "cyrus",
    content: "设计师写 3D 引擎？这确实有点意思。让我看看实际运行效果。",
    trigger_view: "view_ai_dashboard_demo",
  },
  {
    id: "msg_11",
    speaker: "cyrus",
    content: "效率确实惊人。但设计师写代码，会不会产生新的技术负债？",
    trigger_view: "view_ai_coding_demo",
  },
  {
    id: "msg_12",
    speaker: "cyrus",
    content: "效果如何？",
    trigger_view: "view_404_results",
  },
  {
    id: "msg_13",
    speaker: "lea",
    content: "分钟级出报告，彻底解决了文档死链问题。这是『UX as Code』的典型案例。",
    trigger_view: "view_404_results",
  },
  {
    id: "msg_14",
    speaker: "lea",
    content: "不仅如此，我们还孵化了 **Agentic Design Protocol (ADP)**。让 AI Agent 像设计师一样工作。",
    trigger_view: "view_adp_workflow",
  },
  {
    id: "msg_15",
    speaker: "cyrus",
    content: "这是项目模版？",
    trigger_view: "view_project_template",
  },
  {
    id: "msg_16",
    speaker: "lea",
    content: "对。标准化的项目结构。通过与 AI (如豆包) 的深度对话，将 PRD 直接转化为设计资产。",
    trigger_view: "view_ai_conversation",
  },
  {
    id: "msg_17",
    speaker: "cyrus",
    content: "最终产出呢？",
    trigger_view: "view_adp_result",
  },
  {
    id: "msg_18",
    speaker: "lea",
    content: "SurferCloud 支付页面的独立上线。从设计到代码，设计师拥有了完整的物理控制权。",
    trigger_view: "view_adp_result",
  },

  // PART 3: OUTLOOK
  {
    id: "msg_19",
    section: "PART 3: 2026 展望",
    speaker: "cyrus",
    content: "令人印象深刻。从『像素搬运』到『全栈交付』。那么 2026 年的目标是什么？",
    trigger_view: "view_roi_analysis",
  },
  {
    id: "msg_20",
    speaker: "lea",
    content: "**价值合伙人**。我们不再只是接单，而是要成为业务的战略输入方。",
    trigger_view: "view_value_partnership",
  },
  {
    id: "msg_21",
    speaker: "cyrus",
    content: "具体的行动计划？",
    trigger_view: "view_shadow_program",
  },
  {
    id: "msg_22",
    speaker: "lea",
    content: "**影子计划**。设计师将直接参与销售通话和客户会议。只有在一线听到炮火，才能设计出精准的逻辑。",
    trigger_view: "view_shadow_program",
  },
  {
    id: "msg_23",
    speaker: "cyrus",
    content: "这个方向是对的。用 AI 解决手的问题，用策略解决脑的问题。批准通过。",
    trigger_view: "view_final_verdict",
  },
  {
    id: "msg_24",
    speaker: "lea",
    content: "谢谢。2026 见。",
    trigger_view: "view_final_verdict",
  },
];

export const evidenceBoard: Record<string, EvidenceItem> = {
  view_workload_summary: {
    type: "stat_card",
    title: "2025 下半年吞吐量",
    value: "172 个项目",
    trend: "+16.2%",
    trend_direction: "up",
    description: "核心业务交付量较上半年显著增长。",
  },
  view_quality_metrics: {
    type: "alert_card",
    title: "质量风险警报",
    metrics: [
      { label: "误操作率", status: "Critical", value: "高风险" },
      { label: "体验评分", status: "Warning", value: "< 7.0" },
    ],
    description: "效率收益被复杂任务中上升的摩擦所掩盖。",
  },
  view_logic_density: {
    type: "stat_card",
    title: "逻辑密度指数",
    value: "1.91 天",
    trend: "+45%",
    trend_direction: "up",
    description: "因复杂性增加，常规任务平均耗时增加。",
  },
  view_logic_density_chart: {
    type: "chart",
    title: "逻辑密度指数趋势",
    chart_type: "bar",
    data: [
      { label: "H1 常规任务", value: 1.31 },
      { label: "H2 常规任务", value: 1.91 },
    ],
    description: "常规任务平均耗时增加 45%，反映了业务逻辑复杂度的质变。",
  },
  view_complexity_breakdown: {
    type: "stat_card",
    title: "复杂性驱动因素",
    value: "B2B 逻辑深水区",
    description: "业务重心转向私有云、IPv6、安全组等底层能力。",
  },
  view_efficiency_strategy: {
    type: "stat_card",
    title: "破局策略",
    value: "AI 增强提效",
    description: "从『生成』到『执行』，释放设计师的逻辑思考能力。",
  },
  view_404_logic: {
    type: "image",
    src: "/chatroom2025/assets/404-logic-flow.png",
    caption: "设计师绘制的检测流程逻辑图 (Mermaid)",
  },
  view_404_gui: {
    type: "image",
    src: "/chatroom2025/assets/404-checker-main.png",
    caption: "AI 辅助构建的 Python GUI 工具界面",
  },
  view_404_results: {
    type: "image",
    src: "/chatroom2025/assets/404-checker-results.png",
    caption: "自动化检测结果：分钟级出具完整报告",
  },
  view_adp_workflow: {
    type: "mermaid",
    title: "Agentic Design Protocol (ADP)",
    description: "标准化人机协作工作流：从 Agent 定调到自动化组装。",
    chart_code: `graph TD
    %% 阶段一：输入
    subgraph Phase1_Input [阶段一：原始素材]
        RawPRD["原始需求素材<br/>input/for_prd/"]
        Refs["参考资料<br/>input/reference_report/"]
        TagDB[("Prompt Tag DB<br/>Docs/knowledgebase/")]
    end

    %% 阶段二：Agent Team 定调 (The Creative Board)
    subgraph Phase2_Refine [阶段二：Agent Team 定调]
        Alice["Alice (Product Manager)<br/>PRD & Brand DNA"]
        Bob["Bob (Visionary Designer)<br/>Visual Specs & Style"]
        VisualValidation{{"Visual Validation<br/>(SVG Concept Sketch)"}}
    end

    %% 阶段三：核心资产生成
    subgraph Phase3_Assets [阶段三：核心资产生成]
        Style["风格提示词<br/>style_prompt.md"]
        Specs["设计规范<br/>design_system_specs.md"]
        Motion["动画指南<br/>animation_prompts.md"]
        Skeleton["骨架结构<br/>skeleton_template.json"]
        Payload["真实内容载荷<br/>web_content.js"]
    end

    %% 阶段四：自动化组装
    subgraph Phase4_Assembly [阶段四：自动化组装]
        Template{{"系统提示词模版<br/>Docs/Prompt_maker/system_prompt_template.md"}}
        Script(("组装脚本<br/>assemble_system_prompt.js"))
        SystemPrompt["系统提示词<br/>system_prompt.md"]
    end

    %% 阶段五 & 六：执行与交付
    subgraph Phase5_Execution [阶段五 & 六：执行与交付]
        FigmaMake["风格定调图AIGC_by_MCP<br/>(绘图)"]
        IDE["IDE开发<br/>(Trae/Cursor)"]
        Biubiu["Biubiu (Creative Developer)<br/>React Three Fiber"]
    end

    %% 关系连线
    RawPRD --> Alice
    Refs --> Alice
    TagDB --> Alice
    
    Alice -->|Draft| Bob
    Alice -->|Concept| VisualValidation
    VisualValidation -->|Approved| Bob
    VisualValidation -->|Rejected| Alice

    Bob --> Style
    Bob --> Specs
    Bob --> Motion
    Alice --> Skeleton
    Alice --> Payload

    Style -->|Module 1, 4| Script
    Specs -->|Module 2, 3, 6, 7| Script
    Motion -->|Module 5| Script
    Template --> Script

    Script --> SystemPrompt

    Style --> FigmaMake
    Specs --> FigmaMake
    Skeleton --> FigmaMake

    SystemPrompt --> IDE
    Payload --> IDE
    IDE --> Biubiu

    %% 样式
    style Phase1_Input fill:#f9f9f9,stroke:#333,stroke-dasharray: 5 5
    style Phase2_Refine fill:#fff3e0,stroke:#e65100
    style VisualValidation fill:#ffebee,stroke:#c62828,stroke-width:2px
    style Phase4_Assembly fill:#e1f5fe,stroke:#01579b
    style SystemPrompt fill:#ffecb3,stroke:#ff6f00,stroke-width:2px
    style Script fill:#e0f2f1,stroke:#00695c`
  },
  view_project_template: {
    type: "image",
    src: projectTemplate,
    caption: "Multi-Agents 搭配 Template 和 Workflow 保证流程标准化",
  },
  view_ai_conversation: {
    type: "image",
    src: aiConversation,
    caption: "与 AI Agent 的深度协作对话",
  },
  view_ai_dashboard_demo: {
    type: "iframe",
    title: "AI Dashboard V6 (Interactive Demo)",
    src: "demos/ai-dashboard/index.html",
    caption: "React Three Fiber 实时渲染的 3D 神经网络可视化组件",
  },
  view_adp_result: {
    type: "image",
    src: adpResult,
    caption: "SurferCloud 独立上线页面 (Designer as Full-Stack)",
  },
  view_roi_analysis: {
    type: "comparison",
    title: "角色演进",
    before: { label: "2025", desc: "服务交付 (像素执行)" },
    after: { label: "2026", desc: "价值合伙人 (逻辑架构)" },
  },
  view_value_partnership: {
    type: "stat_card",
    title: "价值合伙人",
    value: "主动介入",
    description: "从被动接收需求，转向主动提供战略输入。",
  },
  view_shadow_program: {
    type: "stat_card",
    title: "影子计划",
    value: "一线接触",
    description: "设计师旁听销售通话，直接获取客户痛点。",
  },
  view_final_verdict: {
    type: "stat_card",
    title: "结论",
    value: "批准通过",
    description: "2026 核心方向：AI 增强提效 + 价值合伙人。",
  },
};
