import { WindowsButton, WindowsButtonProps } from '@/components'
import { VscChromeMinimize } from 'react-icons/vsc'
const handleClick = () => {
  window.context.minimizeWindow()
}
export const MinimizeButton = ({ className, ...props }: WindowsButtonProps) => {
  return (
    <WindowsButton className={className} {...props} onClick={handleClick}>
      <VscChromeMinimize className="m-auto" />
    </WindowsButton>
  )
}
