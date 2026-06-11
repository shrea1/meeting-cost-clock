// import { useEffect, useState } from 'react'
// import { useMeeting } from '../hooks/useMeeting'
// import { Clock, Sun, Moon } from 'lucide-react'

// export default function Navbar() {
//   const { state } = useMeeting()
//   const { isRunning } = state
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem('theme') || 'dark' // Default to dark mode as shown in the primary mockup
//   })

//   useEffect(() => {
//     const root = document.documentElement
//     if (theme === 'dark') {
//       root.classList.add('dark')
//     } else {
//       root.classList.remove('dark')
//     }
//     localStorage.setItem('theme', theme)
//   }, [theme])

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
//   }

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 rounded-3xl bg-bg-card/70 border border-line shadow-card backdrop-blur-md transition-all duration-300 hover:border-brand/20">
//       {/* Left side: Brand */}
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full flex items-center justify-center bg-brand/10 border border-brand/20 text-brand">
//           <Clock className="w-5 h-5" />
//         </div>
//         <div>
//           <h1 className="text-lg font-bold text-text-base leading-tight">
//             Meeting Cost Clock
//           </h1>
//           <p className="text-xs text-text-muted">
//             See what time really costs
//           </p>
//         </div>
//       </div>

//       {/* Right side: Controls & Status */}
//       <div className="flex items-center gap-4">
//         {/* Status Badge */}
//         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-bg-secondary/60 border border-line/60">
//           <span className="relative flex h-2 w-2">
//             {isRunning && (
//               <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
//             )}
//             <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-success' : 'bg-warning'}`} />
//           </span>
//           <span className="text-text-muted capitalize">
//             {isRunning ? 'live' : 'paused'}
//           </span>
//         </div>

//         {/* Theme Toggle Button */}
//         <button
//           onClick={toggleTheme}
//           className="w-10 h-10 rounded-full flex items-center justify-center border border-line/80 bg-bg-secondary/40 text-text-base hover:bg-bg-secondary hover:border-brand/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
//           title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
//         >
//           {theme === 'dark' ? (
//             <Sun className="w-4 h-4 transition-transform duration-500 rotate-0 hover:rotate-45" />
//           ) : (
//             <Moon className="w-4 h-4 transition-transform duration-500 hover:rotate-12" />
//           )}
//         </button>
//       </div>
//     </nav>
//   )
// }
