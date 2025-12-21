'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Target, 
  Activity, 
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Dumbbell,
  Heart,
  Apple
} from 'lucide-react';

interface QuizAnswer {
  question: string;
  answer: string | string[];
}

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const questions = [
    {
      id: 'acompanhar-nutricao',
      title: 'Você quer acompanhar sua nutrição também?',
      subtitle: 'Nutrição é 70% do resultado - vamos te ajudar a alcançar seus objetivos mais rápido',
      icon: Apple,
      gradient: 'from-green-600 to-emerald-600',
      type: 'single',
      options: [
        { 
          value: 'sim', 
          label: 'Sim, quero plano nutricional completo',
          description: 'Receba sugestões de refeições e dicas personalizadas'
        },
        { 
          value: 'nao', 
          label: 'Não, só treino por enquanto',
          description: 'Focar apenas nos exercícios físicos'
        }
      ]
    },
    {
      id: 'situacao-atual',
      title: 'Como você se sente hoje em relação à sua saúde?',
      subtitle: 'Seja honesta - este é o primeiro passo para a transformação',
      icon: Activity,
      gradient: 'from-slate-600 to-slate-800',
      type: 'single',
      options: [
        { 
          value: 'insatisfeita', 
          label: 'Insatisfeita e pronta para mudar',
          description: 'Sinto que preciso fazer algo diferente'
        },
        { 
          value: 'moderado', 
          label: 'Poderia estar melhor',
          description: 'Tenho energia, mas sei que posso evoluir'
        },
        { 
          value: 'satisfeita', 
          label: 'Satisfeita, mas quero mais',
          description: 'Estou bem, mas busco o próximo nível'
        }
      ]
    },
    {
      id: 'objetivo',
      title: 'Onde você quer estar daqui a 3 meses?',
      subtitle: 'Visualize sua melhor versão - ela está mais perto do que imagina',
      icon: Target,
      gradient: 'from-emerald-600 to-teal-600',
      type: 'single',
      options: [
        { 
          value: 'perder-peso', 
          label: 'Mais leve e definida',
          description: 'Roupas mais confortáveis, mais energia no dia a dia'
        },
        { 
          value: 'ganhar-massa', 
          label: 'Mais forte e musculosa',
          description: 'Corpo tonificado, força e confiança'
        },
        { 
          value: 'saude', 
          label: 'Mais saudável e disposta',
          description: 'Mais energia, melhor sono, qualidade de vida'
        },
        { 
          value: 'performance', 
          label: 'Melhor desempenho físico',
          description: 'Superar limites, bater recordes pessoais'
        }
      ]
    },
    {
      id: 'preferencias-alimentares',
      title: 'Quais são suas preferências alimentares?',
      subtitle: 'Vamos criar um plano que você realmente consiga seguir',
      icon: Apple,
      gradient: 'from-lime-600 to-green-600',
      type: 'single',
      conditional: (answers: QuizAnswer[]) => {
        const nutricaoAnswer = answers.find(a => a.question === 'acompanhar-nutricao');
        return nutricaoAnswer?.answer === 'sim';
      },
      options: [
        { 
          value: 'onivoro', 
          label: 'Como de tudo',
          description: 'Sem restrições alimentares'
        },
        { 
          value: 'vegetariano', 
          label: 'Vegetariana',
          description: 'Não como carne, mas como ovos e laticínios'
        },
        { 
          value: 'vegano', 
          label: 'Vegana',
          description: 'Apenas alimentos de origem vegetal'
        },
        { 
          value: 'low-carb', 
          label: 'Prefiro Low Carb',
          description: 'Reduzir carboidratos, focar em proteínas'
        }
      ]
    },
    {
      id: 'restricoes-alimentares',
      title: 'Você tem alguma restrição ou alergia alimentar?',
      subtitle: 'Pode escolher mais de uma - sua saúde é prioridade',
      icon: Heart,
      gradient: 'from-red-600 to-rose-600',
      type: 'multiple',
      conditional: (answers: QuizAnswer[]) => {
        const nutricaoAnswer = answers.find(a => a.question === 'acompanhar-nutricao');
        return nutricaoAnswer?.answer === 'sim';
      },
      options: [
        { 
          value: 'nenhuma', 
          label: 'Nenhuma restrição',
          description: 'Posso comer qualquer alimento'
        },
        { 
          value: 'lactose', 
          label: 'Intolerância à lactose',
          description: 'Evitar leite e derivados'
        },
        { 
          value: 'gluten', 
          label: 'Intolerância ao glúten',
          description: 'Evitar trigo, centeio, cevada'
        },
        { 
          value: 'diabetes', 
          label: 'Diabetes',
          description: 'Controle de açúcar e carboidratos'
        },
        { 
          value: 'hipertensao', 
          label: 'Hipertensão',
          description: 'Reduzir sódio e gorduras saturadas'
        }
      ]
    },
    {
      id: 'refeicoes-dia',
      title: 'Quantas refeições você consegue fazer por dia?',
      subtitle: 'Vamos adaptar o plano à sua rotina',
      icon: Apple,
      gradient: 'from-orange-600 to-amber-600',
      type: 'single',
      conditional: (answers: QuizAnswer[]) => {
        const nutricaoAnswer = answers.find(a => a.question === 'acompanhar-nutricao');
        return nutricaoAnswer?.answer === 'sim';
      },
      options: [
        { 
          value: '3', 
          label: '3 refeições principais',
          description: 'Café, almoço e jantar'
        },
        { 
          value: '4-5', 
          label: '4-5 refeições',
          description: 'Principais + lanches intermediários'
        },
        { 
          value: '6', 
          label: '6 refeições',
          description: 'Fracionamento completo ao longo do dia'
        }
      ]
    },
    {
      id: 'areas-corpo',
      title: 'Quais partes do corpo você quer focar?',
      subtitle: 'Pode escolher mais de uma - vamos personalizar seu treino',
      icon: Dumbbell,
      gradient: 'from-purple-600 to-indigo-600',
      type: 'multiple',
      options: [
        { 
          value: 'abdomen', 
          label: 'Abdômen',
          description: 'Barriga definida e cintura marcada'
        },
        { 
          value: 'pernas', 
          label: 'Pernas e Glúteos',
          description: 'Pernas tonificadas e bumbum empinado'
        },
        { 
          value: 'bracos', 
          label: 'Braços',
          description: 'Braços definidos e firmes'
        },
        { 
          value: 'costas', 
          label: 'Costas e Postura',
          description: 'Costas fortes e postura elegante'
        },
        { 
          value: 'corpo-todo', 
          label: 'Corpo Todo',
          description: 'Transformação completa e equilibrada'
        }
      ]
    },
    {
      id: 'preocupacao-abdomen',
      title: 'O que mais te incomoda no abdômen?',
      subtitle: 'Pode escolher mais de uma opção - vamos trabalhar em tudo',
      icon: Heart,
      gradient: 'from-rose-600 to-pink-600',
      type: 'multiple',
      conditional: (answers: QuizAnswer[]) => {
        const areasAnswer = answers.find(a => a.question === 'areas-corpo');
        return areasAnswer && Array.isArray(areasAnswer.answer) && 
               (areasAnswer.answer.includes('abdomen') || areasAnswer.answer.includes('corpo-todo'));
      },
      options: [
        { 
          value: 'gordura-localizada', 
          label: 'Gordura localizada',
          description: 'Barriguinha que não vai embora'
        },
        { 
          value: 'flacidez', 
          label: 'Flacidez',
          description: 'Pele solta, falta de firmeza'
        },
        { 
          value: 'falta-definicao', 
          label: 'Falta de definição',
          description: 'Quero ver os músculos aparecerem'
        },
        { 
          value: 'pos-gravidez', 
          label: 'Mudanças pós-gravidez',
          description: 'Recuperar o corpo após a gestação'
        }
      ]
    },
    {
      id: 'preocupacao-pernas',
      title: 'O que você quer melhorar nas pernas e glúteos?',
      subtitle: 'Pode escolher mais de uma opção - cada detalhe importa',
      icon: Heart,
      gradient: 'from-amber-600 to-orange-600',
      type: 'multiple',
      conditional: (answers: QuizAnswer[]) => {
        const areasAnswer = answers.find(a => a.question === 'areas-corpo');
        return areasAnswer && Array.isArray(areasAnswer.answer) && 
               (areasAnswer.answer.includes('pernas') || areasAnswer.answer.includes('corpo-todo'));
      },
      options: [
        { 
          value: 'celulite', 
          label: 'Celulite e textura da pele',
          description: 'Pele mais lisa e uniforme'
        },
        { 
          value: 'flacidez-pernas', 
          label: 'Flacidez nas coxas',
          description: 'Pernas mais firmes e tonificadas'
        },
        { 
          value: 'gluteos-caidos', 
          label: 'Glúteos sem volume',
          description: 'Bumbum mais empinado e definido'
        },
        { 
          value: 'pernas-finas', 
          label: 'Pernas muito finas',
          description: 'Ganhar massa muscular e forma'
        }
      ]
    },
    {
      id: 'preocupacao-bracos',
      title: 'O que te incomoda nos braços?',
      subtitle: 'Pode escolher mais de uma opção - vamos trabalhar exatamente nisso',
      icon: Heart,
      gradient: 'from-cyan-600 to-blue-600',
      type: 'multiple',
      conditional: (answers: QuizAnswer[]) => {
        const areasAnswer = answers.find(a => a.question === 'areas-corpo');
        return areasAnswer && Array.isArray(areasAnswer.answer) && 
               (areasAnswer.answer.includes('bracos') || areasAnswer.answer.includes('corpo-todo'));
      },
      options: [
        { 
          value: 'flacidez-bracos', 
          label: 'Flacidez (braços de tchau)',
          description: 'Braços firmes e definidos'
        },
        { 
          value: 'falta-tono', 
          label: 'Falta de tônus muscular',
          description: 'Braços mais fortes e marcados'
        },
        { 
          value: 'gordura-bracos', 
          label: 'Gordura localizada',
          description: 'Braços mais finos e definidos'
        },
        { 
          value: 'bracos-finos', 
          label: 'Braços muito finos',
          description: 'Ganhar volume e força'
        }
      ]
    },
    {
      id: 'nivel',
      title: 'Qual sua experiência com exercícios?',
      subtitle: 'Não importa de onde você parte - o que importa é começar',
      icon: TrendingUp,
      gradient: 'from-purple-600 to-indigo-600',
      type: 'single',
      options: [
        { 
          value: 'iniciante', 
          label: 'Iniciante',
          description: 'Pouca ou nenhuma experiência - vamos começar juntas'
        },
        { 
          value: 'intermediario', 
          label: 'Intermediária',
          description: 'Treino regularmente, mas quero consistência'
        },
        { 
          value: 'avancado', 
          label: 'Avançada',
          description: 'Treino há mais de 1 ano, busco otimização'
        }
      ]
    },
    {
      id: 'compromisso',
      title: 'Quanto tempo você pode dedicar por semana?',
      subtitle: 'Pequenos passos consistentes levam a grandes resultados',
      icon: Sparkles,
      gradient: 'from-rose-600 to-pink-600',
      type: 'single',
      options: [
        { 
          value: '2-3', 
          label: '2-3 dias por semana',
          description: 'Perfeito para começar e criar o hábito'
        },
        { 
          value: '4-5', 
          label: '4-5 dias por semana',
          description: 'Ritmo ideal para resultados consistentes'
        },
        { 
          value: '6-7', 
          label: '6-7 dias por semana',
          description: 'Comprometimento total com a transformação'
        }
      ]
    }
  ];

  // Filtrar perguntas condicionais
  const visibleQuestions = questions.filter(q => {
    if (q.conditional) {
      return q.conditional(answers);
    }
    return true;
  });

  const currentQuestion = visibleQuestions[currentStep];
  const isLastStep = currentStep === visibleQuestions.length - 1;
  const isFirstStep = currentStep === 0;

  const handleAnswer = (value: string, label: string) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.question === currentQuestion.id);
    
    if (currentQuestion.type === 'multiple') {
      // Para múltipla escolha
      let currentValues: string[] = [];
      if (existingIndex >= 0 && Array.isArray(newAnswers[existingIndex].answer)) {
        currentValues = [...(newAnswers[existingIndex].answer as string[])];
      }
      
      if (currentValues.includes(value)) {
        currentValues = currentValues.filter(v => v !== value);
      } else {
        currentValues.push(value);
      }
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = { question: currentQuestion.id, answer: currentValues };
      } else {
        newAnswers.push({ question: currentQuestion.id, answer: currentValues });
      }
      
      setAnswers(newAnswers);
    } else {
      // Para escolha única
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = { question: currentQuestion.id, answer: value };
      } else {
        newAnswers.push({ question: currentQuestion.id, answer: value });
      }
      
      setAnswers(newAnswers);

      // Auto-avançar para próxima pergunta (apenas para single choice)
      setTimeout(() => {
        if (!isLastStep) {
          setCurrentStep(currentStep + 1);
        }
      }, 400);
    }
  };

  const handleFinish = () => {
    // Salvar respostas no localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    localStorage.setItem('quizCompleted', 'true');
    
    // Redirecionar para página de resultados
    router.push('/quiz/resultados');
  };

  const getCurrentAnswer = () => {
    const answer = answers.find(a => a.question === currentQuestion.id)?.answer;
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0 ? answer : null;
    }
    return answer;
  };

  const isOptionSelected = (value: string) => {
    const answer = getCurrentAnswer();
    if (currentQuestion.type === 'multiple' && Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  const progress = ((currentStep + 1) / visibleQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Avaliação Inicial
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Etapa {currentStep + 1} de {visibleQuestions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</div>
              <div className="text-xs text-gray-500">completo</div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-1.5 bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Question Header */}
          <div className={`bg-gradient-to-r ${currentQuestion.gradient} p-6 sm:p-10 text-white`}>
            <div className="flex items-start gap-4 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-shrink-0">
                <currentQuestion.icon className="w-7 h-7" />
              </div>
              <div className="flex-1 pt-1">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
                  {currentQuestion.title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg">
                  {currentQuestion.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="p-6 sm:p-8">
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = isOptionSelected(option.value);
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value, option.label)}
                    className={`w-full text-left p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] group ${ 
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 flex-shrink-0 transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                        {isSelected ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <div className={`w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-emerald-400 transition-colors ${
                            currentQuestion.type === 'multiple' ? 'rounded-md' : ''
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-lg mb-1 ${isSelected ? 'text-emerald-900' : 'text-gray-900'}`}>
                          {option.label}
                        </p>
                        <p className={`text-sm leading-relaxed ${isSelected ? 'text-emerald-700' : 'text-gray-600'}`}>
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t border-gray-200 p-6 sm:p-8 bg-gray-50">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={isFirstStep}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${ 
                  isFirstStep
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 shadow-sm hover:shadow'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar</span>
              </button>

              {isLastStep ? (
                <button
                  onClick={handleFinish}
                  disabled={!getCurrentAnswer()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${ 
                    getCurrentAnswer()
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:scale-105 shadow-md'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Começar Jornada</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              ) : (
                currentQuestion.type === 'multiple' ? (
                  <button
                    onClick={() => setCurrentStep(Math.min(visibleQuestions.length - 1, currentStep + 1))}
                    disabled={!getCurrentAnswer()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${ 
                      getCurrentAnswer()
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:scale-105 shadow-md'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Continuar</span>
                    <ChevronRight className="w-5 h-5" />
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

        {/* Motivational Text */}
        {currentStep === 0 && (
          <div className="mt-8 text-center space-y-2">
            <p className="text-gray-700 font-medium">
              ✨ Sua transformação começa agora
            </p>
            <p className="text-sm text-gray-600">
              Responda com sinceridade - quanto mais soubermos sobre você, melhor será sua experiência
            </p>
          </div>
        )}

        {currentStep === visibleQuestions.length - 1 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <p className="text-center text-emerald-900 font-semibold text-lg mb-2">
              🎯 Última etapa!
            </p>
            <p className="text-center text-emerald-700 text-sm">
              Com base nas suas respostas, vamos criar um plano personalizado para você alcançar seus objetivos
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
