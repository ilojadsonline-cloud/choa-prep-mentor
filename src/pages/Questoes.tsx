import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { 
  Filter, CheckCircle, XCircle, Star, BookmarkPlus,
  ChevronDown, HelpCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockQuestoes = [
  {
    id: 1,
    disciplina: "Lei nº 2.578/2012",
    assunto: "Hierarquia e Disciplina",
    dificuldade: "Médio",
    enunciado: "De acordo com a Lei nº 2.578/2012 do Estado do Tocantins, que dispõe sobre o Estatuto dos Militares, a hierarquia militar é a ordenação da autoridade em níveis diferentes. Sobre o tema, assinale a alternativa CORRETA:",
    alternativas: [
      "A hierarquia militar é estabelecida exclusivamente pela antiguidade no posto ou graduação.",
      "A disciplina é a rigorosa observância e o acatamento integral das leis, regulamentos, normas e disposições.",
      "O militar estadual que se encontra em inatividade está dispensado do cumprimento dos preceitos disciplinares.",
      "A precedência entre militares de mesmo posto ou graduação é determinada unicamente pela data de nascimento.",
      "A hierarquia e a disciplina são aplicáveis apenas durante o serviço ativo.",
    ],
    gabarito: 1,
    comentario: "Conforme o Art. 14 da Lei nº 2.578/2012, a disciplina é a rigorosa observância e o acatamento integral das leis, regulamentos, normas e disposições que fundamentam o organismo militar e coordenam seu funcionamento regular e harmônico.",
    favoritada: false,
  },
  {
    id: 2,
    disciplina: "RDMETO",
    assunto: "Transgressões Disciplinares",
    dificuldade: "Difícil",
    enunciado: "Conforme o Decreto nº 4.994/2014 (RDMETO), sobre as transgressões disciplinares e suas classificações, é CORRETO afirmar que:",
    alternativas: [
      "As transgressões disciplinares são classificadas apenas em leves e graves.",
      "A embriaguez em serviço é classificada como transgressão média.",
      "As transgressões disciplinares são classificadas em leves, médias e graves, conforme sua natureza e repercussão.",
      "O militar que comete transgressão leve está isento de qualquer punição disciplinar.",
      "A classificação das transgressões independe das circunstâncias em que foram praticadas.",
    ],
    gabarito: 2,
    comentario: "O RDMETO classifica as transgressões disciplinares em leves, médias e graves, levando em consideração a natureza dos fatos, as circunstâncias que os cercaram e a repercussão no âmbito da corporação.",
    favoritada: true,
  },
];

const Questoes = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [filterOpen, setFilterOpen] = useState(false);

  const handleAnswer = (questaoId: number, altIndex: number) => {
    if (revealed[questaoId]) return;
    setSelectedAnswer(prev => ({ ...prev, [questaoId]: altIndex }));
  };

  const handleReveal = (questaoId: number) => {
    setRevealed(prev => ({ ...prev, [questaoId]: true }));
  };

  const getDifficultyColor = (d: string) => {
    if (d === "Fácil") return "bg-success/15 text-success border-success/30";
    if (d === "Médio") return "bg-warning/15 text-warning border-warning/30";
    return "bg-destructive/15 text-destructive border-destructive/30";
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-gradient-primary">Banco de Questões</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Questões no estilo prova PMTO</p>
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary hover:bg-primary/15 hover:text-primary text-sm font-medium transition-all"
          >
            <Filter className="w-4 h-4" />
            Filtros
            <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
        </motion.div>

        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {["Disciplina", "Assunto", "Dificuldade", "Status"].map((f) => (
                <div key={f}>
                  <label className="text-xs text-muted-foreground mb-1 block">{f}</label>
                  <select className="w-full rounded-lg bg-secondary border-none text-sm p-2 text-foreground focus:ring-1 focus:ring-primary outline-none">
                    <option>Todos</option>
                  </select>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {mockQuestoes.map((q, qi) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.1 }}
              className="glass-card rounded-xl p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30">
                    {q.disciplina}
                  </Badge>
                  <Badge variant="outline" className={`text-[10px] ${getDifficultyColor(q.dificuldade)}`}>
                    {q.dificuldade}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{q.assunto}</span>
                </div>
                <button className="text-muted-foreground hover:text-gold transition-colors">
                  <Star className={`w-4 h-4 ${q.favoritada ? 'fill-gold text-gold' : ''}`} />
                </button>
              </div>

              <p className="text-sm leading-relaxed text-foreground">{q.enunciado}</p>

              <div className="space-y-2">
                {q.alternativas.map((alt, ai) => {
                  const isSelected = selectedAnswer[q.id] === ai;
                  const isCorrect = q.gabarito === ai;
                  const isRevealed = revealed[q.id];

                  let altClass = "bg-secondary/50 hover:bg-secondary border-transparent";
                  if (isRevealed && isCorrect) {
                    altClass = "bg-success/10 border-success/40 text-success";
                  } else if (isRevealed && isSelected && !isCorrect) {
                    altClass = "bg-destructive/10 border-destructive/40 text-destructive";
                  } else if (isSelected) {
                    altClass = "bg-primary/10 border-primary/40 text-primary";
                  }

                  return (
                    <button
                      key={ai}
                      onClick={() => handleAnswer(q.id, ai)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border text-sm transition-all duration-200 ${altClass}`}
                    >
                      <span className="w-6 h-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold mt-0.5">
                        {String.fromCharCode(65 + ai)}
                      </span>
                      <span className="flex-1">{alt}</span>
                      {isRevealed && isCorrect && <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-success" />}
                      {isRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-destructive" />}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer[q.id] !== undefined && !revealed[q.id] && (
                <button
                  onClick={() => handleReveal(q.id)}
                  className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Confirmar Resposta
                </button>
              )}

              <AnimatePresence>
                {revealed[q.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 rounded-lg bg-primary/5 border border-primary/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">Comentário</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{q.comentario}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Questoes;
