// src/components/Navigation.js
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/packages">Packages</Link>
      <Link href="/destinations">Destinations</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  )
}
