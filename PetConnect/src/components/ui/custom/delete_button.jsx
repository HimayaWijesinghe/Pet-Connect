import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose  } from '../dialog'
import { deleteLostPet } from '../../../server/lostPetApi'


function DeleteButton({ children, pet }) {
    console.log("DeleteButton component rendered with pet:", pet)
  return (
    
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-white max-w-lg">
            <DialogHeader>
            <DialogTitle className="text-red-900">Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                This action cannot be undone. This will permanently delete this post.
            </DialogDescription>
            <DialogFooter>
                <DialogClose asChild>
                    <button className="rounded-md bg-stone-300 capitalize px-4 py-1 transition-all duration-300 hover:bg-stone-500 hover:text-stone-50">cancel</button>
                </DialogClose>
                <DialogClose asChild>
                    <button onClick={() => deleteLostPet(pet.pId)} className="rounded-md bg-red-600 capitalize px-4 py-1 transition-all duration-300 hover:bg-red-800 text-red-50">delete</button>            
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteButton