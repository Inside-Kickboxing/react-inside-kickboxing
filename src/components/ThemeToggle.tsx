import { useTheme } from './themeProvider';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return <button onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'} Mode</button>;
};

export default ThemeToggle;
