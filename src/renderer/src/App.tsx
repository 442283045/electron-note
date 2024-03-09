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

function App() {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between my-1"></ActionButtonsRow>
          <NotePreviewList></NotePreviewList>
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
