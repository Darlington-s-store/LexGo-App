import React from 'react';
import { 
  HelpCircle, 
  Calendar, 
  FileText, 
  Clock 
} from 'lucide-react';

const TestAndQuizzesView = () => {
  const quizzes = [
    {
      id: 1,
      title: 'Quiz one',
      subtitle: "Test Student's General Knowledge",
      dueDate: 'Due Sept 17,2025 • 10:10AM',
      questions: '45 Questions',
      duration: '1hr 50Minutes'
    },
    {
      id: 2,
      title: 'Quiz Two',
      subtitle: 'Mid Sem 1',
      dueDate: 'Due Sept 17,2025 • 10:10AM',
      questions: '45 Questions',
      duration: '1hr 50Minutes'
    },
    {
      id: 3,
      title: 'Quiz Three',
      subtitle: 'Mid Sem 2',
      dueDate: 'Due Sept 17,2025 • 10:10AM',
      questions: '45 Questions',
      duration: '1hr 50Minutes'
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Current Assessment Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-black text-black tracking-tight">Current Assessment</h3>
        <p className="text-xs text-gray-500 font-semibold">You have no Quiz to take</p>
      </div>

      {/* Submitted Assessments Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-black tracking-tight">Submitted Assessments</h3>
        
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm flex items-start gap-4 select-none hover:border-gray-300 hover:shadow-md transition duration-150"
            >
              {/* Question Icon Wrapper */}
              <div className="w-10 h-10 rounded-full bg-emerald-50/70 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HelpCircle size={20} />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-black text-black leading-snug tracking-tight">
                  {quiz.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold">
                  {quiz.subtitle}
                </p>
                
                {/* Metadata vertical list */}
                <div className="flex flex-col gap-1 text-[10px] text-gray-400 font-semibold pt-1.5">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-gray-400" />
                    <span>{quiz.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText size={12} className="text-gray-400" />
                    <span>{quiz.questions}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-gray-400" />
                    <span>{quiz.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestAndQuizzesView;
