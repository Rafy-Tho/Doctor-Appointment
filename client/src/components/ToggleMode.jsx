import { useEffect, useState } from 'react';

function ToggleMode() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark',
  );

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="
        flex items-center gap-2
        rounded-full px-4 py-2
        bg-gray-200 dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        transition-all duration-300
      "
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

export default ToggleMode;
