import { useState, useEffect, useRef } from 'react';
import { useFileContext } from '../context/FileContext';
import { useTheme } from '../context/ThemeContext';
import { fileTypeIcons } from '../data/mockData';

const Modal = ({ type, data, onClose }) => {
  const { addFolder, addFile, renameItem, deleteItem } = useFileContext();
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (type === 'rename' && data) {
      setInputValue(data.name);
    } else if (type === 'create-folder') {
      setInputValue('New Folder');
    }
  }, [type, data]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    switch (type) {
      case 'create-folder':
        if (inputValue.trim()) {
          addFolder(inputValue.trim());
          onClose();
        }
        break;
        
      case 'rename':
        if (inputValue.trim() && data) {
          renameItem(data.id, inputValue.trim(), data.type);
          onClose();
        }
        break;
        
      case 'upload-file':
        if (selectedFile) {
          const fileData = {
            name: selectedFile.name,
            fileType: getFileType(selectedFile.name),
            size: formatFileSize(selectedFile.size),
          };
          addFile(fileData);
          onClose();
        }
        break;
        
      case 'delete':
        if (data) {
          if (data.type === 'multiple') {
            // Delete multiple items
            data.ids.forEach(id => {
              // In a real app, we'd need to determine type from ID
              // For now, we'll handle this in the context
            });
          } else {
            deleteItem(data.id, data.type);
          }
          onClose();
        }
        break;
        
      default:
        onClose();
    }
  };

  const getFileType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const fileTypes = {
      pdf: 'pdf',
      doc: 'doc',
      docx: 'doc',
      xls: 'excel',
      xlsx: 'excel',
      ppt: 'ppt',
      pptx: 'ppt',
      jpg: 'image',
      jpeg: 'image',
      png: 'image',
      gif: 'image',
      mp4: 'video',
      mov: 'video',
      mp3: 'audio',
      wav: 'audio',
      zip: 'zip',
      rar: 'zip',
      fig: 'figma',
      ai: 'ai',
    };
    return fileTypes[extension] || 'file';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getFileIcon = (fileType) => {
    return fileTypeIcons[fileType] || '📄';
  };

  const handleDownload = (fileData) => {
    // Mock download functionality
    console.log(`Downloading file: ${fileData.name}`);
    
    // Create a mock download link
    const blob = new Blob([`Mock content for ${fileData.name}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileData.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert(`Download started for "${fileData.name}"`);
  };

  const [showViewer, setShowViewer] = useState(false);

  const handleOpen = (fileData, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // Show the file viewer (modal will be hidden but not closed)
    setShowViewer(true);
  };

  const FileViewer = ({ fileData, onClose }) => {
    const renderViewerContent = () => {
      switch (fileData.fileType) {
        case 'image':
          return (
            <div className="space-y-4">
              <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className={`w-64 h-64 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <span className="text-8xl">🖼️</span>
                    </div>
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      PNG
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  Zoom In
                </button>
                <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  Zoom Out
                </button>
                <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  Rotate
                </button>
                <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-primary-600 hover:bg-primary-700'} text-white`}>
                  Full Screen
                </button>
              </div>
            </div>
          );
        
        case 'pdf':
          return (
            <div className="space-y-4">
              <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className={`w-64 h-80 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <span className="text-8xl">📕</span>
                    </div>
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      Page 1/10
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    ← Previous
                  </button>
                  <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    Next →
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Zoom: 100%</span>
                  <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          );
        
        case 'video':
          return (
            <div className="space-y-4">
              <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className={`w-80 h-48 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-black'}`}>
                      <span className="text-8xl">🎬</span>
                    </div>
                    <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-800'} bg-opacity-80`}>
                      <span className="text-white">⏯️</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>00:00</span>
                  <div className="flex-1 mx-4">
                    <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <div className="w-1/3 h-full rounded-full bg-primary-500"></div>
                    </div>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>05:30</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    ⏪
                  </button>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    ⏯️
                  </button>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    ⏩
                  </button>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    🔊
                  </button>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-primary-600 hover:bg-primary-700'} text-white`}>
                    Full Screen
                  </button>
                </div>
              </div>
            </div>
          );
        
        default:
          return (
            <div className="space-y-4">
              <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
                <div className="flex items-center justify-center">
                  <div className={`w-64 h-64 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <span className="text-8xl">{getFileIcon(fileData.fileType)}</span>
                  </div>
                </div>
              </div>
              <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  This file type cannot be previewed in the browser.
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Click "Download" to save the file and open it with a compatible application.
                </p>
              </div>
            </div>
          );
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
        <div className={`rounded-2xl shadow-xl w-full max-w-2xl animate-slide-up ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">File Viewer</h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {fileData.name} • {fileData.size}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {renderViewerContent()}
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleDownload(fileData)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  Download
                </button>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={onClose}
                    className={`px-4 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Mock share functionality
                      alert(`Sharing "${fileData.name}"`);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-primary-600 hover:bg-primary-700'} text-white`}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getModalConfig = () => {
    const configs = {
      'create-folder': {
        title: 'Create New Folder',
        description: 'Enter a name for the new folder.',
        buttonText: 'Create Folder',
        buttonColor: 'bg-primary-600 hover:bg-primary-700',
      },
      'rename': {
        title: 'Rename',
        description: `Enter a new name for "${data?.name || 'item'}".`,
        buttonText: 'Rename',
        buttonColor: 'bg-primary-600 hover:bg-primary-700',
      },
      'upload-file': {
        title: 'Upload File',
        description: 'Select a file to upload.',
        buttonText: 'Upload',
        buttonColor: 'bg-primary-600 hover:bg-primary-700',
      },
      'delete': {
        title: data?.type === 'multiple' ? 'Delete Items' : 'Delete Item',
        description: data?.type === 'multiple' 
          ? `Are you sure you want to delete ${data.ids.length} selected items? This action cannot be undone.`
          : `Are you sure you want to delete "${data?.name || 'this item'}"? This action cannot be undone.`,
        buttonText: 'Delete',
        buttonColor: 'bg-red-600 hover:bg-red-700',
      },
      'details': {
        title: 'Details',
        description: 'View details about this item.',
        buttonText: 'Close',
        buttonColor: 'bg-gray-600 hover:bg-gray-700',
      },
      'preview': {
        title: 'File Preview',
        description: '',
        buttonText: 'Close',
        buttonColor: 'bg-gray-600 hover:bg-gray-700',
      },
    };
    
    return configs[type] || { title: 'Modal', description: '', buttonText: 'Confirm', buttonColor: 'bg-primary-600 hover:bg-primary-700' };
  };

  const config = getModalConfig();

  return (
    <>
      {showViewer && data && (
        <FileViewer 
          fileData={data} 
          onClose={() => setShowViewer(false)} 
        />
      )}
      
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-backdrop">
      <div 
        ref={modalRef}
        className={`rounded-2xl shadow-xl w-full max-w-md animate-slide-up ${
          isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{config.title}</h2>
            <button
              onClick={onClose}
              className={`p-1 rounded-full transition-colors ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className={`mb-6 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {config.description}
          </p>

          <form onSubmit={handleSubmit}>
            {(type === 'create-folder' || type === 'rename') && (
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                  autoFocus
                  onFocus={(e) => {
                    if (type === 'create-folder') {
                      e.target.select();
                    }
                  }}
                />
              </div>
            )}

            {type === 'upload-file' && (
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Choose File
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 hover:border-primary-500' 
                    : 'border-gray-300 hover:border-primary-500'
                }`}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-primary-900' : 'bg-primary-100'
                  }`}>
                    <span className="text-2xl">📄</span>
                  </div>
                  <p className={`mb-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Drag and drop files here or
                  </p>
                  <label className={`btn-primary cursor-pointer inline-block ${
                    isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : ''
                  }`}>
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
                        }`}>
                          <span className="text-lg">📄</span>
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium truncate transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {selectedFile.name}
                          </p>
                          <p className={`text-sm transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(type === 'details' || type === 'preview') && data && (
              <div className="mb-6 space-y-4">
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    data.type === 'folder' 
                      ? isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <span className="text-2xl">
                      {data.type === 'folder' ? '📁' : getFileIcon(data.fileType)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{data.name}</p>
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {data.type === 'folder' ? 'Folder' : `${data.fileType?.toUpperCase()} File`}
                    </p>
                  </div>
                </div>

                {type === 'preview' && data.type === 'file' && (
                  <div className={`rounded-lg p-4 text-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-6xl">{getFileIcon(data.fileType)}</span>
                    </div>
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {data.fileType === 'image' 
                        ? 'Image preview would appear here' 
                        : 'Preview not available for this file type'
                      }
                    </p>
                    <p className={`text-xs mt-2 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {data.fileType === 'image'
                        ? 'Click "Open" to view in image viewer'
                        : 'Click "Open" to view the file'
                      }
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Size
                    </p>
                    <p className="font-medium">{data.size || '0 KB'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Type
                    </p>
                    <p className="font-medium">{data.type === 'folder' ? 'Folder' : 'File'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Created
                    </p>
                    <p className="font-medium">
                      {new Date(data.uploaded || data.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Modified
                    </p>
                    <p className="font-medium">
                      {new Date(data.lastModified || data.uploaded).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {type === 'preview' && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center space-x-3">
                      <button 
                        onClick={() => handleDownload(data)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        Download
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => handleOpen(data, e)}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              {type !== 'preview' && (
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Cancel
                </button>
              )}
              <button
                type={type === 'preview' ? 'button' : 'submit'}
                onClick={type === 'preview' ? onClose : undefined}
                className={`px-6 py-2 text-white font-medium rounded-lg transition-colors ${config.buttonColor}`}
              >
                {config.buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Modal;
