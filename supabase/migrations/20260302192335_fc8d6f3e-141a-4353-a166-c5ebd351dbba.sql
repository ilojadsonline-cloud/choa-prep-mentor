
-- Create questoes table
CREATE TABLE public.questoes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  disciplina TEXT NOT NULL,
  assunto TEXT NOT NULL,
  dificuldade TEXT NOT NULL DEFAULT 'Médio',
  enunciado TEXT NOT NULL,
  alt_a TEXT NOT NULL,
  alt_b TEXT NOT NULL,
  alt_c TEXT NOT NULL,
  alt_d TEXT NOT NULL,
  alt_e TEXT NOT NULL,
  gabarito INTEGER NOT NULL CHECK (gabarito BETWEEN 0 AND 4),
  comentario TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.questoes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read questions (public content)
CREATE POLICY "Anyone can read questoes"
  ON public.questoes FOR SELECT
  USING (true);

-- Create respostas_usuario table to track user answers
CREATE TABLE public.respostas_usuario (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  questao_id BIGINT REFERENCES public.questoes(id) ON DELETE CASCADE NOT NULL,
  resposta INTEGER NOT NULL,
  correta BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.respostas_usuario ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own answers"
  ON public.respostas_usuario FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answers"
  ON public.respostas_usuario FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create simulados table
CREATE TABLE public.simulados (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  disciplina TEXT NOT NULL,
  questao_ids BIGINT[] NOT NULL,
  acertos INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,
  finalizado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.simulados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own simulados"
  ON public.simulados FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own simulados"
  ON public.simulados FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own simulados"
  ON public.simulados FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
