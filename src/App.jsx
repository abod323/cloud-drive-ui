import { useState, useEffect } from 'react';
import { 
  Sidebar, 
  Header, 
  MainContent, 
  ContextMenu, 
  Modal,
  LoadingSkeleton 
} from './components';
import { FileProvider, useFileContext } from './context/FileContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import useDragAndDrop from './hooks/useDragAndDrop';
import './App.css';

// Inner component to use the file context
const AppContent = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: '', data: null });
  const { addFile } = useFileContext();
  const { isDarkMode } = useTheme();

  const handleFilesDrop = (files) => {
    if (files.length > 0) {
      const file = files[0]; // For simplicity, take first file
      const fileData = {
        name: file.name,
        fileType: getFileType(file.name),
        size: formatFileSize(file.size),
      };
      addFile(fileData);
    }
  };

  const { isDragging, dropRef } = useDragAndDrop(handleFilesDrop);

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

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const openModal = (type, data = null) => {
    setModal({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: '', data: null });
  };

  return (
    <>
      <div 
        ref={dropRef}
        className={`min-h-screen transition-colors duration-200 ${
          isDarkMode 
            ? 'dark bg-gray-900 text-gray-100' 
            : 'bg-gray-50 text-gray-900'
        }`}
        onClick={closeContextMenu}
        onContextMenu={(e) => {
          e.preventDefault();
          closeContextMenu();
        }}
      >
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header openModal={openModal} />
            
            {/* Main Content */}
            <MainContent 
              onContextMenu={handleContextMenu}
              openModal={openModal}
            />
          </div>
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            item={contextMenu.item}
            onClose={closeContextMenu}
            openModal={openModal}
          />
        )}

        {/* Modal */}
        {modal.isOpen && (
          <Modal
            type={modal.type}
            data={modal.data}
            onClose={closeModal}
          />
        )}

        {/* Drag Overlay */}
        {isDragging && (
          <div className="fixed inset-0 z-50 bg-primary-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
            <div className={`rounded-2xl shadow-2xl p-8 max-w-md text-center animate-scale-in ${
              isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
            }`}>
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-primary-900' : 'bg-primary-100'
              }`}>
                <span className="text-3xl">📁</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Drop to Upload</h3>
              <p className="mb-4">
                Drop your files here to upload them to CloudDrive
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-lg">📄</span>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-lg">🖼️</span>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-lg">🎬</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex h-screen">
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <LoadingSkeleton />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <FileProvider>
        <AppContent />
      </FileProvider>
    </ThemeProvider>
  );
}

export default App;