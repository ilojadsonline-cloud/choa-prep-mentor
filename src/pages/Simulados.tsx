import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { Shuffle, Play, Settings, AlertCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const disciplinasOpcoes = [
  "Todas as Disciplinas",
  "Lei nº 2.578/2012",
  "LC nº 128/2021",
  "Lei nº 2.575/2012",
  "CPPM",
  "RDMETO",
];

const Simulados = () => {
  const [numQuestoes, setNumQuestoes] = useState([20]);
  const [disciplina, setDisciplina] = useState("Todas as Disciplinas");

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-gradient-primary">Gerador de Simulado</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Monte seu simulado personalizado com randomização forte</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="p-3 rounded-xl gradient-primary glow-primary">
              <Settings className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold">Configurar Simulado</h2>
              <p className="text-xs text-muted-foreground">Personalize conforme sua necessidade</p>
            </div>
          </div>

          {/* Disciplina */}
          <div>
            <label className="text-sm font-medium mb-2 block">Disciplina</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {disciplinasOpcoes.map((d) => (
                <button
                  key={d}
                  onClick={() => setDisciplina(d)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    disciplina === d
                      ? "gradient-primary text-primary-foreground glow-primary"
                      : "bg-secondary hover:bg-primary/15 hover:text-primary"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Número de questões */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium">Número de Questões</label>
              <span className="text-2xl font-bold text-gradient-primary">{numQuestoes[0]}</span>
            </div>
            <Slider
              value={numQuestoes}
              onValueChange={setNumQuestoes}
              max={50}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>5</span>
              <span>50</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-primary">Randomização forte:</strong> Ordem das questões e alternativas embaralhadas a cada simulado. Questões nunca se repetem dentro do mesmo simulado.
            </div>
          </div>

          {/* Gerar */}
          <button className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-primary">
            <Shuffle className="w-4 h-4" />
            Gerar Simulado
          </button>
        </motion.div>

        {/* Histórico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" />
            Últimos Simulados
          </h3>
          <div className="space-y-3">
            {[
              { data: "28/02/2026", disc: "CPPM", acertos: 38, total: 50 },
              { data: "25/02/2026", disc: "Todas", acertos: 35, total: 40 },
              { data: "22/02/2026", disc: "RDMETO", acertos: 18, total: 25 },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div>
                  <p className="text-sm font-medium">{s.disc}</p>
                  <p className="text-[10px] text-muted-foreground">{s.data}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{s.acertos}/{s.total}</p>
                  <p className={`text-[10px] font-medium ${(s.acertos / s.total) >= 0.7 ? 'text-success' : 'text-warning'}`}>
                    {Math.round((s.acertos / s.total) * 100)}% de acerto
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Simulados;
