import React from 'react'
import InvoiceTemplate from '../components/ui/custom/sponser_invoice'


function TempScreen() {

  const form_data = {"cardName":"Yogi","cardNumber":"1111111111111111","cardExpiry":"11/11","cardCvc":"111","email":"tutor1@domain.com","street":"111 ffefw efsfde erfds refdsx trgefd","city":"rtgefdsawf","state":"freeev","zip":"51515","country":"rfedf","message":"reedvsvsdf erfgth rtgedc3 4rged tg3w2 fqefwg 4f3wf"}
  const dog_data = 
  {
  id: '1001', 
  name: 'Maxy', 
  type: 'dog', 
  age: 3, 
  breed: 'Labrador Retriever',
  amount: 2000,
  color: "Brown",
  date: "2025-03-29T19:06:41.032Z",
  description: "A friendly and energetic Labrador looking for a loving home.",
  gender: "male",
  image: "https://americaware.com/wp-content/uploads/2023/07/LabRetriever.jpg",
  status: "available",
}

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-3">
      {/* <MySponsorsCard userMail={'lorem@dolor.si'} /> */}
      <InvoiceTemplate formData={form_data} petData={dog_data} />
    </div>
  )
}

export default TempScreen