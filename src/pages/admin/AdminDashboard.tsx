import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Laptop } from "../../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const { user, role } = useAuth();
  const [profileName, setProfileName] = useState<string>("");
  const [stats, setStats] = useState({ 
    totalStockValue: 0,
    numProducts: 0,
    numCategories: 0,
    valueByCategory: {} as Record<string, number>,
    valueByProduct: [] as {name: string, value: number}[]
  });

  useEffect(() => {
    fetchStats();
    if (user) {
      fetchProfile();
    }

    const laptopSubscription = supabase
      .channel('products_stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      laptopSubscription.unsubscribe();
    };
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    setProfileName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin");
  };

  const fetchStats = async () => {
    // Fetch Laptop Stats
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("name, category, purchase_price, stock");
    
    if (productError) {
      console.error(productError);
      return;
    }

    let totalStockValue = 0;
    const valueByCategory: Record<string, number> = {};
    const valueByProduct: {name: string, value: number}[] = [];
    const categories = new Set<string>();

    products?.forEach(d => {
        const val = (d.purchase_price || 0) * (d.stock || 0);
        totalStockValue += val;
        
        if (d.category) {
            categories.add(d.category);
            valueByCategory[d.category] = (valueByCategory[d.category] || 0) + val;
        }
        
        valueByProduct.push({ name: d.name, value: val });
    });

    setStats({ 
      totalStockValue,
      numProducts: products?.length || 0,
      numCategories: categories.size,
      valueByCategory,
      valueByProduct
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner for Admin */}
      <div className="bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-950 flex items-center justify-between text-white">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-0.5">Welcome Back</div>
          <div className="text-xl font-black tracking-tight uppercase">{profileName || "System Administrator"}</div>
        </div>
        <div className="text-right">
           <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-0.5">Authenticated Role</div>
           <div className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full border border-white/20">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest">{role || 'Admin'}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 shadow-sm">
          <div className="text-indigo-800 text-xs font-medium uppercase tracking-wider mb-1">Total Stock Value</div>
          <div className="text-2xl sm:text-3xl font-bold truncate" title={`₹${stats.totalStockValue.toLocaleString()}`}>₹{stats.totalStockValue.toLocaleString()}</div>
        </div>
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 shadow-sm">
          <div className="text-emerald-800 text-xs font-medium uppercase tracking-wider mb-1">Number of Products</div>
          <div className="text-2xl sm:text-3xl font-bold truncate">{stats.numProducts}</div>
        </div>
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm">
          <div className="text-amber-800 text-xs font-medium uppercase tracking-wider mb-1">Number of Categories</div>
          <div className="text-2xl sm:text-3xl font-bold truncate">{stats.numCategories}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
          <div className="text-blue-800 text-xs font-medium uppercase tracking-wider mb-4">Value by Category</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(stats.valueByCategory).map(([name, value]) => ({ name, value })).sort((a: {name: string, value: number}, b: {name: string, value: number}) => b.value - a.value)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 shadow-sm">
          <div className="text-emerald-800 text-xs font-medium uppercase tracking-wider mb-4">Value by Product</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={[...stats.valueByProduct].sort((a: {name: string, value: number}, b: {name: string, value: number}) => b.value - a.value)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
