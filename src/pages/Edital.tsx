import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { 
  BookOpen, Video, FileText, Scale, HelpCircle, 
  ChevronRight, CheckCircle, Star 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const disciplinas = [
  {
    id: 1,
    nome: "Lei nº 2.578/2012",
    descricao: "Estatuto dos Militares do Estado do Tocantins",
    topicos: 18,
    questoes: 85,
    progresso: 72,
    destaque: true,
  },
  {
    id: 2,
    nome: "LC nº 128/2021",
    descricao: "Lei Complementar da PMTO",
    topicos: 14,
    questoes: 62,
    progresso: 45,
  },
  {
    id: 3,
    nome: "Lei nº 2.575/2012",
    descricao: "Organização Básica da PMTO",
    topicos: 12,
    questoes: 48,
    progresso: 60,
  },
  {
    id: 4,
    nome: "CPPM (Arts. 8º–28º e 243º–253º)",
    descricao: "Código de Processo Penal Militar – Trechos do Edital",
    topicos: 10,
    questoes: 55,
    progresso: 30,
  },
  {
    id: 5,
    nome: "Decreto nº 4.994/2014 – RDMETO",
    descricao: "Regulamento Disciplinar dos Militares do Estado do Tocantins",
    topicos: 16,
    questoes: 70,
    progresso: 55,
  },
];

const Edital = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (disciplina: string, action: string) => {
    if (action === "Questões") {
      navigate(`/questoes?disciplina=${encodeURIComponent(disciplina)}`);
    } else {
      toast({ title: `${action} — Em breve`, description: `O conteúdo de ${action} para "${disciplina}" será disponibilizado em breve.` });
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-gradient-primary">Edital Verticalizado</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Trilha de estudos baseada no edital CHOA/CHOM 2024
          </p>
        </motion.div>

        <div className="space-y-4">
          {disciplinas.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 ${d.destaque ? 'glow-primary border-primary/20' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {d.destaque && <Star className="w-4 h-4 text-gold" />}
                    <h3 className="font-bold text-foreground">{d.nome}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{d.descricao}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {d.topicos} tópicos
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> {d.questoes} questões
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-success" /> {d.progresso}% concluído
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full transition-all duration-700"
                      style={{ width: `${d.progresso}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:flex-col md:items-end shrink-0">
                  {[
                    { label: "Aula em Vídeo", icon: <Video className="w-3.5 h-3.5" /> },
                    { label: "PDF", icon: <FileText className="w-3.5 h-3.5" /> },
                    { label: "Lei Seca", icon: <Scale className="w-3.5 h-3.5" /> },
                    { label: "Questões", icon: <HelpCircle className="w-3.5 h-3.5" /> },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={() => handleAction(d.nome, btn.label)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-primary/15 hover:text-primary transition-all duration-200"
                    >
                      {btn.icon}
                      {btn.label}
                      <ChevronRight className="w-3 h-3 opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Edital;
