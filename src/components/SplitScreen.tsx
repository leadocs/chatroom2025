import { useState, useEffect, useCallback } from "react";
import { DialogueFeed } from "./DialogueFeed";
import { EvidenceBoard } from "./EvidenceBoard";
import { dialogue, evidenceBoard, type Message } from "../data/content";

export function SplitScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<Message[]>([dialogue[0]]);
  const [currentViewId, setCurrentViewId] = useState(dialogue[0].trigger_view);

  const advance = useCallback(() => {
    if (currentIndex < dialogue.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextMsg = dialogue[nextIndex];
      
      setCurrentIndex(nextIndex);
      setHistory(prev => [...prev, nextMsg]);
      
      if (nextMsg.trigger_view && nextMsg.trigger_view !== currentViewId) {
        setCurrentViewId(nextMsg.trigger_view);
      }
    }
  }, [currentIndex, currentViewId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowRight" || e.code === "ArrowDown") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advance]);

  // Progress bar calculation
  const progress = ((currentIndex + 1) / dialogue.length) * 100;

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-wisteria-50 overflow-hidden font-sans selection:bg-lemon-500/30">
      {/* Left Panel: Dialogue */}
      <div className="w-[40%] flex flex-col border-r border-wisteria-800/30 relative z-10 bg-slate-800 shadow-2xl h-full max-h-screen">
        <header className="h-16 flex items-center justify-between px-8 border-b border-wisteria-800/30 bg-slate-800/95 backdrop-blur shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-lemon-400 rounded-sm shadow-[0_0_10px_rgba(253,253,201,0.5)]" />
            <h1 className="font-mono text-sm tracking-widest text-wisteria-200">
              UX_REVIEW_2025 <span className="text-wisteria-600">|</span> CONFIDENTIAL
            </h1>
          </div>
          <div className="font-mono text-xs text-wisteria-500">
             {currentIndex + 1} / {dialogue.length}
          </div>
        </header>
        
        <div className="flex-1 relative min-h-0 overflow-hidden" onClick={advance}>
            <DialogueFeed 
              messages={history} 
              onMessageClick={(viewId) => setCurrentViewId(viewId)}
            />
            
            {/* Click to continue hint */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none opacity-30 animate-pulse z-20">
                <span className="font-mono text-xs text-wisteria-400">[ PRESS SPACE TO CONTINUE ]</span>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-wisteria-900/50 w-full shrink-0">
            <div 
                className="h-full bg-lemon-400 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(253,253,201,0.3)]" 
                style={{ width: `${progress}%` }}
            />
        </div>
      </div>

      {/* Right Panel: Evidence Board */}
      <div className="w-[60%] bg-slate-900 relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(198,159,213,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(198,159,213,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 pointer-events-none" />
          <EvidenceBoard 
            data={evidenceBoard[currentViewId]} 
            viewId={currentViewId} 
          />
      </div>
    </div>
  );
}
