/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Custom404() {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Implement your search functionality here
    console.log("Search submitted")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="text-xl mb-8 text-center">
        We couldn't find the page you're looking for.
      </p>

      <div className="w-full max-w-md mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search our site..."
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="space-y-4 text-center">
        <p>Here are some helpful links instead:</p>
        <nav className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <Link href="/blog" className="text-primary hover:underline">
            Blog
          </Link>
          <Link href="/about" className="text-primary hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  )
}
