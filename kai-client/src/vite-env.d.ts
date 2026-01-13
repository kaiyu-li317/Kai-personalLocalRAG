/// <reference types="vite/client" />

interface Window {
  $message: {
    error: (content: string, options?: any) => void
    success: (content: string, options?: any) => void
    warning: (content: string, options?: any) => void
    info: (content: string, options?: any) => void
    destroyAll: () => void
  }
  $dialog: any
  $notification: any
  $loadingBar: any
}
