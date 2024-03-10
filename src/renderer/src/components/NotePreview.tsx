import { renameFile } from '@renderer/store'
import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { useSetAtom } from 'jotai'
import { ComponentProps, FocusEventHandler, KeyboardEventHandler, useState } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const [editable, setEditable] = useState(false)
  const renameFileAtom = useSetAtom(renameFile)
  function editContent() {
    if (!editable) {
      setEditable(true)
    }
  }
  const handleBlur: FocusEventHandler = (e) => {
    if (editable) {
      setEditable(false)
    }
    renameFileAtom(title, (e.target as HTMLHeadingElement).innerText)
  }
  const handleKeydown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      if (editable) {
        setEditable(false)
      }
      renameFileAtom(title, (e.target as HTMLHeadingElement).innerText)
    }
  }

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <h3
        className="mb-1 font-bold truncate outline-none selection:bg-slate-300 selection:text-zinc-600 focus:!border-zinc-600/50 focus:!border"
        onDoubleClick={editContent}
        onBlur={handleBlur}
        onKeyDown={handleKeydown}
        contentEditable={editable}
        onInput={() => {}}
      >
        {title}
      </h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">
        {formatDateFromMs(lastEditTime)}
      </span>
    </div>
  )
}
