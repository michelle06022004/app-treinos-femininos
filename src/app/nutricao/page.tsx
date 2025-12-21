'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Apple, 
  ChevronLeft,
  CheckCircle2,
  Utensils,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Heart,
  TrendingUp,
  Clock,
  Flame,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Check,
  X
} from 'lucide-react';

interface QuizAnswer {
  question: string;
  answer: string | string[];
}

interface Refeicao {
  id: string;
  tipo: string;
  horario: string;
  nome: string;
  descricao: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  alimentos: AlimentoItem[];
  icon: any;
  gradient: string;
}

interface AlimentoItem {
  nome: string;
  quantidade: string;
  substituicoes?: string[];
}

interface PlanoNutricional {
  objetivo: string;
  calorias_diarias: number;
  distribuicao: {
    proteinas: number;
    carboidratos: number;
    gorduras: number;
  };
  refeicoes: Refeicao[];
  dicas: string[];
  alertas: string[];
}

export default function NutricaoPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [plano, setPlano] = useState<PlanoNutricional | null>(null);
  const [loading, setLoading] = useState(true);
  const [querNutricao, setQuerNutricao] = useState(false);
  const [showQuizNutricional, setShowQuizNutricional] = useState(false);
  const [quizNutricionalStep, setQuizNutricionalStep] = useState(0);
  const [respostasNutricionais, setRespostasNutricionais] = useState<QuizAnswer[]>([]);
  const [mostrarSubstituicoes, setMostrarSubstituicoes] = useState(false);
  const [refeicaoSelecionada, setRefeicaoSelecionada] = useState<string | null>(null);

  const perguntasNutricionais = [
    {
      id: 'orcamento-mensal',
      title: 'Quanto você pode investir em alimentação por mês?',
      subtitle: 'Vamos adaptar as sugestões ao seu orçamento',
      options: [
        { value: 'economico', label: 'Até R$ 400/mês', description: 'Foco em alimentos básicos e acessíveis' },
        { value: 'moderado', label: 'R$ 400 - R$ 800/mês', description: 'Equilíbrio entre variedade e custo' },
        { value: 'flexivel', label: 'Acima de R$ 800/mês', description: 'Mais opções e variedade' }
      ]
    },
    {
      id: 'acesso-alimentos',
      title: 'Onde você costuma fazer suas compras?',
      subtitle: 'Isso nos ajuda a sugerir alimentos mais fáceis de encontrar',
      options: [
        { value: 'mercado-bairro', label: 'Mercado do bairro', description: 'Produtos locais e básicos' },
        { value: 'supermercado', label: 'Supermercado grande', description: 'Variedade média de produtos' },
        { value: 'varios', label: 'Vários lugares', description: 'Mercado, feira, lojas especializadas' }
      ]
    },
    {
      id: 'tempo-cozinhar',
      title: 'Quanto tempo você tem para preparar refeições?',
      subtitle: 'Vamos sugerir receitas que cabem na sua rotina',
      options: [
        { value: 'pouco', label: 'Menos de 30 min/dia', description: 'Receitas rápidas e práticas' },
        { value: 'moderado', label: '30-60 min/dia', description: 'Receitas simples com preparo moderado' },
        { value: 'bastante', label: 'Mais de 1h/dia', description: 'Posso fazer meal prep e receitas elaboradas' }
      ]
    },
    {
      id: 'conhecimento-culinario',
      title: 'Como você avalia suas habilidades na cozinha?',
      subtitle: 'Sem julgamentos - vamos te ajudar no seu nível',
      options: [
        { value: 'basico', label: 'Básico', description: 'Sei fazer o essencial' },
        { value: 'intermediario', label: 'Intermediário', description: 'Me viro bem na cozinha' },
        { value: 'avancado', label: 'Avançado', description: 'Adoro cozinhar e experimentar' }
      ]
    },
    {
      id: 'prioridade-alimentacao',
      title: 'O que é mais importante para você?',
      subtitle: 'Pode escolher mais de uma opção',
      multiple: true,
      options: [
        { value: 'praticidade', label: 'Praticidade', description: 'Rápido de preparar' },
        { value: 'sabor', label: 'Sabor', description: 'Comida gostosa é essencial' },
        { value: 'economia', label: 'Economia', description: 'Gastar menos é prioridade' },
        { value: 'saude', label: 'Saúde', description: 'Nutrientes e qualidade' },
        { value: 'variedade', label: 'Variedade', description: 'Não enjoar das refeições' }
      ]
    }
  ];

  useEffect(() => {
    // Carregar respostas do localStorage
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (!savedAnswers) {
      router.push('/quiz');
      return;
    }

    const parsedAnswers: QuizAnswer[] = JSON.parse(savedAnswers);
    setAnswers(parsedAnswers);

    // Verificar se usuário quer acompanhamento nutricional
    const nutricaoAnswer = parsedAnswers.find(a => a.question === 'acompanhar-nutricao');
    if (nutricaoAnswer?.answer !== 'sim') {
      setQuerNutricao(false);
      setLoading(false);
      return;
    }

    setQuerNutricao(true);

    // Verificar se já respondeu quiz nutricional
    const savedNutricional = localStorage.getItem('quizNutricional');
    if (!savedNutricional) {
      setShowQuizNutricional(true);
      setLoading(false);
      return;
    }

    const parsedNutricional: QuizAnswer[] = JSON.parse(savedNutricional);
    setRespostasNutricionais(parsedNutricional);

    // Gerar plano nutricional personalizado
    const planoPersonalizado = gerarPlanoNutricional(parsedAnswers, parsedNutricional);
    setPlano(planoPersonalizado);

    setLoading(false);
  }, [router]);

  const handleRespostaNutricional = (questionId: string, value: string) => {
    const pergunta = perguntasNutricionais[quizNutricionalStep];
    const newRespostas = [...respostasNutricionais];
    const existingIndex = newRespostas.findIndex(a => a.question === questionId);

    if (pergunta.multiple) {
      let currentValues: string[] = [];
      if (existingIndex >= 0 && Array.isArray(newRespostas[existingIndex].answer)) {
        currentValues = [...(newRespostas[existingIndex].answer as string[])];
      }

      if (currentValues.includes(value)) {
        currentValues = currentValues.filter(v => v !== value);
      } else {
        currentValues.push(value);
      }

      if (existingIndex >= 0) {
        newRespostas[existingIndex] = { question: questionId, answer: currentValues };
      } else {
        newRespostas.push({ question: questionId, answer: currentValues });
      }

      setRespostasNutricionais(newRespostas);
    } else {
      if (existingIndex >= 0) {
        newRespostas[existingIndex] = { question: questionId, answer: value };
      } else {
        newRespostas.push({ question: questionId, answer: value });
      }

      setRespostasNutricionais(newRespostas);

      // Auto-avançar
      setTimeout(() => {
        if (quizNutricionalStep < perguntasNutricionais.length - 1) {
          setQuizNutricionalStep(quizNutricionalStep + 1);
        }
      }, 400);
    }
  };

  const finalizarQuizNutricional = () => {
    localStorage.setItem('quizNutricional', JSON.stringify(respostasNutricionais));
    const planoPersonalizado = gerarPlanoNutricional(answers, respostasNutricionais);
    setPlano(planoPersonalizado);
    setShowQuizNutricional(false);
  };

  const gerarPlanoNutricional = (respostas: QuizAnswer[], respostasNut: QuizAnswer[]): PlanoNutricional => {
    const objetivo = respostas.find(a => a.question === 'objetivo')?.answer as string;
    const preferencias = respostas.find(a => a.question === 'preferencias-alimentares')?.answer as string;
    const restricoes = respostas.find(a => a.question === 'restricoes-alimentares')?.answer as string[];
    const numRefeicoes = respostas.find(a => a.question === 'refeicoes-dia')?.answer as string;
    const orcamento = respostasNut.find(a => a.question === 'orcamento-mensal')?.answer as string;

    // Calcular calorias baseado no objetivo
    let calorias_diarias = 2000;
    let distribuicao = { proteinas: 30, carboidratos: 40, gorduras: 30 };

    if (objetivo === 'perder-peso') {
      calorias_diarias = 1600;
      distribuicao = { proteinas: 35, carboidratos: 35, gorduras: 30 };
    } else if (objetivo === 'ganhar-massa') {
      calorias_diarias = 2400;
      distribuicao = { proteinas: 40, carboidratos: 40, gorduras: 20 };
    } else if (objetivo === 'performance') {
      calorias_diarias = 2600;
      distribuicao = { proteinas: 35, carboidratos: 45, gorduras: 20 };
    }

    // Gerar refeições baseadas nas preferências
    const refeicoes = gerarRefeicoes(objetivo, preferencias, restricoes, numRefeicoes, calorias_diarias, orcamento);

    // Gerar dicas personalizadas
    const dicas = gerarDicas(objetivo, preferencias, restricoes, respostasNut);

    // Gerar alertas sobre riscos
    const alertas = gerarAlertas(restricoes, preferencias);

    return {
      objetivo: objetivo || 'saude',
      calorias_diarias,
      distribuicao,
      refeicoes,
      dicas,
      alertas
    };
  };

  const gerarRefeicoes = (
    objetivo: string, 
    preferencias: string, 
    restricoes: string[] | undefined,
    numRefeicoes: string,
    calorias: number,
    orcamento: string
  ): Refeicao[] => {
    const refeicoes: Refeicao[] = [];
    const economico = orcamento === 'economico';

    // Café da manhã
    refeicoes.push({
      id: 'cafe',
      tipo: 'Café da Manhã',
      horario: '7h - 8h',
      nome: preferencias === 'vegano' ? 'Bowl Energético Vegano' : 'Café Completo',
      descricao: 'Refeição energética para começar o dia com disposição',
      calorias: Math.round(calorias * 0.25),
      proteinas: 25,
      carboidratos: 45,
      gorduras: 12,
      alimentos: preferencias === 'vegano' 
        ? [
            { nome: 'Aveia', quantidade: '50g', substituicoes: economico ? ['Fubá', 'Farinha de milho'] : ['Granola', 'Quinoa em flocos'] },
            { nome: 'Banana', quantidade: '1 unidade', substituicoes: ['Maçã', 'Mamão', 'Laranja'] },
            { nome: 'Pasta de amendoim', quantidade: '1 colher sopa', substituicoes: economico ? ['Amendoim torrado moído', 'Gergelim'] : ['Pasta de castanha', 'Tahine'] },
            { nome: 'Leite vegetal', quantidade: '200ml', substituicoes: economico ? ['Leite de soja caseiro'] : ['Leite de amêndoas', 'Leite de aveia'] },
            { nome: 'Chia', quantidade: '1 colher sopa', substituicoes: ['Linhaça', 'Gergelim'] }
          ]
        : preferencias === 'vegetariano'
        ? [
            { nome: 'Ovos mexidos', quantidade: '2 unidades', substituicoes: ['Omelete', 'Ovos cozidos'] },
            { nome: 'Pão integral', quantidade: '2 fatias', substituicoes: economico ? ['Pão francês', 'Tapioca'] : ['Pão de forma integral', 'Wrap integral'] },
            { nome: 'Abacate', quantidade: '1/4 unidade', substituicoes: economico ? ['Azeite', 'Requeijão light'] : ['Cream cheese', 'Homus'] },
            { nome: 'Queijo branco', quantidade: '30g', substituicoes: ['Ricota', 'Cottage'] },
            { nome: 'Frutas', quantidade: '1 porção', substituicoes: ['Banana', 'Maçã', 'Mamão', 'Laranja'] }
          ]
        : [
            { nome: 'Ovos mexidos', quantidade: '2 unidades', substituicoes: ['Omelete', 'Ovos cozidos'] },
            { nome: 'Pão integral', quantidade: '2 fatias', substituicoes: economico ? ['Pão francês', 'Tapioca'] : ['Pão de forma integral', 'Wrap integral'] },
            { nome: 'Abacate', quantidade: '1/4 unidade', substituicoes: economico ? ['Azeite', 'Requeijão light'] : ['Cream cheese', 'Homus'] },
            { nome: 'Peito de peru', quantidade: '50g', substituicoes: economico ? ['Frango desfiado', 'Atum'] : ['Blanquet de peru', 'Salmão defumado'] },
            { nome: 'Frutas', quantidade: '1 porção', substituicoes: ['Banana', 'Maçã', 'Mamão', 'Laranja'] }
          ],
      icon: Coffee,
      gradient: 'from-amber-500 to-orange-600'
    });

    // Lanche da manhã (se 4+ refeições)
    if (numRefeicoes !== '3') {
      refeicoes.push({
        id: 'lanche-manha',
        tipo: 'Lanche da Manhã',
        horario: '10h - 11h',
        nome: 'Snack Proteico',
        descricao: 'Lanche leve para manter energia',
        calorias: Math.round(calorias * 0.10),
        proteinas: 15,
        carboidratos: 20,
        gorduras: 8,
        alimentos: preferencias === 'vegano'
          ? [
              { nome: 'Mix de castanhas', quantidade: '30g', substituicoes: economico ? ['Amendoim', 'Castanha de caju'] : ['Amêndoas', 'Nozes', 'Pistache'] },
              { nome: 'Frutas secas', quantidade: '20g', substituicoes: economico ? ['Banana passa', 'Uva passa'] : ['Damasco seco', 'Tâmaras'] },
              { nome: 'Barra de proteína vegana', quantidade: '1 unidade', substituicoes: ['Pasta de amendoim com banana', 'Vitamina de frutas'] }
            ]
          : [
              { nome: 'Iogurte grego', quantidade: '150g', substituicoes: economico ? ['Iogurte natural', 'Coalhada'] : ['Iogurte skyr', 'Kefir'] },
              { nome: 'Granola', quantidade: '30g', substituicoes: economico ? ['Aveia', 'Flocos de milho'] : ['Granola artesanal', 'Muesli'] },
              { nome: 'Frutas vermelhas', quantidade: '50g', substituicoes: economico ? ['Banana', 'Maçã'] : ['Morango', 'Mirtilo', 'Framboesa'] }
            ],
        icon: Apple,
        gradient: 'from-green-500 to-emerald-600'
      });
    }

    // Almoço
    refeicoes.push({
      id: 'almoco',
      tipo: 'Almoço',
      horario: '12h - 13h',
      nome: objetivo === 'ganhar-massa' ? 'Almoço Anabólico' : 'Almoço Equilibrado',
      descricao: 'Refeição principal do dia, completa e nutritiva',
      calorias: Math.round(calorias * 0.35),
      proteinas: 40,
      carboidratos: 50,
      gorduras: 15,
      alimentos: preferencias === 'vegano'
        ? [
            { nome: 'Grão de bico', quantidade: '150g', substituicoes: economico ? ['Feijão', 'Lentilha'] : ['Edamame', 'Tofu'] },
            { nome: 'Quinoa', quantidade: '100g', substituicoes: economico ? ['Arroz integral', 'Arroz branco'] : ['Arroz selvagem', 'Cuscuz marroquino'] },
            { nome: 'Brócolis', quantidade: '100g', substituicoes: ['Couve-flor', 'Couve', 'Espinafre'] },
            { nome: 'Batata doce', quantidade: '150g', substituicoes: economico ? ['Mandioca', 'Batata inglesa'] : ['Inhame', 'Abóbora'] },
            { nome: 'Salada verde', quantidade: 'à vontade', substituicoes: ['Alface', 'Rúcula', 'Agrião', 'Tomate', 'Pepino'] }
          ]
        : preferencias === 'low-carb'
        ? [
            { nome: 'Frango grelhado', quantidade: '150g', substituicoes: economico ? ['Frango cozido', 'Ovo'] : ['Peixe', 'Carne magra'] },
            { nome: 'Salada completa', quantidade: 'à vontade', substituicoes: ['Mix de folhas', 'Tomate', 'Pepino', 'Cenoura'] },
            { nome: 'Azeite', quantidade: '1 colher sopa', substituicoes: ['Abacate', 'Castanhas'] },
            { nome: 'Legumes grelhados', quantidade: '200g', substituicoes: ['Abobrinha', 'Berinjela', 'Pimentão', 'Brócolis'] }
          ]
        : [
            { nome: 'Frango ou peixe', quantidade: '150g', substituicoes: economico ? ['Frango', 'Ovo', 'Carne moída'] : ['Salmão', 'Tilápia', 'Carne magra'] },
            { nome: 'Arroz integral', quantidade: '100g', substituicoes: economico ? ['Arroz branco', 'Macarrão'] : ['Arroz selvagem', 'Quinoa'] },
            { nome: 'Feijão', quantidade: '100g', substituicoes: ['Lentilha', 'Grão de bico', 'Ervilha'] },
            { nome: 'Legumes', quantidade: '150g', substituicoes: ['Cenoura', 'Abobrinha', 'Beterraba', 'Vagem'] },
            { nome: 'Salada', quantidade: 'à vontade', substituicoes: ['Alface', 'Tomate', 'Pepino', 'Rúcula'] }
          ],
      icon: Sun,
      gradient: 'from-yellow-500 to-amber-600'
    });

    // Lanche da tarde (se 4+ refeições)
    if (numRefeicoes !== '3') {
      refeicoes.push({
        id: 'lanche-tarde',
        tipo: 'Lanche da Tarde',
        horario: '16h - 17h',
        nome: 'Pré-Treino',
        descricao: 'Energia para o treino',
        calorias: Math.round(calorias * 0.10),
        proteinas: 12,
        carboidratos: 25,
        gorduras: 5,
        alimentos: [
          { nome: 'Banana', quantidade: '1 unidade', substituicoes: ['Maçã', 'Pera', 'Uva'] },
          { nome: 'Pasta de amendoim', quantidade: '1 colher sopa', substituicoes: economico ? ['Amendoim torrado', 'Gergelim'] : ['Pasta de castanha', 'Tahine'] },
          { nome: 'Aveia', quantidade: '30g', substituicoes: economico ? ['Tapioca', 'Pão'] : ['Granola', 'Biscoito integral'] }
        ],
        icon: Utensils,
        gradient: 'from-orange-500 to-red-600'
      });
    }

    // Jantar
    refeicoes.push({
      id: 'jantar',
      tipo: 'Jantar',
      horario: '19h - 20h',
      nome: 'Jantar Leve',
      descricao: 'Refeição leve para boa digestão noturna',
      calorias: Math.round(calorias * 0.20),
      proteinas: 35,
      carboidratos: 30,
      gorduras: 12,
      alimentos: preferencias === 'vegano'
        ? [
            { nome: 'Tofu grelhado', quantidade: '150g', substituicoes: economico ? ['Grão de bico', 'Lentilha'] : ['Tempeh', 'Seitan'] },
            { nome: 'Legumes no vapor', quantidade: '200g', substituicoes: ['Brócolis', 'Couve-flor', 'Cenoura', 'Abobrinha'] },
            { nome: 'Quinoa', quantidade: '80g', substituicoes: economico ? ['Arroz integral', 'Batata doce'] : ['Cuscuz', 'Arroz selvagem'] },
            { nome: 'Salada', quantidade: 'à vontade', substituicoes: ['Mix de folhas', 'Tomate', 'Pepino'] }
          ]
        : preferencias === 'low-carb'
        ? [
            { nome: 'Salmão', quantidade: '150g', substituicoes: economico ? ['Frango', 'Ovo', 'Sardinha'] : ['Tilápia', 'Atum', 'Bacalhau'] },
            { nome: 'Aspargos', quantidade: '150g', substituicoes: ['Brócolis', 'Vagem', 'Couve-flor'] },
            { nome: 'Salada', quantidade: 'à vontade', substituicoes: ['Alface', 'Rúcula', 'Tomate', 'Pepino'] },
            { nome: 'Azeite', quantidade: '1 colher sopa', substituicoes: ['Abacate', 'Castanhas'] }
          ]
        : [
            { nome: 'Peixe ou frango', quantidade: '150g', substituicoes: economico ? ['Frango', 'Ovo', 'Sardinha'] : ['Salmão', 'Tilápia', 'Peru'] },
            { nome: 'Legumes', quantidade: '200g', substituicoes: ['Brócolis', 'Cenoura', 'Abobrinha', 'Berinjela'] },
            { nome: 'Salada verde', quantidade: 'à vontade', substituicoes: ['Alface', 'Rúcula', 'Agrião', 'Tomate'] },
            { nome: 'Batata doce', quantidade: '100g', substituicoes: economico ? ['Mandioca', 'Batata'] : ['Inhame', 'Abóbora'] }
          ],
      icon: Sunset,
      gradient: 'from-purple-500 to-indigo-600'
    });

    // Ceia (se 6 refeições)
    if (numRefeicoes === '6') {
      refeicoes.push({
        id: 'ceia',
        tipo: 'Ceia',
        horario: '21h - 22h',
        nome: 'Ceia Proteica',
        descricao: 'Proteína de lenta absorção para recuperação noturna',
        calorias: Math.round(calorias * 0.10),
        proteinas: 20,
        carboidratos: 10,
        gorduras: 8,
        alimentos: preferencias === 'vegano'
          ? [
              { nome: 'Shake de proteína vegana', quantidade: '1 dose', substituicoes: economico ? ['Pasta de amendoim', 'Leite de soja'] : ['Proteína de ervilha', 'Proteína de arroz'] },
              { nome: 'Castanhas', quantidade: '20g', substituicoes: economico ? ['Amendoim', 'Castanha de caju'] : ['Amêndoas', 'Nozes'] }
            ]
          : [
              { nome: 'Queijo cottage', quantidade: '100g', substituicoes: economico ? ['Iogurte natural', 'Queijo branco'] : ['Ricota', 'Iogurte grego'] },
              { nome: 'Castanhas', quantidade: '20g', substituicoes: economico ? ['Amendoim', 'Castanha de caju'] : ['Amêndoas', 'Nozes'] },
              { nome: 'Chá', quantidade: '1 xícara', substituicoes: ['Chá de camomila', 'Chá verde', 'Chá de ervas'] }
            ],
        icon: Moon,
        gradient: 'from-indigo-500 to-purple-600'
      });
    }

    return refeicoes;
  };

  const gerarDicas = (objetivo: string, preferencias: string, restricoes: string[] | undefined, respostasNut: QuizAnswer[]): string[] => {
    const dicas: string[] = [];
    const orcamento = respostasNut.find(a => a.question === 'orcamento-mensal')?.answer as string;
    const tempoCozinhar = respostasNut.find(a => a.question === 'tempo-cozinhar')?.answer as string;

    // Dicas gerais
    dicas.push('💧 Beba pelo menos 2-3 litros de água por dia para hidratação adequada');
    dicas.push('🚫 Evite alimentos ultraprocessados e fast food sempre que possível');
    dicas.push('⏰ Faça suas refeições em horários regulares para melhor metabolismo');

    // Dicas por objetivo
    if (objetivo === 'perder-peso') {
      dicas.push('📉 Crie um déficit calórico moderado de 300-500 calorias por dia');
      dicas.push('🥩 Priorize proteínas em todas as refeições para maior saciedade');
      dicas.push('🍬 Evite carboidratos simples e açúcares refinados');
    } else if (objetivo === 'ganhar-massa') {
      dicas.push('📈 Mantenha superávit calórico de 300-500 calorias por dia');
      dicas.push('💪 Consuma 2g de proteína por kg de peso corporal');
      dicas.push('🍽️ Não pule refeições, especialmente pós-treino');
    }

    // Dicas por preferência
    if (preferencias === 'vegano') {
      dicas.push('🌱 Combine diferentes fontes de proteína vegetal (feijão + arroz)');
      dicas.push('💊 Suplementar vitamina B12 é essencial para veganos');
    } else if (preferencias === 'low-carb') {
      dicas.push('🥑 Aumente consumo de gorduras boas (abacate, castanhas, azeite)');
      dicas.push('📊 Mantenha carboidratos abaixo de 100g por dia');
    }

    // Dicas por restrições
    if (restricoes?.includes('diabetes')) {
      dicas.push('📊 Monitore o índice glicêmico dos alimentos');
      dicas.push('⚖️ Evite picos de insulina com refeições balanceadas');
    }

    if (restricoes?.includes('hipertensao')) {
      dicas.push('🧂 Reduza consumo de sódio (sal) ao mínimo');
      dicas.push('🍌 Aumente potássio (banana, abacate, água de coco)');
    }

    // Dicas por orçamento
    if (orcamento === 'economico') {
      dicas.push('💰 Compre alimentos da estação - são mais baratos e nutritivos');
      dicas.push('🛒 Faça lista de compras e evite desperdício');
      dicas.push('🍳 Ovos são fonte de proteína barata e completa');
    }

    // Dicas por tempo
    if (tempoCozinhar === 'pouco') {
      dicas.push('⏱️ Prepare refeições aos domingos (meal prep) para a semana');
      dicas.push('🥗 Use legumes congelados - são práticos e nutritivos');
    }

    return dicas;
  };

  const gerarAlertas = (restricoes: string[] | undefined, preferencias: string): string[] => {
    const alertas: string[] = [];

    if (restricoes?.includes('diabetes')) {
      alertas.push('⚠️ DIABETES: Monitore sua glicemia regularmente e ajuste porções conforme orientação médica');
    }

    if (restricoes?.includes('hipertensao')) {
      alertas.push('⚠️ HIPERTENSÃO: Evite alimentos processados ricos em sódio. Prefira temperos naturais');
    }

    if (restricoes?.includes('lactose')) {
      alertas.push('⚠️ LACTOSE: Verifique rótulos - lactose pode estar "escondida" em produtos industrializados');
    }

    if (restricoes?.includes('gluten')) {
      alertas.push('⚠️ GLÚTEN: Cuidado com contaminação cruzada ao preparar alimentos');
    }

    if (preferencias === 'vegano') {
      alertas.push('⚠️ DIETA VEGANA: Suplementação de B12, vitamina D e ômega-3 é recomendada');
    }

    if (preferencias === 'low-carb') {
      alertas.push('⚠️ LOW CARB: Mantenha hidratação adequada e monitore eletrólitos');
    }

    // Alertas gerais importantes
    alertas.push('⚠️ IMPORTANTE: Consulte um nutricionista para acompanhamento personalizado');
    alertas.push('⚠️ SUPLEMENTOS: Não substitua refeições por suplementos sem orientação profissional');

    return alertas;
  };

  const isRespostaSelecionada = (questionId: string, value: string) => {
    const resposta = respostasNutricionais.find(r => r.question === questionId);
    if (!resposta) return false;
    
    const pergunta = perguntasNutricionais.find(p => p.id === questionId);
    if (pergunta?.multiple && Array.isArray(resposta.answer)) {
      return resposta.answer.includes(value);
    }
    
    return resposta.answer === value;
  };

  const getResposta = (questionId: string) => {
    const resposta = respostasNutricionais.find(r => r.question === questionId);
    if (!resposta) return null;
    
    const pergunta = perguntasNutricionais.find(p => p.id === questionId);
    if (pergunta?.multiple) {
      return Array.isArray(resposta.answer) && resposta.answer.length > 0 ? resposta.answer : null;
    }
    
    return resposta.answer;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Preparando sua jornada nutricional...</p>
        </div>
      </div>
    );
  }

  if (!querNutricao) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Nutrição Personalizada
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Apple className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Você optou por focar apenas nos treinos
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Sem problemas! Você pode adicionar acompanhamento nutricional a qualquer momento. 
                Lembre-se que a nutrição representa 70% dos resultados na sua jornada fitness.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => router.push('/quiz')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Apple className="w-5 h-5" />
                <span>Refazer Quiz com Nutrição</span>
              </button>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-green-500 hover:text-green-700 transition-all duration-300 hover:shadow-lg"
              >
                <span>Ir para Treinos</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Quiz Nutricional
  if (showQuizNutricional) {
    const perguntaAtual = perguntasNutricionais[quizNutricionalStep];
    const isUltimaPergunta = quizNutricionalStep === perguntasNutricionais.length - 1;
    const progress = ((quizNutricionalStep + 1) / perguntasNutricionais.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Quiz Nutricional
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Etapa {quizNutricionalStep + 1} de {perguntasNutricionais.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{Math.round(progress)}%</div>
                <div className="text-xs text-gray-500">completo</div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-1.5 bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 sm:p-10 text-white">
              <div className="flex items-start gap-4 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-shrink-0">
                  <Apple className="w-7 h-7" />
                </div>
                <div className="flex-1 pt-1">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
                    {perguntaAtual.title}
                  </h2>
                  <p className="text-white/90 text-base sm:text-lg">
                    {perguntaAtual.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="space-y-3">
                {perguntaAtual.options.map((option) => {
                  const isSelected = isRespostaSelecionada(perguntaAtual.id, option.value);
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleRespostaNutricional(perguntaAtual.id, option.value)}
                      className={`w-full text-left p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] group ${ 
                        isSelected
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 flex-shrink-0 transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                          {isSelected ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <div className={`w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-400 transition-colors ${
                              perguntaAtual.multiple ? 'rounded-md' : ''
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-lg mb-1 ${isSelected ? 'text-green-900' : 'text-gray-900'}`}>
                            {option.label}
                          </p>
                          <p className={`text-sm leading-relaxed ${isSelected ? 'text-green-700' : 'text-gray-600'}`}>
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 sm:p-8 bg-gray-50">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setQuizNutricionalStep(Math.max(0, quizNutricionalStep - 1))}
                  disabled={quizNutricionalStep === 0}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${ 
                    quizNutricionalStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 shadow-sm hover:shadow'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Voltar</span>
                </button>

                {isUltimaPergunta ? (
                  <button
                    onClick={finalizarQuizNutricional}
                    disabled={!getResposta(perguntaAtual.id)}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${ 
                      getResposta(perguntaAtual.id)
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:scale-105 shadow-md'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Gerar Plano Nutricional</span>
                    <Sparkles className="w-5 h-5" />
                  </button>
                ) : (
                  perguntaAtual.multiple ? (
                    <button
                      onClick={() => setQuizNutricionalStep(quizNutricionalStep + 1)}
                      disabled={!getResposta(perguntaAtual.id)}
                      className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${ 
                        getResposta(perguntaAtual.id)
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:scale-105 shadow-md'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Continuar</span>
                      <ChevronLeft className="w-5 h-5 rotate-180" />
                    </button>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      Selecione uma opção para continuar
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!plano) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 animate-bounce">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Seu Plano Nutricional
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alimentação personalizada para alcançar seus objetivos
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Resumo do Plano */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mb-2">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{plano.calorias_diarias}</div>
              <div className="text-sm text-gray-600">Calorias/dia</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{plano.distribuicao.proteinas}%</div>
              <div className="text-sm text-gray-600">Proteínas</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 rounded-xl mb-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{plano.distribuicao.carboidratos}%</div>
              <div className="text-sm text-gray-600">Carboidratos</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{plano.distribuicao.gorduras}%</div>
              <div className="text-sm text-gray-600">Gorduras</div>
            </div>
          </div>
        </div>

        {/* Banner de Substituições */}
        {!mostrarSubstituicoes && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 p-3 rounded-xl flex-shrink-0">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Quer substituir algum alimento?
                </h3>
                <p className="text-blue-700 mb-4">
                  Criamos um plano com alimentos que se encaixam no seu perfil. Mas se preferir, você pode substituir qualquer alimento por opções mais acessíveis ou que você goste mais! 😊
                </p>
                <button
                  onClick={() => setMostrarSubstituicoes(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Ver Opções de Substituição</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Refeições */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Utensils className="w-7 h-7 text-green-600" />
            Suas Refeições Diárias
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plano.refeicoes.map((refeicao, index) => (
              <div
                key={refeicao.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header da Refeição */}
                <div className={`bg-gradient-to-r ${refeicao.gradient} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <refeicao.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">{refeicao.tipo}</div>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <Clock className="w-4 h-4" />
                        {refeicao.horario}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{refeicao.nome}</h3>
                  <p className="text-white/90 text-sm">{refeicao.descricao}</p>
                </div>

                {/* Conteúdo da Refeição */}
                <div className="p-6">
                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{refeicao.calorias}</div>
                      <div className="text-xs text-gray-600">kcal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{refeicao.proteinas}g</div>
                      <div className="text-xs text-gray-600">Prot</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600">{refeicao.carboidratos}g</div>
                      <div className="text-xs text-gray-600">Carb</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{refeicao.gorduras}g</div>
                      <div className="text-xs text-gray-600">Gord</div>
                    </div>
                  </div>

                  {/* Alimentos */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Alimentos
                    </h4>
                    <ul className="space-y-2">
                      {refeicao.alimentos.map((alimento, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <div className="flex-1">
                              <span className="font-medium">{alimento.nome}</span>
                              <span className="text-gray-500"> - {alimento.quantidade}</span>
                              {mostrarSubstituicoes && alimento.substituicoes && (
                                <div className="mt-1 text-xs text-blue-600">
                                  <span className="font-medium">Pode substituir por:</span> {alimento.substituicoes.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de Riscos */}
        {plano.alertas.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 p-6">
            <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-7 h-7 text-red-600" />
              Alertas Importantes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plano.alertas.map((alerta, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-red-200 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{alerta}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dicas Nutricionais */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-600" />
            Dicas Personalizadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plano.dicas.map((dica, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-purple-200 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{dica}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de ação */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>Começar Minha Jornada</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
