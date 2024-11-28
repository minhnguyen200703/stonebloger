import { useCallback, useState } from 'react'


export const useToggle = (initIsVisible = false) => {
  const [isVisible, setIsVisible] = useState(initIsVisible)

  const onToggle = useCallback(() => {
    setIsVisible(prevState => !prevState)
  }, [])
  const onClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  return {
    isVisible,
    onToggle,
    onClose
  }
}
