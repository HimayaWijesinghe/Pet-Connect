import React, { useState, useEffect, useCallback } from 'react'
import ExpandableCard from '../expandable_card'
import ShareButton from './share_button'
import { timeAgo } from '../../../lib/custom_functions'
import CommentForm from '../forms/comment_form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentService from '../../../server/CommentService';
import { incrementLikes } from '../../../server/lostPetApi';

const ShrunkHomeCard = ({ pet, onLike, onImageClick }) => {
    const [actions, setActions] = React.useState({like:false, comment:false, share:false})
    
    const handleLikeClick = (e) => {
        e.stopPropagation(); // Prevent expanding the card when liking
        if (onLike) {
            onLike(pet.pId);
            setActions(prev => ({ ...prev, like: true }));
            setTimeout(() => {
                setActions(prev => ({ ...prev, like: false }));
            }, 2500);
        }
    }
    
    return (
        <div className="bg-white w-full rounded-xl shadow-md overflow-hidden flex flex-col justify-between transition duration-200 hover:-translate-y-1 hover:shadow-lg border border-gray-200 cursor-pointer relative group h-120 w-100">
            {/* header */}
            <div className="bg-gradient-to-r from-[#4a90e2] to-[#2c5282] text-white p-3 flex justify-between items-center">
                <span className="font-bold text-xl">{pet.name}</span>
                <span className="text-sm opacity-90">{timeAgo(pet.date)}</span>
            </div>
            {/* location */}
            <div className="py-3 px-4 text-sm text-[#64748b] border-b border-gray-200 flex items-center">
                <i className="fas fa-map-pin text-red-800 mr-2"></i>
                <span className="mr-1.5">{pet.location}</span>
            </div>
            {/* image - now clickable and larger height */}
            <div 
                className="w-full h-56 overflow-hidden cursor-pointer" 
                onClick={onImageClick}
            >
                <img
                src={pet.image}
                alt={ pet.name + '_image_' + pet.breed + pet.type}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
            </div>
            {/* story with increased height */}
            <div className="p-4 text-base text-[#1e293b] h-32 overflow-hidden">
                <p style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {pet.description}
                </p>
            </div>
            {/* actions */}
            <div className="flex border-t border-gray-200 py-3 px-4 mt-auto">
                {/* likes */}
                <div 
                    onClick={handleLikeClick}
                    className={`flex items-center mr-8 gap-2 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-sm ${ actions.like ? 'text-[#4a90e2]' : '' }`}
                >
                    <i className={` ${actions.like ? 'fas fa-thumbs-up' : 'far fa-thumbs-up' } text-base`} />
                    <span className="mt-1">{pet.likes}</span>
                </div>
                {/* comments */}
                <div className={`flex items-center mr-8 gap-2 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-sm ${ actions.comment ? 'text-[#4a90e2]' : '' }`}>
                    <i className={` ${actions.comment ? 'fas fa-comment-alt' : 'far fa-comment-alt' } text-base`} />
                    <span className="mt-1">{pet.comments}</span>
                </div>
                {/* share */}
                <ShareButton url={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} title={'lorem ipsum dolor sit amet'}>
                    <div className={`flex items-center mr-8 gap-2 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-sm ${ actions.share ? 'text-[#4a90e2]' : '' }`}>
                        <i className='fas fa-share-alt text-base'></i>
                        <span className="mt-1">{pet.shares}</span>
                    </div>
                </ShareButton>
            </div>
        </div>
    )
}

const ExpandedCard = ({ pet, comments, user, onLike, countComments }) => {
    const [allComments, setAllComments] = useState(comments);
    const [isLoading, setIsLoading] = useState({ comments: false, addComment: false });
    const [error, setError] = useState(null);
    const [actions, setActions] = useState({ like: false, comment: false, share: false });
    const navigate = useNavigate();

    const handleLikeClick = (e) => {
        e.stopPropagation(); // Prevent other actions when liking
        if (onLike) {
            onLike(pet.pId);
            setActions(prev => ({ ...prev, like: true }));
            setTimeout(() => {
                setActions(prev => ({ ...prev, like: false }));
            }, 2500);
        }
    };

    const features = [
        { label: 'Type', value: pet.type, icon: 'fa-paw' },
        { label: 'Breed', value: pet.breed, icon: 'fa-dna' },
        { label: 'Age', value: pet.age + ' yrs', icon: 'fa-birthday-cake' },
        { label: 'Color', value: pet.color, icon: 'fa-tint' },
    ]

    const getComments = async (id) => {
    try {
        const response = await CommentService.getCommentsByPetId(id);
        // Access the nested comments array from response
        setAllComments(response);
    } catch (error) {
        if (error.response?.status === 404) {
        return null;
        }
        console.error('Error fetching comments:', error);
        setError('Failed to load comments');        
    }
    }

    const addComment = async (data) => {
        try {
          const comment = {
            petId: pet.pId, 
            email: data.email,
            description: data.comment,
          };
          const response = await CommentService.createComment(comment);
          getComments(pet.pId); 
          countComments()
          console.log(response)
        } catch (error) {
          console.error('Error adding comment:', error);
        }
    };
      

    useEffect(() => {
        getComments(pet.pId);
    }, [pet]);

    const gotoLogin = () => navigate('/session');

    return (
        <div className="w-full flex flex-col gap-3">
            {/* header */}
            <div className="bg-gradient-to-r from-[#4a90e2] to-[#2c5282] text-white p-5 flex justify-between items-center">
                <span className="font-bold text-2xl">{pet.name}</span>
                <span className="text-sm opacity-90">{timeAgo(pet.date)}</span>
            </div>
            {/* location */}
            <div className="py-4 px-5 text-base text-[#64748b] border-b border-gray-200 flex items-center">
                <i className="fas fa-map-pin text-red-800 mr-3"></i>
                <span className="mr-2">{pet.location}</span>
            </div>
            {/* image - larger */}
            <div className="w-full h-80 flex justify-center items-center overflow-hidden">
                <img
                src={pet.image}
                alt={ pet.name + '_image_' + pet.breed + pet.type}
                className="w-11/12 h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
            </div>
            {/* features */}
            <div className="grid w-4/5 mx-auto grid-cols-2 gap-6 py-2">
                {
                    features.map((quality, index) => (
                        <div className="flex items-center gap-3" key={index}>
                            <div className="flex items-center gap-2">
                                <i className={'text-blue-400 fas ' + quality.icon} />
                                <span className='text-base text-blue-800'>{quality.label}</span>
                            </div>
                            :
                            <span className='text-base'>{quality.value}</span>
                        </div>
                    ))
                }
            </div>
            {/* story */}
            <div className="p-5 text-base text-[#1e293b]">
                {pet.description}
            </div>
            {/* actions */}
            <div className="flex border-t border-gray-200 py-4 px-5">
                {/* likes */}
                <div 
                    onClick={handleLikeClick}
                    className={`flex items-center mr-8 gap-3 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-base ${ actions.like ? 'text-[#4a90e2]' : '' }`}
                >
                    <i className={` ${actions.like ? 'fas fa-thumbs-up' : 'far fa-thumbs-up' } text-xl`} />
                    <span className="mt-1">{pet.likes}</span>
                </div>
                {/* comments */}
                <div className={`flex items-center mr-8 gap-3 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-base ${ actions.comment ? 'text-[#4a90e2]' : '' }`}>
                    <i className={` ${actions.comment ? 'fas fa-comment-alt' : 'far fa-comment-alt' } text-xl`} />
                    <span className="mt-1">{pet.comments}</span>
                </div>
                {/* share */}
                <ShareButton url={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} title={'lorem ipsum dolor sit amet'}>
                    <div className={`flex items-center mr-8 gap-3 text-[#64748b] cursor-pointer transition-colors duration-200 hover:text-[#4a90e2] text-base ${ actions.share ? 'text-[#4a90e2]' : '' }`}>
                        <i className='fas fa-share-alt text-xl'></i>
                        <span className="mt-1">{pet.shares}</span>
                    </div>
                </ShareButton>
            </div>
            {/* comments */}
            <div className="w-11/12 mx-auto flex p-4 flex-col gap-4 border rounded-xl">
                {isLoading.comments ? (
                    <div>Loading comments...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : allComments.length === 0 ? (
                    <div>No comments yet</div>
                ) : (
                    allComments.map(comment => (
                        <div key={comment.id} className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <i className="fas fa-user-circle"></i>
                                <span className="text-sm">{comment.email}</span> 
                            </div>
                            <p className="p-2 bg-neutral-200 rounded-lg">{comment.description}</p>
                            <p className="text-xs text-right">{timeAgo(comment.date)}</p>
                        </div>
                    ))
                )}
            </div>
            {/* comment input */}
            {
                !user && (
                    <div className="flex flex-col gap-3 justify-center items-center w-5/6 bg-neutral-200 py-4 rounded-2xl mx-auto">
                        <p className="text-center text-base">Login First</p>
                        <button 
                            onClick={gotoLogin} 
                            className="bg-blue-500 w-fit text-sm hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                        >
                            Login
                        </button>
                    </div>
                )
            }
            {
                user && (
                    <CommentForm 
                        userEmail={user} 
                        onCommentSubmit={addComment} 
                    />
                )
            }
            {/* <p className="text-[0.6rem]">{JSON.stringify(pet)}</p> */}
        </div>
    );
};

function HomeCard({pet, user}) {
    const [lostPets, setLostPets] = useState(pet);
    const [expandCard, setExpandCard] = useState(false);
    const expandableCardRef = React.useRef(null);
    
    const likeAPet = async (id) => {
        try {
            const likeThisPost = await incrementLikes(id);
            console.log(likeThisPost);
            setLostPets(prev =>({...prev, likes: likeThisPost.lostPet.likes}));
            toast.success('Pet liked successfully!');
        } catch (error) {
            console.error("Failed to increment likes:", error);
            toast.error('Failed to like pet');
        }
    }

    const countComments = () => {
        setLostPets(prev =>({...prev, comments: prev.comments + 1}));
    }

    const handleImageClick = () => {
        // Toggle expandable card programmatically
        if (expandableCardRef.current && expandableCardRef.current.toggleExpand) {
            expandableCardRef.current.toggleExpand();
        } else {
            setExpandCard(prev => !prev);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <ExpandableCard 
                ref={expandableCardRef} 
                isExpanded={expandCard} 
                onChange={setExpandCard}
                className="w-96" // Increased width for container
            >
                <ExpandableCard.ShrunkContent>
                    <ShrunkHomeCard 
                        pet={lostPets} 
                        onLike={likeAPet} 
                        onImageClick={handleImageClick}
                    />
                </ExpandableCard.ShrunkContent>
                <ExpandableCard.ExpandedContent>
                    <ExpandedCard 
                        pet={lostPets} 
                        comments={[]} 
                        user={user} 
                        onLike={likeAPet}
                        countComments={countComments}
                    />
                </ExpandableCard.ExpandedContent>
            </ExpandableCard>
        </div>
    )
}

export default HomeCard;