import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../dialog'
import CopyToClipboard from '../copy'

function ShareButton({ url, title, children }) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="bg-white max-w-lg">
            <DialogHeader className={'border-b border-b-zinc-400 pb-2'}>
              <DialogTitle>Share this content</DialogTitle>
            </DialogHeader>
            <div className="w-full flex flex-col gap-2">
              <CopyToClipboard textToCopy={url} displayText={url} />
              <p className="font-bold">{title}</p>
              <DialogDescription className="text-sm">
                Copy the link above and share it on your favorite platforms.
              </DialogDescription>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ShareButton