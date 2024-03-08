import { Content, RootLayout, Sidebar, DraggableTopBar } from '@/components'
import { ActionButtonsRow } from '@/components'

function App() {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1"></ActionButtonsRow>
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20"></Content>
      </RootLayout>
    </>
  )
}

export default App
