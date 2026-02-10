import { useFileContext } from '../context/FileContext';
import { useTheme } from '../context/ThemeContext';
import FolderCard from './FolderCard';
import FileCard from './FileCard';
import FileListItem from './FileListItem';
import FolderListItem from './FolderListItem';

const MainContent = ({ onContextMenu, openModal }) => {
  const { folders, files, viewMode, selectedItems } = useFileContext();
  const { isDarkMode } = useTheme();

  const isEmpty = folders.length === 0 && files.length === 0;

  if (isEmpty) {
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-md mx-auto text-center py-12">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
              : 'bg-gradient-to-br from-gray-100 to-gray-200'
          }`}>
            <span className="text-5xl">📁</span>
          </div>
          <h2 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Your drive is empty
          </h2>
          <p className={`mb-6 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Upload files or create folders to get started. Your files will appear here.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => openModal('upload-file')}
              className="btn-primary"
            >
              Upload Files
            </button>
            <button
              onClick={() => openModal('create-folder')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Create Folder
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        {/* Folders Section */}
        {folders.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Folders
              </h2>
              <span className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {folders.length} folders
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {folders.map((folder) => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  onContextMenu={onContextMenu}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Files Section */}
        {files.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Files
              </h2>
              <span className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {files.length} files
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onContextMenu={onContextMenu}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Selection Info */}
        {selectedItems.length > 0 && (
          <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-4 ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700 text-gray-100' 
              : 'bg-gray-900 text-white'
          }`}>
            <span className="font-medium">{selectedItems.length} items selected</span>
            <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                // Mock download for multiple files
                alert(`Downloading ${selectedItems.length} selected files`);
              }}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Download
            </button>
              <button 
                onClick={() => openModal('delete', { type: 'multiple', ids: selectedItems })}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
              >
                Delete
              </button>
              <button className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // List View
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-w-full">
        {/* Table Header */}
        <div className={`border-b px-6 py-3 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <span className={`text-sm font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Name
              </span>
            </div>
            <div className="col-span-2">
              <span className={`text-sm font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Size
              </span>
            </div>
            <div className="col-span-3">
              <span className={`text-sm font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Last Modified
              </span>
            </div>
            <div className="col-span-2">
              <span className={`text-sm font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Actions
              </span>
            </div>
          </div>
        </div>

        {/* Folders in List View */}
        {folders.map((folder) => (
          <FolderListItem
            key={folder.id}
            folder={folder}
            onContextMenu={onContextMenu}
          />
        ))}

        {/* Files in List View */}
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
            onContextMenu={onContextMenu}
          />
        ))}
      </div>

      {/* Selection Info */}
      {selectedItems.length > 0 && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-4 ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700 text-gray-100' 
            : 'bg-gray-900 text-white'
        }`}>
          <span className="font-medium">{selectedItems.length} items selected</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                // Mock download for multiple files
                alert(`Downloading ${selectedItems.length} selected files`);
              }}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Download
            </button>
            <button 
              onClick={() => openModal('delete', { type: 'multiple', ids: selectedItems })}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              Delete
            </button>
            <button className={`transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-white'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;