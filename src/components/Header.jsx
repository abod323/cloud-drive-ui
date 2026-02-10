import { useState, useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ openModal }) => {
  const { 
    viewMode, 
    setViewMode, 
    currentPath, 
    selectAll, 
    clearSelection,
    sortBy,
    sortOrder,
    setSorting,
    filterType,
    setFilter,
    searchQuery,
    setSearch,
    folders,
    files,
    selectedItems,
    navigateUp,
    navigateToPath
  } = useFileContext();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchQuery, setSearch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const sortOptions = [
    { id: 'name', label: 'Name', icon: '🔤' },
    { id: 'date', label: 'Date', icon: '📅' },
    { id: 'size', label: 'Size', icon: '📊' },
    { id: 'type', label: 'Type', icon: '📁' },
  ];

  const filterOptions = [
    { id: 'all', label: 'All items', icon: '📦' },
    { id: 'folders', label: 'Folders only', icon: '📁' },
    { id: 'files', label: 'Files only', icon: '📄' },
    { id: 'pdf', label: 'PDF files', icon: '📕' },
    { id: 'image', label: 'Images', icon: '🖼️' },
    { id: 'video', label: 'Videos', icon: '🎬' },
    { id: 'doc', label: 'Documents', icon: '📝' },
  ];

  return (
    <header className={`border-b px-6 py-4 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-gray-100' 
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={navigateUp}
            className={`hover:opacity-80 ${
              isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}
            disabled={currentPath.length <= 1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-1">
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center">
                <button 
                  onClick={() => navigateToPath(index)}
                  className={`text-sm px-2 py-1 rounded transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {path}
                </button>
                {index < currentPath.length - 1 && (
                  <span className={`mx-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>/</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search files and folders..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
            />
            {localSearchQuery && (
              <button
                onClick={() => setLocalSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Sort Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">🔤</span>
              <span className="text-sm font-medium">Sort</span>
              <svg className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showSortMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSorting(option.id);
                        setShowSortMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                        sortBy === option.id
                          ? isDarkMode
                            ? 'bg-primary-900 text-primary-300'
                            : 'bg-primary-50 text-primary-700'
                          : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </div>
                      {sortBy === option.id && (
                        <span className={`text-xs ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Menu */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">🔍</span>
              <span className="text-sm font-medium">Filter</span>
              <svg className={`w-4 h-4 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showFilterMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="py-1">
                  {filterOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setFilter(option.id);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                        filterType === option.id
                          ? isDarkMode
                            ? 'bg-primary-900 text-primary-300'
                            : 'bg-primary-50 text-primary-700'
                          : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className={`flex items-center rounded-lg p-1 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? isDarkMode 
                    ? 'bg-gray-600 shadow-sm' 
                    : 'bg-white shadow-sm'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? isDarkMode 
                    ? 'bg-gray-600 shadow-sm' 
                    : 'bg-white shadow-sm'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => openModal('create-folder')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>New Folder</span>
          </button>

          <button
            onClick={() => openModal('upload-file')}
            className="btn-primary flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Upload</span>
          </button>

          {/* User Avatar */}
          <div className="relative">
            <button className={`w-10 h-10 rounded-full flex items-center justify-center font-medium hover:opacity-90 transition-opacity ${
              isDarkMode 
                ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white' 
                : 'bg-gradient-to-br from-primary-500 to-primary-700 text-white'
            }`}>
              JD
            </button>
          </div>
        </div>
      </div>

      {/* Selection Actions & Status */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={selectAll}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Select All
          </button>
          <button
            onClick={clearSelection}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Clear Selection
          </button>
          {selectedItems.length > 0 && (
            <span className={`text-sm px-3 py-1 rounded ${
              isDarkMode 
                ? 'bg-primary-900 text-primary-300' 
                : 'bg-primary-100 text-primary-700'
            }`}>
              {selectedItems.length} selected
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {folders.length} folders • {files.length} files
          </span>
          <span className={`text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Last updated: {formatDate(new Date().toISOString())}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
