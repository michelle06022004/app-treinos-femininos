'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Flame,
  Target,
  TrendingUp,
  Award,
  Star,
  CheckCircle2,
  Clock,
  Zap,
  Heart
} from 'lucide-react';

interface TreinoRealizado {
  id: string;
  titulo: string;
  data: string;
  duracao: number;
  calorias: number;
}

interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icon: any;
  desbloqueada: boolean;
  progresso?: number;
  meta?: number;
}

interface EstatisticaSemanal {
  semana: string;
  treinos: number;
  calorias: number;
}

export default function ProgressoPage() {
  const router = useRouter();
  const [treinosRealizados, setTreinosRealizados] = useState<TreinoRealizado[]>([]);
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [estatisticasSemanais, setEstatisticasSemanais] = useState<EstatisticaSemanal[]>([]);
  const [totalTreinos, setTotalTreinos] = useState(0);
  const [totalCalorias, setTotalCalorias] = useState(0);
  const [sequencia, setSequencia] = useState(0);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    // Carregar treinos realizados do localStorage
    const treinosSalvos = localStorage.getItem('treinosRealizados');
    if (treinosSalvos) {
      const treinos: TreinoRealizado[] = JSON.parse(treinosSalvos);
      setTreinosRealizados(treinos);
      setTotalTreinos(treinos.length);
      setTotalCalorias(treinos.reduce((acc, t) => acc + t.calorias, 0));
      calcularSequencia(treinos);
      gerarEstatisticasSemanais(treinos);
    } else {
      // Dados de exemplo para demonstração
      const treinosExemplo: TreinoRealizado[] = [
        {
          id: '1',
          titulo: 'HIIT Queima Gordura',
          data: new Date().toISOString(),
          duracao: 30,
          calorias: 450
        },
        {
          id: '2',
          titulo: 'Força & Tonificação',
          data: new Date(Date.now() - 86400000).toISOString(),
          duracao: 45,
          calorias: 380
        },
        {
          id: '3',
          titulo: 'Abdômen Definido',
          data: new Date(Date.now() - 172800000).toISOString(),
          duracao: 25,
          calorias: 280
        }
      ];
      setTreinosRealizados(treinosExemplo);
      setTotalTreinos(treinosExemplo.length);
      setTotalCalorias(treinosExemplo.reduce((acc, t) => acc + t.calorias, 0));
      calcularSequencia(treinosExemplo);
      gerarEstatisticasSemanais(treinosExemplo);
    }

    // Carregar conquistas
    const conquistasSalvas = localStorage.getItem('conquistas');
    if (conquistasSalvas) {
      const conquistasData: Conquista[] = JSON.parse(conquistasSalvas);
      setConquistas(conquistasData);
    } else {
      // Conquistas de exemplo
      const conquistasExemplo: Conquista[] = [
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
        },
        {
          id: 'primeira-semana',
          titulo: 'Primeira Semana',
          descricao: 'Complete 3 treinos em uma semana',
          icon: Calendar,
          desbloqueada: true,
          progresso: 3,
          meta: 3
        },
        {
          id: 'queimadora',
          titulo: 'Queimadora',
          descricao: 'Queime 1000 calorias',
          icon: Flame,
          desbloqueada: true,
          progresso: 1110,
          meta: 1000
        },
        {
          id: 'consistente',
          titulo: 'Consistente',
          descricao: 'Treine 7 dias seguidos',
          icon: Award,
          desbloqueada: false,
          progresso: 3,
          meta: 7
        },
        {
          id: 'dedicada',
          titulo: 'Dedicada',
          descricao: 'Complete 10 treinos',
          icon: CheckCircle2,
          desbloqueada: false,
          progresso: 3,
          meta: 10
        },
        {
          id: 'maratonista',
          titulo: 'Maratonista',
          descricao: 'Acumule 10 horas de treino',
          icon: Clock,
          desbloqueada: false,
          progresso: 1.67,
          meta: 10
        }
      ];
      setConquistas(conquistasExemplo);
    }
  };

  const calcularSequencia = (treinos: TreinoRealizado[]) => {
    if (treinos.length === 0) {
      setSequencia(0);
      return;
    }

    // Ordenar treinos por data (mais recente primeiro)
    const treinosOrdenados = [...treinos].sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );

    let diasConsecutivos = 0;
    let dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    for (const treino of treinosOrdenados) {
      const dataTreino = new Date(treino.data);
      dataTreino.setHours(0, 0, 0, 0);

      const diferencaDias = Math.floor(
        (dataAtual.getTime() - dataTreino.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diferencaDias === diasConsecutivos) {
        diasConsecutivos++;
        dataAtual = dataTreino;
      } else if (diferencaDias > diasConsecutivos) {
        break;
      }
    }

    setSequencia(diasConsecutivos);
  };

  const gerarEstatisticasSemanais = (treinos: TreinoRealizado[]) => {
    const semanas: { [key: string]: { treinos: number; calorias: number } } = {};

    treinos.forEach(treino => {
      const data = new Date(treino.data);
      const inicioSemana = new Date(data);
      inicioSemana.setDate(data.getDate() - data.getDay());
      const chave = inicioSemana.toISOString().split('T')[0];

      if (!semanas[chave]) {
        semanas[chave] = { treinos: 0, calorias: 0 };
      }

      semanas[chave].treinos++;
      semanas[chave].calorias += treino.calorias;
    });

    const estatisticas: EstatisticaSemanal[] = Object.entries(semanas)
      .map(([semana, dados]) => ({
        semana: formatarSemana(semana),
        treinos: dados.treinos,
        calorias: dados.calorias
      }))
      .sort((a, b) => b.semana.localeCompare(a.semana))
      .slice(0, 4);

    setEstatisticasSemanais(estatisticas);
  };

  const formatarSemana = (dataStr: string): string => {
    const data = new Date(dataStr);
    const dia = data.getDate();
    const mes = data.toLocaleDateString('pt-BR', { month: 'short' });
    return `${dia} ${mes}`;
  };

  const formatarData = (dataStr: string): string => {
    const data = new Date(dataStr);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    if (data.toDateString() === hoje.toDateString()) {
      return 'Hoje';
    } else if (data.toDateString() === ontem.toDateString()) {
      return 'Ontem';
    } else {
      return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    }
  };

  const conquistasDesbloqueadas = conquistas.filter(c => c.desbloqueada).length;
  const totalConquistas = conquistas.length;
  const porcentagemConquistas = Math.round((conquistasDesbloqueadas / totalConquistas) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seu Progresso</h1>
              <p className="text-gray-600">Acompanhe sua evolução e conquistas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <TrendingUp className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-white/80 text-sm font-medium mb-1">Total de Treinos</p>
            <p className="text-4xl font-bold">{totalTreinos}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Flame className="w-6 h-6" />
              </div>
              <Flame className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-white/80 text-sm font-medium mb-1">Calorias Queimadas</p>
            <p className="text-4xl font-bold">{totalCalorias.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <Zap className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-white/80 text-sm font-medium mb-1">Sequência Atual</p>
            <p className="text-4xl font-bold">{sequencia} dias</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <Award className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-white/80 text-sm font-medium mb-1">Conquistas</p>
            <p className="text-4xl font-bold">{conquistasDesbloqueadas}/{totalConquistas}</p>
          </div>
        </div>

        {/* Gráfico de Progresso Semanal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            Progresso Semanal
          </h2>
          <div className="space-y-4">
            {estatisticasSemanais.map((stat, index) => {
              const maxTreinos = Math.max(...estatisticasSemanais.map(s => s.treinos));
              const larguraBarra = (stat.treinos / maxTreinos) * 100;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">Semana de {stat.semana}</span>
                    <span className="text-gray-600">{stat.treinos} treinos • {stat.calorias} cal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${larguraBarra}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conquistas */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Conquistas
            </h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Progresso Total</p>
              <p className="text-2xl font-bold text-emerald-600">{porcentagemConquistas}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conquistas.map((conquista, index) => (
              <div
                key={conquista.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  conquista.desbloqueada
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      conquista.desbloqueada
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    <conquista.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{conquista.titulo}</h3>
                    <p className="text-xs text-gray-600">{conquista.descricao}</p>
                  </div>
                </div>

                {conquista.meta && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Progresso</span>
                      <span className="font-semibold">
                        {conquista.progresso}/{conquista.meta}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          conquista.desbloqueada
                            ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                            : 'bg-gray-400'
                        }`}
                        style={{
                          width: `${Math.min((conquista.progresso! / conquista.meta) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Histórico de Treinos */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            Histórico de Treinos
          </h2>

          {treinosRealizados.length > 0 ? (
            <div className="space-y-3">
              {treinosRealizados.slice(0, 10).map((treino, index) => (
                <div
                  key={treino.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{treino.titulo}</h3>
                      <p className="text-sm text-gray-600">{formatarData(treino.data)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{treino.duracao} min</p>
                    <p className="text-sm text-orange-600 flex items-center gap-1 justify-end">
                      <Flame className="w-4 h-4" />
                      {treino.calorias} cal
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-2">Nenhum treino realizado ainda</p>
              <p className="text-sm text-gray-500">Comece seu primeiro treino para ver seu progresso aqui!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
