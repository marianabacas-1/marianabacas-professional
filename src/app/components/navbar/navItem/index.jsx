import Link from 'next/link'

export default function NavItem({ href, navText, icon, onClick, className, pathMatch }) {
  return (
    <Link href={href} className={`mx-2 w-11/12 flex gap-2 rounded-2xl py-2 px-3 flex items-center text-gray-700 ${pathMatch ? 'text-md bg-primary text-white' : 'hover:bg-primary hover:text-white'}`}>
      <span className="bg-secondary p-1 rounded-lg flex items-center text-white">{icon}</span>
      <span className="w-full grid justify-start text-sm">{navText}</span>
    </Link>
  )
}