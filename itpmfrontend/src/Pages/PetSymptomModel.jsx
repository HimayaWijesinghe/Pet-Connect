// models/PetSymptomModel.js

class PetSymptomModel {
  constructor() {
    this.symptoms = [
      "Acting Weird", "Diarrhea", "Itching", "Vomiting", "Vomiting and Diarrhea",
      "Aggression", "Bad Breath", "Bleeding", "Blood in Stool", "Blood in Urine",
      "Breathing Problems", "Coughing", "Crying", "Depression", "Ear Problems",
      "Eye Problems", "Fever", "Hair Loss", "Head Tilt", "Lethargic",
      "Limping", "Loss of Appetite", "Lumps", "Pain", "Panting",
      "Paralysis", "Reverse Sneezing", "Seizures", "Shaking", "Skin Problems",
      "Sneezing", "Stiffness", "Swelling", "Urination Changes", "Weight Loss",
      "Anal Gland Problems", "Bloating", "Constipation", "Drooling", "Excessive Thirst",
      "Flatulence", "Hiccups", "Mange", "Obesity", "Pale Gums",
      "Runny Nose", "Scooting", "Snoring", "Stomach Noises", "Yellow Eyes",
      "Excessive Licking", "Excessive Barking"
    ];
    
    this.firstAidInfo = {
      "Acting Weird": "Observe your pet closely for any other symptoms. Ensure they are safe and not in danger. Sudden behavior changes could indicate illness or pain. Contact your veterinarian for advice.",
      "Diarrhea": "Feed a bland diet (boiled chicken and rice). Ensure your pet has access to clean water. If diarrhea persists for more than 48 hours or contains blood, contact your veterinarian.",
      "Itching": "Check for fleas or ticks. Bathe with a gentle pet-friendly shampoo. Avoid known allergens. Contact your vet if itching persists or if skin appears red or inflamed.",
      "Vomiting": "Withhold food for 12–24 hours. Provide small amounts of water. If vomiting persists for more than 24 hours, contact your veterinarian.",
      "Vomiting and Diarrhea": "Withhold food for 12 hours, offer water frequently. Reintroduce a bland diet slowly. If symptoms persist beyond 24 hours or include blood, contact your veterinarian immediately.",
      "Aggression": "Keep your pet and others safe. Aggression may result from pain or fear. Avoid punishing your pet and consult a veterinarian or behaviorist.",
      "Bad Breath": "Brush your pet’s teeth with pet-safe toothpaste. Offer dental chews. Persistent bad breath may indicate dental disease — schedule a vet check.",
      "Bleeding": "Apply gentle pressure using a clean cloth. Elevate the bleeding area if possible. If bleeding doesn’t stop within 5 minutes, seek emergency vet care.",
      "Blood in Stool": "Monitor your pet. Withhold food for 12 hours but keep water available. Contact your vet immediately, especially if lethargy or vomiting is present.",
      "Blood in Urine": "Ensure your pet stays hydrated. Collect a urine sample if possible. Contact your veterinarian promptly to test for infection or other issues.",
      "Breathing Problems": "Keep your pet calm and still. Avoid stress or exertion. Seek immediate veterinary attention — breathing issues can be critical.",
      "Coughing": "Keep your pet in a warm, humid environment. Avoid excitement or exercise. If coughing persists over 24 hours or worsens, contact your vet.",
      "Crying": "Comfort your pet and observe for injuries. Crying may indicate pain or anxiety. If it continues or seems severe, consult your vet.",
      "Depression": "Spend time with your pet and encourage light play. If depression is accompanied by appetite loss or other symptoms, consult your vet.",
      "Ear Problems": "Avoid cleaning ears unless trained. Look for redness, discharge, or smell. Do not insert anything into the ear. Contact your vet for diagnosis.",
      "Eye Problems": "Flush with saline if debris is present. Avoid rubbing the eye. If redness, discharge, or squinting persists, seek veterinary care.",
      "Fever": "Check rectal temperature (normal is ~101–102.5°F / 38.3–39.2°C). Provide a cool area. Do not give human meds. Contact your vet immediately if above 103°F.",
      "Hair Loss": "Check for fleas, mites, or allergies. Keep skin clean and avoid scratching. Persistent or patchy hair loss should be evaluated by a vet.",
      "Head Tilt": "Can indicate ear infection or neurological issue. Limit movement and keep your pet calm. Seek veterinary evaluation urgently.",
      "Lethargic": "Ensure your pet has access to water and rest. Monitor closely. If your pet remains lethargic for more than 24 hours, contact your vet.",
      "Limping": "Rest your pet and avoid physical activity. Apply a cold compress if swelling is present. Contact your vet if limping persists more than 24 hours.",
      "Loss of Appetite": "Try offering a favorite bland food. Ensure water intake. If not eating for more than 24 hours, consult a veterinarian.",
      "Lumps": "Do not squeeze or poke the lump. Note the size, shape, and location. Monitor for changes and have your vet examine it.",
      "Pain": "Keep your pet calm and avoid handling the painful area. Do not give any human pain medications. Contact your vet immediately.",
      "Panting": "Ensure your pet is cool and calm. Excessive panting can indicate stress, heatstroke, or pain. Monitor and consult your vet if it persists.",
      "Paralysis": "Keep your pet still and calm. Support their body if moving. Seek emergency veterinary care immediately.",
      "Reverse Sneezing": "Gently massage your pet’s throat or briefly cover their nose to encourage swallowing. If frequent, consult your vet.",
      "Seizures": "Stay calm. Move objects away to prevent injury. Time the seizure. Do not touch the mouth. Call your vet immediately afterward.",
      "Shaking": "Wrap your pet in a blanket to provide comfort. Shaking could be due to cold, fear, or illness. If it continues, call your vet.",
      "Skin Problems": "Check for parasites or irritants. Keep skin clean and prevent licking. Use hypoallergenic products. See vet if the issue continues.",
      "Sneezing": "Wipe away discharge. Use a humidifier in dry areas. Persistent or bloody sneezing warrants a vet visit.",
      "Stiffness": "Limit movement. Offer a comfortable, warm resting spot. Monitor for improvement. If stiffness remains, seek veterinary advice.",
      "Swelling": "Apply a cold compress for 10 minutes. Note size and location. Avoid pressure. If swelling grows or is painful, contact your vet.",
      "Urination Changes": "Monitor frequency and color. Ensure hydration. Collect a urine sample if needed. Sudden changes need vet evaluation.",
      "Weight Loss": "Monitor diet and behavior. Increase calorie intake with vet-approved foods. Sudden or ongoing weight loss needs veterinary investigation.",
      "Anal Gland Problems": "Scooting and licking are common signs. Avoid squeezing glands yourself. Have your vet express and inspect them.",
      "Bloating": "Can be life-threatening. Do not give food or water. Take your pet to the vet immediately — especially for large breeds.",
      "Constipation": "Encourage hydration. Add fiber (pumpkin) to food. Gentle exercise may help. If constipation continues beyond 48 hours, contact your vet.",
      "Drooling": "Check for objects stuck in the mouth. Remove access to any toxins. If drooling is excessive or sudden, see your vet.",
      "Excessive Thirst": "Ensure water availability. Increased thirst can signal underlying issues like diabetes or kidney disease. Schedule a vet check.",
      "Flatulence": "Feed smaller, more frequent meals. Avoid sudden food changes. If gas is excessive and paired with bloating, call your vet.",
      "Hiccups": "Usually harmless. Calm your pet and offer small sips of water. If frequent or lasting over a few hours, consult your vet.",
      "Mange": "Isolate infected pets. Do not touch bare skin areas. See a vet for medicated shampoos or treatments — mange is contagious.",
      "Obesity": "Adjust diet and reduce treats. Add light daily exercise. Consult your vet for a safe weight loss plan.",
      "Pale Gums": "Check for injury or internal bleeding. Keep your pet calm. Pale gums are a red flag — contact your vet immediately.",
      "Runny Nose": "Wipe discharge with a warm cloth. Monitor breathing and appetite. Persistent discharge or bleeding needs vet care.",
      "Scooting": "May indicate anal gland issues or parasites. Avoid home treatments. Have your vet examine and treat appropriately.",
      "Snoring": "Monitor for changes. Snoring may be normal in some breeds. If new or loud, check for nasal blockages or obesity.",
      "Stomach Noises": "Usually normal. Ensure hydration. If paired with vomiting or discomfort, withhold food and consult a vet.",
      "Yellow Eyes": "May indicate liver problems. Seek veterinary attention immediately. Do not wait for other symptoms to appear.",
      "Excessive Licking": "Distract your pet from licking. It may signal allergies, anxiety, or pain. Check the area being licked and call your vet.",
      "Excessive Barking": "Evaluate environment for triggers (boredom, fear). Provide mental stimulation and training. Rule out pain or illness."
    };

    
    this.possibleCauses = {
      "Vomiting": [
        "Dietary indiscretion (eating something they shouldn't)",
        "Parasites",
        "Viral infections",
        "Bacterial infections",
        "Pancreatitis",
        "Kidney disease",
        "Liver disease",
        "Foreign body ingestion"
      ],
      "Diarrhea": [
        "Dietary changes",
        "Food allergies or intolerance",
        "Parasites (giardia, roundworms, hookworms)",
        "Viral infections",
        "Bacterial infections",
        "Inflammatory bowel disease",
        "Stress or anxiety"
      ],
      // Add more causes for other symptoms
    };
    
    // Age-specific considerations for different symptoms
    this.ageSpecificConsiderations = {
      "Puppy (up to 2 years old)": {
        "general": "Young pets are more susceptible to infections as their immune systems are still developing. They're also prone to accidents and ingesting foreign objects due to their curious nature.",
        "Acting Weird": "Puppies may behave oddly due to new stimuli or environmental changes. Monitor closely for signs of illness or ingestion of toxic items.",
        "Aggression": "Puppy aggression can stem from fear, lack of socialization, or teething discomfort. Begin training early and consult a vet or behaviorist.",
        "Anal Gland Problems": "Uncommon in puppies, but scooting or licking the rear may indicate irritation or infection. Vet examination is recommended.",
        "Bad Breath": "Mild odor is normal during teething. Foul breath could indicate dental issues or digestive problems. Use age-appropriate dental chews.",
        "Bleeding": "Even minor bleeding can be serious in puppies. Clean wounds and consult your vet for any uncontrolled or unexplained bleeding.",
        "Bloating": "Puppy bloat is an emergency. If your puppy has a distended belly, drools, or retches without vomiting, seek urgent veterinary care.",
        "Blood in Stool": "This can result from parasites, diet change, or infection. Collect a stool sample and visit the vet immediately.",
        "Blood in Urine": "Can be due to urinary tract infection or congenital issues. Ensure the puppy stays hydrated and get a vet check-up.",
        "Breathing Problems": "Rapid or labored breathing can signal infection or airway blockage. Keep the puppy calm and seek emergency care.",
        "Constipation": "Often caused by diet or dehydration. Ensure fresh water and fiber-rich food. Persistent constipation needs veterinary care.",
        "Coughing": "Puppies are vulnerable to kennel cough and respiratory infections. Ensure vaccinations are up to date. Vet visit if persistent.",
        "Crying": "Mild whining is normal. Excessive crying could mean pain, hunger, or anxiety. Monitor for signs of illness.",
        "Depression": "If a playful puppy becomes withdrawn, it may be ill or stressed. Changes in environment or pain can also trigger depression.",
        "Diarrhea": "Can quickly lead to dehydration. Common causes include parasites or diet changes. Consult a vet if it lasts more than 12 hours.",
        "Drooling": "May occur during teething. Excessive drooling could indicate poisoning or dental issues. Watch for other symptoms.",
        "Ear Problems": "Frequent scratching, shaking, or head tilting may indicate infection or mites. Vet cleaning and medication may be needed.",
        "Excessive Barking": "Often due to boredom or lack of training. Rule out pain or anxiety and begin consistent training routines.",
        "Excessive Licking": "May be due to allergies, boredom, or skin irritation. Check paws and skin. Discourage the behavior and see a vet if it persists.",
        "Excessive Thirst": "Could be normal post-exercise or due to dry food. If persistent, rule out diabetes or kidney issues.",
        "Eye Problems": "Discharge, redness, or squinting may indicate infection or foreign bodies. Gently clean and visit the vet.",
        "Fever": "Young pets are more prone to infections. Watch for lethargy and loss of appetite. A vet visit is necessary if suspected.",
        "Flatulence": "Often caused by diet or rapid eating. Use slow feeders and monitor diet. Persistent gas could indicate digestive issues.",
        "Hair Loss": "Can be caused by mange, ringworm, or allergies. Check for bald spots or redness. Vet diagnosis is essential.",
        "Head Tilt": "May indicate an ear infection or neurological issue. Needs urgent veterinary attention.",
        "Hiccups": "Common and usually harmless in puppies. If frequent or paired with other symptoms, consult your vet.",
        "Itching": "Check for fleas or mites. Use gentle shampoos and age-safe parasite treatments. Persistent itching needs a vet visit.",
        "Lethargic": "Sudden fatigue in puppies can signal illness, infection, or low blood sugar. Seek veterinary attention quickly.",
        "Limping": "Can result from injury, rough play, or developmental conditions like hip dysplasia. Limit activity and see a vet.",
        "Loss of Appetite": "Short-term loss can be due to teething or stress. Prolonged refusal to eat should be checked by a vet.",
        "Lumps": "Even in puppies, lumps should be examined. They may be cysts, abscesses, or more serious conditions.",
        "Mange": "Caused by mites. Puppies have weaker immunity and are more prone. Requires vet-prescribed treatment.",
        "Obesity": "Early overfeeding can lead to long-term weight issues. Monitor portions and encourage activity.",
        "Pain": "Crying, hiding, or limping may signal pain. Avoid giving human medication and consult your vet.",
        "Pale Gums": "May indicate anemia, internal bleeding, or shock. Lift the lip to check. Immediate vet care required.",
        "Panting": "May be normal after play. Continuous panting at rest may signal overheating or pain.",
        "Paralysis": "This is a serious emergency. Could result from trauma, infection, or toxin exposure. Seek urgent vet care.",
        "Reverse Sneezing": "Common and usually harmless. If frequent or distressing, consult your vet.",
        "Runny Nose": "May be from allergies, infection, or a cold. Clear discharge is less concerning than yellow/green mucus.",
        "Scooting": "Can indicate anal gland issues or worms. Deworming and a vet check are recommended.",
        "Seizures": "Rare but can occur from toxins or congenital issues. Stay calm, keep puppy safe, and call the vet.",
        "Shaking": "Mild shaking may be cold or nervousness. Persistent shaking could mean pain or illness.",
        "Skin Problems": "Check for redness, rashes, or scabs. Could be due to parasites or allergies. Use vet-approved products.",
        "Sneezing": "Can be caused by dust or infection. Frequent sneezing with discharge needs a vet exam.",
        "Snoring": "Can be normal in some breeds. If it starts suddenly or worsens, check for nasal blockage or infection.",
        "Stiffness": "May follow rough play or signal injury. Rest and monitor. If stiffness persists, consult your vet.",
        "Stomach Noises": "Usually normal. Loud gurgles with vomiting/diarrhea may indicate upset stomach or parasites.",
        "Swelling": "Could be due to insect bites, allergic reaction, or trauma. Apply a cold compress and contact your vet.",
        "Urination Changes": "Frequent or reduced urination can signal UTI or other issues. Collect a sample and visit the vet.",
        "Vomiting": "May lead to dehydration quickly. If it occurs more than twice or contains blood, seek veterinary attention.",
        "Vomiting and Diarrhea": "Combined symptoms can indicate infection, food poisoning, or parasites. Hydration and urgent vet care needed.",
        "Weight Loss": "Concerning in growing puppies. May be due to parasites, poor nutrition, or illness. Vet diagnosis recommended.",
        "Yellow Eyes": "Can be a sign of liver disease or blood disorder. Requires immediate veterinary attention."
      },
     "Adult (2-7 years old)": {
    "general": "Adult pets typically have stronger immune systems but may develop chronic conditions that require ongoing management.",
    "Acting Weird": "May indicate stress, pain, or behavioral changes. Monitor for consistency and consult a vet if changes persist.",
    "Aggression": "Could stem from anxiety, medical conditions, or territorial behavior. A behaviorist or vet exam is recommended.",
    "Anal Gland Problems": "More common in adults. Signs include scooting and licking. Manual expression or treatment may be needed.",
    "Bad Breath": "Often due to dental disease or digestive issues. Dental cleanings and vet check-ups are advisable.",
    "Bleeding": "External bleeding from injury should be treated immediately. Internal bleeding signs (pale gums, lethargy) need emergency care.",
    "Bloating": "Gastric dilatation-volvulus (GDV) is a life-threatening emergency, especially in large breeds. Watch for restlessness and distended abdomen.",
    "Blood in Stool": "Could be due to parasites, infections, or dietary intolerance. Veterinary stool analysis is recommended.",
    "Blood in Urine": "Often indicates UTI or bladder stones. Require prompt urine testing and treatment.",
    "Breathing Problems": "Could signal allergies, heart disease, or infection. Labored breathing always warrants vet evaluation.",
    "Constipation": "Can result from low fiber diet, dehydration, or spinal issues. Ensure hydration and consider dietary adjustments.",
    "Coughing": "May suggest allergies, kennel cough, or heart disease. Persistent or productive coughs need vet attention.",
    "Crying": "Can indicate discomfort or anxiety. Monitor for additional signs like limping or abdominal sensitivity.",
    "Depression": "Behavioral changes may be caused by illness, boredom, or environmental stressors. Rule out medical issues first.",
    "Diarrhea": "Can stem from dietary indiscretion or infection. Monitor hydration and seek care if it persists beyond 24 hours.",
    "Drooling": "Could be from dental disease, nausea, or toxin exposure. Persistent drooling needs vet evaluation.",
    "Ear Problems": "Infections are common due to yeast or bacteria. Look for head shaking and discharge. Cleaning and meds required.",
    "Excessive Barking": "May result from boredom, anxiety, or learned behavior. Identify the cause and apply training or calming methods.",
    "Excessive Licking": "Often due to allergies, anxiety, or pain. Could lead to hotspots or infections if unchecked.",
    "Excessive Thirst": "May indicate early diabetes, kidney issues, or Cushing’s disease. Blood tests may be necessary.",
    "Eye Problems": "Discharge, redness, or cloudiness may be signs of infection, ulcers, or glaucoma. Prompt vet visit is essential.",
    "Fever": "Often from infection or inflammation. Accompanied by lethargy or decreased appetite. Confirm with a vet thermometer.",
    "Flatulence": "May result from diet, allergies, or gut imbalance. Probiotics and a diet change may help.",
    "Hair Loss": "Commonly caused by allergies, hormonal issues, or parasites. Vet check for underlying cause is necessary.",
    "Head Tilt": "Often linked to inner ear infections or vestibular disease. Needs urgent veterinary attention.",
    "Hiccups": "Usually harmless. If frequent or paired with nausea or vomiting, consult a vet.",
    "Itching": "Adult pets commonly develop environmental or food allergies. Parasites can also cause persistent itching.",
    "Lethargic": "Could be from infection, metabolic disorders, or pain. A sudden drop in energy needs vet evaluation.",
    "Limping": "Often caused by injury, joint strain, or early arthritis. If not improving within 24–48 hours, consult a vet.",
    "Loss of Appetite": "May be due to dental issues, digestive problems, or systemic illness. Needs evaluation if lasting over 24 hours.",
    "Lumps": "Could be benign or cancerous. Any new or changing lump should be examined and possibly biopsied.",
    "Mange": "More likely from demodex or sarcoptic mites. Can spread quickly. Requires medical treatment and isolation if contagious.",
    "Obesity": "Common in adult pets due to decreased activity and overfeeding. Leads to many health issues. Monitor weight closely.",
    "Pain": "May show as reluctance to move, aggression, or whimpering. X-rays or bloodwork may be needed to find the source.",
    "Pale Gums": "Indicates anemia or blood loss. Could be life-threatening and requires immediate care.",
    "Panting": "Can be due to heat, pain, or anxiety. Persistent panting without exercise or heat requires a vet visit.",
    "Paralysis": "A medical emergency often caused by trauma or spinal issues. Immediate veterinary intervention needed.",
    "Reverse Sneezing": "Usually harmless and short-lived. If frequent, check for allergens or nasal irritants.",
    "Runny Nose": "May indicate upper respiratory infection or allergies. Monitor the discharge color and consult if it worsens.",
    "Scooting": "Often due to full anal glands or worms. Gland expression and deworming may be necessary.",
    "Seizures": "Could stem from epilepsy, toxins, or underlying illness. Requires diagnostic tests and monitoring.",
    "Shaking": "Can indicate anxiety, fever, or pain. Persistent shaking should be evaluated by a vet.",
    "Skin Problems": "Allergies, fungal infections, and bacterial skin issues are common. Look for redness, hair loss, or odor.",
    "Sneezing": "Occasional sneezing is normal. Frequent sneezing with discharge could be allergy or infection related.",
    "Snoring": "Can be normal, especially in brachycephalic breeds. New or worsening snoring may need evaluation for airway issues.",
    "Stiffness": "Could be early arthritis or overexertion. Anti-inflammatories or joint supplements may help.",
    "Stomach Noises": "Normal in small amounts. Loud gurgling with vomiting or diarrhea needs attention.",
    "Swelling": "May indicate infection, trauma, or allergic reaction. Sudden swelling is a vet emergency.",
    "Urination Changes": "Increased or decreased urination can suggest kidney or bladder issues. Urinalysis recommended.",
    "Vomiting": "Common causes include dietary issues, toxins, or systemic disease. Monitor frequency and contents.",
    "Vomiting and Diarrhea": "Combined can signal serious issues like pancreatitis or infection. Rehydration and vet care are critical.",
    "Weight Loss": "Can result from parasites, dental disease, or chronic illness. Blood tests and diagnostics may be required.",
    "Yellow Eyes": "A sign of jaundice, often from liver disease. Needs immediate veterinary evaluation."
  },
  "Senior (8+ years old)": {
    "general": "Senior pets are more prone to chronic conditions and may have multiple health issues simultaneously. Changes in behavior or symptoms should be taken seriously.",
    "Acting Weird": "Could be a sign of cognitive dysfunction syndrome (doggy dementia) or pain. Monitor for changes in behavior and consult a vet.",
    "Aggression": "Aggression in senior pets may be due to pain, fear, or cognitive dysfunction. Always rule out medical causes first.",
    "Anal Gland Problems": "Older pets are prone to anal gland issues. Scooting or licking frequently requires attention, and gland expression may be necessary.",
    "Bad Breath": "Often linked to dental disease, which is more common in seniors. Regular dental check-ups are crucial.",
    "Bleeding": "External bleeding from injury or internal bleeding could signal a more serious condition like cancer or clotting disorders. Seek immediate veterinary care.",
    "Bloating": "Gastric dilatation-volvulus (GDV) is a life-threatening emergency, especially in older, larger dogs. Watch for a distended abdomen and restlessness.",
    "Blood in Stool": "Could indicate gastrointestinal issues like ulcers, tumors, or inflammation. Immediate consultation with a vet is essential.",
    "Blood in Urine": "Often a sign of urinary tract infection (UTI), bladder stones, or cancer. Urine tests are needed for diagnosis.",
    "Breathing Problems": "Respiratory issues in seniors can signal heart disease, lung conditions, or infections. Immediate evaluation by a vet is important.",
    "Constipation": "Can be caused by dehydration, a decrease in activity, or dietary changes. Provide hydration and fiber, and seek vet advice if it persists.",
    "Coughing": "Coughing in senior pets may be due to heart disease, respiratory issues, or infections. A thorough check-up is recommended.",
    "Crying": "Could indicate discomfort, arthritis, or cognitive dysfunction. Observe other symptoms and consult a vet for pain management options.",
    "Depression": "Changes in behavior or mood can be linked to arthritis, cognitive dysfunction, or other health conditions in seniors.",
    "Diarrhea": "Persistent diarrhea in senior pets can indicate underlying infections, food intolerance, or more serious conditions like cancer.",
    "Drooling": "Excessive drooling may be caused by dental disease, oral cancer, or nausea. Consult a vet for diagnosis.",
    "Ear Problems": "Ear infections are common in senior pets due to immune system changes or chronic conditions. Check for redness or discharge.",
    "Excessive Barking": "Could be a sign of cognitive dysfunction syndrome or sensory loss. Training and behavior modification may be needed.",
    "Excessive Licking": "Could be due to anxiety, pain, or skin conditions. It may also be a sign of cognitive decline.",
    "Excessive Thirst": "Increased thirst in senior pets is often a sign of kidney disease, diabetes, or Cushing's disease. A vet check is necessary.",
    "Eye Problems": "Cloudy eyes or vision issues may be a sign of cataracts or glaucoma. Regular eye exams are essential for older pets.",
    "Fever": "Fever in senior pets is a serious symptom, often pointing to an infection or inflammation. Immediate vet care is needed.",
    "Flatulence": "More common in older pets due to changes in metabolism or digestive health. A vet may suggest a change in diet or probiotics.",
    "Hair Loss": "Could be caused by hormonal imbalances (e.g., hypothyroidism), parasites, or aging. A vet check is necessary for proper treatment.",
    "Head Tilt": "A head tilt in senior pets can be caused by vestibular disease, ear infections, or neurological issues. Seek veterinary advice.",
    "Hiccups": "Occasional hiccups are normal but frequent hiccups may signal gastrointestinal issues. Consult a vet if the condition persists.",
    "Itching": "Older pets may develop skin allergies, parasites, or systemic conditions like hypothyroidism. A vet will diagnose the underlying cause.",
    "Lethargic": "Lethargy in seniors often points to arthritis, heart disease, or organ failure. A vet exam is necessary to determine the cause.",
    "Limping": "Limping in older pets may be caused by arthritis, joint disease, or injury. Pain management and anti-inflammatory treatments are important.",
    "Loss of Appetite": "Loss of appetite can be a sign of dental disease, gastrointestinal issues, or systemic diseases like cancer. A vet check is essential.",
    "Lumps": "Lumps are more common in senior pets and could be benign or malignant. A vet will perform a biopsy or diagnostic tests to determine the cause.",
    "Mange": "Mange in senior pets can be more difficult to treat. It may indicate an underlying immune system issue or poor health.",
    "Obesity": "Weight gain in older pets is common due to reduced activity levels. Weight management is crucial to prevent further health complications.",
    "Pain": "Pain may manifest as reluctance to move, whining, or aggression. Joint disease and arthritis are common in senior pets.",
    "Pale Gums": "Pale gums can indicate anemia, blood loss, or systemic disease. Immediate vet care is necessary to determine the cause.",
    "Panting": "Excessive panting in seniors may indicate pain, heart disease, or respiratory issues. A vet visit is essential for a proper diagnosis.",
    "Paralysis": "Paralysis in senior pets can be due to spinal issues, stroke, or other neurological conditions. Emergency vet care is needed.",
    "Reverse Sneezing": "Reverse sneezing in older pets is often harmless, but it may indicate nasal irritation or allergies. Consult a vet if it becomes frequent.",
    "Runny Nose": "A runny nose in senior pets can indicate a respiratory infection, allergies, or nasal tumors. A vet exam is recommended for diagnosis.",
    "Scooting": "Scooting often points to anal gland issues or worms. Older pets may require more frequent anal gland expression.",
    "Seizures": "Seizures in senior pets are more likely to be caused by brain tumors, epilepsy, or metabolic diseases. Immediate vet care is essential.",
    "Shaking": "Shaking or trembling in senior pets can be due to pain, anxiety, or neurological conditions. It should not be ignored.",
    "Skin Problems": "Senior pets are more prone to skin infections, tumors, and dry skin. Regular skin check-ups are important.",
    "Sneezing": "Frequent sneezing may indicate nasal issues, infections, or tumors. A vet examination is necessary for diagnosis.",
    "Snoring": "Older pets may snore more due to changes in their airway structure. If snoring is paired with labored breathing, seek veterinary advice.",
    "Stiffness": "Stiffness is a common sign of arthritis and joint pain in senior pets. Joint supplements or pain relief medications may help.",
    "Stomach Noises": "Loud or frequent stomach noises could indicate gastrointestinal issues, such as bloating or constipation. A vet evaluation is recommended.",
    "Swelling": "Swelling may indicate fluid retention, tumors, or infections. A vet must examine any sudden or unexplained swelling.",
    "Urination Changes": "Frequent urination or difficulty urinating can signal kidney disease, diabetes, or bladder problems in senior pets.",
    "Vomiting": "Vomiting in older pets may be related to kidney disease, liver issues, or cancer. It should be addressed by a vet.",
    "Vomiting and Diarrhea": "When vomiting and diarrhea occur together in seniors, it may indicate a serious infection or metabolic disorder. Immediate vet care is necessary.",
    "Weight Loss": "Unexplained weight loss can be a sign of cancer, kidney disease, or digestive problems. A vet exam and tests are needed.",
    "Yellow Eyes": "Yellowing of the eyes (jaundice) is often associated with liver or blood disorders and requires prompt veterinary attention."
  }
    };

    

    this.neuterSpayConsiderations = {
      "Male": {
        "spayed": { // Neutered
          "general": "Neutered male pets generally have a reduced risk of reproductive-related issues and certain behaviors compared to intact males.",
          "Aggression": "While neutering can reduce some aggression issues, it's not a cure-all for behavioral problems. Training and proper socialization are still important factors.",
          "Urination Changes": "Neutered males are less likely to mark territory, but urination changes could indicate urinary tract infections or other health issues.",
          "Excessive Barking": "Neutering can reduce some hormone-driven behaviors, but barking may be related to anxiety, boredom, or other causes that need to be addressed.",
          "Acting Weird": "Sudden behavior changes in neutered pets are less likely to be hormone-related and may indicate pain, anxiety, or health issues that should be evaluated."
        },
        "intact": { // Not neutered
          "general": "Intact male pets may exhibit hormone-driven behaviors and are at risk for certain reproductive-related health issues.",
          "Aggression": "Hormone-influenced aggression can be more common in intact males. This may be directed at other male animals or occur in the presence of females in heat.",
          "Urination Changes": "Marking behavior is common in intact males. However, changes in urination patterns may also indicate urinary or prostate issues.",
          "Excessive Barking": "Intact males may be more vocal and reactive, especially in response to females in heat or when competing with other males.",
          "Swelling": "In intact males, swelling in the testicular area can indicate serious conditions like testicular torsion or cancer and requires immediate veterinary attention.",
          "Lumps": "Intact males are at higher risk for testicular tumors. Any lumps in the genital area should be evaluated promptly by a veterinarian.",
          "Pain": "Intact males are more susceptible to prostate issues, which can cause pain or discomfort, especially in older dogs."
        }
      },
      "Female": {
        "spayed": { // Spayed
          "general": "Spayed female pets have significantly reduced risks of reproductive cancers and infections.",
          "Bloating": "While spayed females have a slightly higher risk of urinary incontinence, persistent bloating could indicate other gastrointestinal issues.",
          "Urination Changes": "Urinary incontinence can occasionally develop in spayed females due to reduced estrogen. This is treatable and should be evaluated by your vet.",
          "Weight Gain": "Spaying can slightly decrease metabolic rate. Monitor food intake and ensure regular exercise to maintain a healthy weight.",
          "Bleeding": "Any bleeding in a spayed female is abnormal and should be evaluated by a veterinarian, as it's not related to reproductive cycles."
        },
        "intact": { // Not spayed
          "general": "Intact female pets are at risk for several reproductive-related conditions including pyometra (uterine infection), mammary tumors, and complications from pregnancy.",
          "Bleeding": "In intact females, unexpected bleeding could be related to estrus cycles but can also indicate serious conditions like pyometra. Consult your veterinarian.",
          "Swelling": "Swelling in the mammary or genital areas of intact females can indicate infections, tumors, or pregnancy-related issues requiring veterinary attention.",
          "Aggression": "Hormonal fluctuations during heat cycles can cause behavioral changes including aggression or irritability in some intact females.",
          "Excessive Licking": "Excessive licking of the genital area in intact females might indicate heat cycles, infections, or other reproductive issues.",
          "Lethargy": "In intact females, lethargy combined with other symptoms could indicate pyometra, a life-threatening uterine infection requiring immediate veterinary care.",
          "Excessive Thirst": "Excessive drinking in intact females, especially after a heat cycle, could indicate developing pyometra and requires prompt veterinary attention."
        }
      }
    };
  }

  // Get all available symptoms
  getAllSymptoms() {
    return this.symptoms;
  }

  // Get first aid information for a specific symptom
  getFirstAidInfo(symptom) {
    return this.firstAidInfo[symptom] || "No specific first aid available. Please contact your veterinarian.";
  }

  // Get possible causes for a specific symptom
  getPossibleCauses(symptom) {
    return this.possibleCauses[symptom] || ["Unknown causes. Please consult with your veterinarian."];
  }

  // Get recommendation based on pet info and symptom
  getRecommendation(petInfo) {
    const { petType, mainSymptom, age, sex, isSpayed } = petInfo;
    
    // Basic recommendation template
    let recommendation = `Based on the information provided about your ${petType.toLowerCase()}`;
    
    if (petInfo.petName) {
      recommendation += ` ${petInfo.petName}`;
    }
    
    recommendation += `, showing symptoms of ${mainSymptom}, we recommend the following:\n\n`;
    
    // Add first aid info
    recommendation += `First Aid: ${this.getFirstAidInfo(mainSymptom)}\n\n`;
    
    // Add age-specific advice
    recommendation += "Age-Specific Considerations:\n";
    
    // General age advice
    if (this.ageSpecificConsiderations[age] && this.ageSpecificConsiderations[age]["general"]) {
      recommendation += this.ageSpecificConsiderations[age]["general"] + "\n\n";
    }
    
    // Symptom-specific age advice
    if (this.ageSpecificConsiderations[age] && this.ageSpecificConsiderations[age][mainSymptom]) {
      recommendation += this.ageSpecificConsiderations[age][mainSymptom] + "\n\n";
    }
    
    // NEW: Add neuter/spay specific considerations
    const neuterStatus = isSpayed ? "spayed" : "intact";
    recommendation += `${sex}-Specific Considerations (${neuterStatus}):\n`;
    
    // General neuter/spay advice
    if (this.neuterSpayConsiderations[sex] && 
        this.neuterSpayConsiderations[sex][neuterStatus] && 
        this.neuterSpayConsiderations[sex][neuterStatus]["general"]) {
      recommendation += this.neuterSpayConsiderations[sex][neuterStatus]["general"] + "\n\n";
    }
    
    // Symptom-specific neuter/spay advice
    if (this.neuterSpayConsiderations[sex] && 
        this.neuterSpayConsiderations[sex][neuterStatus] && 
        this.neuterSpayConsiderations[sex][neuterStatus][mainSymptom]) {
      recommendation += this.neuterSpayConsiderations[sex][neuterStatus][mainSymptom] + "\n\n";
    }
    
    // Recommendations for intact pets
    if (!isSpayed) {
      if (sex === "Female") {
        recommendation += "Additional Female Intact Considerations:\n";
        if (age === "Adult (2-7 years old)") {
          recommendation += "In intact female adult pets, symptoms can be related to reproductive cycles or conditions. Consider discussing spaying with your veterinarian to prevent reproductive health issues.\n\n";
        } else if (age === "Senior (8+ years old)") {
          recommendation += "In intact female senior pets, reproductive organ issues become more common with age. Consider consulting with your veterinarian about spaying to prevent conditions like pyometra (uterine infection) which can be life-threatening.\n\n";
        }
      } else if (sex === "Male") {
        recommendation += "Additional Male Intact Considerations:\n";
        if (age === "Adult (2-7 years old)" || age === "Senior (8+ years old)") {
          recommendation += "In intact male pets, certain behaviors and health issues can be related to hormonal influences. Consider discussing neutering with your veterinarian to prevent conditions like prostate issues and certain types of aggression.\n\n";
        }
      }
    }
    
    // Add urgency level
    const urgentSymptoms = ["Breathing Problems", "Blood in Stool", "Blood in Urine", "Seizures", "Paralysis", "Pale Gums"];
    
    // Additional urgent symptoms based on sex and neuter status
    if (sex === "Female" && !isSpayed && 
        (mainSymptom === "Lethargy" || mainSymptom === "Swelling" || 
         mainSymptom === "Fever" || mainSymptom === "Excessive Thirst")) {
      urgentSymptoms.push(mainSymptom); // Add these as urgent for intact females
    }
    
    if (sex === "Male" && !isSpayed && 
        (mainSymptom === "Pain" || mainSymptom === "Swelling" && age === "Senior (8+ years old)")) {
      urgentSymptoms.push(mainSymptom); // Add these as urgent for intact senior males
    }
    
    // Add age-specific urgency adjustments
    let urgencyMessage = "";
    if (urgentSymptoms.includes(mainSymptom)) {
      urgencyMessage = "⚠️ URGENT: This symptom may indicate a serious condition. Please seek veterinary care immediately.";
    } else {
      // Different follow-up timelines based on age
      if (age === "Puppy (up to 2 years old)") {
        urgencyMessage = "If symptoms persist for more than 12-24 hours or worsen, please consult with your veterinarian as young pets can deteriorate quickly.";
      } else if (age === "Senior (8+ years old)") {
        urgencyMessage = "If symptoms persist for more than 24 hours or worsen, please consult with your veterinarian as senior pets may have less reserve capacity to handle illness.";
      } else {
        urgencyMessage = "If symptoms persist for more than 24-48 hours or worsen, please consult with your veterinarian.";
      }
    }
    
    recommendation += urgencyMessage + "\n\n";
    
    // Add preventive advice based on symptom, age, and neuter/spay status
    recommendation += "Preventive Measures:\n";

// Vomiting or Diarrhea
if (mainSymptom === "Vomiting" || mainSymptom === "Diarrhea") {
  recommendation += "• Maintain a consistent diet and avoid sudden food changes\n";
  recommendation += "• Keep potentially harmful foods and objects out of reach\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Ensure proper vaccination to prevent infectious causes\n";
    recommendation += "• Regular deworming as recommended by your veterinarian\n";
  }
}

// Itching or Skin Problems
else if (mainSymptom === "Itching" || mainSymptom === "Skin Problems") {
  recommendation += "• Regular flea and tick prevention\n";
  recommendation += "• Regular grooming and skin checks\n";
  if (age === "Adult (2-7 years old)" || age === "Senior (8+ years old)") {
    recommendation += "• Consider environmental or food allergies if issues persist\n";
  }
}

// Limping
else if (mainSymptom === "Limping") {
  recommendation += "• Maintain appropriate exercise levels\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Ensure proper nutrition for developing bones and joints\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Consider joint supplements after discussing with your veterinarian\n";
    recommendation += "• Maintain a healthy weight to reduce stress on joints\n";
  }
}

// Aggression
else if (mainSymptom === "Aggression") {
  recommendation += "• Proper socialization and training\n";
  recommendation += "• Address potential behavioral triggers or anxiety\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Early training for behavior management\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Monitor for signs of pain or discomfort as aggression can be a symptom\n";
  }
}

// Urination Changes
else if (mainSymptom === "Urination Changes") {
  recommendation += "• Ensure access to clean, fresh water at all times\n";
  recommendation += "• Monitor urination patterns and avoid holding urine for extended periods\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Regular potty breaks during house training\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Regular veterinary check-ups for urinary tract or kidney issues\n";
  }
}

// Excessive Barking
else if (mainSymptom === "Excessive Barking") {
  recommendation += "• Provide adequate mental and physical stimulation\n";
  recommendation += "• Address boredom or anxiety as potential causes\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Training to manage barking and socialization\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Ensure comfort and reduce stress factors that could contribute to barking\n";
  }
}

// Swelling or Lumps
else if (mainSymptom === "Swelling" || mainSymptom === "Lumps") {
  recommendation += "• Regular veterinary exams to monitor any growths or changes in size\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Monitor for any new growths or swelling\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Routine vet checkups to detect tumors or cysts early\n";
  }
}

// Pain or Discomfort
else if (mainSymptom === "Pain" || mainSymptom === "Discomfort") {
  recommendation += "• Monitor for signs of injury, arthritis, or internal issues\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Ensure proper exercise to prevent injuries from overactivity\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Regular pain management options like joint supplements or medication after veterinary approval\n";
  }
}

// Bleeding
else if (mainSymptom === "Bleeding") {
  recommendation += "• Apply gentle pressure to stop bleeding and seek veterinary care\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Ensure that no sharp objects or dangerous items are accessible\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Monitor for excessive or recurring bleeding and discuss with your vet\n";
  }
}

// Excessive Thirst
else if (mainSymptom === "Excessive Thirst") {
  recommendation += "• Ensure access to clean water at all times and monitor water intake\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Ensure proper hydration during hot weather and after exercise\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Monitor for signs of kidney or diabetes issues and consult with your vet\n";
  }
}

// Lethargy
else if (mainSymptom === "Lethargy") {
  recommendation += "• Ensure a quiet and comfortable environment for rest\n";
  recommendation += "• Monitor for signs of underlying infections or health issues\n";
  if (age === "Puppy (up to 2 years old)") {
    recommendation += "• Ensure adequate rest between play and exercise\n";
  } else if (age === "Senior (8+ years old)") {
    recommendation += "• Schedule regular health check-ups to catch age-related health concerns early\n";
  }
}

    
    // Add spay/neuter recommendation for intact pets with relevant symptoms
    if (!isSpayed) {
      const reproductiveSymptoms = ["Aggression", "Urination Changes", "Swelling", "Bleeding", "Excessive Licking"];
      if (reproductiveSymptoms.includes(mainSymptom)) {
        recommendation += `• Consider discussing ${sex === "Male" ? "neutering" : "spaying"} with your veterinarian as a preventive measure\n`;
      }
    }
    
    return recommendation;
  }

  // Save session data to database or storage
  async saveSession(sessionData) {
    try {
      // In a real implementation, this would connect to your database
      console.log("Saving session data:", sessionData);
      
      // Simulate API call with a promise
      return new Promise((resolve) => {
        setTimeout(() => {
          // Generate a random session ID
          const sessionId = Math.random().toString(36).substring(2, 15);
          resolve({
            success: true,
            sessionId: sessionId,
            message: "Session saved successfully"
          });
        }, 500);
      });
    } catch (error) {
      console.error("Error saving session:", error);
      throw new Error("Failed to save session data");
    }
  }

  // Get session data by ID
  async getSession(sessionId) {
    try {
      // In a real implementation, this would fetch from your database
      console.log("Fetching session:", sessionId);
      
      // Simulate API call with a promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (sessionId) {
            // Mock session data
            resolve({
              success: true,
              sessionData: {
                petType: "Dog",
                petName: "Max",
                sex: "Male",
                age: "Adult (2-7 years old)",
                isSpayed: true,
                mainSymptom: "Limping",
                timestamp: new Date().toISOString()
              }
            });
          } else {
            reject(new Error("Invalid session ID"));
          }
        }, 500);
      });
    } catch (error) {
      console.error("Error fetching session:", error);
      throw new Error("Failed to retrieve session data");
    }
  }
}

export default PetSymptomModel;