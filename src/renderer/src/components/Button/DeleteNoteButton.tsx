import { ActionButton, ActionButtonProps } from '@/components'
import { useSetAtom } from 'jotai'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteNoteAtom } from '@renderer/store'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteEmptyNote = useSetAtom(deleteNoteAtom)
  return (
    <ActionButton {...props} onClick={deleteEmptyNote}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300"></FaRegTrashCan>
    </ActionButton>
  )
}
