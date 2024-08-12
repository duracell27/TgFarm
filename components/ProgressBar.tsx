import React from 'react';

interface ProgressBarProps {
  progress: number; // Відсоткове значення прогресу, має бути в межах 0-100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Перевірка, щоб значення прогресу залишалося в межах від 0 до 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="mx-2">
    <div className="w-full  h-[3px] bg-transparent border-[0.5px] border-gray-600 relative">
      <div
        className="absolute top-0 left-0 h-full bg-yellow-500"
        style={{ width: `${safeProgress}%` }}
      ></div>
    </div></div>
  );
};

export default ProgressBar;