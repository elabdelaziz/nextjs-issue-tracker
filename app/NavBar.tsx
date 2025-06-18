'use client'
import clsx from 'clsx';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const NavBar = () => {
  const [isActive, setIsActive] = useState(false)
  const links = [
    {label: 'Dashboard' , url: '/dashboard'},
    {label: 'Issues' , url: '/issues'}
  ]
  const path = usePathname()
  return (
    <nav className="flex p-4 gap-6 border-b-1 border-gray-200">
      <Link href="/">Logo</Link>
      <ul className="flex gap-4 text-zinc-500">
        {links.map((link) => (
          <li
            key={link.url}
            className={clsx(
              path === link.url && "text-zinc-800",
              "hover:text-zinc-800"
            )}
          >
            <Link href={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar