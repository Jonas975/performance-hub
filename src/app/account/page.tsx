"use client";

import { useState } from "react";
import { 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountPage() {
  // State für die Auswahl: 'orders' oder 'profile'
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* LINKER BEREICH: Navigation (Sidebar) */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 px-4">
              Mein <span className="text-accent-hover italic">Konto</span>
            </h1>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all ${
                activeTab === "orders" 
                ? "bg-accent-hover text-background shadow-[0_0_20px_#14b8a6]" 
                : "text-muted hover:bg-surface/30"
              }`}
            >
              <Package size={18} /> Bestellungen
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all ${
                activeTab === "profile" 
                ? "bg-accent-hover text-background shadow-[0_0_20px_#14b8a6]" 
                : "text-muted hover:bg-surface/30"
              }`}
            >
              <User size={18} /> Profil
            </button>

            <div className="h-px bg-surface-light my-4 mx-4 opacity-30" />

            <button className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest text-red-500 hover:bg-red-500/10 transition-all">
              <LogOut size={18} /> Abmelden
            </button>
          </div>

          {/* RECHTER BEREICH: Content */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {activeTab === "orders" ? (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Bestellungen</h2>
                  </div>

                  {/* Beispiel für eine Bestellung (ESN Style) */}
                  <div className="bg-surface/20 border border-surface-light rounded-[32px] p-8 overflow-hidden relative">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-32 h-32 bg-black rounded-2xl flex items-center justify-center border border-surface-light">
                         <Package className="text-surface-light" size={40} />
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                           <span className="bg-accent-hover/20 text-accent-hover text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                             Unterwegs
                           </span>
                           <span className="text-muted text-xs font-bold uppercase tracking-widest">12. April 2026</span>
                        </div>
                        <h3 className="text-white font-black uppercase text-xl mb-1">Performance Bundle v1</h3>
                        <p className="text-muted text-sm font-bold uppercase tracking-widest">Bestellung #N4483835</p>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-2xl font-black text-white mb-4">89,90 €</p>
                        <button className="bg-accent-hover hover:bg-white transition-all text-background px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest">
                          Erneut kaufen
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Profil</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Persönliche Daten */}
                    <div className="bg-surface/20 border border-surface-light rounded-3xl p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-accent-hover font-black uppercase text-xs tracking-widest">Persönliche Daten</h4>
                        <button className="text-muted hover:text-white transition-all"><ExternalLink size={16}/></button>
                      </div>
                      <p className="text-white text-xl font-black uppercase">{process.env.NEXT_PUBLIC_USER_NAME || "Stefan Dippl"}</p>
                      <p className="text-muted font-bold mt-1">jonas.dippl.berlin@gmail.com</p>
                      <p className="text-muted font-bold">+49 177 3689211</p>
                    </div>

                    {/* Standardadresse */}
                    <div className="bg-surface/20 border border-surface-light rounded-3xl p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-accent-hover font-black uppercase text-xs tracking-widest">Standardadresse</h4>
                        <button className="text-muted hover:text-white transition-all"><ExternalLink size={16}/></button>
                      </div>
                      <address className="not-italic text-white font-bold leading-relaxed">
                        Stefan Dippl<br />
                        Maximilianstraße 46<br />
                        13187 Berlin<br />
                        Deutschland
                      </address>
                    </div>

                    {/* Zahlungsmethoden */}
                    <div className="bg-surface/20 border border-surface-light rounded-3xl p-8 lg:col-span-2">
                       <h4 className="text-accent-hover font-black uppercase text-xs tracking-widest mb-6">Zahlungsmethoden</h4>
                       <div className="flex items-center justify-center py-8 border-2 border-dashed border-surface-light rounded-2xl">
                          <p className="text-muted font-bold uppercase text-[10px] tracking-widest">Keine Zahlungsmethoden hinterlegt</p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}