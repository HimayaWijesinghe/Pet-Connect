import React, { useState, useEffect, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { LostPetCard, SuggestCard } from '../components/ui/custom/lost_pet_widgets'
import PetFormPopUp from '../components/ui/custom/petform_popup'
import useSessionStore from '../store/sessionStore'
import { 
  createLostPet, 
  updateLostPet,
  deleteLostPet,
  incrementLikes,
  getPetsByEmail ,
  fetchPetDetails
} from './../server/lostPetApi'
import { toast } from 'react-toastify'
import MyLostReport from '../components/ui/custom/my_lost_report'
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

function LostPetsScreen() {
    const activeEmail = useSessionStore((state) => state.activeEmail);

    const [lostPets, setLostPets] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingPet, setEditingPet] = useState(null);
    const [newPet, setNewPet] = useState({
        name: '',
        location: '',
        age: '',
        color: '',
        image: '',
        likes: 0,
        email: activeEmail
    });

    const fetchData = useCallback(async () => {
        if (!activeEmail) {
            console.warn('No active email found');
            setLostPets([]);
            return;
        }
    
        try {
            setIsLoading(true);
            console.log('Fetching pets for email:', activeEmail);
    
            const response = await getPetsByEmail(activeEmail);
            console.log('Response from getPetsByEmail:', response);
    
            // Extract pets from the response using consistent structure
            let petsArray = [];
            if (response && response.lostPets && Array.isArray(response.lostPets)) {
                petsArray = response.lostPets;
            } else if (Array.isArray(response)) {
                petsArray = response;
            } else if (response && response.pets && Array.isArray(response.pets)) {
                petsArray = response.pets;
            }
    
            console.log('Processed pets array:', petsArray);
    
            // Ensure each pet has a valid ID
            const processedPets = petsArray.map(pet => ({
                ...pet,
                id: pet._id || pet.pId || pet.id || `temp-${Date.now()}-${Math.random()}`
            }));
            
            // Sort pets by date in descending order
            const sortedPets = processedPets.sort((a, b) => new Date(b.date) - new Date(a.date));
    
            // Update state with sorted pets
            setLostPets(sortedPets);
    
            if (sortedPets.length === 0) {
                console.warn('No pets found for the current user');
                toast.info('No lost pets found. Add your first pet!');
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
            toast.error(`Failed to load lost pets: ${error.message || 'Unknown error'}`);
            setLostPets([]);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, [activeEmail]);

    const fetchPetData = useCallback(async () => {
        console.log('#############Fetching pet data##########');
        if (!activeEmail) {
            console.warn('No active email found');
            setSuggestions([]);
            return;
        }
    
        try {
            setIsLoading(true);
            console.log('Suggest pets for email:', activeEmail);
    
            const response = await fetchPetDetails(activeEmail);
            console.log('Response Suggest from fetchPetDetails:', response);
    
            // Extract pets from the response using consistent structure
            let petsArray = [];
            if (response && response.suggestedPets && Array.isArray(response.suggestedPets)) {
                petsArray = response.suggestedPets;
            } else if (Array.isArray(response)) {
                petsArray = response;
            } else if (response && response.pets && Array.isArray(response.pets)) {
                petsArray = response.pets;
            }
    
            console.log('Suggest pets array:', petsArray);
            console.log("Email:", activeEmail);
            // Ensure each pet has a valid ID
            const processedPets = petsArray.map(pet => ({
                ...pet,
                id: pet._id || pet.pId || pet.id || `temp-${Date.now()}-${Math.random()}`
            }));
            
            // Sort pets by date in descending order
            const sortedPets = processedPets.sort((a, b) => new Date(b.date) - new Date(a.date));
    
            // Update state with sorted pets          
            setSuggestions(sortedPets);
    
            if (sortedPets.length === 0) {
                console.warn('No pets found for the current user');
                toast.info('No lost pets found. Add your first pet!');
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
            toast.error(`Failed to load lost pets: ${error.message || 'Unknown error'}`);
            setLostPets([]);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, [activeEmail]);

    // Initial data fetch
    useEffect(() => {
        if (activeEmail) {
            fetchData();
            fetchPetData();    
        }
    }, [fetchData, activeEmail]);

    // Add Pet Handler
    const handleAddPet = async (formData) => {
        try {
            // Validate required fields
            if (!formData.name || !formData.location) {
                toast.error('Please fill in name and location');
                return;
            }
    
            // Prepare pet data with all necessary fields
            const petData = {
                ...formData,
                email: formData.email || activeEmail,
                likes: 0,
                
            };
    
            console.log('Prepared Pet Data for submission:', petData);
    
            // Call API to create lost pet
            const newPet = await createLostPet(petData);
            
            // Reset form and close popup
            setShowAddForm(false);
    
            // Refetch data to show new pet
            await fetchData();
            
            toast.success('Pet added successfully!');
            
            return newPet;
        } catch (error) {
            console.error('Failed to add pet:', error);
            toast.error(`Failed to add pet: ${error.message || 'Unknown error'}`);
            throw error;
        }
    };

    // Edit Pet Handler
    const handleEditPet = async (formData) => {
        try {
            if (!editingPet || !editingPet.id) {
                toast.error('No pet selected for editing');
                return;
            }
            
            // Ensure the ID is included
            const petId = editingPet.id || editingPet._id || editingPet.pId;
            
            // Prepare update data
            const updateData = {
                ...formData,
                email: formData.email || activeEmail,
                likes: editingPet.likes || 0
            };
            
            console.log(`Updating pet ID: ${petId}`, updateData);
            
            // Call API to update pet
            await updateLostPet(petId, updateData);
            
            // Reset form and close popup
            setShowEditForm(false);
            setEditingPet(null);
            
            // Refetch data to show updated pet
            await fetchData();
            
            toast.success('Pet updated successfully!');
        } catch (error) {
            console.error('Failed to update pet:', error);
            toast.error(`Failed to update pet: ${error.message || 'Unknown error'}`);
            throw error;
        }
    };

    // Delete Pet Handler
    const handleDeletePet = async (petId) => {
        try {
            if (!petId) {
                toast.error('Invalid pet ID for deletion');
                return;
            }
            
            // Confirm deletion
            if (!window.confirm('Are you sure you want to delete this pet?')) {
                return;
            }
            
            console.log(`Deleting pet ID: ${petId}`);
            
            // Call API to delete pet
            await deleteLostPet(petId);
            
            // Refetch data to update list
            await fetchData();
            
            toast.success('Pet deleted successfully');
        } catch (error) {
            console.error('Failed to delete pet:', error);
            toast.error(`Failed to delete pet: ${error.message || 'Unknown error'}`);
        }
    };

    // Open edit form for a pet
    const handleOpenEditForm = (pet) => {
        setEditingPet(pet);
        setShowEditForm(true);
    };

    const getDaReport = async () => {
        try {
          const suffix = new Date().getFullYear().toString() + String(new Date().getMonth() + 1).padStart(2, '0') + String(new Date().getDate()).padStart(2, '0') + String(new Date().getHours()).padStart(2, '0') + String(new Date().getMinutes()).padStart(2, '0') + String(new Date().getSeconds()).padStart(2, '0');
          const pdfBlob =  await pdf(<MyLostReport data={lostPets} />).toBlob();
          saveAs(pdfBlob, activeEmail.split('@')[0].replace(/\./g, '_') + '_lost_pet_report_' + suffix + '.pdf');
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-3 relative z-[5]">
            
            <button onClick={getDaReport} className="size-12 rounded-full fixed z-50 group right-9 bottom-10 bg-orange-300 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-orange-500 hover:shadow-blue-900/35 transition-all duration-300">
              <i class="fas fa-angle-double-down text-xl group-hover:animate-bounce"></i>
            </button>

            <div className="w-5/6 relative flex justify-end">
                <PetFormPopUp 
                    userMail={activeEmail}
                    onSubmit={handleAddPet}
                    newPet={newPet}
                    setNewPet={setNewPet}
                >
                    <button 
                        onClick={() => setShowAddForm(true)}
                        className="bg-gradient-to-r relative top-5 from-blue-500 to-cyan-400 rounded-full px-5 py-2.5 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-900/35 transition-all duration-300"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Lost Pet
                    </button>
                </PetFormPopUp>
                
                {/* Edit Form Popup */}
                {editingPet && (
                    <PetFormPopUp 
                        userMail={activeEmail}
                        onSubmit={handleEditPet}
                        newPet={editingPet}
                        setNewPet={setEditingPet}
                        isEdit={true}
                    >
                        <div></div> {/* Empty div for rendering purposes */}
                    </PetFormPopUp>
                )}
            </div>
      
            <Tabs defaultValue="library" className="w-5/6">
                <TabsList className="border-b border-b-blue-300 w-full justify-start gap-2.5 rounded-none py-2 px-3">
                    <TabsTrigger value="library" className='gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-sky-50 text-blue-500'>
                        <i className="fas fa-paw"></i>
                        <span className="">My Lost Pets</span>
                    </TabsTrigger>
                    <TabsTrigger value="suggestion" className='gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-sky-50 text-blue-500'>
                        <i className="fas fa-magic"></i>
                        <span className="">For You</span>
                    </TabsTrigger>
                </TabsList>
        
                <TabsContent 
                    value="library" 
                    className={`p-3 ${lostPets.length === 0 ? 'flex justify-center items-center' : 'grid grid-cols-3 gap-5'}`}
                >
                    {lostPets.length === 0 && (
                        <div className="p-10 w-full rounded-xl border border-dashed border-blue-300 flex flex-col items-center">
                            <i className="fas fa-folder-open text-5xl text-sky-500"></i>
                            <p className="text-xs text-sky-500">No Post Yet !</p>
                            <p className="text-sky-500 text-center text-lg font-semibold tracking-wider">
                                Lost your loved one,<br/> Don't worry we got you Covered !!
                            </p>
                        </div>
                    )}
                    {lostPets.map((pet, index) => (
                        <LostPetCard 
                            key={pet.id || index} 
                            pet={pet} 
                            onEdit={() => handleOpenEditForm(pet)}
                            onDelete={() => handleDeletePet(pet.id || pet._id || pet.pId)}
                        />
                    ))}
                </TabsContent>
        
                <TabsContent 
                    value="suggestion" 
                    className={`p-3 ${suggestions.length === 0 ? 'flex justify-center items-center' : 'grid grid-cols-3 gap-5'}`}
                >
                    {suggestions.length === 0 && (
                        <div className="p-10 w-full rounded-xl border border-dashed border-blue-300 flex flex-col items-center">
                            <i className="fas fa-folder-open text-5xl text-sky-500"></i>
                            <p className="text-xs text-sky-500">No Suggestions Yet !</p>
                            <p className="text-sky-500 text-center text-lg font-semibold tracking-wider">
                                Upload Lost Pets to get Suggestions
                            </p>
                        </div>
                    )}
                    {suggestions.map((pet, index) => (
                        <SuggestCard 
                            key={pet.id || index} 
                            pet={pet} 
                            user={activeEmail} 
                        />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default LostPetsScreen