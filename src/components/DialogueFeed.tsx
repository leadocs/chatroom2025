import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { consultants, type Message } from "../data/content";
import { cn } from "../lib/utils";

interface DialogueFeedProps {
  messages: Message[];
  isTyping?: boolean;
  onMessageClick?: (viewId: string) => void;
}

export function DialogueFeed({ messages, isTyping, onMessageClick }: DialogueFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="h-full overflow-y-auto px-8 py-12 space-y-8 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-wisteria-700/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-wisteria-600/50">
      {messages.map((msg, index) => {
        const isLast = index === messages.length - 1;
        const speaker = consultants[msg.speaker];
        
        return (
          <div key={msg.id} className="w-full">
            {msg.section && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex justify-center py-8"
              >
                <div className="px-4 py-1 border border-wisteria-700/30 rounded-full bg-wisteria-900/30 backdrop-blur text-xs font-mono text-wisteria-300 tracking-widest uppercase shadow-[0_0_10px_rgba(198,159,213,0.1)]">
                  {msg.section}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={cn(
                "flex flex-col gap-2 max-w-xl group cursor-pointer transition-opacity hover:opacity-80",
                msg.speaker === "lea" ? "ml-auto items-end text-right" : "mr-auto items-start text-left"
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (msg.trigger_view && onMessageClick) {
                  onMessageClick(msg.trigger_view);
                }
              }}
            >
              <div className="flex items-center gap-2 mb-1 opacity-70">
                 <span className={cn("text-xs font-mono uppercase tracking-widest", speaker.color)}>
                    {speaker.name}
                 </span>
                 <span className="text-[10px] font-mono text-wisteria-400/70">
                    {speaker.role}
                 </span>
              </div>

              <div className={cn(
                  "text-lg leading-relaxed font-serif",
                  msg.speaker === "lea" ? "text-lemon-100" : "text-wisteria-50"
              )}>
                {isLast ? (
                   <Typewriter text={msg.content} />
                ) : (
                   <span dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
      
      {isTyping && (
        <div className="flex gap-1 items-center ml-4 mt-4">
           <div className="w-1.5 h-1.5 bg-wisteria-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
           <div className="w-1.5 h-1.5 bg-wisteria-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
           <div className="w-1.5 h-1.5 bg-wisteria-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      )}

      <div ref={bottomRef} className="h-20" /> 
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = React.useState("");
    const index = useRef(0);
  
    useEffect(() => {
      index.current = 0;
      setDisplayedText("");
      
      const intervalId = setInterval(() => {
        if (index.current >= text.length) {
            clearInterval(intervalId);
            return;
        }
        
        const char = text.charAt(index.current);
        index.current++;
        setDisplayedText((prev) => prev + char);
      }, 15); // Speed slightly faster
  
      return () => clearInterval(intervalId);
    }, [text]);
  
    return <span dangerouslySetInnerHTML={{ __html: parseMarkdown(displayedText) }} className="border-r-2 border-lemon-400 animate-pulse" />;
}

import React from "react";

// Simple markdown parser for bolding
function parseMarkdown(text: string) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-lemon-300 font-semibold">$1</strong>');
}
