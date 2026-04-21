"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";

interface Props {
  description: string;
}

export default function ExpandableDescription({ description }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-surface/40 border border-surface-light rounded-3xl overflow-hidden mb-10 shadow-inner transition-all">
      {/* Header / Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between group hover:bg-surface/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 text-accent-hover">
            <Info size={20} />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-hover">
            Spezifikationen & Details
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground group-hover:text-white"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>

      {/* Ausklappbarer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-8 pb-8 pt-2 border-t border-surface-light/30">
              <div className="text-lg text-muted-foreground leading-loose whitespace-pre-line space-y-6">
                {description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Kleiner Hinweis, wenn zugeklappt */}
      {!isOpen && (
        <div className="px-8 pb-4">
           <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
             Klicken zum Ausklappen der technischen Details
           </p>
        </div>
      )}
    </div>
  );
}