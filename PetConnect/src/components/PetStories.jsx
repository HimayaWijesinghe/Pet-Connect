import React, { useState, useEffect } from 'react';
import { getAllLostPets } from './../server/lostPetApi';
import CommentService from '../server/CommentService';
import HomeCard from '../components/ui/custom/home_card'
import useSessionStore from '../store/sessionStore'
import { toast } from 'react-toastify';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '../components/ui/popover';
import { Filter, Search } from 'lucide-react';
 
const PetStories = () => {
  const activeEmail = useSessionStore((state) => state.activeEmail);
  
  const [lostPets, setLostPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    color: '',
    age: '',
    breed: ''
  });
 
  useEffect(() => {
    const fetchPetsAndComments = async () => {
      try {
        setIsLoading(true);
        
        // Fetch lost pets
        const petsResponse = await getAllLostPets();
        const petsArray = petsResponse?.response ?? petsResponse;
        
        if (!Array.isArray(petsArray)) {
          throw new Error('Invalid pets data format');
        }

        // Sort pets by date in descending order
        petsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
 
        // Fetch all comments
        const commentsResponse = await CommentService.getAllComments();
        const allComments = commentsResponse?.comments ?? commentsResponse;
 
        // Process pets and add comments
        const petsWithComments = petsArray.map(pet => {
          // Filter comments for each pet
          const petComments = allComments.filter(comment =>
            comment.petId === pet.pId
          );
 
          // Convert comments to an array of comment texts
          const commentTexts = petComments.map(comment => comment.description || comment.comment || '').filter(Boolean);
 
          return {
            ...pet,
            description: pet.story || pet.description || 'No story available',
            comments: commentTexts.length,
            likes: pet.likes || 0,
            shares: pet.shares || 0
          };
        });
 
        setLostPets(petsWithComments);
        setFilteredPets(petsWithComments);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Unable to load pet stories and comments');
        toast.error('Failed to load pet information');
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchPetsAndComments();
  }, []);
 
  // Apply filters and search
  useEffect(() => {
    let result = lostPets;
 
    // Apply search
    if (searchTerm) {
      result = result.filter(pet =>
        pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
 
    // Apply filters
    result = result.filter(pet => {
      return (
        (!filters.location || pet.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.color || pet.color?.toLowerCase() === filters.color.toLowerCase()) &&
        (!filters.breed || pet.breed?.toLowerCase().includes(filters.breed.toLowerCase())) &&
        (!filters.age || pet.age?.toString() === filters.age)
      );
    });
 
    setFilteredPets(result);
  }, [searchTerm, filters, lostPets]);
 
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: '',
      color: '',
      age: '',
      breed: ''
    });
    setSearchTerm('');
  };
 
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center bg-gradient-to-r relative from-blue-500 to-blue-800 text-white py-8">
        
        <p className="text-3xl font-bold">Pet Stoires</p>
 
        <div className="flex justify-center w-3/5 items-center my-4 space-x-4">
          {/* Search Input */}
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pets by name, description, or breed"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border rounded-md px-3 py-2 text-zinc-800"
            />
          </div>
 
          {/* Filter Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="group size-9 bg-sky-300/50 transition-all duration-300 hover:bg-cyan-50/85 hover:text-blue-500 rounded-md flex justify-center items-center">
                <i class="fas fa-filter"></i>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filter Pets</h4>
                  <p className="text-sm text-gray-500">
                    Refine your pet search
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="location" className="text-right">Location</label>
                    <input
                      id="location"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      placeholder="City/Area"
                      className="col-span-2 border rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="color" className="text-right">Color</label>
                    <input
                      id="color"
                      name="color"
                      value={filters.color}
                      onChange={handleFilterChange}
                      placeholder="Pet Color"
                      className="col-span-2 border rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="breed" className="text-right">Breed</label>
                    <input
                      id="breed"
                      name="breed"
                      value={filters.breed}
                      onChange={handleFilterChange}
                      placeholder="Pet Breed"
                      className="col-span-2 border rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="age" className="text-right">Age</label>
                    <input
                      id="age"
                      name="age"
                      value={filters.age}
                      onChange={handleFilterChange}
                      placeholder="Pet Age"
                      type="number"
                      className="col-span-2 border rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={resetFilters}
                      className="border rounded-md px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
 
      </div>
 
      <div className="w-full flex justify-center items-center">
        {
          isLoading &&
          <div className="flex items-center gap-3 my-24">
            <div className="size-10 rounded-full border-4 border-t-transparent border-neutral-500 animate-spin"></div>
            <span className="">Loading...</span>
          </div>
        }
        {
          error &&
          <div className="flex items-center gap-3 my-24">
            <i className="fas fa-exclamation-circle text-xl text-red-700"></i>
            <span className="text-red-700">{error}</span>
          </div>
        }
        {
          !isLoading && !error &&
          <div className="w-11/12 grid grid-cols-3 gap-5 items-stretch py-5">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <HomeCard
                  key={pet.id || pet.pId}
                  pet={pet}
                  user={activeEmail}
                />
              ))
            ) : (
              <div className="col-span-3 text-center my-16 space-y-2">
                <i class="fas fa-folder-open text-5xl text-blue-600"></i>
                <p className='text-blue-900'>No pets found matching your search and filters.</p>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};
 
export default PetStories;