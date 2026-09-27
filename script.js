// Add JavaScript code for your web site here and call it from index.html.
/* ============================================
   WEDDING WEBSITE JAVASCRIPT
   Organized by Unit & Feature
   ============================================ */


/* ============================================
   UNIT 5: DARK MODE TOGGLE
   Required: Toggle button, dark theme switching
   ============================================ */

// Select the theme toggle button
const themeButton = document.getElementById('theme-button');

// Callback function to toggle dark mode
const toggleDarkMode = () => {
  // Toggle the 'dark-mode' class on the body element
  document.body.classList.toggle('dark-mode');
  
  // Update button text based on current mode
  if (document.body.classList.contains('dark-mode')) {
    themeButton.textContent = '☀️ Light Mode';
  } else {
    themeButton.textContent = '🌙 Dark Mode';
  }
};

// Add click event listener to theme button
themeButton.addEventListener('click', toggleDarkMode);


/* ============================================
   UNIT 6: RSVP FORM HANDLING
   Required: Add participants when form submitted
   ============================================ */

// Select the RSVP form and submit button
const rsvpForm = document.getElementById('rsvp-form');
const submitButton = document.querySelector('.btn-rsvp-submit');

// Select all form inputs
const rsvpInputs = rsvpForm.elements;

// Callback function to add participant to list
const addParticipant = (person) => {
  const participantsList = document.getElementById('participants');
  const newParticipant = document.createElement('p');
  newParticipant.textContent = `💍 ${person.name} from ${person.hometown} is joining the crew.`;
  participantsList.appendChild(newParticipant);
  updateRSVPCount();
  document.getElementById('rsvp-name').value = '';
  document.getElementById('rsvp-state').value = '';
  document.getElementById('rsvp-email').value = '';
};

// Update RSVP count display
const updateRSVPCount = () => {
  // Get all participant items currently on page
  const participantItems = document.querySelectorAll('#participants p');
  const count = participantItems.length;
  
  // Update the count paragraph with emoji and message
  const countDisplay = document.getElementById('rsvp-count');
  countDisplay.textContent = `✨ ${count} guests are preparing to celebrate with us!`;
};


/* ============================================
   UNIT 7: FORM VALIDATION
   Required: Validate entries (min 2 chars)
   Invalid entries NOT added to list
   Error styling for invalid inputs
   ============================================ */

// Validation function
const validateForm = (event) => {
  event.preventDefault();
  
  let containsErrors = false;
  
  for (let i = 0; i < rsvpInputs.length; i++) {
    const currentInput = rsvpInputs[i];
    if (currentInput.type === 'submit') continue;
    
    if (currentInput.value.length < 2) {
      containsErrors = true;
      currentInput.classList.add('error');
    } else {
      currentInput.classList.remove('error');
    }
  }
  
  const emailInput = document.getElementById('rsvp-email');
  if (!emailInput.value.includes('@')) {
    containsErrors = true;
    emailInput.classList.add('error');
  } else {
    emailInput.classList.remove('error');
  }
  
  if (!containsErrors) {
    const person = {
      name: document.getElementById('rsvp-name').value,
      hometown: document.getElementById('rsvp-state').value,
      email: document.getElementById('rsvp-email').value
    };
    
    addParticipant(person);
    toggleModal(person);
  }
};

// Add click event listener to submit button with validation
submitButton.addEventListener('click', validateForm);


/* ============================================
   ADDITIONAL FEATURES: Smooth Scroll
   ============================================ */

// Smooth scroll for all anchor links on navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    // Scroll to target section smoothly
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


/* ============================================
   GUESTBOOK FEATURES (Bonus Interactivity)
   ============================================ */

// Category button functionality
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
  });
});

// Filter button functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all filter buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
  });
});

// UNIT 9: MODAL SETUP
const modal = document.getElementById('success-modal');
const modalContent = document.getElementById('modal-text');
const modalImage = document.getElementById('modal-image').querySelector('.modal-img');
let rotateFactor = 0;
let intervalId = null;

// UNIT 9: Animate image
const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  } else {
    rotateFactor = 0;
  }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

// UNIT 9: Show modal
const toggleModal = (person) => {
  modal.style.display = 'flex';
  modalContent.textContent = `Thank you for RSVPing, ${person.name}! We can't wait to see you at the event!`;
  intervalId = setInterval(animateImage, 500);
  
  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);
    rotateFactor = 0;
    modalImage.style.transform = 'rotate(0deg)';
  }, 5000);
};

// Event listener
submitButton.addEventListener('click', validateForm);