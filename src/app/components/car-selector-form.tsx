'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun } from 'lucide-react'

interface Make {
  MakeId: number
  MakeName: string
}

export function CarSelectorForm({ initialMakes }: { initialMakes: Make[] }) {
  const [makes] = useState<Make[]>(initialMakes)
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i)

  useEffect(() => {
    // Check for user's preference
    if (typeof window !== 'undefined') {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">Car Dealer App</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-secondary"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-primary" />}
        </button>
      </div>
      <div className="space-y-6 bg-card p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="makes" className="block mb-2 text-sm font-medium text-primary">
            Select Vehicle Make:
          </label>
          <select
            id="makes"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="border p-2 w-full rounded-md bg-input text-primary"
          >
            <option value="">-- Select Make --</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-primary">
            Select Model Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 w-full rounded-md bg-input text-primary"
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Link href={`/result/${selectedMake}/${selectedYear}`} className="block">
          <button
            disabled={!selectedMake || !selectedYear}
            className={`w-full px-4 py-2 bg-primary text-primary-foreground rounded-md transition-colors duration-200
              ${!selectedMake || !selectedYear
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary/90"
              }`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  )
}

