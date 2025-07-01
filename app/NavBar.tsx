'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const links = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Issues', url: '/issues' },
  ]
  const path = usePathname()
  return (
    <nav className="flex p-4 gap-6 border-b-[1px] border-zinc-600">
      <Link href="/">Logo</Link>
      <ul className="flex gap-4 text-zinc-500">
        {links.map(link => (
          <li
            key={link.url}
            className={clsx(
              path === link.url && 'text-zinc-800',
              'hover:text-zinc-800',
            )}
          >
            <Link href={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
