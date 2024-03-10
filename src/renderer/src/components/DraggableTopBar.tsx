import { WindowsButtonRow } from './WindowsButtonRow'

export const DraggableTopBar = () => {
  return (
    <header className="absolute inset-0 h-8 z-20 bg-transparent flex">
      <div className="draggable flex-1"></div>
      <WindowsButtonRow />
    </header>
  )
}
