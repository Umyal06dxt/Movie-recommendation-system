import React from 'react';
import { motion } from 'framer-motion';
import { Film, Clock, Star, Smile } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  icon: React.ReactNode;
  description?: string;
}

const questions: Question[] = [
  {
    id: 'mood',
    text: 'What\'s your current mood?',
    description: 'We\'ll suggest movies that match your current state of mind',
    options: ['Happy', 'Relaxed', 'Excited', 'Thoughtful', 'Need a good laugh'],
    icon: <Smile className="w-6 h-6" />,
  },
  {
    id: 'genre',
    text: 'What genres do you enjoy?',
    description: 'Pick your favorite movie genre',
    options: ['Action', 'Comedy', 'Drama', 'Science Fiction', 'Horror', 'Romance', 'Adventure', 'Mystery'],
    icon: <Film className="w-6 h-6" />,
  },
  {
    id: 'duration',
    text: 'Preferred movie length?',
    description: 'How much time do you have?',
    options: ['Under 90 mins', '90-120 mins', 'Over 2 hours', 'No preference'],
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 'rating',
    text: 'Minimum rating you\'re looking for?',
    description: 'Filter by movie ratings',
    options: ['Any rating', 'Above 6', 'Above 7', 'Above 8'],
    icon: <Star className="w-6 h-6" />,
  },
];

interface MovieQuestionnaireProps {
  onComplete: (preferences: Record<string, string>) => void;
}

export function MovieQuestionnaire({ onComplete }: MovieQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    const question = questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [question.id]: answer }));

    if (currentQuestion === questions.length - 1) {
      onComplete({ ...answers, [question.id]: answer });
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-purple-600 rounded-full">
            {question.icon}
          </div>
          <h3 className="text-2xl font-bold">{question.text}</h3>
        </div>

        {question.description && (
          <p className="text-gray-400 mb-6 ml-16">{question.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={option}
              onClick={() => handleAnswer(option)}
              className="bg-white/5 hover:bg-purple-600 backdrop-blur-lg p-4 rounded-xl text-left transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="space-x-2">
            {questions.map((_, index) => (
              <span
                key={index}
                className={`inline-block w-2 h-2 rounded-full ${
                  index === currentQuestion ? 'bg-purple-600' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}