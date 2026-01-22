import { AnimatePresence, motion } from "framer-motion";
import type { EvidenceItem } from "../data/content";
import { cn } from "../lib/utils";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { MermaidChart } from "./MermaidChart";

interface EvidenceBoardProps {
  data: EvidenceItem | null;
  viewId: string;
}

export function EvidenceBoard({ data, viewId }: EvidenceBoardProps) {
  if (!data) return <div className="h-full w-full bg-slate-800 border-l border-slate-700 flex items-center justify-center text-slate-500 font-mono text-sm">WAITING_FOR_DATA_STREAM...</div>;

  return (
    <div className="h-full w-full bg-transparent border-l border-wisteria-800/20 flex items-center justify-center relative overflow-hidden backdrop-blur-sm p-8">
      <div className="absolute top-4 right-4 font-mono text-xs text-wisteria-500/50 z-10">
        EVIDENCE_ID: {viewId.toUpperCase()}
      </div>

      {data.type === "iframe" ? (
        /* Mobile Device Frame - Only for iframes */
        <div className="w-full max-w-[420px] aspect-[9/19] max-h-[90vh] bg-slate-950 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
          {/* Notch/Status Bar Area */}
          <div className="h-8 w-full bg-slate-950 flex justify-between items-center px-6 shrink-0 z-20">
              <div className="text-[10px] font-mono text-slate-500">9:41</div>
              <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-800"></div>
              </div>
          </div>

          <div className="flex-1 overflow-hidden relative bg-slate-900/50">
              <EvidenceContent data={data} viewId={viewId} />
          </div>

          {/* Home Indicator */}
          <div className="h-5 w-full bg-slate-950 flex justify-center items-center shrink-0 z-20">
              <div className="w-1/3 h-1 bg-slate-800 rounded-full"></div>
          </div>
        </div>
      ) : (
        /* Standard View - For charts, stats, images */
        <div className="w-full h-full max-w-5xl relative flex items-center justify-center">
            <EvidenceContent data={data} viewId={viewId} />
        </div>
      )}
    </div>
  );
}

function EvidenceContent({ data, viewId }: { data: EvidenceItem, viewId: string }) {
  return (
    <AnimatePresence mode="wait">
        <motion.div
        key={viewId}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-h-full p-6 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-wisteria-700/20"
        >
        {data.type === "stat_card" && <StatCard data={data} />}
        {data.type === "alert_card" && <AlertCard data={data} />}
        {data.type === "chart" && <ChartCard data={data} />}
        {data.type === "image" && <ImageCard data={data} />}
        {data.type === "comparison" && <ComparisonCard data={data} />}
        {data.type === "mermaid" && <MermaidCard data={data} />}
        {data.type === "iframe" && <IframeCard data={data} />}
        </motion.div>
    </AnimatePresence>
  );
}

function MermaidCard({ data }: { data: EvidenceItem }) {
  return (
    <div className="flex flex-col h-full max-h-full">
      <div className="flex-none mb-4">
          <h2 className="font-serif text-2xl text-wisteria-100 italic">{data.title}</h2>
          <p className="font-mono text-xs text-wisteria-400 mt-1">{data.description}</p>
      </div>
      <div className="flex-1 min-h-0 bg-wisteria-900/20 border border-wisteria-700/30 rounded-lg overflow-hidden backdrop-blur-md shadow-inner shadow-black/20">
        {data.chart_code && <MermaidChart chart={data.chart_code} />}
      </div>
    </div>
  );
}

function IframeCard({ data }: { data: EvidenceItem }) {
  return (
    <div className="flex flex-col h-full max-h-full">
      <div className="flex-none mb-4">
        <h2 className="font-serif text-2xl text-wisteria-100 italic">{data.title}</h2>
        {data.caption && <p className="font-mono text-xs text-wisteria-400 mt-1">{data.caption}</p>}
      </div>
      <div className="flex-1 min-h-0 bg-white border border-wisteria-700/30 rounded-lg overflow-hidden shadow-2xl relative">
        <iframe 
          src={data.src} 
          className="w-full h-full bg-white" 
          title={data.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function StatCard({ data }: { data: EvidenceItem }) {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl text-wisteria-300 italic">{data.title}</h2>
      <div className="flex items-end gap-4">
        <span className="font-mono text-6xl text-lemon-50 font-bold tracking-tighter drop-shadow-[0_0_15px_rgba(253,253,201,0.2)]">
          {data.value}
        </span>
        {data.trend && (
          <div className={cn("flex items-center gap-1 font-mono text-lg mb-2", data.trend_direction === "up" ? "text-lemon-400" : "text-wisteria-400")}>
            {data.trend_direction === "up" ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            {data.trend}
          </div>
        )}
      </div>
      <p className="font-mono text-wisteria-400 max-w-md border-t border-wisteria-800/30 pt-4 mt-4">
        {data.description}
      </p>
    </div>
  );
}

function AlertCard({ data }: { data: EvidenceItem }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 text-lemon-500">
        <AlertTriangle size={32} />
        <h2 className="font-serif text-3xl italic text-wisteria-50">{data.title}</h2>
      </div>
      
      <div className="grid gap-4">
        {data.metrics?.map((m, i) => (
          <div key={i} className="bg-wisteria-900/30 border border-wisteria-700/30 p-4 flex justify-between items-center backdrop-blur-sm">
            <span className="font-mono text-wisteria-300">{m.label}</span>
            <span className={cn("font-mono font-bold", m.status === "Critical" ? "text-lemon-500" : "text-wisteria-400")}>
              [{m.value}]
            </span>
          </div>
        ))}
      </div>

      <p className="font-mono text-wisteria-400 text-sm">
        &gt; SYSTEM_NOTE: {data.description}
      </p>
    </div>
  );
}

function ChartCard({ data }: { data: EvidenceItem }) {
    return (
        <div className="space-y-4">
            <h2 className="font-serif text-2xl text-wisteria-200">{data.title}</h2>
            <div className="h-64 flex items-end gap-4 border-b border-wisteria-700/30 pb-4">
                {data.data?.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                        <div className="w-full bg-wisteria-800/50 rounded-t-sm relative overflow-hidden group-hover:bg-wisteria-700/60 transition-colors" style={{ height: `${(d.value / Math.max(...(data.data?.map(item => item.value) || [1]))) * 100}%` }}>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-lemon-400/50" />
                        </div>
                        <span className="text-xs font-mono text-wisteria-500">{d.label}</span>
                    </div>
                ))}
            </div>
            <p className="text-xs font-mono text-wisteria-400">{data.description}</p>
        </div>
    )
}

function ImageCard({ data }: { data: EvidenceItem }) {
    return (
        <div className="h-full flex flex-col">
            <h2 className="font-serif text-xl text-wisteria-200 mb-4 flex-none">{data.title}</h2>
            <div className="w-full aspect-[9/16] bg-slate-900/50 border border-wisteria-800/30 rounded-lg overflow-hidden relative group shadow-lg">
               {/* Content */}
               <div className="absolute inset-0 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-wisteria-700/30">
                  <img src={data.src} alt={data.title} className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
            {data.caption && <p className="text-[10px] font-mono text-wisteria-500 mt-3 text-center flex-none leading-relaxed">{data.caption}</p>}
        </div>
    )
}

function ComparisonCard({ data }: { data: EvidenceItem }) {
    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            <div className="space-y-2">
                <span className="text-xs font-mono text-wisteria-500 uppercase tracking-widest block border-b border-wisteria-800/50 pb-1">Before</span>
                <div className="aspect-video bg-wisteria-900/10 border border-wisteria-800/30 rounded p-4 flex items-center justify-center text-center">
                    <div>
                         <div className="text-3xl font-bold text-wisteria-600 mb-2">{data.before?.label}</div>
                         <p className="text-xs text-wisteria-500">{data.before?.desc}</p>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <span className="text-xs font-mono text-lemon-600 uppercase tracking-widest block border-b border-lemon-900/30 pb-1">After</span>
                <div className="aspect-video bg-lemon-900/10 border border-lemon-700/30 rounded p-4 flex items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-lemon-500/5 backdrop-blur-[1px]" />
                    <div className="relative z-10">
                         <div className="text-3xl font-bold text-lemon-300 mb-2">{data.after?.label}</div>
                         <p className="text-xs text-lemon-200/70">{data.after?.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
