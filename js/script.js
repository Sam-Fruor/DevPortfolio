/* Redynox Internship Task 1 & 2
    Developer: Sameer Khan
    Features: Dark Mode, Form Validation, Mobile Menu, Typewriter
*/

document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. DARK MODE TOGGLE (LocalStorage) --- */
    const themeIcon = document.getElementById("theme-icon");
    const currentTheme = localStorage.getItem("theme");

    // Check LocalStorage on load
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if(themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    // Toggle Click Event
    if (themeIcon) {
        themeIcon.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            
            if (isDark) {
                // Switch to Light
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            } else {
                // Switch to Dark
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        });
    }


    /* --- 2. MOBILE NAVIGATION LOGIC --- */
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        if(burger) {
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
        }
    }
    navSlide();


    /* --- 3. TYPEWRITER EFFECT (Home Page) --- */
    const textElement = document.querySelector(".typewriter");
    if (textElement) {
        const texts = ["Java Developer.", "Full Stack Engineer.", "Problem Solver."];
        let count = 0;
        let index = 0;
        let currentText = "";
        let letter = "";

        (function type() {
            if (count === texts.length) {
                count = 0;
            }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            
            textElement.textContent = letter;
            
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000); // Pause at end of word
            } else {
                setTimeout(type, 100); // Typing speed
            }
        })();
    }


    /* --- 4. FORM LOGIC (Contact Page) --- */
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalBtnText = submitBtn.innerHTML;

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                showAlert("Please fill in all fields.", "error");
                return;
            }

            if (!validateEmail(email)) {
                showAlert("Please enter a valid email address.", "error");
                return;
            }

            setLoadingState(true);

            setTimeout(() => {
                const formData = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };

                console.log("✅ Form Data Captured:", formData);
                
                setLoadingState(false);
                showAlert("Message sent successfully! I'll get back to you soon.", "success");
                contactForm.reset(); 

            }, 2000);
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function setLoadingState(isLoading) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.style.opacity = "0.7";
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.opacity = "1";
            }
        }

        function showAlert(msg, type) {
            const alertDiv = document.createElement("div");
            alertDiv.className = `alert-message ${type}`;
            alertDiv.appendChild(document.createTextNode(msg));

            alertDiv.style.padding = "10px 20px";
            alertDiv.style.marginTop = "15px";
            alertDiv.style.borderRadius = "5px";
            alertDiv.style.fontWeight = "600";
            alertDiv.style.textAlign = "center";
            
            if(type === "error") {
                alertDiv.style.backgroundColor = "#fee2e2";
                alertDiv.style.color = "#ef4444";
                alertDiv.style.border = "1px solid #fca5a5";
            } else {
                alertDiv.style.backgroundColor = "#dcfce7";
                alertDiv.style.color = "#166534";
                alertDiv.style.border = "1px solid #86efac";
            }

            const formGroup = contactForm.querySelector(".form-group");
            contactForm.insertBefore(alertDiv, contactForm.firstChild);

            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }
    }
});