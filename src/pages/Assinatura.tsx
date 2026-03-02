import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { CreditCard, Check, Shield, Zap, Star, Clock } from "lucide-react";

const Assinatura = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-gradient-gold">Plano CHOA Trimestral</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Acesso completo à plataforma por 90 dias</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 relative overflow-hidden glow-gold border-gold/20"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full -translate-y-16 translate-x-16" />
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-4">
              <Star className="w-3 h-3" /> PLANO ÚNICO
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xs text-muted-foreground">R$</span>
              <span className="text-5xl font-black text-gradient-gold">69</span>
              <span className="text-xl font-bold text-gradient-gold">,90</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Válido por 90 dias
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              "Acesso completo ao banco de questões",
              "Gerador de simulados ilimitado",
              "Edital verticalizado com trilha guiada",
              "Aulas em vídeo de todas as disciplinas",
              "PDFs e Lei Seca comentada",
              "Comentários fundamentados em cada questão",
              "Estatísticas detalhadas de desempenho",
              "Baseado 100% na legislação do Tocantins",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <button className="w-full py-4 rounded-xl gradient-gold text-gold-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-gold">
            <CreditCard className="w-4 h-4" />
            Assinar Agora
          </button>

          <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Pagamento seguro</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Acesso imediato</span>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Assinatura;
