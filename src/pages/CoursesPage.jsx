import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Check, 
  Plus, 
  GraduationCap, 
  Trash2, 
  Settings, 
  ChevronDown, 
  ChevronUp,
  Info,
  ArrowLeft,
  Book,
  Award,
  Clock,
  Lock,
  CheckCircle,
  HelpCircle,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  Star,
  X
} from 'lucide-react';
import Logo from '../components/Logo';
import AssignmentDetailsModal from '../components/AssignmentDetailsModal';
import TestAndQuizzesView from '../components/TestAndQuizzesView';
import GradeBookView from '../components/GradeBookView';
import ResourcesView from '../components/ResourcesView';
import QAView from '../components/QAView';

const MOCK_ASSIGNMENTS = [
  { id: 2, title: 'Assignment 2 : Criminal Law', dueDate: 'June 13, 2025', dueTime: '11:59 PM', points: '10 points', status: 'Submitted' },
  { id: 1, title: 'Assignment 1 : Introdcution to Law', dueDate: 'October 29, 2025', dueTime: '11:59 PM', points: '10 points', status: 'In progress' },
  { id: 3, title: 'Assignment 3 : Evidence Law', dueDate: 'June 13, 2025', dueTime: '11:59 PM', points: '10 points', status: 'Not started' },
];

import constitutionalLawImg from '../assets/constitutional_law.png';
import contractLawImg from '../assets/contract_law.png';
import criminalLawImg from '../assets/criminal_law.png';

const DISPLAY_COURSES = [
  { id: 2, displayTitle: 'Constitutional Law', image: constitutionalLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 4, displayTitle: 'Contract Law', image: contractLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 3, displayTitle: 'Criminal Law', image: criminalLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 3, displayTitle: 'Criminal Law', image: criminalLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 2, displayTitle: 'Constitutional Law', image: constitutionalLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 4, displayTitle: 'Contract Law', image: contractLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 4, displayTitle: 'Contract Law', image: contractLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 3, displayTitle: 'Criminal Law', image: criminalLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
  { id: 2, displayTitle: 'Constitutional Law', image: constitutionalLawImg, lessons: '4 Lessons', school: 'University of Ghana School of Law' },
];

const PREDEFINED_COURSES = [
  { id: 1, title: 'Introduction to Legal Studies', desc: 'Understanding core judicial systems, sources of law, and structures of government.', duration: '4 Lessons' },
  { id: 2, title: 'Constitutional Law I', desc: 'In-depth analysis of institutional powers, judicial reviews, human rights guarantees.', duration: '4 Lessons' },
  { id: 3, title: 'Criminal Jurisprudence', desc: 'Examine definitions of crime, mens rea/actus reus foundations, and sentencing rules.', duration: '4 Lessons' },
  { id: 4, title: 'Contractual Law & Remedies', desc: 'Elements of agreement: offers, considerations, acceptances, and damages for breach.', duration: '2 Lessons' },
  { id: 5, title: 'Law of Torts', desc: 'Civil wrongs, negligence, liability standards, nuisance, and defamation.', duration: '2 Lessons' },
];

const CURRICULUM_DATABASE = {
  1: {
    modules: [
      {
        id: 'intro_mod1',
        title: 'Module 1: Foundations of Legal Systems',
        lessons: [
          {
            id: 'intro_l11',
            title: 'Lesson 1.1: Meaning and Functions of Law',
            content: 'Law can be defined as a structured system of rules, principles, and standards created and enforced by social or governmental institutions to regulate human conduct. It acts as the primary framework for maintaining social order, protecting individual rights, resolving disputes, and achieving justice. In the words of legal philosopher John Salmond, law is "the body of principles recognized and applied by the state in the administration of justice." Without a cohesive legal structure, society risks falling into a state of anarchy where "might makes right." Modern legal systems are generally classified into public law (governing relationships between the individual and the state) and private law (governing disputes between private parties).',
            cases: [
              { name: 'Republic v. Mensah [2024] SCGLR 104', summary: 'This landmark ruling outlined the constitutional limits of government law enforcement operations, stating that administrative convenience cannot override constitutional rights to privacy and legal order.' }
            ],
            quiz: {
              question: 'Which of the following is the primary focus of private law?',
              options: [
                'Prosecuting criminal behavior against the state',
                'Resolving civil disputes between individual or private parties',
                'Organizing elections and legislative chambers'
              ],
              answer: 1
            }
          },
          {
            id: 'intro_l12',
            title: 'Lesson 1.2: Common Law vs. Civil Law Systems',
            content: 'The legal systems of the world are heavily influenced by two major traditions: Common Law and Civil Law. The Common Law tradition originated in England after the Norman Conquest of 1066. It relies extensively on case law, judicial precedents, and the doctrine of stare decisis (let the decision stand). In common law jurisdictions, judges play an active role in shaping the law through their decisions. Conversely, the Civil Law tradition has its roots in ancient Roman Law, particularly the Justinian Code, and is characterized by comprehensive codified statutes. In civil law jurisdictions, the code is the primary source of law, and judicial decisions serve as persuasive interpretations rather than binding precedents. Ghana, as a former British territory, operates a common law legal system heavily integrated with customary practices.',
            cases: [
              { name: 'Donoghue v. Stevenson [1932] AC 562', summary: 'The fundamental English common law case that established the modern law of negligence and the "neighbor principle," illustrating how judges create law through judicial precedents.' }
            ],
            quiz: {
              question: 'What is the primary source of law in a Civil Law jurisdiction?',
              options: [
                'Judicial decisions and precedents',
                'Codified legislative statutes and codes',
                'Unwritten customary practices'
              ],
              answer: 1
            }
          }
        ]
      },
      {
        id: 'intro_mod2',
        title: 'Module 2: Sources of Law in Ghana',
        lessons: [
          {
            id: 'intro_l21',
            title: 'Lesson 2.1: The Hierarchy of Laws (Article 11)',
            content: 'Article 11 of the 1992 Constitution of Ghana explicitly defines the sources and hierarchy of laws. At the absolute apex is the Constitution, which is the supreme law of the land. Any other law found to be inconsistent with the Constitution is void to the extent of its inconsistency. Below the Constitution are Acts of Parliament, followed by Orders, Rules, and Regulations made under legislative authority. The hierarchy also includes the "existing law" (laws in force immediately before the coming into force of the Constitution) and the "common law." The common law of Ghana comprises the rules of law generally known as the common law, the doctrines of equity, and the rules of customary law, including those determined by the Superior Court of Judicature.',
            cases: [
              { name: 'Tuffuor v. Attorney-General [1980] GLR 637', summary: 'This historic ruling established the supremacy and organic nature of the Ghanaian Constitution, describing it as a living document that must be interpreted broadly and purposively to reflect the will of the people.' }
            ],
            quiz: {
              question: 'According to Article 11 of the Ghanaian Constitution, what does the "common law" of Ghana include?',
              options: [
                'Only the statutory enactments of the British Parliament',
                'Rules of common law, doctrines of equity, and rules of customary law',
                'Only the decrees passed by military regimes'
              ],
              answer: 1
            }
          },
          {
            id: 'intro_l22',
            title: 'Lesson 2.2: The Doctrine of Stare Decisis',
            content: 'Stare decisis is the judicial principle that dictates lower courts must adhere to decisions made by higher courts in similar cases. This ensures predictability, consistency, and fairness in the administration of justice. In the Ghanaian judicial hierarchy, the Supreme Court is the highest court. Under Article 129(3) of the 1992 Constitution, the Supreme Court is not bound to follow its own previous decisions, allowing it to depart from precedents when it is convinced that its previous decision was erroneous or impedes justice. However, all other courts—including the Court of Appeal, High Court, and lower courts—are strictly bound by the judicial precedents set by the Supreme Court.',
            cases: [
              { name: 'Kuenyehia v. Archer [1993] 2 GLR 525', summary: 'Reaffirmed the operation of stare decisis in Ghana and discussed the principles of constitutional interpretation, establishing that the Supreme Court has the ultimate mandate to declare legal precedents.' }
            ],
            quiz: {
              question: 'Which of the following statements is TRUE regarding stare decisis in Ghana?',
              options: [
                'The Supreme Court is strictly bound by all its past decisions.',
                'The High Court can overrule decisions of the Court of Appeal.',
                'All lower courts are bound by the decisions of the Supreme Court.'
              ],
              answer: 2
            }
          }
        ]
      }
    ]
  },
  2: {
    modules: [
      {
        id: 'const_mod1',
        title: 'Constitutional Law Core Modules',
        lessons: [
          {
            id: 'const_l12',
            title: 'Separation of Powers',
            pages: '26 pages',
            content: 'The doctrine of the separation of powers divides the institutions of government into three distinct branches: the Legislative (which makes law), the Executive (which enforces law), and the Judicial (which interprets law). Developed by political theorists like Montesquieu, this structure prevents tyranny by ensuring no single branch commands absolute authority. In practice, modern systems implement "checks and balances" to allow branches to limit one another. For example, in Ghana, the President appoints judges subject to parliamentary approval, and the Judiciary can declare executive acts or legislative bills unconstitutional.',
            cases: [
              { name: 'J.H. Mensah v. Attorney-General [1997] SCGLR 320', summary: 'The Supreme Court ruled on the tenure of ministers from previous administrations, emphasizing that parliamentary approval is an essential check on executive power under the separation of powers.' }
            ],
            quiz: {
              question: 'What is the primary purpose of checks and balances?',
              options: [
                'To merge the three branches into a single department',
                'To allow each branch of government to limit the powers of the others',
                'To give the executive branch veto power over judicial opinions'
              ],
              answer: 1
            }
          },
          {
            id: 'const_l21',
            title: 'Fundamental Rights',
            pages: '25 pages',
            content: 'Article 14 of the 1992 Constitution protects the personal liberty of all individuals. It dictates that no person shall be deprived of their liberty except as authorized by law (e.g. lawful arrest, execution of a court sentence). An arrested person must be informed immediately, in a language they understand, of the reasons for their arrest and their right to remain silent. Furthermore, the "48-hour rule" requires that any person arrested or detained must be brought before a court within 48 hours, failing which they must be released on bail or unconditionally.',
            cases: [
              { name: 'Republic v. Inspector General of Police [2018]', summary: 'An enforcement suit establishing that detaining suspects beyond the 48-hour constitutional limit without a court order is a gross violation of Article 14.' }
            ],
            quiz: {
              question: 'Within what timeframe must an arrested person be brought before a court in Ghana?',
              options: [
                '24 hours',
                '48 hours',
                '72 hours'
              ],
              answer: 1
            }
          },
          {
            id: 'const_l11',
            title: 'Judicial Review',
            pages: '25 pages',
            content: 'Constitutional supremacy is a doctrine asserting that the Constitution is the supreme law of the state, taking precedence over all other legal authorities, including legislative bodies and the executive. Under Article 1(2) of Ghana\'s 1992 Constitution, any law or executive action that is inconsistent with any provision of the Constitution is null, void, and of no legal effect. This prevents the legislature from passing unconstitutional laws and ensures the executive operates within defined boundaries. The Supreme Court of Ghana holds the exclusive jurisdiction to interpret the Constitution and declare acts of the legislature or executive unconstitutional under Articles 2 and 130.',
            cases: [
              { name: 'Tuffuor v. Attorney-General [1980] GLR 637', summary: 'Reiterated that the constitution is the supreme law of the land, and its provisions are non-negotiable standards to which all state activities must conform.' }
            ],
            quiz: {
              question: 'Which body has the exclusive authority to interpret the Constitution and declare laws unconstitutional in Ghana?',
              options: [
                'Parliament',
                'The Supreme Court',
                'The Attorney-General'
              ],
              answer: 1
            }
          },
          {
            id: 'const_l22',
            title: 'Constitutional Interpretation',
            pages: '25 pages',
            content: 'The 1992 Constitution does not simply list rights; it provides robust enforcement mechanisms. Under Article 33, any person who claims that any of their fundamental rights has been, is being, or is likely to be contravened in relation to them, may apply to the High Court for redress. The High Court has the power to issue declarations, orders, or writs (such as habeas corpus, mandamus, prohibition) to enforce these rights. Decisions of the High Court in human rights enforcement are appealable to the Court of Appeal and ultimately the Supreme Court.',
            cases: [
              { name: 'Edusei v. Attorney-General [1996] SCGLR 1', summary: 'Dealt with the right to passport and travel, clarifying that the High Court has original jurisdiction for enforcing human rights, rather than the Supreme Court directly under Article 33.' }
            ],
            quiz: {
              question: 'Where should a citizen first apply to enforce their fundamental human rights in Ghana?',
              options: [
                'The Supreme Court',
                'The High Court',
                'The Commission on Human Rights and Administrative Justice (CHRAJ)'
              ],
              answer: 1
            }
          }
        ]
      }
    ]
  },
  3: {
    modules: [
      {
        id: 'crim_mod1',
        title: 'Module 1: Principles of Liability',
        lessons: [
          {
            id: 'crim_l11',
            title: 'Lesson 1.1: Actus Reus and Mens Rea',
            content: 'The foundation of criminal liability is encapsulated in the Latin maxim: "actus non facit reum nisi mens sit rea," which means "an act does not make a person guilty unless their mind is also guilty." Therefore, standard criminal conviction requires the prosecution to prove two elements beyond reasonable doubt: Actus Reus (the physical, voluntary conduct or omission prohibited by law) and Mens Rea (the mental element, such as intent, knowledge, recklessness, or negligence). These two elements must coincide at the time the offense is committed. For instance, accidentally hitting someone is not murder because there is actus reus (the harm) but no mens rea (the intent to kill).',
            cases: [
              { name: 'R v. Dyson [1908] 2 KB 454', summary: 'A critical case regarding causation, establishing that the defendant\'s wrongful act must be a substantial and operating cause of the victim\'s death to satisfy actus reus.' }
            ],
            quiz: {
              question: 'What does the term "Actus Reus" refer to in criminal law?',
              options: [
                'The mental state of the offender',
                'The physical act or conduct constituting the crime',
                'The legal justification or defense'
              ],
              answer: 1
            }
          },
          {
            id: 'crim_l12',
            title: 'Lesson 1.2: Strict and Absolute Liability',
            content: 'While mens rea is generally required, legislatures sometimes create "strict liability" offenses where the prosecution does not need to prove a guilty mind for one or more elements of the crime. Strict liability is common in public welfare regulations, traffic offenses, and environmental protection laws, where the goal is to enforce high standards of care. In strict liability offenses, the mere performance of the prohibited act (actus reus) is sufficient for a conviction, though some jurisdictions allow a defense of "honest and reasonable mistake of fact." Absolute liability offenses allow no such defenses; performing the act leads directly to guilt.',
            cases: [
              { name: 'Sweet v. Parsley [1970] AC 132', summary: 'Established that courts should always presume that Parliament intends to require mens rea in criminal offenses unless statutory language clearly excludes it, safeguarding defendants from unintended strict liability convictions.' }
            ],
            quiz: {
              question: 'Which of the following is true about strict liability offenses?',
              options: [
                'The prosecution must prove intentional recklessness.',
                'The prosecution does not need to prove mens rea.',
                'The offenses carry the death penalty by default.'
              ],
              answer: 1
            }
          }
        ]
      },
      {
        id: 'crim_mod2',
        title: 'Module 2: Defenses to Crimes',
        lessons: [
          {
            id: 'crim_l21',
            title: 'Lesson 2.1: Insanity and the M\'Naghten Rules',
            content: 'Insanity is a general excuse defense. Under the common law, insanity is governed by the M\'Naghten Rules of 1843. To establish this defense, it must be clearly proven that, at the time of committing the act, the accused was laboring under such a defect of reason, from disease of the mind, as not to know the nature and quality of the act they were doing; or, if they did know it, that they did not know what they were doing was wrong. In Ghana, section 27 of the Criminal Offences Act (Act 29) similarly regulates defense of insanity, leading to a verdict of "not guilty by reason of insanity" and confinement in a psychiatric facility.',
            cases: [
              { name: 'R v. M\'Naghten [1843] 10 Cl & Fin 200', summary: 'The historical English precedent establishing the fundamental tests for the defense of insanity in criminal courts.' }
            ],
            quiz: {
              question: 'Under the M\'Naghten rules, what must the defect of reason stem from?',
              options: [
                'Voluntary intoxication',
                'A disease of the mind',
                'Extreme anger or rage'
              ],
              answer: 1
            }
          },
          {
            id: 'crim_l22',
            title: 'Lesson 2.2: Self-Defense and Proportionality',
            content: 'Self-defense is a justification defense. A person is justified in using force to protect themselves, others, or property from unlawful violence. Under the common law and Section 37 of Ghana\'s Criminal Offences Act (Act 29), the force used in self-defense must be proportional to the threat faced. If a person uses excessive or retaliatory force, the defense fails. The test is both objective (was the force reasonable in the circumstances?) and subjective (did the defendant honestly believe force was necessary?). Self-defense acts as a complete acquittal if successfully pleaded.',
            cases: [
              { name: 'Palmer v. R [1971] AC 814', summary: 'Clarified that a person defending themselves cannot weigh the necessary force to a nicety, but the force used must not be disproportionate to the harm threatened.' }
            ],
            quiz: {
              question: 'What is the key requirement for the force used in self-defense to be legally justified?',
              options: [
                'It must be greater than the force threatened.',
                'It must be retaliatory and punitive.',
                'It must be proportional to the threat faced.'
              ],
              answer: 2
            }
          }
        ]
      }
    ]
  },
  4: {
    modules: [
      {
        id: 'cont_mod1',
        title: 'Module 1: Formation of Contract',
        lessons: [
          {
            id: 'cont_l11',
            title: 'Lesson 1.1: Offer and Invitation to Treat',
            content: 'A contract is formed when there is an offer, acceptance, consideration, and an intention to create legal relations. An offer is a statement of terms upon which the offeror is willing to be bound. It must be clear, precise, and communicated. It is different from an "invitation to treat," which is merely an invitation to negotiate or make an offer. For example, goods displayed on shop shelves, advertisements in newspapers, and auction listings are generally invitations to treat. When a customer takes an item to the cash register, the customer makes the offer, which the cashier accepts.',
            cases: [
              { name: 'Carlill v. Carbolic Smoke Ball Co [1893] 1 QB 256', summary: 'Established that an advertisement can constitute a unilateral offer to the world if it contains clear terms and shows an intention to be bound, such as depositing money in a bank to demonstrate sincerity.' }
            ],
            quiz: {
              question: 'Which of the following is generally classified as an invitation to treat?',
              options: [
                'An item displayed on a shop shelf with a price tag',
                'A signed contract agreement document',
                'A specific offer to sell a car to a neighbor for $5000'
              ],
              answer: 0
            }
          },
          {
            id: 'cont_l12',
            title: 'Lesson 1.2: Consideration and Legal Intent',
            content: 'Consideration is the "price" paid for the promise of the other party. It is a fundamental requirement in common law contracts (except for contracts under seal). Consideration must be sufficient but need not be adequate; this means it must have some legal value (even a nominal sum like $1), but the courts will not inspect if the deal is economically fair. Additionally, parties must have an "intention to create legal relations." In domestic or social agreements (e.g., between spouses), the law presumes there is no legal intent, whereas in commercial agreements, there is a strong presumption of legal intent.',
            cases: [
              { name: 'Balfour v. Balfour [1919] 2 KB 571', summary: 'Established that an agreement made between husband and wife in a domestic setting is presumed not to create legal relations, meaning it is unenforceable in contract law.' }
            ],
            quiz: {
              question: 'In contract law, what does "consideration must be sufficient but need not be adequate" mean?',
              options: [
                'The exchange must be equal in market value.',
                'The consideration must have some value, but the court does not care if it is a good deal.',
                'There must be written evidence of payments.'
              ],
              answer: 1
            }
          }
        ]
      }
    ]
  },
  5: {
    modules: [
      {
        id: 'tort_mod1',
        title: 'Module 1: Negligence',
        lessons: [
          {
            id: 'tort_l11',
            title: 'Lesson 1.1: Duty of Care & Neighbor Principle',
            content: 'The law of torts deals with civil wrongs that cause harm or loss, resulting in legal liability. The most prominent tort is Negligence. To succeed in a negligence claim, the claimant must prove: 1) The defendant owed them a duty of care, 2) The defendant breached that duty, and 3) The breach caused damage that is not too remote. The modern foundation of the duty of care was established by Lord Atkin in 1932 through the "neighbor principle": you must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbor—defined as persons so closely and directly affected by your act that you ought to have them in contemplation.',
            cases: [
              { name: 'Donoghue v. Stevenson [1932] AC 562', summary: 'The famous "snail in the ginger beer" case that established the tort of negligence and Lord Atkin\'s landmark neighbor principle.' }
            ],
            quiz: {
              question: 'According to the "neighbor principle," who is your neighbor in tort law?',
              options: [
                'Only people residing within your local municipality',
                'Anyone directly affected by your actions whom you should have contemplated',
                'Only family members and close acquaintances'
              ],
              answer: 1
            }
          },
          {
            id: 'tort_l12',
            title: 'Lesson 1.2: Factual Causation and the "But-For" Test',
            content: 'Even if a duty of care was owed and breached, the defendant is only liable if their breach caused the claimant\'s damage. Courts use the "but-for" test to establish factual causation: but for the defendant\'s negligent act, would the claimant have suffered the harm? If the harm would have occurred anyway, the defendant is not liable. Additionally, the harm must not be "too remote"—meaning it must be a reasonably foreseeable consequence of the negligence. If the type of damage is entirely unexpected, it is remote, and liability is excluded.',
            cases: [
              { name: 'The Wagon Mound (No 1) [1961] AC 388', summary: 'Established that the test for remoteness of damage in negligence is whether the type of damage suffered was reasonably foreseeable at the time of the breach.' }
            ],
            quiz: {
              question: 'What is the purpose of the "but-for" test in negligence?',
              options: [
                'To establish whether a duty of care existed',
                'To establish factual causation between the breach and the damage',
                'To calculate the monetary value of damages'
              ],
              answer: 1
            }
          }
        ]
      }
    ]
  }
};

const getCourseModules = (course) => {
  if (course.modules) {
    return course.modules;
  }
  return CURRICULUM_DATABASE[course.id]?.modules || [];
};

const getCourseLessonsList = (course) => {
  const modules = getCourseModules(course);
  const lessons = [];
  modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      lessons.push({ ...les, moduleTitle: mod.title });
    });
  });
  return lessons;
};

const getCourseProgress = (course, completedList) => {
  const lessons = getCourseLessonsList(course);
  if (lessons.length === 0) return 0;
  const completedCount = lessons.filter((l) => completedList.includes(l.id)).length;
  return Math.round((completedCount / lessons.length) * 100);
};

const isLessonUnlocked = (course, lessonId, completedList) => {
  const lessons = getCourseLessonsList(course);
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return false;
  if (index === 0) return true;
  return completedList.includes(lessons[index - 1].id);
};

const CoursesPage = () => {
  const [mountedCourses, setMountedCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('lexgo_mounted_courses');
      if (saved) return JSON.parse(saved);
      // Pre-populate with the first three predefined courses by default
      const defaults = PREDEFINED_COURSES.slice(0, 3);
      localStorage.setItem('lexgo_mounted_courses', JSON.stringify(defaults));
      return defaults;
    } catch {
      return PREDEFINED_COURSES.slice(0, 3);
    }
  });

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('lexgo_enrolled_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedList, setCompletedList] = useState(() => {
    try {
      const saved = localStorage.getItem('lexgo_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // SPA navigation states
  const [currentView, setCurrentView] = useState('list'); // 'list' | 'syllabus' | 'lesson'
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [syllabusTab, setSyllabusTab] = useState('Topics');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('lexgo_assignments');
      return saved ? JSON.parse(saved) : MOCK_ASSIGNMENTS;
    } catch {
      return MOCK_ASSIGNMENTS;
    }
  });

  const handleCardClick = (displayCourse) => {
    const actualCourse = PREDEFINED_COURSES.find(c => c.id === displayCourse.id);
    if (actualCourse) {
      const isEnrolled = enrolledCourses.some((c) => c.id === actualCourse.id);
      if (!isEnrolled) {
        const updated = [...enrolledCourses, actualCourse];
        setEnrolledCourses(updated);
        localStorage.setItem('lexgo_enrolled_courses', JSON.stringify(updated));
      }
      setSelectedCourseId(actualCourse.id);
      setCurrentView('syllabus');
    }
  };

  // Lesson viewer tab state
  const [activeTab, setActiveTab] = useState('study'); // 'study' | 'cases' | 'quiz'
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizError, setQuizError] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('lexgo_v2_reset_done')) {
      localStorage.removeItem('lexgo_enrolled_courses');
      localStorage.removeItem('lexgo_mounted_courses');
      localStorage.removeItem('lexgo_completed_lessons');
      localStorage.setItem('lexgo_v2_reset_done', 'true');
      const defaults = PREDEFINED_COURSES.slice(0, 3);
      setMountedCourses(defaults);
      setEnrolledCourses([]);
      setCompletedList([]);
      localStorage.setItem('lexgo_mounted_courses', JSON.stringify(defaults));
    }
  }, []);

  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customDuration, setCustomDuration] = useState('4 Lessons');

  const selectedCourse = mountedCourses.find((c) => c.id === selectedCourseId) || enrolledCourses.find((c) => c.id === selectedCourseId);
  const selectedLesson = selectedCourse ? getCourseLessonsList(selectedCourse).find((l) => l.id === selectedLessonId) : null;

  // Mount predefined course
  const handleMountPredefined = (course) => {
    const isAlreadyMounted = mountedCourses.some((c) => c.title.toLowerCase() === course.title.toLowerCase());
    if (isAlreadyMounted) return;

    const updated = [...mountedCourses, course];
    setMountedCourses(updated);
    localStorage.setItem('lexgo_mounted_courses', JSON.stringify(updated));
  };

  // Mount custom course
  const handleMountCustom = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customDesc.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const isAlreadyMounted = mountedCourses.some((c) => c.title.toLowerCase() === customTitle.trim().toLowerCase());
    if (isAlreadyMounted) {
      alert('A course with this title is already mounted.');
      return;
    }

    const newId = Date.now();
    // Generate modules & lessons for the custom course dynamically
    const generatedModules = [
      {
        id: `custom_${newId}_mod1`,
        title: 'Module 1: Theory and Core Frameworks',
        lessons: [
          {
            id: `custom_${newId}_l1`,
            title: `Lesson 1.1: Foundations of ${customTitle.trim()}`,
            content: `This introductory lesson provides a detailed conceptual foundation for the study of ${customTitle.trim()}. Students will explore the history, underlying policies, and definitions that govern this area of law. We examine how individual disputes or administrative processes are handled under this jurisprudence and contrast local solutions with broader common law perspectives.`,
            cases: [
              { name: 'Republic v. Director General [2023] SCGLR 42', summary: 'A supreme court administrative law decision governing regulatory obligations and procedures in this field.' }
            ],
            quiz: {
              question: `Which of the following is a primary goal when analyzing ${customTitle.trim()}?`,
              options: [
                'To disregard historical precedents entirely',
                'To understand core principles and their application in judicial conflicts',
                'To bypass legislative boundaries'
              ],
              answer: 1
            }
          },
          {
            id: `custom_${newId}_l2`,
            title: `Lesson 1.2: Advanced Principles and Legal Liabilities`,
            content: `Building on foundations, this lesson delves into standard legal elements, liability requirements, duties of care, and general obligations relevant to ${customTitle.trim()}. We outline the tests applied by the courts to establish factual breaches, civil wrongs, or statutory offenses under this domain.`,
            cases: [
              { name: 'Customs Board v. Enterprise Ltd [2022] GLR 190', summary: 'Clarified the scope of damages and equitable actions for regulatory breaches in commercial operations.' }
            ],
            quiz: {
              question: 'Under standard common law analysis, legal rights are generally paired with:',
              options: [
                'Absolute freedom from any regulatory scrutiny',
                'Corresponding duties, guidelines, and obligations',
                'No social expectations whatsoever'
              ],
              answer: 1
            }
          }
        ]
      }
    ];

    const newCourse = {
      id: newId,
      title: customTitle.trim(),
      desc: customDesc.trim(),
      duration: '2 Lessons',
      modules: generatedModules
    };

    const updated = [...mountedCourses, newCourse];
    setMountedCourses(updated);
    localStorage.setItem('lexgo_mounted_courses', JSON.stringify(updated));

    setCustomTitle('');
    setCustomDesc('');
    setCustomDuration('4 Lessons');
  };

  // Unmount course
  const handleUnmountCourse = (courseId) => {
    const updatedMounted = mountedCourses.filter((c) => c.id !== courseId);
    setMountedCourses(updatedMounted);
    localStorage.setItem('lexgo_mounted_courses', JSON.stringify(updatedMounted));

    // Also remove from enrolled list if it was enrolled
    const updatedEnrolled = enrolledCourses.filter((c) => c.id !== courseId);
    setEnrolledCourses(updatedEnrolled);
    localStorage.setItem('lexgo_enrolled_courses', JSON.stringify(updatedEnrolled));

    // Reset view to list if unmounting active course
    if (selectedCourseId === courseId) {
      setCurrentView('list');
      setSelectedCourseId(null);
      setSelectedLessonId(null);
    }
  };

  // Enroll in course
  const handleEnroll = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (isAlreadyEnrolled) return;

    const updated = [...enrolledCourses, course];
    setEnrolledCourses(updated);
    localStorage.setItem('lexgo_enrolled_courses', JSON.stringify(updated));
  };

  // Submit Lesson Quiz Answer
  const handleQuizSubmit = () => {
    if (quizAnswer === null || !selectedLesson) return;

    if (quizAnswer === selectedLesson.quiz.answer) {
      setQuizSubmitted(true);
      setQuizError(false);

      // Save to completed lessons
      if (!completedList.includes(selectedLessonId)) {
        const updated = [...completedList, selectedLessonId];
        setCompletedList(updated);
        localStorage.setItem('lexgo_completed_lessons', JSON.stringify(updated));
      }
    } else {
      setQuizError(true);
    }
  };

  // Navigate to previous/next lesson
  const handleLessonNavigation = (direction) => {
    if (!selectedCourse) return;
    const lessons = getCourseLessonsList(selectedCourse);
    const currentIndex = lessons.findIndex((l) => l.id === selectedLessonId);
    if (currentIndex === -1) return;

    if (direction === 'prev' && currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      setSelectedLessonId(prevLesson.id);
      setActiveTab('study');
      setQuizAnswer(null);
      setQuizSubmitted(completedList.includes(prevLesson.id));
      setQuizError(false);
    } else if (direction === 'next' && currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      if (isLessonUnlocked(selectedCourse, nextLesson.id, completedList)) {
        setSelectedLessonId(nextLesson.id);
        setActiveTab('study');
        setQuizAnswer(null);
        setQuizSubmitted(completedList.includes(nextLesson.id));
        setQuizError(false);
      }
    }
  };

  // Reset simulator
  const handleResetSimulator = () => {
    if (window.confirm('Are you sure you want to clear all mounted, enrolled, and completed courses?')) {
      setMountedCourses([]);
      setEnrolledCourses([]);
      setCompletedList([]);
      localStorage.removeItem('lexgo_mounted_courses');
      localStorage.removeItem('lexgo_enrolled_courses');
      localStorage.removeItem('lexgo_completed_lessons');
      setCurrentView('list');
      setSelectedCourseId(null);
      setSelectedLessonId(null);
    }
  };

  // Helper to find the next incomplete lesson
  const getNextIncompleteLesson = (course) => {
    const lessons = getCourseLessonsList(course);
    return lessons.find((l) => !completedList.includes(l.id)) || lessons[0];
  };

  // Stats calculations
  const totalEnrolled = enrolledCourses.length;
  const totalCompletedLessons = completedList.length;
  const completedCoursesCount = enrolledCourses.filter((course) => getCourseProgress(course, completedList) === 100).length;
  const overallAvgProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((sum, course) => sum + getCourseProgress(course, completedList), 0) / enrolledCourses.length) 
    : 0;

  return (
    <div className="space-y-8 pb-16 animate-fade-in relative overflow-hidden">
      
      {/* App Logo Watermark (interactive easter egg to open simulator) */}
      <div 
        onClick={() => setIsSimulatorOpen(prev => !prev)}
        className="absolute right-4 bottom-4 opacity-[0.03] hover:opacity-10 transition pointer-events-auto cursor-pointer z-50 scale-150"
        title="Toggle Faculty Simulator"
      >
        <Logo color="#0A1128" textClass="text-lexgo-dark" size="small" />
      </div>
      
      {/* ========================================================================= */}
      {/* SCREEN 1: Academic Courses Home View                                     */}
      {/* ========================================================================= */}
      {currentView === 'list' && (
        <>
          {/* Search and Filter Row */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 h-12">
              <input
                type="text"
                placeholder="Search Cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-[#EAEAEA] text-[#0A1128] pl-5 pr-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 font-semibold placeholder-gray-500 text-sm border-0"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-600" />
              </div>
            </div>
            <button className="bg-[#0A1128] text-white h-12 w-12 rounded-xl hover:bg-slate-800 transition flex items-center justify-center border-0 cursor-pointer flex-shrink-0">
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISPLAY_COURSES.filter(course =>
              course.displayTitle.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((course, idx) => (
              <div 
                key={idx} 
                onClick={() => handleCardClick(course)}
                className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex flex-col group"
              >
                <div className="h-44 w-full overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.displayTitle} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300" 
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-[17px] font-black text-black leading-tight tracking-tight">
                      {course.displayTitle}
                    </h4>
                    <p className="text-xs text-gray-500 font-bold">
                      {course.lessons}
                    </p>
                    <p className="text-xs text-gray-400 font-semibold">
                      {course.school}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simulated Faculty Panel */}
          {isSimulatorOpen && (
            <div className="pt-6 border-t border-gray-200 mt-12 animate-fade-in">
              <div className="bg-[#FAF6F6] rounded-3xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between bg-red-50/50">
                  <div className="flex items-center gap-2.5">
                    <Settings className="text-[#E27D2C] w-5 h-5" />
                    <div>
                      <h4 className="text-sm font-black text-black">Faculty / Department Simulation Portal</h4>
                      <p className="text-[11px] text-gray-400 font-semibold">Add or remove courses available for student enrollment</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSimulatorOpen(false)}
                    className="text-xs font-bold text-gray-500 hover:text-black bg-transparent border-0 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 pt-2 border-t border-gray-100/50 space-y-6">
                  {/* Predefined Course List */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mount Predefined Courses</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PREDEFINED_COURSES.map((course) => {
                        const isMounted = mountedCourses.some((c) => c.title.toLowerCase() === course.title.toLowerCase());
                        return (
                          <div key={course.id} className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center text-xs">
                            <div>
                              <div className="font-extrabold text-black">{course.title}</div>
                              <div className="text-[10px] text-gray-400 font-semibold">{course.duration}</div>
                            </div>
                            <button
                              onClick={() => handleMountPredefined(course)}
                              disabled={isMounted}
                              className={`px-3 py-1.5 rounded-lg font-bold border transition text-[11px] cursor-pointer
                                ${isMounted 
                                  ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-default'
                                  : 'border-[#E27D2C] text-[#E27D2C] hover:bg-[#E27D2C] hover:text-white bg-white'
                                }`}
                            >
                              {isMounted ? 'Mounted' : 'Mount'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Custom Course Form */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mount Custom Course</h5>
                    <form onSubmit={handleMountCustom} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Course Title (e.g. Environmental Law)"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-slate-900 font-semibold text-black placeholder-gray-400"
                          required
                        />
                        <select
                          value={customDuration}
                          onChange={(e) => setCustomDuration(e.target.value)}
                          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-slate-900 font-semibold text-black"
                        >
                          <option value="2 Lessons">2 Lessons</option>
                          <option value="4 Lessons">4 Lessons</option>
                        </select>
                      </div>
                      <textarea
                        placeholder="Short course description explaining what students will learn..."
                        value={customDesc}
                        onChange={(e) => setCustomDesc(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-slate-900 font-semibold text-black h-20 resize-none placeholder-gray-400"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-slate-950 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold hover:bg-slate-900 transition cursor-pointer border-0"
                      >
                        Mount Custom Course
                      </button>
                    </form>
                  </div>

                  {/* Currently Mounted Table/List for Unmounting */}
                  {mountedCourses.length > 0 && (
                    <>
                      <hr className="border-gray-100" />
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Currently Mounted Courses ({mountedCourses.length})</h5>
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                          <table className="w-full text-xs text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-gray-100">
                                <th className="px-4 py-2.5 font-extrabold text-gray-500">Course Title</th>
                                <th className="px-4 py-2.5 font-extrabold text-gray-500 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mountedCourses.map((c) => (
                                <tr key={c.id} className="border-b border-gray-100 last:border-b-0">
                                  <td className="px-4 py-3 font-semibold text-black">{c.title}</td>
                                  <td className="px-4 py-3 text-right">
                                    <button
                                      onClick={() => handleUnmountCourse(c.id)}
                                      className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1 ml-auto cursor-pointer bg-transparent border-0"
                                    >
                                      <Trash2 size={13} />
                                      <span>Unmount</span>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}

                  <hr className="border-gray-100" />
                  
                  {/* Reset Everything */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleResetSimulator}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer border-0"
                    >
                      <Trash2 size={14} />
                      <span>Reset All Simulator Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: Course Syllabus / Modules Screen                                */}
      {/* ========================================================================= */}
      {currentView === 'syllabus' && selectedCourse && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Header Row with Back Button and Title */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => {
                setCurrentView('list');
                setSelectedCourseId(null);
              }}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer flex-shrink-0 bg-white"
            >
              <ChevronLeft size={18} className="text-black" />
            </button>
            <h2 className="text-2xl font-black text-black tracking-tight">{selectedCourse.title}</h2>
          </div>

          {/* Syllabus Tabs Row */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-8 text-sm no-scrollbar">
            {['Topics', 'Assignments', 'Test&Quizzes', 'GradeBook', 'Resources', 'Q&A'].map((tab) => {
              const isActive = syllabusTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSyllabusTab(tab)}
                  className={`pb-2.5 font-bold transition whitespace-nowrap bg-transparent border-0 cursor-pointer text-sm
                    ${isActive 
                      ? 'border-b-[3px] border-black text-black font-extrabold' 
                      : 'text-gray-400 hover:text-black border-b-[3px] border-transparent'
                    }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          {syllabusTab === 'Topics' ? (
            <div className="space-y-8">
              {/* Course Cover Card with Metadata Text Overlay */}
              {(() => {
                const courseDisplayInfo = DISPLAY_COURSES.find(c => c.id === selectedCourse.id) || { image: constitutionalLawImg };
                const lessons = getCourseLessonsList(selectedCourse);
                return (
                  <div className="relative w-full max-w-[360px] h-[240px] rounded-[24px] overflow-hidden shadow-sm">
                    <img src={courseDisplayInfo.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                    {/* Text Overlay */}
                    <div className="absolute bottom-5 left-5 text-white pr-4">
                      <h3 className="text-[17px] font-black leading-tight tracking-tight mb-1">{selectedCourse.title}</h3>
                      <p className="text-xs font-bold opacity-90">{lessons.length} Lessons</p>
                      <p className="text-[10px] font-semibold opacity-75">University of Ghana School of Law</p>
                    </div>
                  </div>
                );
              })()}

              {/* Topics Numbered List */}
              <div className="space-y-4">
                {getCourseLessonsList(selectedCourse).map((lesson, idx) => {
                  const isCompleted = completedList.includes(lesson.id);
                  const isUnlocked = isLessonUnlocked(selectedCourse, lesson.id, completedList);
                  const pageCount = lesson.pages || '25 pages';

                  return (
                    <div 
                      key={lesson.id}
                      onClick={() => {
                        if (isUnlocked) {
                          setSelectedLessonId(lesson.id);
                          setActiveTab('study');
                          setQuizAnswer(null);
                          setQuizSubmitted(isCompleted);
                          setQuizError(false);
                          setCurrentView('lesson');
                        }
                      }}
                      className={`bg-white border border-gray-100 rounded-[20px] px-6 py-4.5 shadow-sm transition flex justify-between items-center select-none ${
                        isUnlocked 
                          ? 'cursor-pointer hover:border-gray-300 hover:shadow-md' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        {/* Index Number */}
                        <span className="text-base font-black text-black w-4 flex-shrink-0">
                          {idx + 1}
                        </span>
                        
                        <div>
                          <h4 className="text-sm font-black text-black leading-snug tracking-tight">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-400 font-semibold mt-0.5">
                            {pageCount}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isCompleted && (
                          <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase">
                            Passed
                          </span>
                        )}
                        <div className="w-8 h-8 rounded-full bg-[#0A1128] text-white flex items-center justify-center hover:bg-slate-800 transition flex-shrink-0 shadow-sm">
                          {isUnlocked ? (
                            <ChevronRight size={14} strokeWidth={3} />
                          ) : (
                            <Lock size={12} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : syllabusTab === 'Assignments' ? (
            <div className="space-y-4 font-sans">
              {assignments.map((assignment) => (
                <div 
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment)}
                  className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm flex justify-between items-start select-none cursor-pointer hover:border-gray-300 hover:shadow-md transition duration-150"
                >
                  <div className="flex gap-4">
                    {/* Document Icon wrapper */}
                    <div className="w-10 h-10 rounded-xl bg-emerald-50/70 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText size={20} />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm sm:text-base font-black text-black leading-snug tracking-tight">
                        {assignment.title}
                      </h4>
                      
                      <div className="flex flex-col gap-1.5 text-xs text-gray-400 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-gray-400" />
                          <span>Due {assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-gray-400" />
                          <span>{assignment.dueTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star size={13} className="text-gray-400" />
                          <span>{assignment.points}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border
                    ${assignment.status === 'Submitted' 
                      ? 'bg-rose-50 text-rose-500 border-rose-100/50' 
                      : assignment.status === 'In progress' 
                      ? 'bg-red-50 text-red-500 border-red-100/50' 
                      : 'bg-amber-50 text-amber-600 border-amber-100/50'
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              ))}
            </div>
          ) : syllabusTab === 'Test&Quizzes' ? (
            <TestAndQuizzesView />
          ) : syllabusTab === 'GradeBook' ? (
            <GradeBookView />
          ) : syllabusTab === 'Resources' ? (
            <ResourcesView course={selectedCourse} />
          ) : syllabusTab === 'Q&A' ? (
            <QAView course={selectedCourse} />
          ) : (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm flex flex-col items-center justify-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center shadow-inner">
                <BookOpen size={24} />
              </div>
              <h4 className="text-sm font-black text-black">{syllabusTab} is empty</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-xs">
                There are currently no items posted in the {syllabusTab} section for this course yet. Check back later!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: Interactive Lesson Reader View                                  */}
      {/* ========================================================================= */}
      {currentView === 'lesson' && selectedCourse && selectedLesson && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Back Navigation */}
          <button 
            onClick={() => {
              setCurrentView('syllabus');
              setSelectedLessonId(null);
            }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Syllabus</span>
          </button>

          {/* Breadcrumbs & Header */}
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
              <span>Courses</span>
              <span>/</span>
              <span>{selectedCourse.title}</span>
              <span>/</span>
              <span className="text-gray-500 font-extrabold">{selectedLesson.moduleTitle || 'Syllabus'}</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-black leading-tight">
              {selectedLesson.title}
            </h2>
          </div>

          {/* Main Content Card Container */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
            {/* Tabs Row */}
            <div className="flex border-b border-gray-100 bg-slate-50/50">
              <button
                onClick={() => setActiveTab('study')}
                className={`flex-1 py-3 text-xs font-black tracking-tight border-b-2 transition cursor-pointer bg-transparent border-0 ${
                  activeTab === 'study'
                    ? 'border-[#0A1128] text-black bg-white'
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                📖 Study Material
              </button>
              
              <button
                onClick={() => setActiveTab('cases')}
                className={`flex-grow py-3 text-xs font-black tracking-tight border-b-2 transition cursor-pointer bg-transparent border-0 ${
                  activeTab === 'cases'
                    ? 'border-[#0A1128] text-black bg-white'
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                ⚖️ Case Citations ({selectedLesson.cases?.length || 0})
              </button>
              
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-3 text-xs font-black tracking-tight border-b-2 transition cursor-pointer bg-transparent border-0 ${
                  activeTab === 'quiz'
                    ? 'border-[#0A1128] text-black bg-white'
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                ✓ Self-Assessment
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
              
              {/* TAB 1: Core Study Material */}
              {activeTab === 'study' && (
                <div className="space-y-4">
                  <div className="prose max-w-none text-black text-sm font-semibold leading-relaxed space-y-4">
                    {selectedLesson.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  
                  {/* Styled Note Box */}
                  <div className="p-4 bg-[#FAF6F6] border border-red-50/50 rounded-2xl flex gap-3 mt-8">
                    <Info className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
                    <div className="text-xs text-gray-500 leading-relaxed font-semibold">
                      <span className="font-black block mb-0.5 text-black">Study Tip:</span>
                      Read the case citations carefully to see how judges apply this theoretical concept to resolve real-world conflicts.
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Case Citations */}
              {activeTab === 'cases' && (
                <div className="space-y-6">
                  {selectedLesson.cases && selectedLesson.cases.length > 0 ? (
                    selectedLesson.cases.map((caseRef, idx) => (
                      <div key={idx} className="p-5 border border-slate-100 bg-slate-50/30 rounded-2xl space-y-3 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-extrabold">
                          <BookOpen size={14} className="text-slate-400" />
                          <span>Landmark Case Citation</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-black italic tracking-tight">{caseRef.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-semibold">{caseRef.summary}</p>
                        
                        {/* Scale Background Stamp */}
                        <div className="absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-[0.03] pointer-events-none">
                          <Book className="w-full h-full text-slate-900" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs text-gray-400 font-bold">
                      No specific case citations for this lesson.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Comprehension Quiz */}
              {activeTab === 'quiz' && (
                <div className="space-y-6 max-w-2xl">
                  {/* Pass/Complete banner */}
                  {quizSubmitted ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-center space-y-4 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                        <Check size={24} strokeWidth={3} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-emerald-950">Comprehension Verified!</h4>
                        <p className="text-xs text-emerald-700 font-semibold">You have passed this lesson quiz and unlocked your syllabus progression.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <HelpCircle size={14} className="text-gray-400" />
                        <span>Lesson Assessment</span>
                      </div>
                      
                      <h4 className="text-base font-black text-black leading-snug">
                        {selectedLesson.quiz.question}
                      </h4>

                      <div className="flex flex-col gap-3 pt-2">
                        {selectedLesson.quiz.options.map((option, idx) => {
                          const isSelected = quizAnswer === idx;
                          return (
                            <div 
                              key={idx}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setQuizAnswer(idx);
                                  setQuizError(false);
                                }
                              }}
                              className={`p-4 border rounded-2xl text-xs font-bold tracking-tight cursor-pointer transition select-none flex items-center gap-3
                                ${isSelected 
                                  ? 'border-[#0A1128] bg-slate-50 text-black' 
                                  : 'border-slate-100 hover:border-slate-200 text-gray-500 hover:text-black bg-white'
                                }`}
                            >
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                ${isSelected ? 'border-black text-black bg-black' : 'border-gray-300'}`}>
                                {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                              <span>{option}</span>
                            </div>
                          );
                        })}
                      </div>

                      {quizError && (
                        <div className="p-3.5 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl leading-relaxed">
                          Incorrect answer. Review the core material under Tab 1 and try again!
                        </div>
                      )}

                      <div className="pt-2 flex justify-start">
                        <button
                          onClick={handleQuizSubmit}
                          disabled={quizAnswer === null}
                          className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer border-0
                            ${quizAnswer !== null 
                              ? 'bg-slate-950 text-white hover:bg-slate-900' 
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                          Verify Answer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls Footer */}
          <div className="flex justify-between items-center bg-white border border-gray-100 p-4 rounded-3xl shadow-sm">
            <button
              onClick={() => handleLessonNavigation('prev')}
              disabled={getCourseLessonsList(selectedCourse).findIndex((l) => l.id === selectedLessonId) === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border transition cursor-pointer bg-white
                ${getCourseLessonsList(selectedCourse).findIndex((l) => l.id === selectedLessonId) === 0
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                  : 'border-slate-950 text-black hover:bg-slate-50'
                }`}
            >
              Previous Lesson
            </button>

            <button
              onClick={() => {
                setCurrentView('syllabus');
                setSelectedLessonId(null);
              }}
              className="text-xs font-bold text-gray-500 hover:text-black transition bg-transparent border-0 cursor-pointer"
            >
              Back to Syllabus
            </button>

            {(() => {
              const lessons = getCourseLessonsList(selectedCourse);
              const idx = lessons.findIndex((l) => l.id === selectedLessonId);
              const isLast = idx === lessons.length - 1;
              const nextLesson = !isLast ? lessons[idx + 1] : null;
              const isNextUnlocked = nextLesson ? isLessonUnlocked(selectedCourse, nextLesson.id, completedList) : false;

              return (
                <button
                  onClick={() => handleLessonNavigation('next')}
                  disabled={isLast || !isNextUnlocked}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border transition cursor-pointer bg-white
                    ${isLast || !isNextUnlocked
                      ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-slate-950 text-black hover:bg-slate-50'
                    }`}
                >
                  Next Lesson
                </button>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 4: Assignment Details Modal Overlay                                */}
      {/* ========================================================================= */}
      {selectedAssignment && (
        <AssignmentDetailsModal 
          assignment={assignments.find(a => a.id === selectedAssignment.id) || selectedAssignment} 
          onClose={() => setSelectedAssignment(null)} 
          onSubmit={(assignmentId) => {
            const updated = assignments.map(a => {
              if (a.id === assignmentId) {
                return { ...a, status: 'Submitted' };
              }
              return a;
            });
            setAssignments(updated);
            localStorage.setItem('lexgo_assignments', JSON.stringify(updated));
          }}
        />
      )}
    </div>
  );
};

export default CoursesPage;
