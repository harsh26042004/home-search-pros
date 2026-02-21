import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.jpg";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let { error } = await signIn(email, password);
    if (error) {
      // If user doesn't exist, try signing up
      const signUpResult = await signUp(email, password);
      if (signUpResult.error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      // Try signing in again after signup
      const retryResult = await signIn(email, password);
      if (retryResult.error) {
        toast({ title: "Login failed", description: retryResult.error.message, variant: "destructive" });
        setLoading(false);
        return;
      }
    }
    navigate("/admin/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl w-full max-w-sm p-8">
        <div className="text-center mb-7">
          <img src={logo} alt="Impyreal Homes" className="h-14 w-auto mx-auto mb-4" />
          <h1 className="text-xl font-bold text-navy">Admin Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage projects & leads</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 border border-input px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 border border-input px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-crimson hover:bg-crimson-dark text-white font-semibold transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
