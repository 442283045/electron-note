import { WindowsButton, WindowsButtonProps } from '@/components'
import { VscChromeMaximize } from 'react-icons/vsc'
const handleClick = () => {
  window.context.maximizeWindow()
}
export const MaximizeButton = ({ className, ...props }: WindowsButtonProps) => {
  return (
    <WindowsButton className={className} {...props} onClick={handleClick}>
      <VscChromeMaximize className="m-auto" />
    </WindowsButton>
  )
}
