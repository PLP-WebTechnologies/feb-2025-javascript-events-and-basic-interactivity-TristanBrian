document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Button Click
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.classList.add('celebrate');
        setTimeout(() => clickOutput.classList.remove('celebrate'), 500);
    });
    
    // Hover Effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Hover detected! 👆";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Waiting for hover...";
    });
    
    // Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
    });
    
    // Secret Action (Double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let longPressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = "You found the double-click secret! 🎊";
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(function() {
            secretOutput.textContent = "You found the long press secret! 🕒";
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // ========== Interactive Elements ==========
    
    // Color Changing Button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color: ${colors[colorIndex]}`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.image-gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('invalid');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('invalid');
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
            return true;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('invalid');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        let strength = 0;
        
        // Check password length
        if (password.length === 0) {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = '';
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid');
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('invalid');
            strengthBar.style.width = '30%';
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid');
            
            // Check for other strength factors
            if (/[A-Z]/.test(password)) strength += 20;
            if (/[0-9]/.test(password)) strength += 20;
            if (/[^A-Za-z0-9]/.test(password)) strength += 20;
            strength += Math.min(40, (password.length - 8) * 5);
            
            strength = Math.min(100, strength);
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 50) {
                strengthBar.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Weak';
            } else if (strength < 80) {
                strengthBar.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Moderate';
            } else {
                strengthBar.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
            
            return true;
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            formStatus.textContent = 'Form submitted successfully! 🎉';
            formStatus.style.color = '#2ecc71';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                formStatus.textContent = '';
                strengthBar.style.width = '0%';
                strengthText.textContent = '';
            }, 2000);
        } else {
            formStatus.textContent = 'Please fix the errors above';
            formStatus.style.color = '#e74c3c';
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    });
});