import React from 'react';
import { Tooltip } from 'react-tooltip';

export default function TableRowWithTooltip({ text }) {
  return (
    <div className="flex flex-col justify-center">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="group cursor-pointer relative inline-block">{text}
            <div className="opacity-0 w-28 bg-primary text-white text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-1/2 ml-14 px-3 pointer-events-none">
            {text}
            <svg className="absolute text-gray-950 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
            </div>
        </div>
        </div>
    </div>
  );
}