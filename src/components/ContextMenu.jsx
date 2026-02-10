import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ContextMenu = ({ x, y, item, onClose, openModal }) => {
  const menuRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleAction = (action) => {
    switch (action) {
      case 'rename':
        openModal('rename', item);
        break;
      case 'delete':
        openModal('delete', item);
        break;
      case 'move':
        openModal('move', item);
        break;
      case 'details':
        openModal('details', item);
        break;
      case 'preview':
        openModal('preview', item);
        break;
      case 'download':
        console.log(`Downloading ${item.name}`);
        break;
      case 'share':
        openModal('share', item);
        break;
      case 'star':
        console.log(`Starring ${item.name}`);
        break;
      default:
        break;
    }
    onClose();
  };

  const menuItems = [
    { id: 'open', label: 'Open', icon: '📂', action: () => console.log(`Opening ${item.name}`) },
    { id: 'preview', label: 'Preview', icon: '👁️', action: () => handleAction('preview') },
    { id: 'download', label: 'Download', icon: '⬇️', action: () => handleAction('download') },
    { id: 'rename', label: 'Rename', icon: '✏️', action: () => handleAction('rename') },
    { id: 'move', label: 'Move to', icon: '📦', action: () => handleAction('move') },
    { id: 'share', label: 'Share', icon: '👥', action: () => handleAction('share') },
    { id: 'star', label: 'Add to Starred', icon: '⭐', action: () => handleAction('star') },
    { id: 'details', label: 'Details', icon: 'ℹ️', action: () => handleAction('details') },
    { id: 'divider-1', type: 'divider' },
    { id: 'delete', label: 'Delete', icon: '🗑️', action: () => handleAction('delete'), danger: true },
  ];

  // Adjust position if menu would go off-screen
  const menuWidth = 240;
  const menuHeight = 400;
  const adjustedX = x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth - 10 : x;
  const adjustedY = y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight - 10 : y;

  return (
    <div
      ref={menuRef}
      className={`fixed z-50 rounded-xl shadow-lg border py-2 animate-fade-in ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
      style={{
        left: adjustedX,
        top: adjustedY,
        minWidth: '240px',
      }}
    >
      <div className={`px-4 py-2 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            item.type === 'folder' 
              ? isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <span className="text-lg">
              {item.type === 'folder' ? '📁' : '📄'}
            </span>
          </div>
          <div>
            <p className={`font-medium truncate max-w-[160px] transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {item.name}
            </p>
            <p className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {item.type === 'folder' ? 'Folder' : item.fileType?.toUpperCase() || 'File'}
            </p>
          </div>
        </div>
      </div>

      <div className="py-1">
        {menuItems.map((menuItem) => {
          if (menuItem.type === 'divider') {
            return (
              <div key={menuItem.id} className={`my-1 ${
                isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'
              }`} />
            );
          }

          return (
            <button
              key={menuItem.id}
              onClick={menuItem.action}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-150 ${
                menuItem.danger 
                  ? isDarkMode 
                    ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' 
                    : 'text-red-600 hover:text-red-700 hover:bg-gray-50'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{menuItem.icon}</span>
              <span className="font-medium">{menuItem.label}</span>
            </button>
          );
        })}
      </div>

      <div className={`px-4 py-2 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className={`text-xs transition-colors duration-200 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {item.type === 'folder' ? (
            <>
              <div>Items: {item.items || 0}</div>
              <div>Size: {item.size || '0 KB'}</div>
            </>
          ) : (
            <>
              <div>Size: {item.size || '0 KB'}</div>
              <div>Modified: {new Date(item.lastModified || item.uploaded).toLocaleDateString()}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;