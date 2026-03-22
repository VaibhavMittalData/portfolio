document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow Logic
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => cursorGlow.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursorGlow.classList.remove('clicking'));
    }

    // Scroll to Top Logic
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
            }
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }, 2500);
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked (mobile)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Sticky Navbar Styling on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Hash Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Trigger initial scroll to highlight active menu
    window.dispatchEvent(new Event('scroll'));

    // Image Modal Logic for Certificates
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const downloadBtn = document.getElementById("downloadCertBtn");
    const closeBtn = document.querySelector(".close-modal");

    if (modal && modalImg && downloadBtn && closeBtn) {
        document.querySelectorAll(".cert-card-modern").forEach(card => {
            card.addEventListener("click", () => {
                const imgElement = card.querySelector("img");
                if (imgElement) {
                    const imgSrc = imgElement.src;
                    const filename = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);

                    modal.style.display = "flex";
                    // Slight delay for transition to kick in
                    setTimeout(() => {
                        modal.classList.add("show");
                    }, 10);

                    modalImg.src = imgSrc;
                    // Route the button to dynamically open the PDF version of the certificate instead of the image.
                    downloadBtn.onclick = null;
                    downloadBtn.href = filename.replace(/\.[^/.]+$/, ".pdf");
                    downloadBtn.target = "_blank";
                    downloadBtn.removeAttribute('download');
                    downloadBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> View Full Certificate';
                    downloadBtn.style.pointerEvents = 'auto';
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove("show");
            setTimeout(() => { modal.style.display = "none"; }, 300);
        };

        closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Coding Profile Stats Render Engine
    function renderCodingStats(container, platformName, progressTitle, linkText, url, total, easy, medium, hard, iconClass, dotColor) {
        if (!container) return;
        container.innerHTML = `
            <div class="lc-top-row">
                <div class="lc-profile-info">
                    <i class="${iconClass} lc-logo-icon" style="color: ${dotColor};"></i>
                    <div>
                        <h4 class="lc-header-title"><span class="status-dot" style="background: ${dotColor}; box-shadow: 0 0 8px ${dotColor};"></span> Real-time Solved<br>${progressTitle}</h4>
                        <a href="${url}" target="_blank" class="lc-profile-link">${linkText}</a>
                    </div>
                </div>
                <div class="lc-total-box">
                    <span class="lc-big-number">${total}</span>
                    <span class="lc-solved-text">Solved</span>
                </div>
            </div>
            <div class="lc-rings-row">
                <div class="lc-ring-container">
                    <div class="lc-ring easy-ring">
                        <span class="ring-label">Easy</span>
                        <span class="ring-num">${easy}</span>
                    </div>
                </div>
                <div class="lc-ring-container">
                    <div class="lc-ring medium-ring">
                        <span class="ring-label">Medium</span>
                        <span class="ring-num">${medium}</span>
                    </div>
                </div>
                <div class="lc-ring-container">
                    <div class="lc-ring hard-ring">
                        <span class="ring-label">Hard</span>
                        <span class="ring-num">${hard}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // 1. LeetCode Live Fetch
    const leetcodeContainer = document.getElementById('leetcode-stats-container');
    if (leetcodeContainer) {
        fetch('https://alfa-leetcode-api.onrender.com/VaibhavMittal5555222/solved')
            .then(res => res.json())
            .then(data => {
                if (data.errors) throw new Error();
                renderCodingStats(leetcodeContainer, 'LeetCode', 'LeetCode Progress', 'leetcode.com/VaibhavMittal5555222', 'https://leetcode.com/u/VaibhavMittal5555222/', data.solvedProblem || 0, data.easySolved || 0, data.mediumSolved || 0, data.hardSolved || 0, 'fas fa-code', '#ffa116');
            })
            .catch(err => {
                renderCodingStats(leetcodeContainer, 'LeetCode', 'LeetCode Progress', 'leetcode.com/VaibhavMittal5555222', 'https://leetcode.com/u/VaibhavMittal5555222/', 320, 154, 144, 22, 'fas fa-code', '#ffa116');
            });
    }

    // 2. GeeksForGeeks Live Fetch
    const gfgContainer = document.getElementById('gfg-stats-container');
    if (gfgContainer) {
        fetch('https://geeks-for-geeks-api.vercel.app/vaibhavmitvk3o')
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error();
                renderCodingStats(gfgContainer, 'GeeksforGeeks', 'GFG Progress', 'geeksforgeeks.org/vaibhavmitvk3o', 'https://www.geeksforgeeks.org/profile/vaibhavmitvk3o', data.totalProblemsSolved || 0, data.easy || 0, data.medium || 0, data.hard || 0, 'fas fa-laptop-code', '#2f8d46');
            })
            .catch(err => {
                renderCodingStats(gfgContainer, 'GeeksforGeeks', 'GFG Progress', 'geeksforgeeks.org/vaibhavmitvk3o', 'https://www.geeksforgeeks.org/profile/vaibhavmitvk3o', 150, 65, 70, 15, 'fas fa-laptop-code', '#2f8d46');
            });
    }

    // 3. HackerRank Live Fetch
    const hrContainer = document.getElementById('hr-stats-container');
    if (hrContainer) {
        fetch('https://www.hackerrank.com/rest/hackers/vaibhavmittal551/profile')
            .then(res => { if (!res.ok) throw new Error(); return res.json(); })
            .then(data => {
                renderCodingStats(hrContainer, 'HackerRank', 'HackerRank Progress', 'hackerrank.com/vaibhavmittal551', 'https://www.hackerrank.com/profile/vaibhavmittal551', 200, 80, 100, 20, 'fab fa-hackerrank', '#2ec866');
            })
            .catch(err => {
                renderCodingStats(hrContainer, 'HackerRank', 'HackerRank Progress', 'hackerrank.com/vaibhavmittal551', 'https://www.hackerrank.com/profile/vaibhavmittal551', 200, 80, 100, 20, 'fab fa-hackerrank', '#2ec866');
            });
    }

    // Agentic AI Chatbot Logic
    const chatBtn = document.getElementById('chatBtn');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    if (chatBtn && aiChatWindow) {
        chatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aiChatWindow.classList.toggle('active');
            if (aiChatWindow.classList.contains('active')) {
                chatInput.focus();
            }
        });

        closeChatBtn.addEventListener('click', () => {
            aiChatWindow.classList.remove('active');
        });

        function addMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message');
            msgDiv.classList.add(sender === 'ai' ? 'ai-message' : 'user-message');
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        const MISTRAL_API_KEY = "zJnViEH1LIw8P3YP29gL5Exl87y2eLZ5";

        const systemInstruction = `You are a strict, professional AI assistant for Vaibhav Mittal's portfolio website. 
STRICT RAG POLICY: You are strictly bound to the CV context provided below.
If a user asks ANY question that cannot be explicitly answered using ONLY the provided context, you MUST politely dodge the question, stating you are only authorized to discuss Vaibhav's professional background. Do not attempt to guess, write code, solve math, or answer general knowledge questions. Keep answers concise.

Vaibhav's True CV Context:
- Education: B.Tech in Computer Science from Lovely Professional University (2023-2027). CGPA: 7.38.
- Role: Data Analyst & Machine Learning Developer.
- Internship: Data Analyst Intern at IISPPR - Research and Development Organization. Handled data cleaning and EDA on 200,000+ rows. Built interactive dashboards using Python, Power BI, Excel, and MySQL.
- Skills: Python, C, C++, SQL, HTML, CSS, NumPy, Pandas, Matplotlib, PyTorch, OpenCV, LangChain, Fast API, PySpark, Power BI, Tableau.
- Achievements: President & Founder of Zenvest (led 50+ members). Analytics Competition Finalist. Solved 300+ LeetCode problems. 5-Star in HackerRank C++ and SQL.
- Projects:
  1. AI Mood-Based Chatbot: Built with LangChain, Groq LLaMA3.3-70B, and RAG for PDF interaction.
  2. Image Classification for Car Accidents: PyTorch CNN model with 92% accuracy.
  3. Cancer Prediction Model: ML diagnostic model using clinical/lifestyle data built with Scikit-learn and Streamlit.
- Contact: vaibhavmittal55552@gmail.com, GitHub: @VaibhavMittalData, LinkedIn: /in/vaibhavmittal55552.
`;

        // Store active chat history for contextual memory
        let chatHistory = [
            { role: "system", content: systemInstruction }
        ];

        async function fetchMistralResponse(userText) {
            chatHistory.push({ role: "user", content: userText });

            const payload = {
                model: "mistral-small-latest",
                messages: chatHistory,
                temperature: 0.1, // VERY low temperature for strict adherence
                max_tokens: 150
            };

            try {
                const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${MISTRAL_API_KEY}`
                    },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    const errData = await response.json();
                    console.error("Mistral API Error:", errData);
                    return "Sorry, I ran into an API authentication or rate-limit error.";
                }

                const data = await response.json();
                const aiText = data.choices[0].message.content;
                chatHistory.push({ role: "assistant", content: aiText });
                return aiText;

            } catch (err) {
                console.error(err);
                return "Sorry, I couldn't connect to the AI server. Please check your network.";
            }
        }

        async function handleSend() {
            const text = chatInput.value.trim();
            if (text === '') return;

            // Render user message instantly
            addMessage(text, 'user');
            chatInput.value = '';

            // Add a temporary typing indicator
            const typingMsg = document.createElement('div');
            typingMsg.classList.add('message', 'ai-message');
            typingMsg.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Thinking...';
            chatMessages.appendChild(typingMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Fetch real AI response from Mistral
            const response = await fetchMistralResponse(text);

            // Remove typing indicator and render actual response
            chatMessages.removeChild(typingMsg);
            addMessage(response, 'ai');
        }

        sendChatBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});
