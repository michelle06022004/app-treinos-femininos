'use client';

import Link from 'next/link';
import { 
  Dumbbell, 
  Sparkles, 
  Trophy,
  Star,
  Apple,
  Target,
  Check,
  ArrowRight,
  Zap,
  Heart,
  TrendingUp,
  Award,
  Users,
  Shield,
  Clock
} from 'lucide-react';

export default function LandingPage() {
  const benefits = [
    {
      icon: Target,
      title: 'Treinos Personalizados',
      description: 'Ao contrário dos programas de dieta e personal trainers que custam caro, nosso app oferece treinos adaptados ao seu biotipo por um preço que cabe no seu bolso.',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Star,
      title: 'Rotinas das Famosas',
      description: 'Já pensou em acordar todos os dias com o corpo da Mel Maia, Virgínia ou Jade Picon? Aqui, você pode se exercitar com os treinos que elas seguem!',
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      icon: Apple,
      title: 'Acompanhamento Nutricional',
      description: 'Receba dicas de nutrição que complementam seus treinos. Personalize as dietas de acordo com suas preferências e seu bolso!',
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  const results = [
    {
      icon: Zap,
      title: 'Queima de Gordura Rápida',
      description: 'Com treinos otimizados, você verá resultados visíveis em semanas, sem precisar gastar muito em academias.'
    },
    {
      icon: TrendingUp,
      title: 'Combate à Flacidez e Força de Vontade',
      description: 'Tonifique seu corpo, elimine a flacidez e desenvolva a disciplina e determinação para alcançar seus objetivos.'
    },
    {
      icon: Heart,
      title: 'Valorize Sua Autoestima',
      description: 'Sinta-se bem consigo mesma enquanto economiza! Cada treino traz uma nova conquista e uma injeção de confiança!'
    }
  ];

  const testimonials = [
    {
      name: 'Júlia',
      age: 22,
      text: 'Estava quase desistindo de treinar porque os preços estavam muito altos. Com o HerFit, consegui resultados incríveis sem gastar uma fortuna!',
      rating: 5
    },
    {
      name: 'Beatriz',
      age: 24,
      text: 'Finalmente encontrei uma solução que se encaixa no meu orçamento! Estou empinando o bumbum e me sentindo muito melhor!',
      rating: 5
    }
  ];

  const features = [
    { icon: Shield, text: 'Treinos seguros e eficazes' },
    { icon: Users, text: 'Comunidade de apoio' },
    { icon: Clock, text: 'Flexibilidade de horários' },
    { icon: Award, text: 'Resultados comprovados' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  HerFit
                </h1>
                <p className="text-xs text-slate-600">Transforme-se</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-slate-700 font-semibold hover:text-blue-600 transition-colors px-4 py-2"
              >
                Entrar
              </Link>
              <Link
                href="/checkout"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -ml-40 -mb-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Transforme Seu Corpo com o HerFit!</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Alcance o Corpo dos Seus{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Sonhos
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Olá, mulher! Você está pronta para alcançar o corpo dos seus sonhos? Aqui, você vai descobrir treinos que tonificam os glúteos, eliminam a gordura indesejada da barriga e realçam suas curvas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Dumbbell className="w-6 h-6" />
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#beneficios"
                className="flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-blue-600"
              >
                <span>Saiba Mais</span>
              </Link>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <feature.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Por que escolher o HerFit?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Descubra como podemos transformar sua jornada fitness de forma acessível e eficaz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${benefit.gradient} p-4 rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Resultados Que Cabem no Seu Orçamento
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conquiste seus objetivos sem comprometer suas finanças
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl w-fit mb-4">
                  <result.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {result.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Histórias de Sucesso
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Veja o que nossas usuárias estão dizendo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-slate-700 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.age} anos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl -ml-40 -mb-40" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronta para a Transformação?
          </h3>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Baixe o HerFit e comece sua jornada rumo a uma vida mais saudável por um preço incrível! Use o código <span className="font-bold text-yellow-400">BEMVINDA</span> e ganhe uma semana grátis para experimentar.
          </p>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <p className="text-sm text-slate-300 mb-2">Código Promocional</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-2xl font-bold text-yellow-400 tracking-wider">
                BEMVINDA
              </code>
              <div className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-lg text-xs font-bold">
                1 SEMANA GRÁTIS
              </div>
            </div>
          </div>

          <Link
            href="/checkout"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-6"
          >
            <Heart className="w-6 h-6" />
            <span>Invista em Você Mesma</span>
            <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="text-slate-400 text-sm">
            Sem compromisso • Cancele quando quiser • Resultados garantidos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold">HerFit</h4>
                <p className="text-sm text-slate-400">Transforme-se</p>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/login" className="hover:text-white transition-colors">
                Entrar
              </Link>
              <Link href="/checkout" className="hover:text-white transition-colors">
                Cadastrar
              </Link>
              <a href="#beneficios" className="hover:text-white transition-colors">
                Benefícios
              </a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>© 2024 HerFit. Todos os direitos reservados. Invista em você mesma!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
