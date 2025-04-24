// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Toggle Navigation
const navSlide = () => {
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Close mobile menu when clicking on a nav link
const closeNavOnClick = () => {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
};

// Sticky Header on Scroll
const stickyHeader = () => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// Project Filtering
const filterProjects = () => {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                
                // Add animation
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.8s ease-in-out';
                }, 100);
            });
        });
    });
};

// Smooth Scrolling for Anchor Links
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Form Submission
const handleFormSubmission = () => {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just log it and show a success message
            console.log('Form Data:', formData);
            
            // Show success message
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => group.style.display = 'none');
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                formGroups.forEach(group => group.style.display = 'block');
                submitBtn.style.display = 'block';
                successMessage.remove();
                contactForm.reset();
            }, 5000);
        });
    }
};

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillSection = document.querySelector('.skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const showSkills = () => {
        const sectionPosition = skillSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            skillLevels.forEach(skill => {
                skill.style.animation = 'skillFill 1.5s ease-in-out';
            });
            window.removeEventListener('scroll', showSkills);
        }
    };
    
    window.addEventListener('scroll', showSkills);
};

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    const showElement = () => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s ease-in-out';
    });
    
    window.addEventListener('scroll', showElement);
    // Initial check
    showElement();
};

// Burger Animation
const animateBurger = () => {
    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
    });
};

// Initialize all functions
const app = () => {
    navSlide();
    closeNavOnClick();
    stickyHeader();
    filterProjects();
    smoothScroll();
    handleFormSubmission();
    animateSkillBars();
    animateOnScroll();
    animateBurger();
};

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', app);

// Add toggle class to burger
burger.addEventListener('click', () => {
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');
    const line3 = document.querySelector('.line3');
    
    line1.classList.toggle('toggle1');
    line2.classList.toggle('toggle2');
    line3.classList.toggle('toggle3');
});

// Add CSS for burger animation
const style = document.createElement('style');
style.textContent = `
    .toggle1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .toggle2 {
        opacity: 0;
    }
    .toggle3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    .success-message {
        text-align: center;
        padding: 20px;
        color: var(--success-color);
    }
    .success-message i {
        font-size: 3rem;
        margin-bottom: 15px;
    }
`;
document.head.appendChild(style);