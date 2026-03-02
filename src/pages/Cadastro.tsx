import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Eye, EyeOff, User, CreditCard, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatCPF, cleanCPF, validateCPF } from "@/lib/cpf";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCpfChange = (value: string) => {
    setCpf(formatCPF(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !cpf || !password || !confirmPassword) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    if (!validateCPF(cpf)) {
      toast({ title: "CPF inválido", description: "Verifique o CPF informado.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Senha muito curta", description: "Mínimo 6 caracteres.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Senhas não conferem", variant: "destructive" });
      return;
    }
    if (!termos) {
      toast({ title: "Aceite os termos de uso", variant: "destructive" });
      return;
    }

    setLoading(true);
    const cleanedCpf = cleanCPF(cpf);
    const generatedEmail = `${cleanedCpf}@choa.app`;

    // Check if CPF already exists
    const { data: cpfExists } = await supabase.rpc("check_cpf_exists", { p_cpf: cleanedCpf });
    if (cpfExists) {
      toast({ title: "CPF já cadastrado", description: "Este CPF já possui uma conta.", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: generatedEmail,
      password,
      options: { emailRedirectTo: window.location.origin },
    });

    if (authError) {
      toast({ title: "Erro no cadastro", description: authError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    if (authData.user) {
      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: authData.user.id,
        nome,
        cpf: cleanedCpf,
      });

      if (profileError) {
        toast({ title: "Erro ao criar perfil", description: profileError.message, variant: "destructive" });
        setLoading(false);
        return;
      }

      toast({ title: "Conta criada com sucesso!", description: "Você já pode acessar a plataforma." });
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-primary glow-primary flex items-center justify-center mx-auto mb-3">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-black text-gradient-primary">CHOA 2026</h1>
          <p className="text-xs text-muted-foreground">Crie sua conta e comece a estudar</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-center">Cadastro</h2>

          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground transition-all" />
            </div>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={cpf} onChange={e => handleCpfChange(e.target.value)} placeholder="CPF" maxLength={14}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground transition-all" />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha (mín. 6 caracteres)"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground transition-all" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmar senha"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground transition-all" />
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={termos} onChange={e => setTermos(e.target.checked)} className="rounded border-border mt-0.5" />
            <span>Aceito os <a href="#" className="text-primary hover:underline">Termos de Uso</a> e <a href="#" className="text-primary hover:underline">Política de Privacidade</a></span>
          </label>

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Entrar</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Cadastro;
