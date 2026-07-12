import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { LogOut, Monitor, User as UserIcon, Calendar, History, Package, ClipboardList, Clock, PhoneCall, ShoppingCart, Settings, DollarSign } from "lucide-react";

export const Layout: React.FC = () => {
  const { user, role } = useAuth();
  const location = useLocation();

  const links = [
    { to: "/admin", label: "Dashboard", icon: <ClipboardList className="w-4 h-4" /> },
    { to: "/admin/inventory", label: "Inventory Mgmt", icon: <Package className="w-4 h-4" /> },
    { to: "/admin/settings", label: "Profile Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden flex-col md:flex-row">
      <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 shrink-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-xs font-bold text-white">DC</div>
          <span className="text-xl font-bold text-white tracking-tight">Bisht Uttarakhandi Store</span>
        </div>
        {user && (
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()} className="text-slate-300 hover:text-white">
            <LogOut className="w-4 h-4" />
          </Button>
        )}
      </header>

      {user && (
        <>
          <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
            <div className="p-6 hidden md:block">
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-xs">DC</div>
                Bisht Uttarakhandi Store
              </h1>
            </div>
            <nav className="flex-1 px-4 space-y-1 overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col py-2 md:py-0">
              <div className="hidden md:block text-[10px] uppercase tracking-widest text-slate-500 font-bold px-2 mb-2 mt-4">
                Admin Console
              </div>
              {links.map((link) => {
                const isActive = location.pathname === link.to || (link.to !== '/' && link.to !== '/admin' && location.pathname.startsWith(link.to));
                const badgeCount = (link as any).count;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-slate-800 text-white font-medium italic"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      {link.label}
                    </div>
                    {badgeCount > 0 && (
                      <span className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                        {badgeCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-slate-800 hidden md:flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 shrink-0">
                  {(user.email?.endsWith("@user.internal") ? user.email.split("@")[0] : user.email || 'U')[0].toUpperCase()}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-white truncate max-w-[110px]">
                    {user.email?.endsWith("@user.internal") ? user.email.split("@")[0] : user.email}
                  </span>
                  <span className="text-xs opacity-60 capitalize">{role}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => supabase.auth.signOut()} className="text-slate-400 hover:text-white shrink-0 hover:bg-slate-800">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </aside>
          
           <main className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="h-16 bg-white border-b border-slate-200 items-center justify-between px-8 shrink-0 hidden md:flex">
              <h2 className="text-lg font-semibold font-black">Operations Dashboard</h2>
            </header>
            <div className="p-4 md:p-6 flex-1 overflow-y-auto w-full">
              <Outlet />
            </div>
          </main>
        </>
      )}
    </div>
  );
};
