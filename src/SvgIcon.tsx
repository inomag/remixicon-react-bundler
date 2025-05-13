import React, { useEffect, useState } from "react";
import { IconName } from './types';

interface IconProps {
  icon: IconName;
  size?: number | string;
  color?: string[];
}

export const SvgIcon: React.FC<IconProps> = ({ icon, size = 24, color = ["currentColor"] }) => {
  const [IconContent, setIconContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const iconModule = await import(
          /* webpackChunkName: "[request]" */ `./icons/${icon.replace(/^[0-9]/, '_$&').replace(/-/g, '_')}.ts`
        );
        setIconContent(iconModule.default);
      } catch (e) {
        console.error(`Error loading icon: ${icon}`, e);
        setError("Icon not found!");
      }
    };

    loadIcon();
  }, [icon]);

  if (error) {
    return <span>{error}</span>;
  }
  if(!IconContent){
    return <span>No Icon Found!</span>
  }

  const matches = IconContent.match(/<path[^>]*d="([^"]+)"[^>]*>/g);
  const paths = matches?.map((path: any) => path.match(/d="([^"]+)"/)?.[1] || "") ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {paths.map((d, i) => (
        <path key={i} d={d} fill={color[i] || "none"} />
      ))}
    </svg>
  );
};
