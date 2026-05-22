import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Info, 
  Trash2, 
  Calendar, 
  Save, 
  X, 
  Scale, 
  BookOpen, 
  Shield, 
  Lightbulb, 
  MessageSquare, 
  FileText,
  ChevronDown,
  FileEdit
} from 'lucide-react';

const NotesPage = () => {
  const navigate = useNavigate();
  
  // State variables
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal toggle states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Editor view states
  const [activeEditorNoteId, setActiveEditorNoteId] = useState(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef(null);
  
  // Selected note for editing/deleting metadata
  const [targetNote, setTargetNote] = useState(null);

  // Form states (Add/Edit Note)
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Criminal Law');
  const [formPriority, setFormPriority] = useState('Medium');

  // Color picker state for editor toolbar
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  // Background Watermark Cells & Symbols
  const gridCells = useMemo(() => Array.from({ length: 24 }), []);
  const watermarkSymbols = useMemo(() => [Scale, BookOpen, Shield, Lightbulb, MessageSquare, FileText], []);

  // Preset categories and priorities
  const categories = ['Criminal Law', 'Constitutional Law', 'Contract Law', 'Tort Law', 'Other'];
  const priorities = ['Low', 'Medium', 'High'];
  
  // Color palette for editor
  const textColors = [
    { name: 'Dark Navy', value: '#0A1128' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' }
  ];

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('lexgo_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Prepopulate with mock notes matching the mockup
      const mockNotes = [
        {
          id: 1,
          title: 'Criminal Law - Key Term',
          category: 'Criminal Law',
          priority: 'Medium',
          content: 'Criminal law involves rules set by the state to which would specify acts that are unacceptable and carry punishments.',
          date: 'Aug 24, 2025',
          timestamp: new Date('2025-08-24').getTime()
        },
        {
          id: 2,
          title: 'Criminal Law - Key Term',
          category: 'Criminal Law',
          priority: 'Medium',
          content: 'Criminal law involves rules set by the state to which would specify acts that are unacceptable and carry punishments.',
          date: 'Aug 24, 2025',
          timestamp: new Date('2025-08-24').getTime()
        },
        {
          id: 3,
          title: 'Criminal Law - Key Term',
          category: 'Criminal Law',
          priority: 'Medium',
          content: 'Criminal law involves rules set by the state to which would specify acts that are unacceptable and carry punishments.',
          date: 'Aug 24, 2025',
          timestamp: new Date('2025-08-24').getTime()
        },
        {
          id: 4,
          title: 'Criminal Law - Key Term',
          category: 'Criminal Law',
          priority: 'Medium',
          content: 'Criminal law involves rules set by the state to which would specify acts that are unacceptable and carry punishments.',
          date: 'Aug 24, 2025',
          timestamp: new Date('2025-08-24').getTime()
        }
      ];
      setNotes(mockNotes);
      localStorage.setItem('lexgo_notes', JSON.stringify(mockNotes));
    }
  }, []);

  // Helper to save notes array to localStorage and state
  const saveNotesStore = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('lexgo_notes', JSON.stringify(newNotes));
  };

  // Format date helper for note creation
  const getFormattedDate = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date();
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  // Group notes by date label (e.g. Yesterday, Today, or specific date string)
  const groupedNotes = useMemo(() => {
    // Filter notes first
    const filtered = notes.filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            n.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = selectedPriority === 'All' || n.priority === selectedPriority;
      const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
      return matchesSearch && matchesPriority && matchesCategory;
    });

    // Grouping by Date Label
    const groups = {};
    const todayStr = getFormattedDate();
    
    // Yesterday helper
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yesterdayStr = `${months[yesterday.getMonth()]} ${yesterday.getDate()}, ${yesterday.getFullYear()}`;

    // Sort filtered notes descending by timestamp
    const sorted = [...filtered].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    sorted.forEach(note => {
      let dateLabel = note.date;
      // If date matches today/yesterday or mock date, assign a clean text heading
      if (note.date === todayStr) {
        dateLabel = 'Today';
      } else if (note.date === yesterdayStr || note.date === 'Aug 24, 2025') {
        dateLabel = 'Yesterday';
      }
      
      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(note);
    });

    return groups;
  }, [notes, searchQuery, selectedPriority, selectedCategory]);

  // Handle Note Creation
  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newNote = {
      id: Date.now(),
      title: formTitle,
      category: formCategory,
      priority: formPriority,
      content: 'Type note... Click to start writing.',
      date: getFormattedDate(),
      timestamp: Date.now()
    };

    const updated = [newNote, ...notes];
    saveNotesStore(updated);
    
    // Reset Form & Close Modal
    setFormTitle('');
    setFormCategory('Criminal Law');
    setFormPriority('Medium');
    setIsAddModalOpen(false);

    // Automatically open in editor
    openEditor(newNote);
  };

  // Open Edit Metadata modal
  const openEditModal = (note, e) => {
    e.stopPropagation();
    setTargetNote(note);
    setFormTitle(note.title);
    setFormCategory(note.category);
    setFormPriority(note.priority);
    setIsEditModalOpen(true);
  };

  // Save Metadata edits
  const handleEditNote = (e) => {
    e.preventDefault();
    if (!targetNote || !formTitle.trim()) return;

    const updated = notes.map(n => {
      if (n.id === targetNote.id) {
        return {
          ...n,
          title: formTitle,
          category: formCategory,
          priority: formPriority
        };
      }
      return n;
    });

    saveNotesStore(updated);
    setIsEditModalOpen(false);
    setTargetNote(null);
  };

  // Open Delete Modal
  const openDeleteModal = (note, e) => {
    e.stopPropagation();
    setTargetNote(note);
    setIsDeleteModalOpen(true);
  };

  // Execute Deletion
  const handleDeleteNote = () => {
    if (!targetNote) return;
    const updated = notes.filter(n => n.id !== targetNote.id);
    saveNotesStore(updated);
    setIsDeleteModalOpen(false);
    
    // If active editor was deleted, close it
    if (activeEditorNoteId === targetNote.id) {
      setActiveEditorNoteId(null);
    }
    setTargetNote(null);
  };

  // Open rich editor view
  const openEditor = (note) => {
    setActiveEditorNoteId(note.id);
    setEditorTitle(note.title);
    setEditorContent(note.content);
    setIsColorPickerOpen(false);
  };

  // Save editor content
  const handleSaveEditor = () => {
    if (!activeEditorNoteId) return;

    const htmlContent = editorRef.current ? editorRef.current.innerHTML : editorContent;

    const updated = notes.map(n => {
      if (n.id === activeEditorNoteId) {
        return {
          ...n,
          title: editorTitle,
          content: htmlContent,
          timestamp: Date.now() // bump update time
        };
      }
      return n;
    });

    saveNotesStore(updated);
    
    // Close editor view and return to list
    setActiveEditorNoteId(null);
  };

  // Run native rich text formatting command
  const execEditorCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML);
    }
  };

  // Helper to get priority badge color styling
  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'Low':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Medium':
      default:
        return 'bg-[#FEF6E4] text-[#D97706] border-[#FDEFCB]';
    }
  };

  // Excerpt snippet text cleaner (removes HTML tags for list card snippets)
  const getCleanSnippet = (html) => {
    if (!html) return '';
    const clean = html.replace(/<[^>]*>?/gm, ' ');
    return clean.length > 80 ? clean.substring(0, 80) + '...' : clean;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 min-h-[600px] shadow-sm relative overflow-hidden flex flex-col">
      
      {/* Background watermark grid (similar pattern styling) */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 grid-rows-4 gap-x-12 gap-y-16 p-8 opacity-[0.03] select-none pointer-events-none z-0">
        {gridCells.map((_, idx) => {
          const IconComponent = watermarkSymbols[idx % watermarkSymbols.length];
          return (
            <div key={idx} className="flex items-center justify-center transform rotate-12">
              <IconComponent className="w-12 h-12 stroke-[1.5]" />
            </div>
          );
        })}
      </div>

      {activeEditorNoteId === null ? (
        /* NOTES LISTING STATE */
        <div className="z-10 flex-grow flex flex-col min-h-0">
          
          {/* Header Row */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-50 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:text-lexgo-dark transition flex items-center justify-center cursor-pointer shadow-sm"
                title="Go to Dashboard"
              >
                <ArrowLeft size={16} />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-lexgo-dark tracking-tight">
                Notes
              </h2>
            </div>
            <button
              onClick={() => {
                setFormTitle('');
                setFormCategory('Criminal Law');
                setFormPriority('Medium');
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-2 py-2.5 px-4 bg-[#0A1128] hover:bg-opacity-95 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-sm"
            >
              <Plus size={16} />
              <span>Add New Note</span>
            </button>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-[#FAF8F8] border border-gray-100 rounded-2xl p-4 mb-6 shrink-0 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-lexgo-dark transition font-medium text-lexgo-dark placeholder-gray-400 shadow-sm"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3 w-full md:w-auto justify-end">
              
              {/* Priority Select */}
              <div className="relative w-1/2 md:w-36">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 focus:outline-none focus:border-lexgo-dark cursor-pointer shadow-sm"
                >
                  <option value="All">All priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Category Select */}
              <div className="relative w-1/2 md:w-44">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 focus:outline-none focus:border-lexgo-dark cursor-pointer shadow-sm"
                >
                  <option value="All">All categories</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

            </div>
          </div>

          {/* Notes Group List */}
          <div className="flex-grow overflow-y-auto space-y-6 min-h-0 pr-1">
            {Object.keys(groupedNotes).length > 0 ? (
              Object.keys(groupedNotes).map(dateHeading => (
                <div key={dateHeading} className="space-y-3">
                  {/* Date Heading */}
                  <h3 className="text-xs sm:text-sm uppercase tracking-wider text-lexgo-dark font-extrabold pb-1">
                    {dateHeading}
                  </h3>
                  
                  {/* Notes under this Date Group */}
                  <div className="space-y-3">
                    {groupedNotes[dateHeading].map(note => (
                      <div
                        key={note.id}
                        onClick={() => openEditor(note)}
                        className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between group relative overflow-hidden"
                      >
                        <div className="space-y-2 flex-grow min-w-0 pr-4">
                          {/* Title */}
                          <h4 className="font-bold text-lexgo-dark text-sm sm:text-base tracking-tight truncate group-hover:text-indigo-600 transition">
                            {note.title}
                          </h4>

                          {/* Badges */}
                          <div className="flex gap-2 flex-wrap items-center">
                            <span className="text-[10px] font-bold text-gray-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                              {note.category}
                            </span>
                            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-md ${getPriorityBadgeStyle(note.priority)}`}>
                              {note.priority} Priority
                            </span>
                          </div>

                          {/* Preview Text */}
                          <p className="text-xs text-gray-400 font-medium leading-relaxed truncate max-w-2xl">
                            {getCleanSnippet(note.content)}
                          </p>

                          {/* Calendar Row */}
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold pt-1">
                            <Calendar size={12} />
                            <span>{note.date}</span>
                          </div>
                        </div>

                        {/* Card Hover Action Buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Edit Details Metadata */}
                          <button
                            onClick={(e) => openEditModal(note, e)}
                            className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-slate-100 text-gray-500 hover:text-lexgo-dark flex items-center justify-center transition cursor-pointer"
                            title="Edit Note Settings"
                          >
                            <Info size={15} />
                          </button>
                          
                          {/* Delete Action */}
                          <button
                            onClick={(e) => openDeleteModal(note, e)}
                            className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 border border-red-100/50 text-red-500 hover:text-red-600 flex items-center justify-center transition cursor-pointer"
                            title="Delete Note"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              /* EMPTY STATE */
              <div className="flex-grow flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                  <FileText size={32} className="stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lexgo-dark text-base">No Notes Yet</h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-sm">
                    You haven't created any notes. Start writing to save important ideas and key points for later.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFormTitle('');
                    setFormCategory('Criminal Law');
                    setFormPriority('Medium');
                    setIsAddModalOpen(true);
                  }}
                  className="py-2 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-lexgo-dark font-bold text-xs rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Create First Note</span>
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* RICH TEXT EDITOR STATE */
        <div className="z-10 flex-grow flex flex-col min-h-0 relative">
          
          {/* Header Row */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-50 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSaveEditor}
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:text-lexgo-dark transition flex items-center justify-center cursor-pointer shadow-sm"
                title="Save and Exit"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Editor Mode
              </span>
            </div>
            
            <button
              onClick={handleSaveEditor}
              className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#0A1128] hover:bg-opacity-95 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-sm"
            >
              <Save size={16} />
              <span>Save Note</span>
            </button>
          </div>

          {/* Title Area */}
          <div className="mb-4 shrink-0 px-2">
            <input
              type="text"
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full text-xl sm:text-2xl font-bold text-lexgo-dark border-b border-transparent focus:border-gray-200 focus:outline-none py-1.5 transition placeholder-gray-300"
            />
          </div>

          {/* Editor Grid Area */}
          <div className="flex-grow flex gap-4 min-h-0 relative pr-16 pl-2">
            
            {/* Main Rich text editable workspace */}
            <div 
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setEditorContent(e.currentTarget.innerHTML)}
              className="flex-grow overflow-y-auto p-4 border border-slate-100 focus:border-slate-200 bg-slate-50/20 rounded-2xl focus:outline-none min-h-[350px] leading-relaxed text-xs sm:text-sm text-gray-700 font-medium whitespace-pre-wrap select-text cursor-text"
              dangerouslySetInnerHTML={{ __html: editorContent }}
              placeholder="Type note content here..."
            />

            {/* Floating toolbar (Right side stacked toolbar layout matching mockup) */}
            <div className="absolute right-0 top-4 flex flex-col items-center bg-white border border-slate-100 rounded-2xl py-3 shadow-md w-12 gap-4 shrink-0">
              
              {/* Bold B */}
              <button
                onClick={() => execEditorCommand('bold')}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-lexgo-dark font-black text-sm flex items-center justify-center cursor-pointer transition"
                title="Bold"
              >
                B
              </button>

              {/* Italic I */}
              <button
                onClick={() => execEditorCommand('italic')}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-lexgo-dark italic font-serif text-sm flex items-center justify-center cursor-pointer transition"
                title="Italic"
              >
                I
              </button>

              {/* Strikethrough S */}
              <button
                onClick={() => execEditorCommand('strikeThrough')}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-lexgo-dark line-through text-sm flex items-center justify-center cursor-pointer transition"
                title="Strikethrough"
              >
                S
              </button>

              {/* Underline U */}
              <button
                onClick={() => execEditorCommand('underline')}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-lexgo-dark underline text-sm flex items-center justify-center cursor-pointer transition"
                title="Underline"
              >
                U
              </button>

              {/* Color Dot Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                  className="w-6 h-6 rounded-full border border-gray-200 hover:border-gray-400 bg-indigo-600 flex items-center justify-center cursor-pointer transition shadow-sm"
                  title="Text Color"
                >
                  <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                </button>

                {/* Color Dot flyout palette */}
                {isColorPickerOpen && (
                  <div className="absolute right-8 top-0 bg-white border border-gray-100 rounded-xl shadow-lg p-2.5 grid grid-cols-3 gap-2.5 z-40 w-32">
                    {textColors.map(color => (
                      <button
                        key={color.value}
                        onClick={() => {
                          execEditorCommand('foreColor', color.value);
                          setIsColorPickerOpen(false);
                        }}
                        style={{ backgroundColor: color.value }}
                        className="w-6 h-6 rounded-full border border-black/10 hover:scale-110 transition cursor-pointer"
                        title={color.name}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
          
        </div>
      )}

      {/* ==================== POPUP MODALS ==================== */}

      {/* 1. ADD NOTE MODAL OVERLAY */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col">
            
            {/* Close button */}
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg text-gray-400 hover:text-lexgo-dark hover:bg-gray-50 flex items-center justify-center transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <h3 className="text-xl font-bold text-lexgo-dark mb-5">Add New Note</h3>
            
            {/* Form */}
            <form onSubmit={handleCreateNote} className="space-y-4">
              
              {/* Note Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Note Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Introduction to Criminal Law"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-[#FAF8F8] border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-lexgo-dark transition font-semibold"
                />
              </div>

              {/* Category Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Category</label>
                <div className="relative">
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full appearance-none bg-[#FAF8F8] border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 focus:outline-none focus:border-lexgo-dark cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Priority Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Priority</label>
                <div className="relative">
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full appearance-none bg-[#FAF8F8] border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 focus:outline-none focus:border-lexgo-dark cursor-pointer"
                  >
                    {priorities.map(p => (
                      <option key={p} value={p}>{p} Priority</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-500 font-bold text-xs hover:bg-gray-50 transition cursor-pointer text-center bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A1128] text-white font-bold text-xs hover:bg-opacity-95 transition cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <Plus size={14} />
                  <span>Create Note</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 2. EDIT METADATA MODAL OVERLAY */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col">
            
            {/* Close button */}
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg text-gray-400 hover:text-lexgo-dark hover:bg-gray-50 flex items-center justify-center transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <h3 className="text-xl font-bold text-lexgo-dark mb-5">Edit Note</h3>
            
            {/* Form */}
            <form onSubmit={handleEditNote} className="space-y-4">
              
              {/* Note Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Note Title</label>
                <input
                  type="text"
                  required
                  placeholder="Note Title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-[#FAF8F8] border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-lexgo-dark transition font-semibold"
                />
              </div>

              {/* Category Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Category</label>
                <div className="relative">
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full appearance-none bg-[#FAF8F8] border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 focus:outline-none focus:border-lexgo-dark cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Priority Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Priority</label>
                <div className="relative">
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full appearance-none bg-[#FAF8F8] border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 focus:outline-none focus:border-lexgo-dark cursor-pointer"
                  >
                    {priorities.map(p => (
                      <option key={p} value={p}>{p} Priority</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-500 font-bold text-xs hover:bg-gray-50 transition cursor-pointer text-center bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A1128] text-white font-bold text-xs hover:bg-opacity-95 transition cursor-pointer text-center"
                >
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 3. DELETE CONFIRMATION MODAL OVERLAY */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-lexgo-dark">Delete Note</h3>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-8 h-8 rounded-lg text-gray-400 hover:text-lexgo-dark bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-center border border-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Body Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
              This note <span className="font-bold text-lexgo-dark">"{targetNote?.title}"</span> will be removed permanently and you can no longer access it.
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-500 font-bold text-xs hover:bg-gray-50 transition cursor-pointer text-center bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteNote}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#EA4335] text-white font-bold text-xs hover:bg-red-600 transition cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default NotesPage;
