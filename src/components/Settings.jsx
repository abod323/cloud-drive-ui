import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState('en');
  const [storageLimit, setStorageLimit] = useState(15); // GB
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
  ];

  const storageOptions = [5, 10, 15, 25, 50, 100];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Settings
          </h1>
          <p className={`transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage your CloudDrive preferences and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Account & Preferences */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Settings */}
            <div className={`rounded-xl border p-6 transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Account Settings
              </h2>
              
              <div className="space-y-6">
                {/* Profile */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Profile Information
                    </h3>
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Update your personal details and profile picture
                    </p>
                  </div>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    Edit Profile
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Two-Factor Authentication
                    </h3>
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      twoFactorAuth 
                        ? isDarkMode ? 'bg-primary-600' : 'bg-primary-500'
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Language */}
                <div>
                  <h3 className={`font-medium mb-3 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Language
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-4 py-3 rounded-lg text-left transition-colors ${
                          language === lang.code
                            ? isDarkMode
                              ? 'bg-primary-900 text-primary-300'
                              : 'bg-primary-50 text-primary-700'
                            : isDarkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className={`rounded-xl border p-6 transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Preferences
              </h2>
              
              <div className="space-y-6">
                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Theme
                    </h3>
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Switch between light and dark mode
                    </p>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span>{isDarkMode ? '🌙' : '☀️'}</span>
                    <span>{isDarkMode ? 'Dark' : 'Light'}</span>
                  </button>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Notifications
                    </h3>
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Receive alerts for file updates and shares
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications 
                        ? isDarkMode ? 'bg-primary-600' : 'bg-primary-500'
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Auto-save */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Auto-save
                    </h3>
                    <p className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Automatically save changes to documents
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoSave(!autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoSave 
                        ? isDarkMode ? 'bg-primary-600' : 'bg-primary-500'
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Storage & Actions */}
          <div className="space-y-8">
            {/* Storage Settings */}
            <div className={`rounded-xl border p-6 transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Storage Settings
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className={`font-medium mb-3 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Storage Limit
                  </h3>
                  <div className="space-y-2">
                    {storageOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setStorageLimit(option)}
                        className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                          storageLimit === option
                            ? isDarkMode
                              ? 'bg-primary-900 text-primary-300'
                              : 'bg-primary-50 text-primary-700'
                            : isDarkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option} GB</span>
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {option === 5 ? 'Free' : `$${option - 5}/month`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-lg transition-colors duration-200 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-medium mb-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Current Usage
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Files
                      </span>
                      <span className={`text-sm font-medium transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        9.8 GB
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Photos
                      </span>
                      <span className={`text-sm font-medium transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        3.2 GB
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Backups
                      </span>
                      <span className={`text-sm font-medium transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        2.0 GB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`rounded-xl border p-6 transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Account Actions
              </h2>
              
              <div className="space-y-4">
                <button className={`w-full px-4 py-3 rounded-lg font-medium text-left transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  Export Data
                </button>
                <button className={`w-full px-4 py-3 rounded-lg font-medium text-left transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  Download Backup
                </button>
                <button className={`w-full px-4 py-3 rounded-lg font-medium text-left transition-colors ${
                  isDarkMode 
                    ? 'text-red-400 hover:bg-red-900/20' 
                    : 'text-red-600 hover:bg-red-50'
                }`}>
                  Delete Account
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button className="btn-primary w-full py-3 font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;