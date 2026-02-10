import { useFileContext } from '../context/FileContext';
import { useTheme } from '../context/ThemeContext';
import { fileTypeIcons } from '../data/mockData';

const FileCard = ({ file, onContextMenu, openModal }) => {
  const { selectedItems, toggleItemSelection } = useFileContext();
  const { isDarkMode } = useTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getFileIcon = (fileType) => {
    return fileTypeIcons[fileType] || '📄';
  };

  const getFileColor = (fileType) => {
    const colors = {
      pdf: isDarkMode ? 'bg-red-900' : 'bg-red-100',
      doc: isDarkMode ? 'bg-blue-900' : 'bg-blue-100',
      excel: isDarkMode ? 'bg-green-900' : 'bg-green-100',
      ppt: isDarkMode ? 'bg-orange-900' : 'bg-orange-100',
      image: isDarkMode ? 'bg-purple-900' : 'bg-purple-100',
      video: isDarkMode ? 'bg-pink-900' : 'bg-pink-100',
      audio: isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100',
      zip: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
      figma: isDarkMode ? 'bg-pink-800' : 'bg-pink-50',
      ai: isDarkMode ? 'bg-orange-800' : 'bg-orange-50',
    };
    return colors[fileType] || (isDarkMode ? 'bg-gray-700' : 'bg-gray-100');
  };

  const isSelected = selectedItems.includes(file.id);

  return (
    <div
      className={`p-4 hover:shadow-medium transition-all duration-200 cursor-pointer group rounded-xl ${
        isSelected 
          ? 'ring-2 ring-primary-500 ring-offset-2' 
          : ''
      } ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey) {
          toggleItemSelection(file.id);
        }
      }}
      onDoubleClick={() => openModal && openModal('preview', { ...file, type: 'file' })}
      onContextMenu={(e) => onContextMenu(e, file)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${getFileColor(file.fileType)} rounded-lg flex items-center justify-center`}>
          <span className="text-2xl">{getFileIcon(file.fileType)}</span>
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className={`p-1 rounded transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-600' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleItemSelection(file.id)}
            className={`w-4 h-4 rounded focus:ring-primary-500 ${
              isDarkMode 
                ? 'text-primary-500 bg-gray-700 border-gray-600' 
                : 'text-primary-600 bg-white border-gray-300'
            }`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <h3 className={`font-semibold truncate mb-1 transition-colors duration-200 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {file.name}
      </h3>
      
      <div className="flex items-center justify-between text-sm mb-2">
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          {file.size}
        </span>
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          {formatDate(file.uploaded)}
        </span>
      </div>
      
      <div className={`mt-3 pt-3 border-t transition-colors duration-200 ${
        isDarkMode ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <span className="text-xs">👤</span>
            </div>
            <span className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              You
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className={`p-1 rounded transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-primary-400 hover:bg-gray-600' 
                : 'text-gray-400 hover:text-primary-600 hover:bg-gray-100'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <button className={`p-1 rounded transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-primary-400 hover:bg-gray-600' 
                : 'text-gray-400 hover:text-primary-600 hover:bg-gray-100'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;