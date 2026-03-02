import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { 
  BookOpen, FileText, Scale, HelpCircle, 
  ChevronRight, ChevronDown, CheckCircle, Star, ExternalLink
} from "lucide-react";

const disciplinas = [
  {
    id: 1,
    nome: "Lei nº 2.578/2012",
    descricao: "Estatuto dos Militares do Estado do Tocantins",
    questoes: 85,
    progresso: 72,
    destaque: true,
    links: {
      leiSeca: "https://central3.to.gov.br/arquivo/269664/",
    },
    topicos: [
      "Disposições Preliminares",
      "Situação, Hierarquia e Disciplina",
      "Cargo e Função Militar",
      "Ingresso nas Forças Auxiliares",
      "Estabilidade",
      "Juramento à Bandeira",
      "Da Ética Militar Estadual",
      "Dos Deveres Militares",
      "Do Valor Militar",
      "Remuneração",
      "Direitos e Prerrogativas",
      "Férias e Afastamentos",
      "Licenças",
      "Promoções",
      "Transferência para a Reserva",
      "Reforma",
      "Exclusão do Serviço Ativo",
      "Disposições Finais e Transitórias",
    ],
  },
  {
    id: 2,
    nome: "LC nº 128/2021",
    descricao: "Lei Complementar da PMTO",
    questoes: 62,
    progresso: 45,
    links: {
      leiSeca: "https://www.al.to.leg.br/arquivos/lei_128-2021_66731.PDF",
    },
    topicos: [
      "Disposições Gerais e Missão da PMTO",
      "Organização Básica",
      "Órgãos de Direção Geral e Setorial",
      "Órgãos de Apoio",
      "Órgãos de Execução",
      "Competências do Comando-Geral",
      "Estado-Maior",
      "Corregedoria",
      "Quadros e Efetivos",
      "Ensino e Formação",
      "Regime Jurídico dos Militares",
      "Serviço Ativo e Inativo",
      "Subordinação e Vinculação",
      "Disposições Finais e Transitórias",
    ],
  },
  {
    id: 3,
    nome: "Lei nº 2.575/2012",
    descricao: "Organização Básica da PMTO",
    questoes: 48,
    progresso: 60,
    links: {
      leiSeca: "https://central3.to.gov.br/arquivo/269665/",
    },
    topicos: [
      "Disposições Preliminares",
      "Promoções de Praças",
      "Promoções de Oficiais",
      "Requisitos para Promoção",
      "Promoção por Antiguidade",
      "Promoção por Merecimento",
      "Promoção por Bravura",
      "Promoção Post Mortem",
      "Quadro de Acesso",
      "Comissão de Promoções",
      "Ressalvas e Impedimentos",
      "Disposições Finais e Transitórias",
    ],
  },
  {
    id: 4,
    nome: "CPPM (Arts. 8º–28º e 243º–253º)",
    descricao: "Código de Processo Penal Militar – Trechos do Edital",
    questoes: 55,
    progresso: 30,
    links: {
      leiSeca: "https://www.planalto.gov.br/ccivil_03/Decreto-Lei/Del1002.htm",
    },
    topicos: [
      "Aplicação da Lei Processual Penal Militar (Art. 8º)",
      "Competência da Justiça Militar (Arts. 9º–12)",
      "Competência por Prerrogativa de Função",
      "Competência Territorial",
      "Conexão e Continência",
      "Questões Prejudiciais",
      "Exceções (Arts. 18–23)",
      "Impedimentos e Suspeições (Arts. 24–28)",
      "Inquérito Policial Militar – IPM (Arts. 243–253)",
      "Instauração do IPM",
    ],
  },
  {
    id: 5,
    nome: "Decreto nº 4.994/2014 – RDMETO",
    descricao: "Regulamento Disciplinar dos Militares do Estado do Tocantins",
    questoes: 70,
    progresso: 55,
    links: {
      leiSeca: "https://central3.to.gov.br/arquivo/179903/",
    },
    topicos: [
      "Disposições Preliminares",
      "Princípios da Hierarquia e Disciplina",
      "Transgressões Disciplinares",
      "Classificação das Transgressões",
      "Circunstâncias Atenuantes",
      "Circunstâncias Agravantes",
      "Sanções Disciplinares",
      "Advertência e Repreensão",
      "Detenção e Prisão",
      "Licenciamento e Exclusão a Bem da Disciplina",
      "Processo Administrativo Disciplinar",
      "Sindicância",
      "Recursos Disciplinares",
      "Comportamento Militar",
      "Recompensas",
      "Disposições Finais e Transitórias",
    ],
  },
];

const Edital = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAction = (disciplina: typeof disciplinas[0], action: string) => {
    if (action === "Questões") {
      navigate(`/questoes?disciplina=${encodeURIComponent(disciplina.nome)}`);
    } else if (action === "Lei Seca") {
      window.open(disciplina.links.leiSeca, "_blank");
    }
  };

  const toggleTopicos = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
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
              className={`glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 ${d.destaque ? 'glow-primary border-primary/20' : ''}`}
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {d.destaque && <Star className="w-4 h-4 text-gold" />}
                      <h3 className="font-bold text-foreground">{d.nome}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{d.descricao}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {d.topicos.length} tópicos
                      </span>
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" /> {d.questoes} questões
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-success" /> {d.progresso}% concluído
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-700"
                        style={{ width: `${d.progresso}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:flex-col md:items-end shrink-0">
                    <button
                      onClick={() => toggleTopicos(d.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-primary/15 hover:text-primary transition-all duration-200"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Tópicos
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedId === d.id ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleAction(d, "Lei Seca")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-primary/15 hover:text-primary transition-all duration-200"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      Lei Seca
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </button>
                    <button
                      onClick={() => handleAction(d, "Questões")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-primary/15 hover:text-primary transition-all duration-200"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      Questões
                      <ChevronRight className="w-3 h-3 opacity-50" />
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === d.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-4 pb-2">
                        Tópicos do Edital
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {d.topicos.map((topico, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 text-xs text-foreground"
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0">
                              {idx + 1}
                            </span>
                            {topico}
                          </div>
                        ))}
                      </div>
                    </div>
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

export default Edital;
