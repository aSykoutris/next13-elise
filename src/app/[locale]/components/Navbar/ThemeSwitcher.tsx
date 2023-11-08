'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/outline';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [isSelected, setIsSelected] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(`${isSelected ? 'light' : 'dark'}`);
  }, [isSelected, setTheme]);

  return (
    <Switch
      defaultSelected
      size='lg'
      color='secondary'
      isSelected={isSelected}
      onValueChange={setIsSelected}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    ></Switch>
  );
}
