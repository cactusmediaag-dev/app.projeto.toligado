import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Trophy, User, Plus } from "lucide-react";
import { createPageUrl } from "@/utils";

const navItems = [
  { icon: Home, label: "Início", page: "Home" },
  { icon: BookOpen, label: "Módulos", page: "Modulos" },
  { type: "center" },
  { icon: Trophy, label: "Ranking", page: "Ranking" },
  { icon: User, label: "Perfil", page: "Perfil" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#EDE0FF] shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item, i) => {
          if (item.type === "center") {
            return (
              <Link
                key="center"
                to={createPageUrl("Modulos")}
                className="ripple-btn -mt-8 w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-90"
                style={{ background: "linear-gradient(135deg, #5C2E7F, #9B59B6)" }}
              >
                <Plus className="w-8 h-8 text-white" strokeWidth={3} />
              </Link>
            );
          }

          const isActive = location.pathname.includes(item.page);
          const Icon = item.icon;

          return (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 active:scale-90
                ${isActive ? "text-[#5C2E7F]" : "text-gray-400"}
              `}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-[#5C2E7F]" : ""}`} />
              <span className={`text-xs font-semibold ${isActive ? "text-[#5C2E7F]" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}