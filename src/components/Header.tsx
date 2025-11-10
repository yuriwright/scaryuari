'use client' 

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { totalItems } = useCart()

    return (
        <nav className="bg-stone-950 border-b border-stone-800">
            <div className="flex items-center justify-between px-5 py-3">
                <Link 
                    href="/"
                    className="text-red-600 font-mono text-xl hover:text-red-500 transition-colors"
                >
                    scary uari
                </Link>
            
            <div className="flex items-center gap-4">
                {/* Cart Icon with Badge */}
                <Link 
                    href="/cart"
                    className="relative text-red-600 hover:text-red-500 transition-colors"
                    aria-label={`Cart with ${totalItems} items`}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-6 h-6"
                    >
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>

                {/* Dropdown menu button */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-black hover:bg-stone-800 p-2 rounded transition-colors"
                        aria-expanded={isOpen}
                        aria-label="Menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="red"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l.53-.53c-.771-.802-1.328-1.58-1.704-2.32-.798-1.575-.775-2.996-.213-4.092C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182a22 22 0 0 1-2.685-2.062l-.539.54V14a.5.5 0 0 1-.146.354zm2.893-4.894A20.4 20.4 0 0 0 8 12.71c2.456-1.666 3.827-3.207 4.489-4.512.679-1.34.607-2.42.215-3.185-.817-1.595-3.087-2.054-4.346-.761L8 4.62l-.358-.368c-1.259-1.293-3.53-.834-4.346.761-.392.766-.464 1.845.215 3.185.323.636.815 1.33 1.519 2.065l1.866-1.867a.5.5 0 1 1 .708.708z"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                            <ul className="absolute right-0 mt-2 w-48 bg-black border border-stone-800 rounded shadow-lg z-20">
                                <li>
                                    <Link
                                        href="/"
                                        className="block px-4 py-2 text-red-600 font-mono hover:bg-stone-900 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="block px-4 py-2 text-red-600 font-mono hover:bg-stone-900 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        about
                                    </Link>
                                </li>
                                <li>
                                    <hr className="border-stone-800" />
                                </li>
                                <li>
                                    <Link
                                        href="/merch"
                                        className="block px-4 py-2 text-red-600 font-mono hover:bg-stone-900 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        other merch
                                    </Link>
                                </li>
                                <li>
                                    <hr className="border-stone-800" />
                                </li>
                            
                            </ul>
                        </>
                    )}
                </div>
            </div>
            </div>
        </nav>
    )
}