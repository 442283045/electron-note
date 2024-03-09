import {
  Content,
  RootLayout,
  Sidebar,
  DraggableTopBar,
  NotePreviewList,
  FloatingNoteTitle
} from '@/components'
import { ActionButtonsRow } from '@/components'
import { MarkdownEditor } from '@/components'
import { useRef } from 'react'

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between my-1"></ActionButtonsRow>
          <NotePreviewList onSelect={resetScroll}></NotePreviewList>
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
