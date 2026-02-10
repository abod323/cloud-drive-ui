import { useState, useRef, useEffect } from 'react';

const useDragAndDrop = (onFilesDrop) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const dropRef = useRef(null);

  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter(prev => prev + 1);
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter(prev => prev - 1);
      if (dragCounter <= 1) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setDragCounter(0);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        onFilesDrop(files);
        e.dataTransfer.clearData();
      }
    };

    const div = dropRef.current;
    if (div) {
      div.addEventListener('dragenter', handleDragEnter);
      div.addEventListener('dragleave', handleDragLeave);
      div.addEventListener('dragover', handleDragOver);
      div.addEventListener('drop', handleDrop);
    }

    // Also handle global drag events to prevent browser default behavior
    const handleGlobalDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleGlobalDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('dragover', handleGlobalDragOver);
    document.addEventListener('drop', handleGlobalDrop);

    return () => {
      if (div) {
        div.removeEventListener('dragenter', handleDragEnter);
        div.removeEventListener('dragleave', handleDragLeave);
        div.removeEventListener('dragover', handleDragOver);
        div.removeEventListener('drop', handleDrop);
      }
      document.removeEventListener('dragover', handleGlobalDragOver);
      document.removeEventListener('drop', handleGlobalDrop);
    };
  }, [dragCounter, onFilesDrop]);

  return { isDragging, dropRef };
};

export default useDragAndDrop;