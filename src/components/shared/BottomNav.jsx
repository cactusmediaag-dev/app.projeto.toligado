import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Users, Trophy } from "lucide-react";
import { createPageUrl } from "@/utils";

const navItems = [
  { icon: Home, label: "Início", page: "Home" },
  { icon: BookOpen, label: "Módulos", page: "Modulos" },
  { icon: Users, label: "Turma", page: "Turma" },
  { icon: Trophy, label: "Ranking", page: "Ranking" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-[#EDE0FF] dark:border-gray-700 shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item, i) => {
          const isActive = location.pathname.includes(item.page);
          const Icon = item.icon;
          return (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'rgba(92,46,127,0.15)' }}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 active:scale-90
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