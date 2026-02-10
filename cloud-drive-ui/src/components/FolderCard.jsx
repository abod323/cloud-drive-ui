import { useFileContext } from '../context/FileContext';
import { useTheme } from '../context/ThemeContext';

const FolderCard = ({ folder, onContextMenu }) => {
  const { selectedItems, toggleItemSelection, navigateToFolder } = useFileContext();
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

  const isSelected = selectedItems.includes(folder.id);

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
          toggleItemSelection(folder.id);
        }
      }}
      onDoubleClick={() => navigateToFolder(folder.name)}
      onContextMenu={(e) => onContextMenu(e, folder)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          folder.color || (isDarkMode ? 'bg-blue-900' : 'bg-blue-100')
        }`}>
          <span className="text-2xl">📁</span>
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
            onChange={() => toggleItemSelection(folder.id)}
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
        {folder.name}
      </h3>
      
      <div className="flex items-center justify-between text-sm">
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          {folder.items} items
        </span>
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          {formatDate(folder.lastModified)}
        </span>
      </div>
      
      <div className={`mt-3 pt-3 border-t transition-colors duration-200 ${
        isDarkMode ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs transition-colors duration-200 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            {folder.size}
          </span>
          <div className="flex items-center space-x-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <span className="text-xs">👤</span>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <span className="text-xs">👤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;