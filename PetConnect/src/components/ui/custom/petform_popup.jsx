import React from 'react'
import { Dialog, DialogContent, DialogTrigger  } from '../dialog'
import PetForm from '../forms/pet_form'

function PetFormPopUp({ children, userMail, initialData = null }) {
  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-white max-h-[75vh] w-[75vw] overflow-scroll">
            <PetForm userMail={userMail} initialData={initialData} />
        </DialogContent>
    </Dialog>
  )
}

export default PetFormPopUp