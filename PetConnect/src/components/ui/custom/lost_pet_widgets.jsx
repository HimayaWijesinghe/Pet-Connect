import React from 'react'
import ShareButton from './share_button'
import { timeAgo } from '../../../lib/custom_functions'
import CommentForm from '../forms/comment_form'
import ExpandableCard from '../expandable_card'
import DeleteButton from './delete_button'
import PetFormPopUp from './petform_popup'

function LostPetCard({ pet }) {
  return (
    <div className='bg-white relative rounded-xl shadow-md overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg border border-gray-200 cursor-pointer group'>

        <div className="flex z-10 flex-col items-center absolute right-2 top-2 gap-2">
            <PetFormPopUp userMail={pet.email} initialData={pet}>
                <button className="size-8 rounded-md text-blue-600 bg-zinc-100 transition-all duration-300 hover:bg-blue-400 hover:text-zinc-100">
                    <i class="fas fa-pen-nib"></i>
                </button>
            </PetFormPopUp>
            <DeleteButton pet={pet} >
                <button  className="size-8 rounded-md text-red-600 bg-zinc-100 transition-all duration-300 hover:bg-red-500 hover:text-zinc-100">
                    <i class="fas fa-trash-alt"></i>
                    
                </button>
            </DeleteButton>
        </div>
        {/* image */}
        <div className="w-full h-[220px] overflow-hidden">
            <img
                src={pet.image}
                alt={ pet.name + '_image_' + pet.breed + pet.type}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
        </div>
        {/* details */}
        <p className="text-blue-500 text-lg px-3 mt-2"> <i class="fas fa-paw mr-1"></i> {pet.name}</p>
        {/* story */}
        <p className="px-3 py-1 text-sm text-[#1e293b]" title={pet.story} style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        }}>
            {pet.story}
        </p>

        {/* actions */}
        <div className="flex border-t border-gray-200 py-3 px-4">
            {/* likes */}
            <div className={`flex items-center mr-6 gap-2 text-blue-500 text-[0.95rem]`}>
                <i className='fas fa-thumbs-up text-lg' />
                <span className="mt-1">{pet.likes}</span>
            </div>
            
            <div className="flex-1 text-right text-xs text-blue-500">{pet.breed}</div>

        </div>
        
        {/* <p className="text-[0.65rem] w-3/5 bg-fuchsia-200">{JSON.stringify(pet)}</p> */}
       
    </div>
  )
}

function ShrunkedSuggestion ({ pet }) {

    return (
        <div className="bg-white relative rounded-xl shadow-md overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg border border-gray-200 cursor-pointer group">
            {/* image */}
            <div className="w-full h-[220px] overflow-hidden">
                <img
                src={pet.image}
                alt={ pet.name + '_image_' + pet.breed + pet.type}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
            </div>
            {/* details */}
            <div className="p-4 flex justify-between items-center">
                <span className="font-bold text-xl">{pet.name}</span>
                <span className="text-xs opacity-90">{timeAgo(pet.date)}</span>
            </div>
            {/* story */}
            <p className="px-3 py-1 text-sm text-[#1e293b]" style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {pet.story}
            </p>

            {/* actions */}
            <div className="flex border-t border-gray-200 py-3 px-4">
                {/* likes */}
                <div className={`flex items-center mr-6 gap-2 text-zinc-500 text-[0.95rem]`}>
                    <i className='fas fa-thumbs-up text-lg' />
                    <span className="mt-1">{pet.likes}</span>
                </div>
                
                <div className="flex-1 text-right text-xs text-zinc-500">{pet.breed}</div>

            </div>

            {/* <p className="text-[0.65rem]">{JSON.stringify(pet)}</p> */}
            
        </div>
    )
}

function ExpandedSuggestion ({ pet, comments, user }) {

    const actions = React.useState({like:false, comment:false, share:false})
    
    const features = [
        { label: 'Type', value: pet.type, icon: 'fa-paw' },
        { label: 'Breed', value: pet.breed, icon: 'fa-dna' },
        { label: 'Age', value: pet.age + ' yrs', icon: 'fa-birthday-cake' },
        { label: 'Color', value: pet.color, icon: 'fa-tint' },
    ]

    return (
        <div className="w-full flex flex-col gap-2 group">
            {/* details */}
            <div className="p-4 flex justify-between items-center">
                <span className="font-bold text-xl">{pet.name}</span>
                <span className="text-xs opacity-90">{timeAgo(pet.date)}</span>
            </div>
            {/* image */}
            <div className="w-full h-3/5 flex justify-center items-center overflow-hidden">
                <img
                src={pet.image}
                alt={ pet.name + '_image_' + pet.breed + pet.type}
                className="w-10/12 h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
            </div>
            {/* features */}
            <div className="grid w-4/5 mx-auto grid-cols-2 gap-5">
                {
                    features.map((quality, index) => (
                        <div className="flex items-center gap-2" key={index}>
                            <div className="flex items-center gap-2">
                                <i className={'text-blue-400 fas ' + quality.icon} />
                                <span className='text-sm text-blue-800'>{quality.label}</span>
                            </div>
                            :
                            <span className='text-sm'>{quality.value}</span>
                        </div>
                    ))
                }
            </div>
            {/* story */}
            <p className="px-3 py-1 text-sm text-[#1e293b]" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {pet.description}
            </p>
            {/* actions */}
            <div className="flex border-t border-gray-200 py-3 px-4">
                {/* likes */}
                <div className={`flex items-center mr-6 gap-2 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-[0.95rem] ${ actions.like ? 'text-[#4a90e2]' : '' }`}>
                    <i className={` ${actions.like ? 'fas fa-thumbs-up' : 'far fa-thumbs-up' } text-lg`} />
                    <span className="mt-1">{pet.likes}</span>
                </div>
                {/* comments */}
                <div className={`flex items-center mr-6 gap-2 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-[0.95rem] ${ actions.comment ? 'text-[#4a90e2]' : '' }`}>
                    <i className={` ${actions.comment ? 'fas fa-comment-alt' : 'far fa-comment-alt' } text-lg`} />
                    <span className="mt-1">{pet.comments}</span>
                </div>
                {/* share */}
                <ShareButton url={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} title={'lorem ipsum dolor sit amet'}>
                    <div className={`flex items-center mr-6 gap-2 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-[0.95rem] ${ actions.share ? 'text-[#4a90e2]' : '' }`}>
                        <i className='fas fa-share-alt text-lg'></i>
                        {/* <i className="far fa-share-alt mr-2 text-[1.1rem]"></i> */}
                        <span className="mt-1">{pet.shares}</span>
                    </div>
                </ShareButton>
            </div>
            {/* comments */}
            <div className="w-11/12 mx-auto flex p-3 flex-col gap-3 border rounded-xl">
                {
                    comments.map((comment) => (
                    <div key={comment.id} className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <i class="fas fa-user-circle"></i>
                            <span className="text-xs"> {comment.email}</span> 
                        </div>
                        <p className="p-1 bg-neutral-200 rounded-lg">{comment.comment}</p>
                        <p className="text-[0.65rem] text-right">{timeAgo(comment.date)}</p>
                    </div> 
                    ))
                }
            </div>
            {/* comment input */}
            {
                user &&
                <CommentForm userEmail={user} onCommentSubmit={() => {}} />
            }
        </div>
    )
}

const SampleComments = [
    {
        id: "comment1",
        petId: "pet1",
        comment: "I think I saw Max near the fountain yesterday.",
        date: "2023-10-01T13:00:00Z",
        email: "user1@example.com",
    },
    {
        id: "comment2",
        petId: "pet1",
        comment: "Please check the dog park, he might be there.",
        date: "2023-10-01T14:30:00Z",
        email: "user2@example.com",
    },
    {
        id: "comment3",
        petId: "pet2",
        comment: "Whiskers was spotted in the alley behind the bakery.",
        date: "2023-10-02T15:00:00Z",
        email: "user3@example.com",
    },
    {
        id: "comment4",
        petId: "pet3",
        comment: "I saw a dog that looks like Buddy at the beach this morning.",
        date: "2023-10-03T10:00:00Z",
        email: "user4@example.com",
    },
    {
        id: "comment5",
        petId: "pet3",
        comment: "Check the local shelters, maybe someone brought him in.",
        date: "2023-10-03T11:30:00Z",
        email: "user5@example.com",
    },
    {
        id: "comment6",
        petId: "pet4",
        comment: "Mittens might be in the nearby park, I heard meowing.",
        date: "2023-10-04T17:00:00Z",
        email: "user6@example.com",
    },
    {
        id: "comment7",
        petId: "pet5",
        comment: "I think Rocky was seen near the hiking trail.",
        date: "2023-10-05T12:00:00Z",
        email: "user7@example.com",
    },
    {
        id: "comment8",
        petId: "pet5",
        comment: "Please be careful, the woods can be dangerous.",
        date: "2023-10-05T13:30:00Z",
        email: "user8@example.com",
    },
    {
        id: "comment9",
        petId: "pet1",
        comment: "I saw a black Labrador near the park yesterday. Could it be Max?",
        date: "2023-10-01T15:00:00Z",
        email: "user9@example.com",
    },
    {
        id: "comment10",
        petId: "pet1",
        comment: "Have you tried posting flyers in the area?",
        date: "2023-10-01T16:30:00Z",
        email: "user10@example.com",
    },
    {
        id: "comment11",
        petId: "pet2",
        comment: "Siamese cats are known to hide in small spaces. Check under porches or in sheds.",
        date: "2023-10-02T16:00:00Z",
        email: "user11@example.com",
    },
    {
        id: "comment12",
        petId: "pet2",
        comment: "I'll ask my neighbors if they've seen Whiskers.",
        date: "2023-10-02T17:30:00Z",
        email: "user12@example.com",
    },
    {
        id: "comment13",
        petId: "pet3",
        comment: "Golden Retrievers are friendly. Maybe someone took him in.",
        date: "2023-10-03T12:00:00Z",
        email: "user13@example.com",
    },
    {
        id: "comment14",
        petId: "pet3",
        comment: "I shared Buddy's info on my Facebook page.",
        date: "2023-10-03T13:30:00Z",
        email: "user14@example.com",
    },
    {
        id: "comment15",
        petId: "pet4",
        comment: "Kittens can be curious. Check nearby trees or roofs.",
        date: "2023-10-04T18:00:00Z",
        email: "user15@example.com",
    },
    {
        id: "comment16",
        petId: "pet4",
        comment: "Hope Mittens comes home soon!",
        date: "2023-10-04T19:30:00Z",
        email: "user16@example.com",
    },
    {
        id: "comment17",
        petId: "pet5",
        comment: "Bulldogs aren't great at navigating woods. He might be close by.",
        date: "2023-10-05T14:00:00Z",
        email: "user17@example.com",
    },
    {
        id: "comment18",
        petId: "pet5",
        comment: "I'll keep an eye out while hiking.",
        date: "2023-10-05T15:30:00Z",
        email: "user18@example.com",
    },
    {
        id: "comment19",
        petId: "pet6",
        comment: "Black cats can be hard to spot at night. Maybe search during the day.",
        date: "2023-10-06T09:00:00Z",
        email: "user19@example.com",
    },
    {
        id: "comment20",
        petId: "pet6",
        comment: "Shared Shadow's info with my local animal rescue group.",
        date: "2023-10-06T10:30:00Z",
        email: "user20@example.com",
    },
];

function SuggestCard ({ pet, user }) {

    const comments = SampleComments.filter(comment => comment.petId === pet.id);

    return (
        <ExpandableCard>
            <ExpandableCard.ShrunkContent>
                <ShrunkedSuggestion pet={pet} />
            </ExpandableCard.ShrunkContent>
            <ExpandableCard.ExpandedContent>
                <ExpandedSuggestion pet={pet} comments={comments} user={user} />
            </ExpandableCard.ExpandedContent>
        </ExpandableCard>
    )
}

export { LostPetCard, SuggestCard }