import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const disciplinas = [
  {
    nome: "Lei nº 2.578/2012",
    assuntos: [
      "Disposições Preliminares", "Situação jurídica dos militares", "Hierarquia e Disciplina",
      "Ingresso nas Forças Armadas Estaduais", "Estabilidade", "Cargo e função militar",
      "Deveres militares", "Ética militar", "Proibições", "Direitos dos militares",
      "Remuneração", "Férias e licenças", "Movimentação e transferência",
      "Promoções", "Inatividade e reserva", "Reforma", "Exclusão do serviço ativo",
      "Disposições transitórias e finais"
    ]
  },
  {
    nome: "LC nº 128/2021",
    assuntos: [
      "Organização da PMTO", "Competência e atribuições", "Estrutura organizacional",
      "Quadros e efetivos", "Comando-Geral", "Estado-Maior", "Unidades operacionais",
      "Unidades administrativas", "Ensino policial militar", "Saúde do policial militar",
      "Justiça e disciplina", "Recursos humanos", "Planejamento e orçamento",
      "Disposições gerais e transitórias"
    ]
  },
  {
    nome: "Lei nº 2.575/2012",
    assuntos: [
      "Organização básica da PMTO", "Missão e competência", "Estrutura organizacional",
      "Órgãos de direção", "Órgãos de apoio", "Órgãos de execução",
      "Articulação e desdobramento", "Efetivo e quadros",
      "Funcionamento dos órgãos", "Hierarquia funcional",
      "Subordinação e vinculação", "Disposições finais"
    ]
  },
  {
    nome: "CPPM",
    assuntos: [
      "Aplicação do CPPM (Art. 8º)", "Aplicação subsidiária (Art. 9º)",
      "Competência da Justiça Militar (Art. 10-12)", "Jurisdição militar (Art. 13-17)",
      "Impedimentos e suspeições (Art. 18-24)", "Exceções (Art. 25-28)",
      "Incidentes de falsidade (Art. 243-247)", "Insanidade mental do acusado (Art. 248-253)"
    ]
  },
  {
    nome: "RDMETO",
    assuntos: [
      "Disposições preliminares", "Princípios da hierarquia e disciplina",
      "Transgressões disciplinares", "Classificação das transgressões",
      "Circunstâncias atenuantes", "Circunstâncias agravantes",
      "Punições disciplinares", "Advertência", "Repreensão",
      "Detenção", "Prisão disciplinar", "Licenciamento a bem da disciplina",
      "Exclusão a bem da disciplina", "Procedimento disciplinar",
      "Sindicância", "Processo Administrativo Disciplinar (PAD)",
      "Recursos disciplinares"
    ]
  }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { disciplinaIndex = 0, batchSize = 20 } = await req.json().catch(() => ({}));

    const disciplina = disciplinas[disciplinaIndex];
    if (!disciplina) {
      return new Response(JSON.stringify({ error: "Disciplina index inválido", total: disciplinas.length }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400
      });
    }

    // Pick random assuntos for this batch
    const assuntosForBatch = disciplina.assuntos
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(5, disciplina.assuntos.length));

    const prompt = `Você é um especialista em concursos militares do Estado do Tocantins. Gere exatamente ${batchSize} questões objetivas de múltipla escolha (A-E) sobre a disciplina "${disciplina.nome}" do edital CHOA/CHOM 2024 da PMTO.

Os assuntos devem ser distribuídos entre: ${assuntosForBatch.join(", ")}.

REGRAS OBRIGATÓRIAS:
- Cada questão DEVE ter 5 alternativas (A, B, C, D, E), sendo apenas UMA correta
- O gabarito deve ser o ÍNDICE da alternativa correta (0=A, 1=B, 2=C, 3=D, 4=E)
- Distribua os gabaritos uniformemente (não coloque todas como alternativa A)
- Varie a dificuldade: ~30% Fácil, ~50% Médio, ~20% Difícil
- Os enunciados devem ser claros, objetivos e baseados EXCLUSIVAMENTE na legislação do Tocantins
- O comentário deve explicar por que a alternativa correta é a certa e por que as outras são erradas
- NÃO use leis de outros estados

Retorne usando a tool "insert_questions" com as questões geradas.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Você gera questões de concurso militar precisas e fundamentadas na legislação do Tocantins. Use a tool fornecida para retornar as questões." },
          { role: "user", content: prompt }
        ],
        tools: [{
          type: "function",
          function: {
            name: "insert_questions",
            description: "Insere questões no banco de dados",
            parameters: {
              type: "object",
              properties: {
                questoes: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      enunciado: { type: "string" },
                      alt_a: { type: "string" },
                      alt_b: { type: "string" },
                      alt_c: { type: "string" },
                      alt_d: { type: "string" },
                      alt_e: { type: "string" },
                      gabarito: { type: "number", description: "0=A, 1=B, 2=C, 3=D, 4=E" },
                      dificuldade: { type: "string", enum: ["Fácil", "Médio", "Difícil"] },
                      assunto: { type: "string" },
                      comentario: { type: "string" }
                    },
                    required: ["enunciado", "alt_a", "alt_b", "alt_c", "alt_d", "alt_e", "gabarito", "dificuldade", "assunto", "comentario"],
                    additionalProperties: false
                  }
                }
              },
              required: ["questoes"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "insert_questions" } }
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Gateway error:", response.status, errText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      throw new Error("AI não retornou questões no formato esperado");
    }

    const { questoes } = JSON.parse(toolCall.function.arguments);

    if (!questoes || !Array.isArray(questoes) || questoes.length === 0) {
      throw new Error("Nenhuma questão gerada");
    }

    // Insert into database
    const rows = questoes.map((q: any) => ({
      disciplina: disciplina.nome,
      assunto: q.assunto,
      dificuldade: q.dificuldade || "Médio",
      enunciado: q.enunciado,
      alt_a: q.alt_a,
      alt_b: q.alt_b,
      alt_c: q.alt_c,
      alt_d: q.alt_d,
      alt_e: q.alt_e,
      gabarito: q.gabarito,
      comentario: q.comentario,
    }));

    const { data: inserted, error: insertError } = await supabase
      .from("questoes")
      .insert(rows)
      .select("id");

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Erro ao inserir: ${insertError.message}`);
    }

    return new Response(JSON.stringify({
      success: true,
      disciplina: disciplina.nome,
      geradas: inserted?.length || 0,
      message: `${inserted?.length} questões inseridas para ${disciplina.nome}`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500
    });
  }
});
