import { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { mockFolders, mockFiles } from '../data/mockData';

const FileContext = createContext();

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};

export const FileProvider = ({ children }) => {
  const [folders, setFolders] = useState(mockFolders);
  const [files, setFiles] = useState(mockFiles);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPath, setCurrentPath] = useState(['Drive', 'Projects', 'UI']);
  const [currentView, setCurrentView] = useState('my-drive'); // 'my-drive', 'recent', 'shared', 'starred', 'trash'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'date', 'size', 'type'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [filterType, setFilterType] = useState('all'); // 'all', 'folders', 'files', 'pdf', 'image', etc.
  const [searchQuery, setSearchQuery] = useState('');

  // Generate content based on current path/view
  const getCurrentContent = useCallback(() => {
    const pathView = currentPath[0];
    
    // Different content for different views
    switch(pathView) {
      case 'Recent':
        // Show only files, sorted by date (most recent first)
        const recentFiles = [...files]
          .sort((a, b) => new Date(b.uploaded || b.lastModified) - new Date(a.uploaded || a.lastModified))
          .slice(0, 8); // Show only 8 most recent files
        
        return {
          folders: [], // No folders in Recent view
          files: recentFiles
        };
      
      case 'Shared':
        // Show shared files (mock data - in real app would have shared flag)
        const sharedFiles = [...files].slice(0, 6).map(file => ({
          ...file,
          name: `[Shared] ${file.name}`
        }));
        
        return {
          folders: [...folders].slice(0, 2).map(folder => ({
            ...folder,
            name: `[Shared] ${folder.name}`
          })),
          files: sharedFiles
        };
      
      case 'Starred':
        // Show starred items (mock data)
        const starredFiles = [...files].slice(2, 6).map(file => ({
          ...file,
          name: `⭐ ${file.name}`
        }));
        
        return {
          folders: [...folders].slice(1, 3).map(folder => ({
            ...folder,
            name: `⭐ ${folder.name}`
          })),
          files: starredFiles
        };
      
      case 'Trash':
        // Show deleted items (mock data)
        const deletedFiles = [...files].slice(4, 8).map(file => ({
          ...file,
          name: `🗑️ ${file.name}`,
          fileType: 'deleted'
        }));
        
        return {
          folders: [...folders].slice(3, 5).map(folder => ({
            ...folder,
            name: `🗑️ ${folder.name}`,
            color: 'bg-gray-100'
          })),
          files: deletedFiles
        };
      
      default:
        // My Drive or folder navigation
        const currentFolder = currentPath[currentPath.length - 1];
        
        // Different content for different folders
        switch(currentFolder) {
          case 'Projects':
            return {
              folders: [
                { id: 'subfolder-1', name: 'Frontend', type: 'folder', lastModified: '2024-02-08T10:30:00Z', size: '1.2 GB', items: 8, color: 'bg-blue-100' },
                { id: 'subfolder-2', name: 'Backend', type: 'folder', lastModified: '2024-02-07T14:20:00Z', size: '856 MB', items: 12, color: 'bg-green-100' },
                { id: 'subfolder-3', name: 'Documentation', type: 'folder', lastModified: '2024-02-06T09:15:00Z', size: '324 MB', items: 5, color: 'bg-purple-100' },
              ],
              files: [
                { id: 'project-file-1', name: 'Project Plan.pdf', type: 'file', fileType: 'pdf', size: '3.2 MB', uploaded: '2024-02-08T09:45:00Z', lastModified: '2024-02-08T09:45:00Z' },
                { id: 'project-file-2', name: 'Requirements.docx', type: 'file', fileType: 'doc', size: '1.8 MB', uploaded: '2024-02-07T11:20:00Z', lastModified: '2024-02-07T11:20:00Z' },
                { id: 'project-file-3', name: 'Architecture Diagram.png', type: 'file', fileType: 'image', size: '5.6 MB', uploaded: '2024-02-06T15:45:00Z', lastModified: '2024-02-06T15:45:00Z' },
              ]
            };
          
          case 'Design Assets':
            return {
              folders: [
                { id: 'design-subfolder-1', name: 'Icons', type: 'folder', lastModified: '2024-02-07T10:30:00Z', size: '456 MB', items: 24, color: 'bg-yellow-100' },
                { id: 'design-subfolder-2', name: 'UI Components', type: 'folder', lastModified: '2024-02-06T14:20:00Z', size: '789 MB', items: 18, color: 'bg-pink-100' },
              ],
              files: [
                { id: 'design-file-1', name: 'Logo Pack.zip', type: 'file', fileType: 'zip', size: '45.2 MB', uploaded: '2024-02-07T16:15:00Z', lastModified: '2024-02-07T16:15:00Z' },
                { id: 'design-file-2', name: 'Color Palette.sketch', type: 'file', fileType: 'figma', size: '12.8 MB', uploaded: '2024-02-06T10:30:00Z', lastModified: '2024-02-06T10:30:00Z' },
                { id: 'design-file-3', name: 'Typography Guide.pdf', type: 'file', fileType: 'pdf', size: '8.4 MB', uploaded: '2024-02-05T14:45:00Z', lastModified: '2024-02-05T14:45:00Z' },
                { id: 'design-file-4', name: 'Mockups.fig', type: 'file', fileType: 'figma', size: '32.1 MB', uploaded: '2024-02-04T11:20:00Z', lastModified: '2024-02-04T11:20:00Z' },
              ]
            };
          
          case 'Documents':
            return {
              folders: [
                { id: 'docs-subfolder-1', name: 'Contracts', type: 'folder', lastModified: '2024-02-06T10:30:00Z', size: '156 MB', items: 8, color: 'bg-red-100' },
                { id: 'docs-subfolder-2', name: 'Reports', type: 'folder', lastModified: '2024-02-05T14:20:00Z', size: '289 MB', items: 12, color: 'bg-blue-100' },
              ],
              files: [
                { id: 'doc-file-1', name: 'Annual Report 2023.pdf', type: 'file', fileType: 'pdf', size: '15.2 MB', uploaded: '2024-02-06T09:45:00Z', lastModified: '2024-02-06T09:45:00Z' },
                { id: 'doc-file-2', name: 'Employee Handbook.docx', type: 'file', fileType: 'doc', size: '8.7 MB', uploaded: '2024-02-05T11:20:00Z', lastModified: '2024-02-05T11:20:00Z' },
                { id: 'doc-file-3', name: 'Financial Statements.xlsx', type: 'file', fileType: 'excel', size: '6.3 MB', uploaded: '2024-02-04T16:15:00Z', lastModified: '2024-02-04T16:15:00Z' },
                { id: 'doc-file-4', name: 'Meeting Minutes.pptx', type: 'file', fileType: 'ppt', size: '12.8 MB', uploaded: '2024-02-03T10:30:00Z', lastModified: '2024-02-03T10:30:00Z' },
              ]
            };
          
          default:
            // Root level or unknown folder - show all items
            return {
              folders: [...folders],
              files: [...files]
            };
        }
    }
  }, [currentPath, folders, files]);

  // Sort and filter logic
  const sortedAndFilteredFolders = useMemo(() => {
    const currentContent = getCurrentContent();
    let filtered = [...currentContent.folders];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(folder => 
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== 'all' && filterType !== 'folders') {
      return []; // If filtering by specific file type, no folders should show
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.lastModified);
          bValue = new Date(b.lastModified);
          break;
        case 'size':
          aValue = parseSize(a.size);
          bValue = parseSize(b.size);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [getCurrentContent, sortBy, sortOrder, filterType, searchQuery]);

  const sortedAndFilteredFiles = useMemo(() => {
    const currentContent = getCurrentContent();
    let filtered = [...currentContent.files];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      if (filterType === 'folders') {
        return []; // If filtering by folders only, no files should show
      } else if (filterType !== 'files') {
        filtered = filtered.filter(file => file.fileType === filterType);
      }
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.uploaded || a.lastModified);
          bValue = new Date(b.uploaded || b.lastModified);
          break;
        case 'size':
          aValue = parseSize(a.size);
          bValue = parseSize(b.size);
          break;
        case 'type':
          aValue = a.fileType || 'file';
          bValue = b.fileType || 'file';
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [getCurrentContent, sortBy, sortOrder, filterType, searchQuery]);

  // Helper function to parse size strings like "2.5 MB" to bytes
  const parseSize = (sizeString) => {
    if (!sizeString) return 0;
    
    const units = {
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
    };
    
    const match = sizeString.match(/^([\d.]+)\s*([KMG]?B)$/i);
    if (!match) return 0;
    
    const [, value, unit] = match;
    const unitKey = unit.toUpperCase();
    return parseFloat(value) * (units[unitKey] || 1);
  };

  const addFolder = useCallback((name) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      lastModified: new Date().toISOString(),
      size: '0 KB',
      items: 0,
    };
    setFolders(prev => [...prev, newFolder]);
  }, []);

  const addFile = useCallback((fileData) => {
    const newFile = {
      id: `file-${Date.now()}`,
      ...fileData,
      type: 'file',
      uploaded: new Date().toISOString(),
    };
    setFiles(prev => [...prev, newFile]);
  }, []);

  const renameItem = useCallback((id, newName, type) => {
    if (type === 'folder') {
      setFolders(prev => prev.map(folder => 
        folder.id === id ? { ...folder, name: newName } : folder
      ));
    } else {
      setFiles(prev => prev.map(file => 
        file.id === id ? { ...file, name: newName } : file
      ));
    }
  }, []);

  const deleteItem = useCallback((id, type) => {
    if (type === 'folder') {
      setFolders(prev => prev.filter(folder => folder.id !== id));
    } else {
      setFiles(prev => prev.filter(file => file.id !== id));
    }
    // Remove from selected items if present
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  }, []);

  const toggleItemSelection = useCallback((id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    const allIds = [...sortedAndFilteredFolders.map(f => f.id), ...sortedAndFilteredFiles.map(f => f.id)];
    setSelectedItems(allIds);
  }, [sortedAndFilteredFolders, sortedAndFilteredFiles]);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const setSorting = useCallback((field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy]);

  const setFilter = useCallback((type) => {
    setFilterType(type);
  }, []);

  const setSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const navigateToFolder = useCallback((folderName) => {
    setCurrentView('my-drive');
    setCurrentPath(prev => [...prev, folderName]);
  }, [setCurrentView, setCurrentPath]);

  const navigateUp = useCallback(() => {
    setCurrentPath(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  const navigateToPath = useCallback((index) => {
    setCurrentPath(prev => prev.slice(0, index + 1));
  }, []);

  const value = {
    folders: sortedAndFilteredFolders,
    files: sortedAndFilteredFiles,
    selectedItems,
    viewMode,
    currentPath,
    currentView,
    sortBy,
    sortOrder,
    filterType,
    searchQuery,
    setViewMode,
    setCurrentPath,
    setCurrentView,
    setSorting,
    setFilter,
    setSearch,
    addFolder,
    addFile,
    renameItem,
    deleteItem,
    toggleItemSelection,
    selectAll,
    clearSelection,
    navigateToFolder,
    navigateUp,
    navigateToPath,
  };

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};