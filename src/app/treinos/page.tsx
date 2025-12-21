'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Home,
  Building2,
  Clock,
  Repeat,
  Timer,
  Info,
  Users,
  Dumbbell,
  Flame,
  Zap,
  Target,
  Activity,
  TrendingUp,
  Heart,
  Sparkles,
  Award,
  Wind,
  Play,
  Pause,
  SkipForward,
  CheckCircle2,
  X,
  Trophy,
  Star,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

// Paleta de cores profissional
const COLORS = {
  primary: '#2563EB', // Azul
  secondary: '#0891B2', // Cyan
  alert: '#DC2626', // Vermelho
  neutral: {
    bg: '#F8FAFC',
    text: '#0F172A',
    textLight: '#64748B'
  }
};

// Componente de Vídeo do YouTube
function ExerciseVideo({ exerciseName }: { exerciseName: string }) {
  const getYouTubeVideoId = (name: string) => {
    const lowerName = name.toLowerCase();
    
    // Mapeamento de exercícios para vídeos do YouTube
    const videoMap: { [key: string]: string } = {
      // Força
      'agachamento': 'aclHkVaku9U',
      'squat': 'aclHkVaku9U',
      'flexão': 'IODxDxX7oi4',
      'push': 'IODxDxX7oi4',
      'prancha': '_3h3Qq8p7Wg',
      'plank': '_3h3Qq8p7Wg',
      'hip thrust': 'Zp26q4BY5HE',
      'elevação pélvica': 'Zp26q4BY5HE',
      'stiff': 'r4MzxtBKyNE',
      'deadlift': 'r4MzxtBKyNE',
      'levantamento': 'r4MzxtBKyNE',
      'supino': 'rT7DgCr-3pg',
      'bench': 'rT7DgCr-3pg',
      'remada': 'pYcpY20QaE8',
      'row': 'pYcpY20QaE8',
      'agachamento búlgaro': 'vNhGNmq3LOQ',
      'bulgarian': 'vNhGNmq3LOQ',
      'afundo': 'QOVaHwm-Q6U',
      'lunge': 'QOVaHwm-Q6U',
      
      // Cardio
      'burpee': 'TU8QYVW0gDU',
      'jump': 'c_Dq_NCzj8M',
      'salto': 'c_Dq_NCzj8M',
      'corrida': 'brFHyOtTwH4',
      'sprint': 'brFHyOtTwH4',
      'high knees': 'brFHyOtTwH4',
      'mountain climber': 'nmwgirgXLYM',
      
      // Mobilidade
      'stretch': 'g_tea8ZNk5A',
      'alongamento': 'g_tea8ZNk5A',
      'yoga': 'v7AYKMP6rOE',
      'pose': 'v7AYKMP6rOE',
      'cat': 'K9bK0FbucwA',
      'cow': 'K9bK0FbucwA',
      'thread the needle': 'ZXKMPe5aHaE',
      'frog stretch': 'gLnKHFWHzLI',
      'pigeon': 'XeXed0hO_5w',
      'forward fold': 'g_tea8ZNk5A',
      'downward dog': 'v7AYKMP6rOE',
      
      // Pilates/Core
      'pilates': 'O3K_HYdWYtY',
      'abdominal': 'DHD1-2P94DI',
      'core': 'DHD1-2P94DI',
      
      // Outros
      'kettlebell': 'YSxHifyI6s8',
      'box jump': 'NBY9-kTuHEk',
      'clean': 'EKRgCyEjqnE',
      'press': 'EKRgCyEjqnE'
    };
    
    // Procura por palavras-chave no nome do exercício
    for (const [key, videoId] of Object.entries(videoMap)) {
      if (lowerName.includes(key)) {
        return videoId;
      }
    }
    
    // Vídeo padrão de exercício genérico
    return 'aclHkVaku9U';
  };

  const videoId = getYouTubeVideoId(exerciseName);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        title={exerciseName}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0"
      />
    </div>
  );
}

// Modal de Conclusão do Treino
function ModalConclusao({ 
  treino, 
  tempoTotal,
  onClose,
  onVerMais
}: { 
  treino: any; 
  tempoTotal: number;
  onClose: () => void;
  onVerMais: () => void;
}) {
  // Calcula estatísticas baseadas no treino
  const calcularEstatisticas = () => {
    const exercicios = treino.exercicios || treino.treino?.exercicios || [];
    const numExercicios = exercicios.length;
    
    // Estimativa de calorias (baseado em tempo e intensidade)
    const caloriasPorMinuto = 8; // Média para treino de força
    const caloriasQueimadas = Math.round((tempoTotal / 60) * caloriasPorMinuto);
    
    // Melhorias baseadas no tipo de treino
    const melhorias = [];
    
    if (treino.foco?.includes('Glúteos') || treino.nome?.includes('Virginia')) {
      melhorias.push({ icon: Flame, text: 'Glúteos mais fortes e volumosos', color: 'text-blue-600' });
      melhorias.push({ icon: Zap, text: 'Pernas mais tonificadas', color: 'text-cyan-600' });
    } else if (treino.foco?.includes('Slim') || treino.nome?.includes('Jade')) {
      melhorias.push({ icon: Wind, text: 'Corpo mais esbelto e definido', color: 'text-emerald-600' });
      melhorias.push({ icon: Heart, text: 'Flexibilidade aumentada', color: 'text-blue-600' });
    } else if (treino.tipo === 'Mobilidade' || treino.tipo === 'Alongamento') {
      melhorias.push({ icon: Wind, text: 'Mobilidade articular melhorada', color: 'text-cyan-600' });
      melhorias.push({ icon: Heart, text: 'Redução de tensões musculares', color: 'text-emerald-600' });
    } else {
      melhorias.push({ icon: Dumbbell, text: 'Força muscular aumentada', color: 'text-indigo-600' });
      melhorias.push({ icon: Flame, text: 'Metabolismo acelerado', color: 'text-blue-600' });
    }
    
    melhorias.push({ icon: Trophy, text: 'Resistência cardiovascular', color: 'text-cyan-600' });
    melhorias.push({ icon: Sparkles, text: 'Bem-estar mental elevado', color: 'text-emerald-600' });
    
    return {
      caloriasQueimadas,
      exerciciosCompletos: numExercicios,
      tempoTotal: Math.round(tempoTotal / 60),
      melhorias
    };
  };

  const stats = calcularEstatisticas();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[95vh] overflow-y-auto">
        {/* Header com Celebração */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Parabéns! 🎉</h2>
            <p className="text-emerald-100 text-lg">Treino concluído com sucesso!</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Estatísticas Principais */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border border-blue-100">
              <Flame className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-slate-900">{stats.caloriasQueimadas}</div>
              <div className="text-xs text-slate-600 font-medium">Calorias</div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-4 text-center border border-cyan-100">
              <Clock className="w-8 h-8 mx-auto mb-2 text-cyan-600" />
              <div className="text-2xl font-bold text-slate-900">{stats.tempoTotal}</div>
              <div className="text-xs text-slate-600 font-medium">Minutos</div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-4 text-center border border-indigo-100">
              <Dumbbell className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
              <div className="text-2xl font-bold text-slate-900">{stats.exerciciosCompletos}</div>
              <div className="text-xs text-slate-600 font-medium">Exercícios</div>
            </div>
          </div>

          {/* Melhorias Conquistadas */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-600" />
              Melhorias Conquistadas
            </h3>
            <div className="space-y-3">
              {stats.melhorias.map((melhoria, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors"
                >
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <melhoria.icon className={`w-5 h-5 ${melhoria.color}`} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{melhoria.text}</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Recompensas */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6 text-cyan-600 fill-cyan-600" />
              <div>
                <div className="font-bold text-slate-900">+50 XP Ganhos</div>
                <div className="text-xs text-slate-600">Continue assim para subir de nível!</div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onVerMais}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Ver Mais Treinos Recomendados
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal de Execução de Treino - REDESENHADO
function ModalTreino({ 
  treino, 
  onClose 
}: { 
  treino: any; 
  onClose: () => void;
}) {
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [serieAtual, setSerieAtual] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showConclusao, setShowConclusao] = useState(false);

  // Cronômetro (SEM SONS)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const exercicios = treino.exercicios || treino.treino?.exercicios || [];
  const exercicioCorrente = exercicios[exercicioAtual];
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const iniciarTreino = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pausarTreino = () => {
    setIsPaused(!isPaused);
  };

  const proximoExercicio = () => {
    if (exercicioAtual < exercicios.length - 1) {
      setExercicioAtual(exercicioAtual + 1);
      setSerieAtual(1);
    }
  };

  const proximaSerie = () => {
    const totalSeries = parseInt(exercicioCorrente.series || exercicioCorrente.tempo || '1');
    if (serieAtual < totalSeries) {
      setSerieAtual(serieAtual + 1);
    } else {
      proximoExercicio();
    }
  };

  const finalizarTreino = () => {
    setIsActive(false);
    setShowConclusao(true);
  };

  const handleVerMaisTreinos = () => {
    setShowConclusao(false);
    onClose();
    // Scroll para seção de treinos recomendados
    setTimeout(() => {
      const element = document.getElementById('treinos-recomendados');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (showConclusao) {
    return (
      <ModalConclusao 
        treino={treino}
        tempoTotal={time}
        onClose={onClose}
        onVerMais={handleVerMaisTreinos}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        {/* 1. Nome do Treino + Fechar */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{treino.nome}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 2. Progresso */}
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600">
              Exercício {exercicioAtual + 1} de {exercicios.length}
              {exercicioCorrente?.series && (
                <> • Série {serieAtual} de {parseInt(exercicioCorrente.series)}</>
              )}
            </p>
          </div>

          {/* 3. Cronômetro (topo, discreto) */}
          {isActive && (
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" style={{ color: COLORS.primary }} />
                <span className="text-lg font-semibold text-slate-900">{formatTime(time)}</span>
              </div>
            </div>
          )}

          {/* 4. Vídeo do YouTube (ELEMENTO PRINCIPAL - SEM OVERLAY) */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
            {isActive ? (
              <ExerciseVideo exerciseName={exercicioCorrente?.nome || 'Exercício'} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <div className="text-center">
                  <Activity className="w-16 h-16 mx-auto mb-3 text-slate-400" />
                  <p className="text-slate-500 font-medium">Pronto para começar</p>
                </div>
              </div>
            )}
          </div>

          {/* 5. Nome do Exercício */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              {exercicioCorrente?.nome}
            </h3>
          </div>

          {/* 6. Séries, Repetições e Descanso */}
          <div className="grid grid-cols-3 gap-3">
            {exercicioCorrente?.series && (
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <Repeat className="w-5 h-5 mx-auto mb-1" style={{ color: COLORS.primary }} />
                <div className="text-xl font-bold text-slate-900">{exercicioCorrente.series}</div>
                <div className="text-xs text-slate-600">Séries</div>
              </div>
            )}
            
            {exercicioCorrente?.reps && (
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <Target className="w-5 h-5 mx-auto mb-1" style={{ color: COLORS.primary }} />
                <div className="text-xl font-bold text-slate-900">{exercicioCorrente.reps}</div>
                <div className="text-xs text-slate-600">Repetições</div>
              </div>
            )}
            
            {exercicioCorrente?.descanso && (
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <Timer className="w-5 h-5 mx-auto mb-1" style={{ color: COLORS.primary }} />
                <div className="text-xl font-bold text-slate-900">{exercicioCorrente.descanso}</div>
                <div className="text-xs text-slate-600">Descanso</div>
              </div>
            )}
            
            {exercicioCorrente?.tempo && (
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: COLORS.primary }} />
                <div className="text-xl font-bold text-slate-900">{exercicioCorrente.tempo}</div>
                <div className="text-xs text-slate-600">Duração</div>
              </div>
            )}

            {exercicioCorrente?.carga && (
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <Dumbbell className="w-5 h-5 mx-auto mb-1" style={{ color: COLORS.primary }} />
                <div className="text-lg font-bold text-slate-900">{exercicioCorrente.carga}</div>
                <div className="text-xs text-slate-600">Carga</div>
              </div>
            )}

            {exercicioCorrente?.respiracao && (
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <Wind className="w-5 h-5 mx-auto mb-1" style={{ color: COLORS.primary }} />
                <div className="text-sm font-bold text-slate-900">{exercicioCorrente.respiracao}</div>
                <div className="text-xs text-slate-600">Respiração</div>
              </div>
            )}
          </div>

          {/* 7. Botões de Ação (REDESENHADOS - PROFISSIONAIS) */}
          <div className="space-y-3 pt-4">
            {!isActive ? (
              <button
                onClick={iniciarTreino}
                className="w-full py-4 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Play className="w-6 h-6" fill="white" />
                Iniciar Treino
              </button>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={pausarTreino}
                    className="py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{ backgroundColor: COLORS.secondary }}
                  >
                    <Pause className="w-5 h-5" />
                    {isPaused ? 'Retomar' : 'Pausar'}
                  </button>
                  
                  <button
                    onClick={proximaSerie}
                    className="py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Concluir Série
                  </button>
                </div>
                
                {exercicioAtual < exercicios.length - 1 && (
                  <button
                    onClick={proximoExercicio}
                    className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    <SkipForward className="w-5 h-5" />
                    Próximo Exercício
                  </button>
                )}
                
                <button
                  onClick={finalizarTreino}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 text-lg mt-4"
                  style={{ backgroundColor: COLORS.alert }}
                >
                  <CheckCircle2 className="w-6 h-6" />
                  Finalizar Treino
                </button>
              </>
            )}
          </div>

          {/* Lista de Exercícios (compacta) */}
          <div className="bg-slate-50 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm flex items-center gap-2">
              <Dumbbell className="w-4 h-4" style={{ color: COLORS.primary }} />
              Exercícios do Treino
            </h4>
            <div className="space-y-2">
              {exercicios.map((ex: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg transition-all text-sm ${
                    idx === exercicioAtual
                      ? 'text-white'
                      : idx < exercicioAtual
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-white text-slate-700'
                  }`}
                  style={idx === exercicioAtual ? { backgroundColor: COLORS.primary } : {}}
                >
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${
                      idx === exercicioAtual
                        ? 'bg-white/20 text-white'
                        : idx < exercicioAtual
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {idx < exercicioAtual ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold">{ex.nome}</span>
                      {ex.series && ex.reps && (
                        <div className={`text-xs mt-0.5 ${idx === exercicioAtual ? 'text-white/80' : 'text-slate-500'}`}>
                          {ex.series} séries • {ex.reps}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para extrair iniciais
function getInitials(name: string): string {
  // Remove "Inspirada em" e pega as iniciais
  const cleanName = name.replace(/Inspirada em /i, '').trim();
  const words = cleanName.split(' ');
  
  if (words.length >= 2) {
    // Pega primeira letra do primeiro e último nome
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  
  // Se só tem uma palavra, pega as duas primeiras letras
  return cleanName.substring(0, 2).toUpperCase();
}

// Componente de Ícone com Iniciais
function InitialsIcon({ name, gradient }: { name: string; gradient: string }) {
  const initials = getInitials(name);
  
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white rounded-xl p-3 flex items-center justify-center`}>
      <span className="text-2xl font-bold">{initials}</span>
    </div>
  );
}

export default function TreinosPage() {
  const [selectedCategory, setSelectedCategory] = useState<'mobilidade' | 'celebridades' | 'objetivos'>('mobilidade');
  const [treinoAtivo, setTreinoAtivo] = useState<any>(null);

  // Simula treino personalizado ou escolhido (NOVO)
  const meuTreino = {
    tipo: 'personalizado', // ou 'celebridade'
    nome: 'Treino Personalizado - Glúteos & Pernas',
    progresso: 65,
    ultimaSessao: '2 dias atrás',
    proximaSessao: 'Treino C - Lower Body',
    celebridade: null // ou { nome: 'Virgínia', iniciais: 'VF' }
  };

  // Treinos por Objetivo
  const treinosPorObjetivo = [
    {
      id: 'emagrecimento',
      nome: 'Emagrecimento',
      descricao: 'Queime calorias e perca peso de forma saudável',
      duracao: '45-60 min',
      nivel: 'Todos os níveis',
      icon: Flame,
      gradient: 'from-blue-600 to-cyan-600',
      exercicios: [
        { nome: 'Burpees', series: '4', reps: '15 reps', descanso: '30s' },
        { nome: 'Mountain Climbers', series: '4', reps: '30s', descanso: '20s' },
        { nome: 'Jump Squats', series: '4', reps: '20 reps', descanso: '30s' },
        { nome: 'High Knees', series: '4', reps: '45s', descanso: '20s' }
      ],
      variacoes: {
        casa: 'Sem equipamento necessário',
        academia: 'Pode adicionar esteira e bike'
      }
    },
    {
      id: 'hipertrofia',
      nome: 'Hipertrofia / Ganho de Massa',
      descricao: 'Desenvolva músculos e ganhe força',
      duracao: '60-75 min',
      nivel: 'Intermediário/Avançado',
      icon: Dumbbell,
      gradient: 'from-indigo-600 to-blue-700',
      exercicios: [
        { nome: 'Agachamento', series: '4', reps: '8-12 reps', descanso: '90s' },
        { nome: 'Levantamento Terra', series: '4', reps: '6-10 reps', descanso: '2min' },
        { nome: 'Supino', series: '4', reps: '8-12 reps', descanso: '90s' },
        { nome: 'Remada', series: '4', reps: '10-12 reps', descanso: '60s' }
      ],
      variacoes: {
        casa: 'Use halteres e faixas de resistência',
        academia: 'Equipamentos completos disponíveis'
      }
    },
    {
      id: 'definicao',
      nome: 'Definição',
      descricao: 'Tonifique e defina seus músculos',
      duracao: '50-60 min',
      nivel: 'Intermediário',
      icon: Sparkles,
      gradient: 'from-cyan-600 to-teal-700',
      exercicios: [
        { nome: 'Circuito de Força', series: '3', reps: '15-20 reps', descanso: '45s' },
        { nome: 'HIIT Cardio', series: '4', reps: '30s on/30s off', descanso: '60s' },
        { nome: 'Core Training', series: '3', reps: '20 reps', descanso: '30s' },
        { nome: 'Finalizador Metabólico', series: '2', reps: '10 min', descanso: '2min' }
      ],
      variacoes: {
        casa: 'Peso corporal e elásticos',
        academia: 'Máquinas e pesos livres'
      }
    },
    {
      id: 'iniciantes',
      nome: 'Iniciantes',
      descricao: 'Comece sua jornada fitness com segurança',
      duracao: '30-40 min',
      nivel: 'Iniciante',
      icon: Target,
      gradient: 'from-emerald-600 to-teal-700',
      exercicios: [
        { nome: 'Agachamento Livre', series: '3', reps: '12 reps', descanso: '60s' },
        { nome: 'Flexão de Joelhos', series: '3', reps: '10 reps', descanso: '60s' },
        { nome: 'Prancha', series: '3', reps: '20-30s', descanso: '45s' },
        { nome: 'Caminhada Rápida', series: '1', reps: '15 min', descanso: '-' }
      ],
      variacoes: {
        casa: 'Apenas peso corporal',
        academia: 'Máquinas guiadas para aprender'
      }
    },
    {
      id: 'baixo-impacto',
      nome: 'Baixo Impacto',
      descricao: 'Exercícios suaves para articulações',
      duracao: '40-50 min',
      nivel: 'Todos os níveis',
      icon: Wind,
      gradient: 'from-teal-600 to-cyan-700',
      exercicios: [
        { nome: 'Pilates Mat', series: '3', reps: '12-15 reps', descanso: '30s' },
        { nome: 'Yoga Flow', series: '2', reps: '10 min', descanso: '60s' },
        { nome: 'Natação/Hidroginástica', series: '1', reps: '30 min', descanso: '-' },
        { nome: 'Alongamento Dinâmico', series: '2', reps: '5 min', descanso: '30s' }
      ],
      variacoes: {
        casa: 'Tapete de yoga e elásticos',
        academia: 'Piscina e equipamentos de pilates'
      }
    }
  ];

  // Treinos Inspirados em Celebridades
  const treinosCelebridades = [
    {
      id: 'virginia',
      nome: 'Inspirada em Virgínia',
      foco: 'Glúteos & Pernas',
      estilo: 'Curvas Poderosas',
      descricao: 'Foco em glúteos volumosos e pernas torneadas',
      gradient: 'from-blue-600 to-indigo-700',
      intensidade: 'Alta - Não Modificável',
      treino: {
        divisao: 'Lower Body Focus - 4x semana',
        exercicios: [
          { nome: 'Hip Thrust com Barra', series: '5', reps: '10-12 reps', carga: 'Pesada' },
          { nome: 'Agachamento Sumô', series: '4', reps: '12-15 reps', carga: 'Moderada/Pesada' },
          { nome: 'Stiff', series: '4', reps: '12 reps', carga: 'Pesada' },
          { nome: 'Cadeira Abdutora', series: '4', reps: '15-20 reps', carga: 'Moderada' },
          { nome: 'Elevação Pélvica Unilateral', series: '3', reps: '12 reps cada', carga: 'Moderada' }
        ],
        observacoes: 'Volume alto, foco em conexão mente-músculo, progressão de carga constante'
      }
    },
    {
      id: 'mel-maia',
      nome: 'Inspirada em Mel Maia',
      foco: 'Curvy Shape',
      estilo: 'Curvas Naturais',
      descricao: 'Corpo curvilíneo com cintura definida',
      gradient: 'from-cyan-600 to-blue-700',
      intensidade: 'Moderada/Alta - Não Modificável',
      treino: {
        divisao: 'Full Body Sculpt - 5x semana',
        exercicios: [
          { nome: 'Agachamento Búlgaro', series: '4', reps: '12 reps cada', carga: 'Moderada' },
          { nome: 'Glute Bridge', series: '4', reps: '15 reps', carga: 'Moderada' },
          { nome: 'Abdominal Bicicleta', series: '4', reps: '20 reps', carga: 'Peso corporal' },
          { nome: 'Prancha Lateral', series: '3', reps: '30-45s cada', carga: 'Peso corporal' },
          { nome: 'Afundo Reverso', series: '4', reps: '12 reps cada', carga: 'Leve/Moderada' }
        ],
        observacoes: 'Equilíbrio entre superior e inferior, ênfase em cintura e glúteos'
      }
    },
    {
      id: 'sophia-bianco',
      nome: 'Inspirada em Sophia Bianco',
      foco: 'Corpo Escultural',
      estilo: 'Elegância e Força',
      descricao: 'Corpo harmonioso com músculos definidos e femininos',
      gradient: 'from-indigo-600 to-blue-700',
      intensidade: 'Moderada/Alta - Não Modificável',
      treino: {
        divisao: 'Sculpt & Tone - 5x semana',
        exercicios: [
          { nome: 'Agachamento com Barra', series: '4', reps: '10-12 reps', carga: 'Moderada' },
          { nome: 'Hip Thrust', series: '4', reps: '12-15 reps', carga: 'Moderada/Pesada' },
          { nome: 'Remada Curvada', series: '4', reps: '12 reps', carga: 'Moderada' },
          { nome: 'Desenvolvimento com Halteres', series: '3', reps: '12 reps', carga: 'Leve/Moderada' },
          { nome: 'Prancha com Elevação', series: '3', reps: '15 reps cada', carga: 'Peso corporal' }
        ],
        observacoes: 'Treino equilibrado, foco em postura elegante, definição muscular harmoniosa'
      }
    },
    {
      id: 'jade-picon',
      nome: 'Inspirada em Jade Picon',
      foco: 'Slim Tônus',
      estilo: 'Magra e Tonificada',
      descricao: 'Corpo esbelto com definição muscular',
      gradient: 'from-emerald-600 to-teal-700',
      intensidade: 'Moderada - Não Modificável',
      treino: {
        divisao: 'Lean & Toned - 5x semana',
        exercicios: [
          { nome: 'Pilates Reformer', series: '3', reps: '15 reps', carga: 'Leve' },
          { nome: 'Yoga Flow Dinâmico', series: '2', reps: '20 min', carga: 'Peso corporal' },
          { nome: 'Agachamento com Salto', series: '3', reps: '15 reps', carga: 'Peso corporal' },
          { nome: 'Flexão Diamante', series: '3', reps: '10 reps', carga: 'Peso corporal' },
          { nome: 'Cardio LISS', series: '1', reps: '30 min', carga: 'Baixa intensidade' }
        ],
        observacoes: 'Foco em alongamento, tonificação sem volume, cardio de baixa intensidade'
      }
    },
    {
      id: 'manu-cit',
      nome: 'Inspirada em Manu Cit',
      foco: 'Corpo Fitness & Power Legs',
      estilo: 'Fitness Completo',
      descricao: 'Corpo equilibrado com pernas poderosas',
      gradient: 'from-blue-600 to-cyan-700',
      intensidade: 'Alta - Não Modificável',
      treino: {
        divisao: 'Power Training - 5x semana',
        exercicios: [
          { nome: 'Agachamento Livre', series: '5', reps: '8-10 reps', carga: 'Pesada' },
          { nome: 'Leg Press 45°', series: '4', reps: '12-15 reps', carga: 'Muito Pesada' },
          { nome: 'Cadeira Extensora', series: '4', reps: '15 reps', carga: 'Moderada/Pesada' },
          { nome: 'Cadeira Flexora', series: '4', reps: '12 reps', carga: 'Moderada' },
          { nome: 'Panturrilha em Pé', series: '5', reps: '20 reps', carga: 'Pesada' }
        ],
        observacoes: 'Treino de força, progressão linear, foco em pernas e glúteos com volume'
      }
    },
    {
      id: 'natalia-valente',
      nome: 'Inspirada em Natalia Valente',
      foco: 'Corpo Atlético & Definido',
      estilo: 'Força e Definição',
      descricao: 'Corpo atlético com músculos definidos e proporcionais',
      gradient: 'from-indigo-600 to-cyan-700',
      intensidade: 'Alta - Não Modificável',
      treino: {
        divisao: 'Athletic Build - 6x semana',
        exercicios: [
          { nome: 'Agachamento Frontal', series: '4', reps: '10 reps', carga: 'Pesada' },
          { nome: 'Levantamento Terra Romeno', series: '4', reps: '10-12 reps', carga: 'Pesada' },
          { nome: 'Supino Inclinado', series: '4', reps: '10 reps', carga: 'Moderada/Pesada' },
          { nome: 'Barra Fixa Assistida', series: '3', reps: '8-10 reps', carga: 'Moderada' },
          { nome: 'Abdominal Canivete', series: '4', reps: '15 reps', carga: 'Peso corporal' }
        ],
        observacoes: 'Treino intenso, foco em força e hipertrofia, progressão constante de cargas'
      }
    }
  ];

  // Sessões de Mobilidade
  const sessoesMobilidade = [
    {
      id: 'quadril',
      nome: 'Mobilidade para Quadril',
      duracao: '15 min',
      tipo: 'Articular',
      icon: Activity,
      gradient: 'from-cyan-600 to-blue-700',
      exercicios: [
        { nome: '90/90 Hip Stretch', tempo: '2 min cada lado', respiracao: 'Profunda e lenta' },
        { nome: 'Frog Stretch', tempo: '3 min', respiracao: 'Relaxada' },
        { nome: 'Pigeon Pose', tempo: '2 min cada lado', respiracao: 'Diafragmática' },
        { nome: 'Hip Circles', tempo: '1 min cada direção', respiracao: 'Natural' }
      ]
    },
    {
      id: 'coluna',
      nome: 'Mobilidade para Coluna Torácica',
      duracao: '12 min',
      tipo: 'Articular',
      icon: TrendingUp,
      gradient: 'from-blue-600 to-cyan-700',
      exercicios: [
        { nome: 'Thread the Needle', tempo: '2 min cada lado', respiracao: 'Profunda' },
        { nome: 'Cat-Cow', tempo: '3 min', respiracao: 'Sincronizada com movimento' },
        { nome: 'Thoracic Rotation', tempo: '2 min cada lado', respiracao: 'Natural' },
        { nome: 'Child Pose com Rotação', tempo: '3 min', respiracao: 'Relaxada' }
      ]
    },
    {
      id: 'posterior',
      nome: 'Mobilidade Posterior de Coxa',
      duracao: '10 min',
      tipo: 'Alongamento',
      icon: Wind,
      gradient: 'from-emerald-600 to-teal-700',
      exercicios: [
        { nome: 'Forward Fold', tempo: '3 min', respiracao: 'Profunda e relaxada' },
        { nome: 'Single Leg Stretch', tempo: '2 min cada perna', respiracao: 'Constante' },
        { nome: 'Seated Hamstring Stretch', tempo: '2 min', respiracao: 'Diafragmática' },
        { nome: 'Downward Dog', tempo: '1 min', respiracao: 'Natural' }
      ]
    },
    {
      id: 'pre-treino',
      nome: 'Aquecimento Pré-Treino',
      duracao: '8 min',
      tipo: 'Aquecimento',
      icon: Flame,
      gradient: 'from-blue-600 to-indigo-700',
      exercicios: [
        { nome: 'Arm Circles', tempo: '1 min', respiracao: 'Natural' },
        { nome: 'Leg Swings', tempo: '2 min', respiracao: 'Ritmada' },
        { nome: 'Hip Openers', tempo: '2 min', respiracao: 'Profunda' },
        { nome: 'Dynamic Stretches', tempo: '3 min', respiracao: 'Ativa' }
      ]
    },
    {
      id: 'pos-treino',
      nome: 'Descompressão Pós-Treino',
      duracao: '20 min',
      tipo: 'Recuperação',
      icon: Heart,
      gradient: 'from-teal-600 to-cyan-700',
      exercicios: [
        { nome: 'Full Body Scan', tempo: '5 min', respiracao: 'Profunda e lenta' },
        { nome: 'Foam Rolling', tempo: '8 min', respiracao: 'Relaxada' },
        { nome: 'Static Stretches', tempo: '5 min', respiracao: 'Diafragmática' },
        { nome: 'Savasana', tempo: '2 min', respiracao: 'Natural' }
      ]
    },
    {
      id: 'matinal',
      nome: 'Mobilidade Matinal',
      duracao: '10 min',
      tipo: 'Despertar',
      icon: Sparkles,
      gradient: 'from-cyan-600 to-blue-700',
      exercicios: [
        { nome: 'Sun Salutation', tempo: '3 min', respiracao: 'Sincronizada' },
        { nome: 'Spinal Waves', tempo: '2 min', respiracao: 'Fluida' },
        { nome: 'Hip Flexor Stretch', tempo: '2 min cada lado', respiracao: 'Profunda' },
        { nome: 'Shoulder Rolls', tempo: '1 min', respiracao: 'Natural' }
      ]
    }
  ];

  // Função para gerar treinos recomendados baseado no último treino
  const getTreinosRecomendados = () => {
    if (!treinoAtivo) return [];
    
    // Lógica de recomendação baseada no treino concluído
    if (treinoAtivo.foco?.includes('Glúteos')) {
      return [
        treinosCelebridades.find(t => t.id === 'mel-maia'),
        treinosPorObjetivo.find(t => t.id === 'hipertrofia'),
        sessoesMobilidade.find(t => t.id === 'quadril')
      ].filter(Boolean);
    } else if (treinoAtivo.tipo === 'Mobilidade') {
      return [
        sessoesMobilidade.find(t => t.id === 'pos-treino'),
        treinosPorObjetivo.find(t => t.id === 'baixo-impacto'),
        treinosCelebridades.find(t => t.id === 'jade-picon')
      ].filter(Boolean);
    } else if (treinoAtivo.id === 'emagrecimento') {
      return [
        treinosPorObjetivo.find(t => t.id === 'definicao'),
        treinosCelebridades.find(t => t.id === 'manu-cit'),
        sessoesMobilidade.find(t => t.id === 'pos-treino')
      ].filter(Boolean);
    }
    
    // Recomendações padrão
    return [
      treinosPorObjetivo[0],
      treinosCelebridades[0],
      sessoesMobilidade[0]
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-slate-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Treinos
                </h1>
                <p className="text-xs text-slate-600">Escolha seu programa de treino</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meu Treino - Card Destacado (NOVO) */}
        {meuTreino && (
          <div className="mb-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <Dumbbell className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Meu Treino</h3>
                      <p className="text-sm text-white/80">
                        {meuTreino.tipo === 'personalizado' ? 'Personalizado para você' : 'Inspirado em celebridade'}
                      </p>
                    </div>
                  </div>
                  {meuTreino.celebridade && (
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <span className="text-2xl font-bold">{meuTreino.celebridade.iniciais}</span>
                    </div>
                  )}
                </div>

                <h4 className="text-2xl font-bold mb-2">{meuTreino.nome}</h4>
                
                {/* Barra de Progresso */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/90">Progresso do programa</span>
                    <span className="font-bold">{meuTreino.progresso}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-white h-full rounded-full transition-all duration-500"
                      style={{ width: `${meuTreino.progresso}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-600 mb-1">Última sessão</p>
                    <p className="text-sm font-bold text-slate-900">{meuTreino.ultimaSessao}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-600 mb-1">Próxima sessão</p>
                    <p className="text-sm font-bold text-slate-900">{meuTreino.proximaSessao}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setTreinoAtivo(meuTreino)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Continuar Treino
                  </button>
                  <button
                    className="px-6 bg-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('mobilidade')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === 'mobilidade'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5" />
              <span>Mobilidade</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedCategory('celebridades')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === 'celebridades'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Inspirados em Celebridades</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedCategory('objetivos')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === 'objetivos'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-700 text-white shadow-lg scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>Treinos por Objetivo</span>
            </div>
          </button>
        </div>

        {/* Mobilidade */}
        {selectedCategory === 'mobilidade' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sessões de Mobilidade</h2>
              <p className="text-slate-600 mb-4">
                Alongamento, liberação miofascial e mobilidade articular para prevenir dores e melhorar performance
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">
                  Alongamento
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  Liberação Miofascial
                </span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                  Mobilidade Articular
                </span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                  Prevenção de Dores
                </span>
                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                  Recuperação Muscular
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessoesMobilidade.map((sessao) => (
                <div
                  key={sessao.id}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`bg-gradient-to-r ${sessao.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <sessao.icon className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {sessao.duracao}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{sessao.nome}</h3>
                    <p className="text-sm text-white/90">{sessao.tipo}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      {sessao.exercicios.map((ex, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <div className={`bg-gradient-to-r ${sessao.gradient} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5`}>
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-900 text-sm mb-1">{ex.nome}</p>
                              <div className="flex flex-col gap-1 text-xs text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {ex.tempo}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Wind className="w-3 h-3" />
                                  {ex.respiracao}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setTreinoAtivo(sessao)}
                      className={`w-full bg-gradient-to-r ${sessao.gradient} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      Iniciar Sessão
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treinos Inspirados em Celebridades */}
        {selectedCategory === 'celebridades' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Treinos Inspirados em Celebridades</h2>
                  <p className="text-blue-100">
                    A intensidade destes treinos NÃO pode ser alterada para manter o resultado fiel ao estilo da celebridade
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {treinosCelebridades.map((treino) => (
                <div
                  key={treino.id}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${treino.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <InitialsIcon name={treino.nome} gradient={treino.gradient} />
                      <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {treino.intensidade}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{treino.nome}</h3>
                    <p className="text-lg font-semibold text-white/90 mb-1">{treino.foco}</p>
                    <p className="text-sm text-white/80">{treino.estilo}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-sm">{treino.descricao}</p>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">{treino.treino.divisao}</h4>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-blue-600" />
                        Exercícios do Treino
                      </h4>
                      {treino.treino.exercicios.map((ex, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm bg-slate-50 rounded-lg p-3">
                          <div className={`bg-gradient-to-r ${treino.gradient} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{ex.nome}</p>
                            <div className="flex gap-3 text-xs text-slate-500 mt-1">
                              <span>{ex.series} séries</span>
                              <span>•</span>
                              <span>{ex.reps}</span>
                              <span>•</span>
                              <span className="text-blue-600 font-medium">{ex.carga}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                      <h5 className="font-semibold text-cyan-900 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Observações do Método
                      </h5>
                      <p className="text-sm text-cyan-800">{treino.treino.observacoes}</p>
                    </div>

                    <button 
                      onClick={() => setTreinoAtivo(treino)}
                      className={`w-full bg-gradient-to-r ${treino.gradient} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      Começar Treino
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treinos por Objetivo */}
        {selectedCategory === 'objetivos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Treinos por Objetivo</h2>
              <p className="text-slate-600 mb-6">
                Escolha o treino que melhor se adapta ao seu objetivo fitness
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treinosPorObjetivo.map((treino) => (
                <div
                  key={treino.id}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`bg-gradient-to-r ${treino.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <treino.icon className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {treino.duracao}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{treino.nome}</h3>
                    <p className="text-sm text-white/90">{treino.descricao}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>{treino.nivel}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-blue-600" />
                        Exercícios Principais
                      </h4>
                      {treino.exercicios.map((ex, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{ex.nome}</p>
                            <div className="flex gap-3 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Repeat className="w-3 h-3" />
                                {ex.series} séries
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                {ex.reps}
                              </span>
                              <span className="flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {ex.descanso}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <Home className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-slate-900">Casa: </span>
                          <span className="text-slate-600">{treino.variacoes.casa}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-slate-900">Academia: </span>
                          <span className="text-slate-600">{treino.variacoes.academia}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setTreinoAtivo(treino)}
                      className={`w-full bg-gradient-to-r ${treino.gradient} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      Iniciar Treino
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção de Treinos Recomendados (aparece após conclusão) */}
        <div id="treinos-recomendados" className="mt-12 scroll-mt-20">
          {/* Conteúdo será scrollado para cá após conclusão */}
        </div>
      </main>

      {/* Modal de Treino */}
      {treinoAtivo && (
        <ModalTreino 
          treino={treinoAtivo} 
          onClose={() => setTreinoAtivo(null)} 
        />
      )}
    </div>
  );
}
