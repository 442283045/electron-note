import { WindowsButton, WindowsButtonProps } from '@/components'
import { VscChromeClose } from 'react-icons/vsc'
const handleClick = () => {
  window.context.closeWindow()
}
export const CloseButton = ({ className, ...props }: WindowsButtonProps) => {
  return (
    <WindowsButton className={className} {...props} onClick={handleClick}>
      <VscChromeClose className="m-auto" />
    </WindowsButton>
  )
}
