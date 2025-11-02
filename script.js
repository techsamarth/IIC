// Starfield Animation
function createStarfield() {
    const starfield = document.getElementById('starfield');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (0.5px to 2px)
        const size = Math.random() * 1.5 + 0.5;
        
        // Random opacity
        const opacity = Math.random() * 0.7 + 0.3;
        
        // Random animation delay and duration
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
        
        starfield.appendChild(star);
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Participant management for registration form
let participantCount = 1;

function initializeParticipantManagement() {
    const addParticipantBtn = document.getElementById('addParticipant');
    if (addParticipantBtn) {
        addParticipantBtn.addEventListener('click', function() {
            if (participantCount < 4) {
                participantCount++;
                const container = document.getElementById('participantsContainer');
                
                const participantRow = document.createElement('div');
                participantRow.classList.add('participant-row');
                participantRow.innerHTML = `
                    <div class="form-group">
                        <label>Participant ${participantCount} Name</label>
                        <input type="text" class="form-control participant-name" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control participant-email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone No.</label>
                        <input type="tel" class="form-control participant-phone" required>
                    </div>
                    <button type="button" class="remove-participant">-</button>
                `;
                
                container.appendChild(participantRow);
                
                // Add event listener to the new remove button
                participantRow.querySelector('.remove-participant').addEventListener('click', function() {
                    container.removeChild(participantRow);
                    participantCount--;
                    updateParticipantLabels();
                });
                
                updateParticipantLabels();
            } else {
                alert('Maximum 4 participants per team allowed.');
            }
        });
    }
}

function updateParticipantLabels() {
    const labels = document.querySelectorAll('.participant-row .form-group label');
    labels.forEach((label, index) => {
        if (index % 3 === 0) {
            label.textContent = `Participant ${Math.floor(index/3) + 1} Name`;
        }
    });
}

// Form submission
function initializeFormSubmission() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // In a real application, you would send the form data to a server here
                // For this example, we'll just show the success modal
                
                document.getElementById('successModal').classList.add('active');
            }
        });
    }
}

// Form validation
function validateForm() {
    const teamName = document.getElementById('teamName');
    const startupTitle = document.getElementById('startupTitle');
    const startupDescription = document.getElementById('startupDescription');
    
    if (!teamName.value.trim()) {
        showError(teamName, 'Team name is required');
        return false;
    }
    
    if (!startupTitle.value.trim()) {
        showError(startupTitle, 'Startup title is required');
        return false;
    }
    
    if (!startupDescription.value.trim()) {
        showError(startupDescription, 'Startup description is required');
        return false;
    }
    
    // Validate participants
    const participantNames = document.querySelectorAll('.participant-name');
    const participantEmails = document.querySelectorAll('.participant-email');
    const participantPhones = document.querySelectorAll('.participant-phone');
    
    for (let i = 0; i < participantNames.length; i++) {
        if (!participantNames[i].value.trim()) {
            showError(participantNames[i], 'Participant name is required');
            return false;
        }
        
        if (!participantEmails[i].value.trim()) {
            showError(participantEmails[i], 'Participant email is required');
            return false;
        }
        
        if (!isValidEmail(participantEmails[i].value)) {
            showError(participantEmails[i], 'Please enter a valid email address');
            return false;
        }
        
        if (!participantPhones[i].value.trim()) {
            showError(participantPhones[i], 'Participant phone is required');
            return false;
        }
    }
    
    return true;
}

function showError(element, message) {
    // Remove any existing error
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    element.style.borderColor = 'var(--accent-pink)';
    element.style.boxShadow = '0 0 0 2px rgba(255, 42, 109, 0.2)';
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.style.color = 'var(--accent-pink)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.3rem';
    errorElement.textContent = message;
    
    element.parentNode.appendChild(errorElement);
    
    // Remove error on input
    element.addEventListener('input', function() {
        element.style.borderColor = '';
        element.style.boxShadow = '';
        if (errorElement) {
            errorElement.remove();
        }
    }, { once: true });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Modal functions
function closeModal() {
    document.getElementById('successModal').classList.remove('active');
    // Reset form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.reset();
        // Reset participants
        const container = document.getElementById('participantsContainer');
        container.innerHTML = `
            <div class="participant-row">
                <div class="form-group">
                    <label>Participant 1 Name</label>
                    <input type="text" class="form-control participant-name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control participant-email" required>
                </div>
                <div class="form-group">
                    <label>Phone No.</label>
                    <input type="tel" class="form-control participant-phone" required>
                </div>
            </div>
        `;
        participantCount = 1;
        
        // Redirect to home page after a delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Shooting star effect
function createShootingStar() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.style.position = 'absolute';
    shootingStar.style.width = '2px';
    shootingStar.style.height = '2px';
    shootingStar.style.background = 'white';
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.boxShadow = '0 0 10px 2px white';
    shootingStar.style.top = `${Math.random() * 30}%`;
    shootingStar.style.left = `${Math.random() * 20}%`;
    
    starfield.appendChild(shootingStar);
    
    // Animate the shooting star
    const keyframes = [
        { transform: 'translate(0, 0)', opacity: 0 },
        { transform: 'translate(100vw, 100vh)', opacity: 1 }
    ];
    
    const animation = shootingStar.animate(keyframes, {
        duration: 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        starfield.removeChild(shootingStar);
    };
    
    // Schedule next shooting star
    setTimeout(createShootingStar, Math.random() * 8000 + 4000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createStarfield();
    createShootingStar();
    initializeParticipantManagement();
    initializeFormSubmission();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});