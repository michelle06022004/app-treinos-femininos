'use client';

import { useState } from 'react';
import { Plus, Minus, Save, X } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutCustomizerProps {
  workoutName: string;
  exercises: Exercise[];
  onSave: (customizedExercises: Exercise[]) => void;
  onClose: () => void;
}

export default function WorkoutCustomizer({
  workoutName,
  exercises: initialExercises,
  onSave,
  onClose
}: WorkoutCustomizerProps) {
  const [exercises, setExercises] = useState(initialExercises);

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const adjustSets = (index: number, delta: number) => {
    const updated = [...exercises];
    const newSets = Math.max(1, updated[index].sets + delta);
    updated[index] = { ...updated[index], sets: newSets };
    setExercises(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Personalizar Treino
            </h2>
            <p className="text-sm text-gray-600 mt-1">{workoutName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Exercises List */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
            >
              <h3 className="font-semibold text-gray-900 mb-3">
                {exercise.name}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {/* Sets */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Séries
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustSets(index, -1)}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) =>
                        updateExercise(index, 'sets', parseInt(e.target.value))
                      }
                      className="w-16 text-center px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                      min="1"
                    />
                    <button
                      onClick={() => adjustSets(index, 1)}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Reps */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Repetições
                  </label>
                  <input
                    type="text"
                    value={exercise.reps}
                    onChange={(e) =>
                      updateExercise(index, 'reps', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Ex: 12 ou 30s"
                  />
                </div>

                {/* Rest */}
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Descanso
                  </label>
                  <input
                    type="text"
                    value={exercise.rest}
                    onChange={(e) =>
                      updateExercise(index, 'rest', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Ex: 60s ou 1min"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Ajuste as séries, repetições e descanso de
            acordo com seu nível e objetivos. Lembre-se de manter a técnica
            correta!
          </p>
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
            onClick={() => onSave(exercises)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Personalização
          </button>
        </div>
      </div>
    </div>
  );
}
