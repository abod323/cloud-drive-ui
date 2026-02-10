import { useTheme } from '../context/ThemeContext';

const LoadingSkeleton = () => {
  const { isDarkMode } = useTheme();
  
  const skeletonBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const skeletonBorder = isDarkMode ? 'border-gray-700' : 'border-gray-100';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Folders Skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-6 w-32 ${skeletonBg} rounded animate-pulse`}></div>
          <div className={`h-4 w-20 ${skeletonBg} rounded animate-pulse`}></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${cardBg} p-4 rounded-xl border ${skeletonBorder}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${skeletonBg} rounded-lg animate-pulse`}></div>
                <div className="flex items-center space-x-1">
                  <div className={`w-4 h-4 ${skeletonBg} rounded animate-pulse`}></div>
                  <div className={`w-4 h-4 ${skeletonBg} rounded animate-pulse`}></div>
                </div>
              </div>
              <div className={`h-4 ${skeletonBg} rounded mb-2 animate-pulse`}></div>
              <div className="flex items-center justify-between">
                <div className={`h-3 w-16 ${skeletonBg} rounded animate-pulse`}></div>
                <div className={`h-3 w-20 ${skeletonBg} rounded animate-pulse`}></div>
              </div>
              <div className={`mt-3 pt-3 border-t ${skeletonBorder}`}>
                <div className="flex items-center justify-between">
                  <div className={`h-3 w-12 ${skeletonBg} rounded animate-pulse`}></div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-6 h-6 ${skeletonBg} rounded-full animate-pulse`}></div>
                    <div className={`w-6 h-6 ${skeletonBg} rounded-full animate-pulse`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Files Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`h-6 w-24 ${skeletonBg} rounded animate-pulse`}></div>
          <div className={`h-4 w-16 ${skeletonBg} rounded animate-pulse`}></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`${cardBg} p-4 rounded-xl border ${skeletonBorder}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${skeletonBg} rounded-lg animate-pulse`}></div>
                <div className="flex items-center space-x-1">
                  <div className={`w-4 h-4 ${skeletonBg} rounded animate-pulse`}></div>
                  <div className={`w-4 h-4 ${skeletonBg} rounded animate-pulse`}></div>
                </div>
              </div>
              <div className={`h-4 ${skeletonBg} rounded mb-2 animate-pulse`}></div>
              <div className="flex items-center justify-between mb-2">
                <div className={`h-3 w-12 ${skeletonBg} rounded animate-pulse`}></div>
                <div className={`h-3 w-16 ${skeletonBg} rounded animate-pulse`}></div>
              </div>
              <div className={`mt-3 pt-3 border-t ${skeletonBorder}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 ${skeletonBg} rounded-full animate-pulse`}></div>
                    <div className={`h-3 w-8 ${skeletonBg} rounded animate-pulse`}></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-4 h-4 ${skeletonBg} rounded animate-pulse`}></div>
                    <div className={`w-4 h-4 ${skeletonBg} rounded animate-pulse`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;