import React from 'react';

export const metadata = {
  title: 'Category | E-Commerce',
  description: 'Browse products by category',
};

export default function CategoryLayout({ children,}) {
  return (
   <div>
    {children}
   </div>
  );
}
