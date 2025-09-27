import React from 'react';

export default function WebContainer({ children, className }) {

  return (
    <div className={className ? className + "lg:px-16 space-y-12 lg:space-y-16" : "py-12 lg:py-16 lg:px-16 space-y-12 lg:space-y-16"}>
      {children}
    </div>
  )
}
