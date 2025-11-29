import { WorkoutPlan } from '../types';

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'emagrecimento-casa',
    name: 'Queima Acelerada - Transformação em Casa',
    goal: 'emagrecimento',
    description: 'Programa intensivo de emagrecimento com exercícios de alta intensidade sem equipamentos.',
    level: 'intermediario',
    location: 'casa',
    daysPerWeek: 5,
    duration: '6 semanas',
    benefits: [
      'Queima até 500 calorias por treino',
      'Acelera o metabolismo',
      'Melhora condicionamento cardiovascular',
      'Resultados visíveis em 4 semanas'
    ],
    days: [
      {
        day: 1,
        name: 'HIIT Corpo Todo',
        focus: 'Cardio + Força',
        duration: '35 minutos',
        exercises: [
          { exerciseId: 'burpees', sets: 4, reps: '15', rest: '30s', weight: 'peso corporal' },
          { exerciseId: 'mountain-climbers', sets: 4, reps: '30s', rest: '20s', weight: 'peso corporal' },
          { exerciseId: 'jump-squats', sets: 4, reps: '20', rest: '30s', weight: 'peso corporal' },
          { exerciseId: 'plank-jacks', sets: 3, reps: '30s', rest: '20s', weight: 'peso corporal' }
        ]
      },
      {
        day: 2,
        name: 'Inferior + Core',
        focus: 'Pernas e Abdômen',
        duration: '40 minutos',
        exercises: [
          { exerciseId: 'lunges', sets: 4, reps: '15 cada', rest: '30s', weight: 'peso corporal' },
          { exerciseId: 'glute-bridge', sets: 4, reps: '20', rest: '30s', weight: 'peso corporal' },
          { exerciseId: 'bicycle-crunches', sets: 4, reps: '30', rest: '20s', weight: 'peso corporal' },
          { exerciseId: 'side-plank', sets: 3, reps: '30s cada', rest: '20s', weight: 'peso corporal' }
        ]
      }
    ]
  },
  {
    id: 'gluteos-hipertrofia',
    name: 'Glúteos Perfeitos - Programa de Crescimento',
    goal: 'gluteos',
    description: 'Programa focado em crescimento e definição dos glúteos com progressão de carga.',
    level: 'intermediario',
    location: 'academia',
    daysPerWeek: 4,
    duration: '8 semanas',
    benefits: [
      'Hipertrofia focada em glúteos',
      'Aumento de força e volume',
      'Melhora da postura',
      'Definição e formato'
    ],
    days: [
      {
        day: 1,
        name: 'Glúteos Pesado',
        focus: 'Hipertrofia',
        duration: '50 minutos',
        exercises: [
          { exerciseId: 'hip-thrust', sets: 4, reps: '8-10', rest: '90s', weight: '40-60kg', notes: 'Foco em carga progressiva' },
          { exerciseId: 'bulgarian-split-squat', sets: 4, reps: '10-12 cada', rest: '60s', weight: '8-12kg cada mão' },
          { exerciseId: 'stiff', sets: 4, reps: '10-12', rest: '60s', weight: '30-50kg' },
          { exerciseId: 'abducao-cabo', sets: 3, reps: '15-20', rest: '45s', weight: '20-30kg' },
          { exerciseId: 'glute-kickback', sets: 3, reps: '15 cada', rest: '45s', weight: '10-15kg' }
        ]
      },
      {
        day: 2,
        name: 'Glúteos + Posterior',
        focus: 'Volume e Definição',
        duration: '45 minutos',
        exercises: [
          { exerciseId: 'agachamento-sumo', sets: 4, reps: '12-15', rest: '60s', weight: '20-40kg' },
          { exerciseId: 'cadeira-abdutora', sets: 4, reps: '15-20', rest: '45s', weight: '30-50kg' },
          { exerciseId: 'leg-press-alto', sets: 4, reps: '12-15', rest: '60s', weight: '80-120kg', notes: 'Pés altos na plataforma' },
          { exerciseId: 'mesa-flexora', sets: 3, reps: '12-15', rest: '45s', weight: '20-35kg' }
        ]
      }
    ]
  },
  {
    id: 'pernas-hipertrofia',
    name: 'Pernas Definidas - Força e Volume Muscular',
    goal: 'pernas',
    description: 'Treino completo para desenvolvimento de quadríceps, posteriores e panturrilhas.',
    level: 'avancado',
    location: 'academia',
    daysPerWeek: 3,
    duration: '8 semanas',
    benefits: [
      'Hipertrofia completa de membros inferiores',
      'Aumento significativo de força',
      'Definição muscular',
      'Melhora do equilíbrio e estabilidade'
    ],
    days: [
      {
        day: 1,
        name: 'Quadríceps Dominante',
        focus: 'Anterior de Coxa',
        duration: '55 minutos',
        exercises: [
          { exerciseId: 'agachamento-livre', sets: 5, reps: '8-10', rest: '120s', weight: '40-70kg' },
          { exerciseId: 'leg-press', sets: 4, reps: '12-15', rest: '90s', weight: '100-150kg' },
          { exerciseId: 'cadeira-extensora', sets: 4, reps: '12-15', rest: '60s', weight: '30-50kg' },
          { exerciseId: 'afundo-caminhando', sets: 3, reps: '12 cada', rest: '60s', weight: '8-12kg cada mão' },
          { exerciseId: 'panturrilha-em-pe', sets: 4, reps: '15-20', rest: '45s', weight: '40-60kg' }
        ]
      },
      {
        day: 2,
        name: 'Posterior + Glúteos',
        focus: 'Posterior de Coxa',
        duration: '50 minutos',
        exercises: [
          { exerciseId: 'stiff', sets: 4, reps: '10-12', rest: '90s', weight: '35-55kg' },
          { exerciseId: 'mesa-flexora', sets: 4, reps: '12-15', rest: '60s', weight: '25-40kg' },
          { exerciseId: 'hip-thrust', sets: 4, reps: '10-12', rest: '90s', weight: '50-70kg' },
          { exerciseId: 'cadeira-abdutora', sets: 3, reps: '15-20', rest: '45s', weight: '35-55kg' },
          { exerciseId: 'panturrilha-sentado', sets: 4, reps: '15-20', rest: '45s', weight: '20-35kg' }
        ]
      }
    ]
  },
  {
    id: 'hiit-rapido',
    name: 'HIIT Express - Resultados em 20 Minutos',
    goal: 'hiit',
    description: 'Treinos rápidos e intensos de 20 minutos para quem tem pouco tempo.',
    level: 'intermediario',
    location: 'ambos',
    daysPerWeek: 4,
    duration: '4 semanas',
    benefits: [
      'Treinos de apenas 20 minutos',
      'Alta queima calórica',
      'Pode ser feito em qualquer lugar',
      'Melhora explosão e resistência'
    ],
    days: [
      {
        day: 1,
        name: 'Tabata Inferno',
        focus: 'Corpo Todo',
        duration: '20 minutos',
        exercises: [
          { exerciseId: 'burpees', sets: 8, reps: '20s', rest: '10s', weight: 'peso corporal', notes: 'Protocolo Tabata' },
          { exerciseId: 'high-knees', sets: 8, reps: '20s', rest: '10s', weight: 'peso corporal' },
          { exerciseId: 'jump-squats', sets: 8, reps: '20s', rest: '10s', weight: 'peso corporal' },
          { exerciseId: 'mountain-climbers', sets: 8, reps: '20s', rest: '10s', weight: 'peso corporal' }
        ]
      }
    ]
  },
  {
    id: 'iniciante-completo',
    name: 'Jornada Fitness - Seu Primeiro Passo',
    goal: 'iniciante',
    description: 'Programa perfeito para quem está começando, com exercícios básicos e progressão gradual.',
    level: 'iniciante',
    location: 'ambos',
    daysPerWeek: 3,
    duration: '4 semanas',
    benefits: [
      'Aprenda os movimentos básicos',
      'Construa base de força',
      'Previna lesões',
      'Ganhe confiança'
    ],
    days: [
      {
        day: 1,
        name: 'Corpo Todo - Básico',
        focus: 'Aprendizado',
        duration: '30 minutos',
        exercises: [
          { exerciseId: 'agachamento-livre', sets: 3, reps: '12', rest: '60s', weight: 'peso corporal', notes: 'Foque na técnica' },
          { exerciseId: 'flexao-joelhos', sets: 3, reps: '10', rest: '60s', weight: 'peso corporal' },
          { exerciseId: 'prancha', sets: 3, reps: '20s', rest: '45s', weight: 'peso corporal' },
          { exerciseId: 'ponte-gluteo', sets: 3, reps: '15', rest: '45s', weight: 'peso corporal' }
        ]
      }
    ]
  },
  {
    id: 'tonificacao-geral',
    name: 'Corpo Definido - Tonificação Completa',
    goal: 'tonificacao',
    description: 'Treino completo para tonificar e definir todo o corpo com foco em resistência muscular.',
    level: 'intermediario',
    location: 'academia',
    daysPerWeek: 4,
    duration: '6 semanas',
    benefits: [
      'Definição muscular geral',
      'Redução de gordura localizada',
      'Melhora da resistência',
      'Corpo mais firme e tonificado'
    ],
    days: [
      {
        day: 1,
        name: 'Superior Completo',
        focus: 'Braços, Ombros e Costas',
        duration: '45 minutos',
        exercises: [
          { exerciseId: 'supino-halteres', sets: 3, reps: '15', rest: '45s', weight: '6-10kg cada' },
          { exerciseId: 'remada-curvada', sets: 3, reps: '15', rest: '45s', weight: '8-12kg cada' },
          { exerciseId: 'desenvolvimento-ombros', sets: 3, reps: '12', rest: '45s', weight: '5-8kg cada' },
          { exerciseId: 'rosca-biceps', sets: 3, reps: '15', rest: '40s', weight: '5-8kg cada' },
          { exerciseId: 'triceps-corda', sets: 3, reps: '15', rest: '40s', weight: '15-25kg' }
        ]
      },
      {
        day: 2,
        name: 'Inferior + Core',
        focus: 'Pernas e Abdômen',
        duration: '45 minutos',
        exercises: [
          { exerciseId: 'leg-press', sets: 3, reps: '15', rest: '60s', weight: '60-90kg' },
          { exerciseId: 'cadeira-extensora', sets: 3, reps: '15', rest: '45s', weight: '20-35kg' },
          { exerciseId: 'mesa-flexora', sets: 3, reps: '15', rest: '45s', weight: '15-25kg' },
          { exerciseId: 'abdominal-remador', sets: 3, reps: '20', rest: '40s', weight: 'peso corporal' },
          { exerciseId: 'prancha-lateral', sets: 3, reps: '30s cada', rest: '40s', weight: 'peso corporal' }
        ]
      }
    ]
  },
  {
    id: 'abdomen-definido',
    name: 'Abdômen Definido - Programa Core Forte',
    goal: 'abdomen',
    description: 'Programa focado em fortalecer e definir toda a região abdominal.',
    level: 'intermediario',
    location: 'ambos',
    daysPerWeek: 4,
    duration: '6 semanas',
    benefits: [
      'Definição abdominal',
      'Core mais forte',
      'Melhora da postura',
      'Redução de medidas na cintura'
    ],
    days: [
      {
        day: 1,
        name: 'Core Intenso',
        focus: 'Abdômen Completo',
        duration: '25 minutos',
        exercises: [
          { exerciseId: 'prancha', sets: 4, reps: '45s', rest: '30s', weight: 'peso corporal' },
          { exerciseId: 'abdominal-bicicleta', sets: 4, reps: '30', rest: '30s', weight: 'peso corporal' },
          { exerciseId: 'elevacao-pernas', sets: 4, reps: '15', rest: '30s', weight: 'peso corporal' },
          { exerciseId: 'russian-twist', sets: 3, reps: '40', rest: '30s', weight: '5-8kg' },
          { exerciseId: 'prancha-lateral', sets: 3, reps: '30s cada', rest: '30s', weight: 'peso corporal' }
        ]
      }
    ]
  },
  {
    id: 'bracos-costas',
    name: 'Superior Forte - Braços e Costas Definidos',
    goal: 'bracos-costas',
    description: 'Desenvolvimento completo de braços, ombros e costas para um tronco forte e definido.',
    level: 'intermediario',
    location: 'academia',
    daysPerWeek: 3,
    duration: '6 semanas',
    benefits: [
      'Braços tonificados e definidos',
      'Costas fortes e postura melhorada',
      'Ombros arredondados',
      'Aumento de força no tronco'
    ],
    days: [
      {
        day: 1,
        name: 'Costas + Bíceps',
        focus: 'Puxadas',
        duration: '45 minutos',
        exercises: [
          { exerciseId: 'puxada-frente', sets: 4, reps: '12', rest: '60s', weight: '25-40kg' },
          { exerciseId: 'remada-curvada', sets: 4, reps: '12', rest: '60s', weight: '10-15kg cada' },
          { exerciseId: 'remada-cavalinho', sets: 3, reps: '12', rest: '45s', weight: '30-45kg' },
          { exerciseId: 'rosca-direta', sets: 3, reps: '12', rest: '45s', weight: '6-10kg cada' },
          { exerciseId: 'rosca-martelo', sets: 3, reps: '12', rest: '45s', weight: '6-10kg cada' }
        ]
      },
      {
        day: 2,
        name: 'Ombros + Tríceps',
        focus: 'Empurrões',
        duration: '45 minutos',
        exercises: [
          { exerciseId: 'desenvolvimento-ombros', sets: 4, reps: '12', rest: '60s', weight: '6-10kg cada' },
          { exerciseId: 'elevacao-lateral', sets: 4, reps: '15', rest: '45s', weight: '4-8kg cada' },
          { exerciseId: 'elevacao-frontal', sets: 3, reps: '12', rest: '45s', weight: '4-8kg cada' },
          { exerciseId: 'triceps-testa', sets: 3, reps: '12', rest: '45s', weight: '6-10kg' },
          { exerciseId: 'triceps-corda', sets: 3, reps: '15', rest: '45s', weight: '20-30kg' }
        ]
      }
    ]
  },
  {
    id: 'funcional-completo',
    name: 'Funcional 360° - Movimento Inteligente',
    goal: 'funcional',
    description: 'Treino funcional completo com movimentos naturais e práticos para o dia a dia.',
    level: 'intermediario',
    location: 'ambos',
    daysPerWeek: 4,
    duration: '6 semanas',
    benefits: [
      'Melhora movimentos do cotidiano',
      'Aumenta mobilidade e flexibilidade',
      'Trabalha corpo de forma integrada',
      'Previne lesões'
    ],
    days: [
      {
        day: 1,
        name: 'Funcional Dinâmico',
        focus: 'Movimentos Compostos',
        duration: '40 minutos',
        exercises: [
          { exerciseId: 'kettlebell-swing', sets: 4, reps: '15', rest: '45s', weight: '8-12kg' },
          { exerciseId: 'agachamento-goblet', sets: 4, reps: '12', rest: '45s', weight: '8-12kg' },
          { exerciseId: 'farmer-walk', sets: 3, reps: '30s', rest: '45s', weight: '12-16kg cada' },
          { exerciseId: 'turkish-getup', sets: 3, reps: '5 cada', rest: '60s', weight: '6-10kg' },
          { exerciseId: 'medicine-ball-slam', sets: 3, reps: '15', rest: '45s', weight: '6-10kg' }
        ]
      }
    ]
  }
];

export const exerciseDatabase = [
  {
    id: 'burpees',
    name: 'Burpees',
    muscleGroup: ['corpo-todo'],
    equipment: ['peso corporal'],
    difficulty: 'intermediario',
    description: 'Exercício completo que trabalha força e cardio simultaneamente.',
    instructions: [
      'Comece em pé',
      'Agache e apoie as mãos no chão',
      'Jogue os pés para trás em posição de prancha',
      'Faça uma flexão (opcional)',
      'Pule os pés de volta',
      'Salte com os braços acima da cabeça'
    ],
    tips: [
      'Mantenha o core contraído',
      'Aterrisse suavemente',
      'Mantenha ritmo constante'
    ]
  },
  {
    id: 'hip-thrust',
    name: 'Hip Thrust',
    muscleGroup: ['gluteos'],
    equipment: ['banco', 'barra'],
    difficulty: 'intermediario',
    description: 'Melhor exercício para hipertrofia de glúteos.',
    instructions: [
      'Apoie as costas em um banco',
      'Posicione a barra sobre o quadril',
      'Pés afastados na largura dos ombros',
      'Empurre o quadril para cima',
      'Contraia os glúteos no topo',
      'Desça controladamente'
    ],
    tips: [
      'Use almofada na barra',
      'Olhe para frente',
      'Pause 2s no topo',
      'Não arqueie as costas'
    ]
  },
  {
    id: 'agachamento-livre',
    name: 'Agachamento Livre',
    muscleGroup: ['pernas', 'gluteos'],
    equipment: ['barra', 'peso corporal'],
    difficulty: 'intermediario',
    description: 'Exercício fundamental para pernas e glúteos.',
    instructions: [
      'Barra apoiada no trapézio',
      'Pés na largura dos ombros',
      'Desça até coxas paralelas ao chão',
      'Joelhos alinhados com os pés',
      'Suba empurrando pelo calcanhar'
    ],
    tips: [
      'Mantenha peito aberto',
      'Olhe para frente',
      'Não deixe joelhos passarem dos pés',
      'Core sempre contraído'
    ]
  }
];
