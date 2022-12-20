import { useState, useEffect } from 'react'

const useDebounce = (val, time) => {
  const [deb, setDeb] = useState(val)

  useEffect(() => {
    const timer = setTimeout(() => setDeb(val), time)

    return () => {
      clearTimeout(timer)
    }
  }, [val, time])

  return deb
}

export default useDebounce
