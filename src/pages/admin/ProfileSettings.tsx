import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { User, Lock, Save, UserPlus, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileSettings() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Client account registration states
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientRole, setClientRole] = useState<"admin" | "user">("admin");
  const [clientPassword, setClientPassword] = useState("");
  const [showClientPassword, setShowClientPassword] = useState(false);
  const [clientLoading, setClientLoading] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setClientLoading(true);
    try {
      const phoneVal = clientPhone.trim();
      const syntheticEmail = `${phoneVal}@user.internal`;

      // Initialize non-persisted client to register user safely
      const tempSupabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false }
      });

      // 1. Sign up the new user
      // Pass both phone_number / phone, full_name / name, and a non-empty address
      // to fully satisfy any trigger/database constraints on raw_user_meta_data
      const { data: authData, error: authError } = await tempSupabase.auth.signUp({
        email: syntheticEmail,
        password: clientPassword,
        options: {
          data: {
            full_name: clientName,
            name: clientName,
            phone_number: phoneVal,
            phone: phoneVal,
            address: "Not Specified",
            role: clientRole,
            email: syntheticEmail
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        toast.success(`Account for "${clientName}" created successfully!`);
        
        // Reset form
        setClientName("");
        setClientPhone("");
        setClientPassword("");
      }
    } catch (err: any) {
      toast.error("Error creating client: " + err.message);
    } finally {
      setClientLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id, user?.user_metadata]);

  const fetchProfile = async () => {
    try {
      if (user) {
        setName(user.user_metadata?.full_name || user.email?.split("@")[0] || "");
      }
    } catch (err: any) {
      toast.error("Failed to load profile: " + err.message);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Update Name in user_metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { full_name: name }
      });
      if (metadataError) throw metadataError;

      // Update Password if provided
      if (password) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        const { error: passwordError } = await supabase.auth.updateUser({
          password: password,
        });
        
        if (passwordError) throw passwordError;
      }
      
      toast.success("Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error("Error updating profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-2">Profile Settings</h2>
        <p className="text-sm text-slate-500 mb-6">Update your account name and password.</p>
        
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 block w-full rounded-lg border border-slate-200 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-wide uppercase">Change Password</h3>
            <p className="text-xs text-slate-500 mb-4">Leave fields blank if you do not want to change your password.</p>
            
            <div className="space-y-4">
              {/* New Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full rounded-lg border border-slate-200 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                    placeholder="Enter new password"
                    minLength={6}
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 block w-full rounded-lg border border-slate-200 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                    placeholder="Confirm new password"
                    minLength={6}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Create Client Account Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-2 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-amber-600" />
          Create Admin Account
        </h2>
        <p className="text-sm text-slate-500 mb-6">Register a new administrator account directly with their phone number.</p>
        
        <form onSubmit={handleCreateClient} className="space-y-4">
          {/* Client Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="block w-full rounded-lg border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-slate-900 bg-white"
              placeholder="Client's full name"
            />
          </div>

          {/* Client Phone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Mobile Number (10-digit)</label>
            <input
              type="tel"
              required
              pattern="^[0-9]{10}$"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="block w-full rounded-lg border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-slate-900 bg-white"
              placeholder="e.g. 9876543210"
            />
          </div>

          {/* Client Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Choose Code Password</label>
            <div className="relative">
              <input
                type={showClientPassword ? "text" : "password"}
                required
                minLength={6}
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
                className="block w-full rounded-lg border border-slate-200 py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-slate-900 bg-white"
                placeholder="Minimum 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowClientPassword(!showClientPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                title={showClientPassword ? "Hide Password" : "Show Password"}
              >
                {showClientPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={clientLoading}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow transition-colors disabled:opacity-50"
            >
              {clientLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {clientLoading ? "Registering..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
