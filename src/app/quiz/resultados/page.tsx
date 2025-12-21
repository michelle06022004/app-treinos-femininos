'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Target, 
  Dumbbell, 
  Heart,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  Flame,
  Award,
  Share,
  Star,
  Zap,
  Calendar,
  Apple
} from 'lucide-react';

interface QuizAnswer {
  question: string;
  answer: string | string[];
}

interface Treino {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  nivel: string;
  foco: string[];
  beneficios: string[];
  frequencia: string;
  icon: any;
  gradient: string;
}

interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icon: any;
  desbloqueada: boolean;
}

export default function ResultadosQuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [mostrarCompartilhar, setMostrarCompartilhar] = useState(false);

  useEffect(() => {
    // Carregar respostas do localStorage
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (!savedAnswers) {
      router.push('/quiz');
      return;
    }

    const parsedAnswers: QuizAnswer[] = JSON.parse(savedAnswers);
    setAnswers(parsedAnswers);

    // Gerar treinos personalizados baseados nas respostas
    const treinosPersonalizados = gerarTreinosPersonalizados(parsedAnswers);
    setTreinos(treinosPersonalizados);

    // Inicializar conquistas
    inicializarConquistas();

    setLoading(false);
  }, [router]);

  const inicializarConquistas = () => {
    const conquistasIniciais: Conquista[] = [
      {
        id: 'primeiro-quiz',
        titulo: 'Primeiro Passo',
        descricao: 'Completou seu primeiro quiz!',
        icon: Star,
        desbloqueada: true
      },
      {
        id: 'comprometida',
        titulo: 'Comprometida',
        descricao: 'Definiu seus objetivos de treino',
        icon: Target,
        desbloqueada: true
      },
      {
        id: 'motivada',
        titulo: 'Motivada',
        descricao: 'Pronta para começar a jornada',
        icon: Zap,
        desbloqueada: true
      }
    ];

    setConquistas(conquistasIniciais);

    // Salvar conquistas no localStorage
    const conquistasSalvas = localStorage.getItem('conquistas');
    if (!conquistasSalvas) {
      localStorage.setItem('conquistas', JSON.stringify(conquistasIniciais));
    }
  };

  const gerarTreinosPersonalizados = (respostas: QuizAnswer[]): Treino[] => {
    const objetivo = respostas.find(a => a.question === 'objetivo')?.answer as string;
    const nivel = respostas.find(a => a.question === 'nivel')?.answer as string;
    const compromisso = respostas.find(a => a.question === 'compromisso')?.answer as string;
    const areasCorpo = respostas.find(a => a.question === 'areas-corpo')?.answer as string[];

    const todosTreinos: Treino[] = [
      {
        id: 'hiit-queima-gordura',
        titulo: 'HIIT Queima Gordura',
        descricao: 'Treino intervalado de alta intensidade para acelerar o metabolismo e queimar gordura rapidamente.',
        duracao: '25-30 min',
        nivel: 'Intermediário',
        foco: ['perder-peso', 'abdomen', 'corpo-todo'],
        beneficios: [
          'Queima até 500 calorias por sessão',
          'Acelera metabolismo por até 24h',
          'Melhora condicionamento cardiovascular',
          'Reduz gordura localizada'
        ],
        frequencia: '3-4x por semana',
        icon: Flame,
        gradient: 'from-orange-500 to-red-600'
      },
      {
        id: 'forca-tonificacao',
        titulo: 'Força & Tonificação',
        descricao: 'Treino focado em ganho de massa muscular e definição corporal com exercícios de resistência.',
        duracao: '40-50 min',
        nivel: 'Intermediário',
        foco: ['ganhar-massa', 'pernas', 'bracos', 'corpo-todo'],
        beneficios: [
          'Aumenta massa muscular magra',
          'Define e tonifica o corpo',
          'Fortalece ossos e articulações',
          'Melhora postura e equilíbrio'
        ],
        frequencia: '4-5x por semana',
        icon: Dumbbell,
        gradient: 'from-purple-500 to-indigo-600'
      },
      {
        id: 'abdomen-definido',
        titulo: 'Abdômen Definido',
        descricao: 'Treino específico para fortalecer e definir toda a região abdominal, incluindo oblíquos.',
        duracao: '20-25 min',
        nivel: 'Todos os níveis',
        foco: ['abdomen', 'perder-peso'],
        beneficios: [
          'Define cintura e abdômen',
          'Fortalece core e melhora postura',
          'Reduz medidas da barriga',
          'Previne dores nas costas'
        ],
        frequencia: '3-4x por semana',
        icon: Target,
        gradient: 'from-emerald-500 to-teal-600'
      },
      {
        id: 'inferior-perfeito',
        titulo: 'Inferior Perfeito',
        descricao: 'Treino completo para pernas e glúteos, focado em tonificação, força e definição.',
        duracao: '35-45 min',
        nivel: 'Todos os níveis',
        foco: ['pernas', 'ganhar-massa'],
        beneficios: [
          'Glúteos empinados e definidos',
          'Pernas tonificadas e firmes',
          'Reduz celulite e flacidez',
          'Melhora circulação sanguínea'
        ],
        frequencia: '3-4x por semana',
        icon: TrendingUp,
        gradient: 'from-pink-500 to-rose-600'
      },
      {
        id: 'bracos-definidos',
        titulo: 'Braços Definidos',
        descricao: 'Treino focado em bíceps, tríceps e ombros para braços firmes e tonificados.',
        duracao: '25-30 min',
        nivel: 'Todos os níveis',
        foco: ['bracos', 'ganhar-massa'],
        beneficios: [
          'Elimina flacidez nos braços',
          'Define bíceps e tríceps',
          'Fortalece ombros',
          'Melhora força funcional'
        ],
        frequencia: '2-3x por semana',
        icon: Award,
        gradient: 'from-cyan-500 to-blue-600'
      },
      {
        id: 'corpo-funcional',
        titulo: 'Corpo Funcional',
        descricao: 'Treino de movimentos funcionais para melhorar saúde, disposição e qualidade de vida.',
        duracao: '30-40 min',
        nivel: 'Iniciante',
        foco: ['saude', 'corpo-todo'],
        beneficios: [
          'Aumenta energia e disposição',
          'Melhora mobilidade e flexibilidade',
          'Fortalece corpo de forma equilibrada',
          'Previne lesões do dia a dia'
        ],
        frequencia: '3-5x por semana',
        icon: Heart,
        gradient: 'from-green-500 to-emerald-600'
      },
      {
        id: 'performance-avancada',
        titulo: 'Performance Avançada',
        descricao: 'Treino intenso para atletas que buscam superar limites e bater recordes pessoais.',
        duracao: '50-60 min',
        nivel: 'Avançado',
        foco: ['performance', 'ganhar-massa', 'corpo-todo'],
        beneficios: [
          'Maximiza força e potência',
          'Melhora explosão muscular',
          'Aumenta resistência',
          'Supera plateaus de treino'
        ],
        frequencia: '5-6x por semana',
        icon: Sparkles,
        gradient: 'from-violet-500 to-purple-600'
      }
    ];

    // Filtrar treinos baseados nas respostas
    let treinosFiltrados = todosTreinos.filter(treino => {
      // Filtrar por objetivo
      if (objetivo && !treino.foco.includes(objetivo)) {
        return false;
      }

      // Filtrar por áreas do corpo
      if (areasCorpo && areasCorpo.length > 0) {
        const temAreaCompativel = areasCorpo.some(area => treino.foco.includes(area));
        if (!temAreaCompativel && !treino.foco.includes('corpo-todo')) {
          return false;
        }
      }

      return true;
    });

    // Se não encontrou treinos específicos, retornar treinos gerais
    if (treinosFiltrados.length === 0) {
      treinosFiltrados = todosTreinos.filter(t => t.foco.includes('corpo-todo'));
    }

    // Limitar a 3-4 treinos mais relevantes
    return treinosFiltrados.slice(0, 4);
  };

  const handleIniciarTreino = (treinoId: string) => {
    // Salvar treino selecionado
    localStorage.setItem('treinoSelecionado', treinoId);
    // Redirecionar para dashboard
    router.push('/');
  };

  const handleVerTodosTreinos = () => {
    router.push('/');
  };

  const handleVerProgresso = () => {
    router.push('/progresso');
  };

  const handleCompartilhar = () => {
    const texto = `🎯 Acabei de completar meu quiz de treinos e estou pronta para começar minha jornada fitness! 💪\n\nMeus treinos personalizados:\n${treinos.map(t => `✨ ${t.titulo}`).join('\n')}\n\n#FitnessJourney #Treino #Saúde`;

    if (navigator.share) {
      navigator.share({
        title: 'Meus Treinos Personalizados',
        text: texto,
      }).catch(() => {
        // Se falhar, mostrar modal de compartilhamento
        setMostrarCompartilhar(true);
      });
    } else {
      // Fallback: mostrar modal de compartilhamento
      setMostrarCompartilhar(true);
    }
  };

  const copiarTextoCompartilhar = () => {
    const texto = `🎯 Acabei de completar meu quiz de treinos e estou pronta para começar minha jornada fitness! 💪\n\nMeus treinos personalizados:\n${treinos.map(t => `✨ ${t.titulo}`).join('\n')}\n\n#FitnessJourney #Treino #Saúde`;
    
    navigator.clipboard.writeText(texto);
    alert('Texto copiado! Cole nas suas redes sociais 📱');
    setMostrarCompartilhar(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Analisando suas respostas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4 animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
              Seus Treinos Personalizados
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Com base nas suas respostas, selecionamos os melhores treinos para você alcançar seus objetivos
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Conquistas Desbloqueadas */}
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-yellow-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-600" />
              Conquistas Desbloqueadas
            </h2>
            <button
              onClick={handleVerProgresso}
              className="text-sm font-semibold text-yellow-700 hover:text-yellow-900 transition-colors flex items-center gap-1"
            >
              Ver Progresso
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {conquistas.map((conquista, index) => (
              <div
                key={conquista.id}
                className="bg-white p-4 rounded-xl border border-yellow-200 flex items-center gap-3 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-2 rounded-lg">
                  <conquista.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{conquista.titulo}</h3>
                  <p className="text-xs text-gray-600">{conquista.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mensagem motivacional com botão de compartilhar */}
        <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-emerald-500 p-3 rounded-xl flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-emerald-900 mb-2">
                  Parabéns por dar o primeiro passo! 🎉
                </h2>
                <p className="text-emerald-700 leading-relaxed">
                  Sua jornada de transformação começa agora. Escolha um dos treinos abaixo e comece hoje mesmo. 
                  Lembre-se: consistência é a chave para resultados incríveis!
                </p>
              </div>
            </div>
            <button
              onClick={handleCompartilhar}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 flex-shrink-0"
              title="Compartilhar resultados"
            >
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid de Treinos com animações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {treinos.map((treino, index) => (
            <div
              key={treino.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Header do Card */}
              <div className={`bg-gradient-to-r ${treino.gradient} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl animate-pulse">
                      <treino.icon className="w-7 h-7" />
                    </div>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                      {treino.nivel}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{treino.titulo}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{treino.descricao}</p>
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                {/* Informações rápidas */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-sm">{treino.duracao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-sm">{treino.frequencia}</span>
                  </div>
                </div>

                {/* Benefícios */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    Benefícios
                  </h4>
                  <ul className="space-y-2">
                    {treino.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão de ação */}
                <button
                  onClick={() => handleIniciarTreino(treino.id)}
                  className={`w-full bg-gradient-to-r ${treino.gradient} text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group`}
                >
                  <span>Começar Este Treino</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleVerTodosTreinos}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-emerald-500 hover:text-emerald-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>Ver Todos os Treinos</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push('/nutricao')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Apple className="w-5 h-5" />
            <span>Ver Plano Nutricional</span>
          </button>
          <button
            onClick={handleVerProgresso}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            <span>Acompanhar Progresso</span>
          </button>
        </div>

        {/* Dica final */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="bg-purple-500 p-3 rounded-xl flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">
                💡 Dica de Ouro
              </h3>
              <p className="text-purple-700 leading-relaxed">
                Comece com um treino e mantenha a consistência por pelo menos 21 dias. 
                Esse é o tempo necessário para criar um hábito duradouro. Você consegue! 💪
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Compartilhamento */}
      {mostrarCompartilhar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Compartilhar Resultados</h3>
              <button
                onClick={() => setMostrarCompartilhar(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Compartilhe seus treinos personalizados com suas amigas e motive-as a começar também!
            </p>
            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-700 max-h-48 overflow-y-auto">
              🎯 Acabei de completar meu quiz de treinos e estou pronta para começar minha jornada fitness! 💪
              <br /><br />
              Meus treinos personalizados:
              <br />
              {treinos.map(t => (
                <div key={t.id}>✨ {t.titulo}</div>
              ))}
              <br />
              #FitnessJourney #Treino #Saúde
            </div>
            <button
              onClick={copiarTextoCompartilhar}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Copiar Texto
            </button>
          </div>
        </div>
      )}

      {/* Estilos de animação */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
