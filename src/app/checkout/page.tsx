'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Dumbbell, 
  ArrowLeft,
  CreditCard,
  Lock,
  Check,
  Sparkles,
  Shield,
  Trophy,
  Gift,
  Tag
} from 'lucide-react';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    cpf: ''
  });

  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const fullPrice = 62.90;
  const discount = 12.90;
  const finalPrice = fullPrice - discount;
  const installmentPrice = (fullPrice / 6).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    setCouponApplied(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simula processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Pagamento Confirmado!
          </h2>
          
          <p className="text-slate-600 mb-8">
            Bem-vinda ao HerFit! Sua jornada de transformação começa agora. Enviamos um email com os detalhes de acesso.
          </p>

          {couponApplied && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">
                Cupom <span className="text-blue-600">BEMVINDA</span> aplicado com sucesso!
              </p>
              <p className="text-xs text-slate-600 mt-2">
                Você economizou R$ 12,90
              </p>
            </div>
          )}

          <Link
            href="/cadastro"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 w-full"
          >
            <Dumbbell className="w-5 h-5" />
            <span>Acessar Meu Treino</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  HerFit
                </h1>
                <p className="text-xs text-slate-600">Transforme-se</p>
              </div>
            </Link>
            
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-700 font-semibold hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Banner de Cupom - Antes de tudo */}
        {!couponApplied && (
          <div className="mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    🎉 Cupom Especial Bem-Vinda!
                  </h3>
                  <p className="text-white/90 text-sm">
                    Use o código <span className="font-bold bg-white/20 px-2 py-1 rounded">BEMVINDA</span> e ganhe R$ 12,90 de desconto
                  </p>
                </div>
              </div>
              <button
                onClick={handleApplyCoupon}
                className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Tag className="w-5 h-5" />
                <span>Resgatar Cupom</span>
              </button>
            </div>
          </div>
        )}

        {/* OPÇÕES DE PAGAMENTO - NO TOPO ABSOLUTO */}
        <div className="mb-8">
          {/* Parcelamento - Destaque Principal */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <CreditCard className="w-10 h-10 text-green-700" />
                <div>
                  <p className="text-3xl font-bold text-green-700 mb-1">
                    6x de R$ {installmentPrice}
                  </p>
                  <p className="text-base text-slate-700 font-medium">
                    sem juros no cartão de crédito
                  </p>
                </div>
              </div>
              <span className="text-sm bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                Recomendado
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Resumo do Pedido
              </h2>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Plano Premium HerFit
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Treinos personalizados ilimitados</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Rotinas das famosas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Acompanhamento nutricional</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Comunidade exclusiva</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {couponApplied && (
                <div className="flex items-center justify-between text-green-600 font-semibold bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Cupom BEMVINDA aplicado
                  </span>
                  <span>-R$ {discount.toFixed(2)}</span>
                </div>
              )}

              {/* Opção À Vista - Lateral Direita */}
              <div className="flex items-center justify-between bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 mb-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-700" />
                  <span className="text-base font-semibold text-slate-700">
                    À vista
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-700">
                    R$ {couponApplied ? finalPrice.toFixed(2) : fullPrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-600">
                    pagamento único
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-800 font-semibold">
                  💳 Pagamento único mensal. Cancele quando quiser!
                </p>
              </div>
            </div>

            {/* Garantias */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Pagamento Seguro</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center">
                <Lock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Dados Protegidos</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center">
                <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Garantia 7 dias</p>
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Dados de Pagamento
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  />
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    required
                    maxLength={14}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  />
                </div>

                {/* Número do Cartão */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="0000 0000 0000 0000"
                    required
                    maxLength={19}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  />
                </div>

                {/* Nome no Cartão */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="NOME COMPLETO"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all uppercase"
                  />
                </div>

                {/* Validade e CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Validade
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      required
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Botão de Pagamento */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Finalizar Pagamento</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-slate-500">
                  Ao finalizar, você concorda com nossos termos de uso e política de privacidade. Pagamento seguro e criptografado.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
