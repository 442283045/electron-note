import { ComponentProps } from 'react'
import { MinimizeButton } from './Button/MinimizeButton'
import { MaximizeButton } from './Button/MaximizeButton'
import { CloseButton } from './Button/CloseButton'

export type WindowsButtonRowProps = ComponentProps<'div'>

export const WindowsButtonRow = ({ className, ...props }: WindowsButtonRowProps) => {
  return (
    <div className={className} {...props}>
      <MinimizeButton />
      <MaximizeButton />
      <CloseButton />
    </div>
  )
}
