/**
 * Prosperity Grid Demo Architecture - Core Script
 * This script is injected into every demo website to provide the persistent
 * top navigation bar and handle standard lead forms.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject the Demo Top Bar
    const nicheName = window.DemoConfig?.niche || 'this';
    const whatsappMsg = encodeURIComponent(`Hi The Prosperity Grid, I saw the ${nicheName} website demo and I'd like to discuss a similar system for my business.`);
    const whatsappLink = `https://wa.me/916000681916?text=${whatsappMsg}`;

    const demoBar = document.createElement('div');
    demoBar.className = 'fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4 sm:px-6 h-14 font-sans text-sm transition-transform duration-300';
    demoBar.id = 'pg-demo-bar';
    demoBar.innerHTML = `
        <div class="flex items-center">
            <a href="/demos/index.html" class="text-gray-400 hover:text-white transition-colors flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span class="hidden sm:inline font-medium">Explore Other Industries</span>
                <span class="sm:hidden font-medium">Back</span>
            </a>
        </div>
        <div class="hidden md:flex items-center justify-center flex-1 text-gray-500 text-xs font-medium tracking-wide">
            Demo concept by Prosperity Grid. Content and details are illustrative.
        </div>
        <div class="flex items-center">
            <a href="${whatsappLink}" target="_blank" class="bg-[#c6a664] hover:bg-yellow-600 text-black px-4 py-1.5 rounded-full font-bold transition-all shadow-[0_0_10px_rgba(198,166,100,0.3)] text-xs sm:text-sm">
                Get This For My Business
            </a>
        </div>
    `;
    
    // Add custom styles for the bar to avoid inheriting weird global styles
    const style = document.createElement('style');
    style.innerHTML = `
        #pg-demo-bar {
            font-family: 'Montserrat', sans-serif;
            color: #ffffff;
        }
        #pg-demo-bar * {
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(style);
    document.body.prepend(demoBar);
    
    // Ensure the body is pushed down so the fixed navbar doesn't cover content
    const currentPadding = window.getComputedStyle(document.body).paddingTop;
    if (currentPadding === '0px' || currentPadding === '') {
        document.body.style.paddingTop = '3.5rem';
    } else {
        // If there's already padding, add 3.5rem (56px) to it
        const newPadding = parseInt(currentPadding.replace('px', '')) + 56;
        document.body.style.paddingTop = `${newPadding}px`;
    }

    // Adjust any fixed navbars on the page to sit below our demo bar
    const fixedNavs = document.querySelectorAll('nav.fixed, header.fixed');
    fixedNavs.forEach(nav => {
        const currentTop = window.getComputedStyle(nav).top;
        if (currentTop === '0px') {
            nav.style.top = '3.5rem';
        }
    });

    // 2. Standardize Form Handling for Demos
    const forms = document.querySelectorAll('.demo-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerText = 'Sending...';
                btn.disabled = true;
                
                // Simulate network request
                setTimeout(() => {
                    form.innerHTML = `
                        <div class="text-center py-8 px-4 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm fade-up">
                            <div class="w-16 h-16 bg-[#c6a664]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#c6a664]">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h4 class="text-xl font-bold text-white mb-2">Enquiry Sent!</h4>
                            <p class="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">This is a demo form. In a live client project, this would instantly notify your team via email or WhatsApp and sync to your CRM.</p>
                        </div>
                    `;
                }, 1200);
            }
        });
    });
});
