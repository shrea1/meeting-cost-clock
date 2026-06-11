// import { useEffect, useRef } from 'react'

// export function useInterval(callback, isRunning) {
//   const savedCallback = useRef(callback)
//   const intervalRef = useRef(null)
//   const lastTickTimeRef = useRef(null)

//   // Remember the latest callback if it changes
//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])

//   // Set up the interval
//   useEffect(() => {
//     if (!isRunning) {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//         intervalRef.current = null
//       }
//       lastTickTimeRef.current = null
//       return
//     }

//     lastTickTimeRef.current = Date.now()

//     const checkTick = () => {
//       const now = Date.now()
//       const delta = now - lastTickTimeRef.current
//       if (delta >= 1000) {
//         const secondsElapsed = Math.floor(delta / 1000)
//         savedCallback.current(secondsElapsed)
//         lastTickTimeRef.current += secondsElapsed * 1000
//       }
//     }

//     // Run check frequently (100ms) to keep it responsive and catch up quickly
//     intervalRef.current = setInterval(checkTick, 100)

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//         intervalRef.current = null
//       }
//     }
//   }, [isRunning])
// }
