'use client';

import { useState } from 'react';
import { Star, X, ThumbsUp, MessageSquare } from 'lucide-react';

interface WorkoutRatingModalProps {
  workoutName: string;
  onClose: () => void;
  onSubmit: (rating: number, difficulty: string, comment: string) => void;
}

export default function WorkoutRatingModal({
  workoutName,
  onClose,
  onSubmit
}: WorkoutRatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [comment, setComment] = useState('');

  const difficulties = [
    { value: 'muito-facil', label: 'Muito Fácil', emoji: '😊' },
    { value: 'facil', label: 'Fácil', emoji: '🙂' },
    { value: 'adequado', label: 'Adequado', emoji: '💪' },
    { value: 'dificil', label: 'Difícil', emoji: '😅' },
    { value: 'muito-dificil', label: 'Muito Difícil', emoji: '🥵' }
  ];

  const handleSubmit = () => {
    if (rating > 0 && difficulty) {
      onSubmit(rating, difficulty, comment);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Avalie seu Treino
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Workout Name */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-3 mb-6">
          <p className="text-sm text-gray-600 mb-1">Treino realizado</p>
          <p className="font-semibold text-gray-900">{workoutName}</p>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Como foi o treino?
          </label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Qual foi a dificuldade?
          </label>
          <div className="grid grid-cols-5 gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  difficulty === diff.value
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{diff.emoji}</div>
                <div className="text-xs font-medium text-gray-700">
                  {diff.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentário (opcional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Compartilhe sua experiência..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!rating || !difficulty}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
}
