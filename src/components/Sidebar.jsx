import { navigationItems } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useFileContext } from '../context/FileContext';

const Sidebar = () => {
  const storageUsed = 65; // percentage
  const storageTotal = 15; // GB
  const { isDarkMode } = useTheme();
  const { setCurrentPath, setFilter, currentView, setCurrentView } = useFileContext();

  return (
    <div className={`w-64 border-r flex flex-col h-full transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-gray-100' 
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      {/* Logo */}
      <div className={`p-6 border-b transition-colors duration-200 ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDarkMode 
              ? 'bg-gradient-to-br from-primary-600 to-primary-800' 
              : 'bg-gradient-to-br from-primary-500 to-primary-700'
          }`}>
            <span className="text-white font-bold text-xl">CD</span>
          </div>
          <div>
            <h1 className={`text-xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              CloudDrive
            </h1>
            <p className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Your files, anywhere
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                if (item.id === 'my-drive') {
                  setCurrentPath(['Drive', 'Projects', 'UI']);
                  setFilter('all');
                } else if (item.id === 'recent') {
                  // Show recent files (filter by date)
                  setCurrentPath(['Recent']);
                  setFilter('all');
                } else if (item.id === 'shared') {
                  // Show shared files
                  setCurrentPath(['Shared']);
                  setFilter('all');
                } else if (item.id === 'starred') {
                  // Show starred files
                  setCurrentPath(['Starred']);
                  setFilter('all');
                } else if (item.id === 'trash') {
                  // Show trash/deleted items
                  setCurrentPath(['Trash']);
                  setFilter('all');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                item.id === currentView
                  ? isDarkMode
                    ? 'bg-primary-900 text-primary-300'
                    : 'bg-primary-50 text-primary-700'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.count > 0 && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Storage Indicator */}
        <div className={`mt-8 p-4 rounded-xl transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Storage
            </span>
            <span className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {storageUsed}% used
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className={`w-full rounded-full h-2 mb-3 transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isDarkMode ? 'bg-primary-500' : 'bg-primary-600'
              }`}
              style={{ width: `${storageUsed}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {((storageTotal * storageUsed) / 100).toFixed(1)} GB of {storageTotal} GB
            </span>
            <button className={`text-xs font-medium transition-colors duration-200 ${
              isDarkMode 
                ? 'text-primary-400 hover:text-primary-300' 
                : 'text-primary-600 hover:text-primary-700'
            }`}>
              Upgrade
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 space-y-2">
        <button 
          onClick={() => {
            setCurrentView('settings');
            setCurrentPath(['Settings']);
          }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            currentView === 'settings'
              ? isDarkMode
                ? 'bg-primary-900 text-primary-300'
                : 'bg-primary-50 text-primary-700'
              : isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="text-lg">⚙️</span>
          <span className="font-medium">Settings</span>
        </button>
          <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}>
            <span className="text-lg">🆘</span>
            <span className="font-medium">Help & Support</span>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className={`p-4 border-t transition-colors duration-200 ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-500 to-gray-600' 
              : 'bg-gradient-to-br from-gray-300 to-gray-400'
          }`}>
            <span className="text-white font-medium">JD</span>
          </div>
          <div className="flex-1">
            <p className={`font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              John Doe
            </p>
            <p className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              john@example.com
            </p>
          </div>
          <button className={`transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;