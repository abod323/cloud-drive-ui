import { useFileContext } from '../context/FileContext';
import { fileTypeIcons } from '../data/mockData';

const FileListItem = ({ file, onContextMenu }) => {
  const { selectedItems, toggleItemSelection } = useFileContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileType) => {
    return fileTypeIcons[fileType] || '📄';
  };

  const getFileColor = (fileType) => {
    const colors = {
      pdf: 'bg-red-100',
      doc: 'bg-blue-100',
      excel: 'bg-green-100',
      ppt: 'bg-orange-100',
      image: 'bg-purple-100',
      video: 'bg-pink-100',
      audio: 'bg-yellow-100',
      zip: 'bg-gray-100',
      figma: 'bg-pink-50',
      ai: 'bg-orange-50',
    };
    return colors[fileType] || 'bg-gray-100';
  };

  const isSelected = selectedItems.includes(file.id);

  return (
    <div
      className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
        isSelected ? 'bg-primary-50' : ''
      }`}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey) {
          toggleItemSelection(file.id);
        }
      }}
      onContextMenu={(e) => onContextMenu(e, file)}
    >
      <div className="col-span-5 flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleItemSelection(file.id)}
          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          onClick={(e) => e.stopPropagation()}
        />
        <div className={`w-10 h-10 ${getFileColor(file.fileType)} rounded-lg flex items-center justify-center`}>
          <span className="text-xl">{getFileIcon(file.fileType)}</span>
        </div>
        <div>
          <div className="font-medium text-gray-900">{file.name}</div>
          <div className="text-sm text-gray-500">You • {formatDate(file.uploaded)}</div>
        </div>
      </div>
      
      <div className="col-span-2 flex items-center">
        <span className="text-gray-700">{file.size}</span>
      </div>
      
      <div className="col-span-3 flex items-center">
        <span className="text-gray-700">{formatDate(file.lastModified)}</span>
      </div>
      
      <div className="col-span-2 flex items-center space-x-2">
        <button className="p-1 text-gray-400 hover:text-primary-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button className="p-1 text-gray-400 hover:text-red-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button 
          className="p-1 text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            onContextMenu(e, file);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FileListItem;