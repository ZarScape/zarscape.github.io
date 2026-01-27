// Starfield Celestial Engine
(() => {
    const canvas = document.getElementById('starfield-canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    let DPR = window.devicePixelRatio || 1;
    let W, H, starSprite;
    let stars = [];
    const STAR_COUNT = 700; 

    function createStar() {
        const colors = [[255, 255, 255], [200, 220, 255], [255, 245, 230], [180, 200, 255]];
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.08, 
            vy: (Math.random() - 0.5) * 0.08,
            size: Math.random() * 1.3 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.005 + Math.random() * 0.015 
        };
    }

    function buildSprite() {
        const s = 16 * DPR;
        const oc = document.createElement('canvas');
        oc.width = oc.height = s;
        const g = oc.getContext('2d');
        const grad = g.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(255,255,255,0.5)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = grad;
        g.fillRect(0, 0, s, s);
        return oc;
    }

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W * DPR;
        canvas.height = H * DPR;
        ctx.scale(DPR, DPR);
        starSprite = buildSprite();
        initStars();
    }

    function initStars() { stars = Array.from({ length: STAR_COUNT }, createStar); }

    function render() {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            s.x += s.vx; s.y += s.vy;
            if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
            if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
            s.twinklePhase += s.twinkleSpeed;
            const twinkle = 0.3 + Math.abs(Math.sin(s.twinklePhase)) * 0.7;
            ctx.globalAlpha = twinkle;
            const sz = s.size * (0.8 + twinkle * 0.4);
            ctx.drawImage(starSprite, s.x - sz/2, s.y - sz/2, sz, sz);
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    requestAnimationFrame(render);
})();
let SOCIAL_LINKS, SKILLS, PROJECTS;

// Render Functions
const renderSkillsMarquee = () => {
    const container = document.getElementById('skills-container');
    const duplicated = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS]; 
    container.innerHTML = duplicated.map(s => `
        <div class="px-8 md:px-12 py-6 md:py-8 glass rounded-3xl border border-cyan-400/10 hover:border-cyan-400/40 transition-all mx-3 bg-[#082233]/10 flex flex-col items-center justify-center min-w-[150px] md:min-w-[200px]">
            <img src="${s.icon}" alt="${s.name}" class="h-16 md:h-20 mb-4 transition-all duration-300 grayscale hover:grayscale-0" />
            <h4 class="text-sm md:text-base font-black text-white uppercase tracking-tight">${s.name}</h4>
        </div>
    `).join('');
};

const renderSocials = () => {
    const container = document.getElementById('social-grid');
    container.innerHTML = SOCIAL_LINKS.map(s => `
        <a href="${s.link}" target="_blank" class="connect-card glass p-6 md:p-8 rounded-[2rem] border border-cyan-400/10 flex flex-col items-center text-center gap-4 relative">
            ${s.status ? `<span class="absolute top-4 right-4 text-[7px] font-black bg-cyan-400 text-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-glow">${s.status}</span>` : ''}
            <div class="mb-2 text-cyan-100">${s.icon}</div>
            <h5 class="text-xs md:text-sm font-black uppercase tracking-widest text-white transition-colors">${s.name}</h5>
        </a>
    `).join('');
};

const renderProjects = () => {
    const container = document.getElementById('projects-container');
    container.innerHTML = PROJECTS.map(p => `
        <div class="flex flex-col glass rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group border border-cyan-400/10 hover:border-cyan-400/40 transition-all bg-[#082233]/10 reveal">
            <div class="relative overflow-hidden aspect-[16/10]">
                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100">
                <div class="absolute inset-0 bg-gradient-to-t from-[#01080e] via-transparent to-transparent"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <a href="${p.link}" target="_blank" class="bg-[#99f6ff] text-black px-8 md:px-10 py-3 md:py-4 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transform translate-y-8 group-hover:translate-y-0 transition-transform shadow-2xl">Access Terminal</a>
                </div>
            </div>
            <div class="p-8 md:p-12 flex-1 flex flex-col relative">
                <div class="flex flex-wrap gap-2 mb-6 md:mb-8">${p.tags.map(t => `<span class="text-[8px] md:text-[9px] uppercase font-black tracking-widest text-cyan-400 px-2 md:px-3 py-1 bg-cyan-900/30 border border-cyan-500/20 rounded-md">${t}</span>`).join('')}</div>
                <h4 class="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">${p.title}</h4>
                <p class="text-cyan-100/40 text-sm md:text-base leading-relaxed mb-8 md:mb-10 font-light italic">"${p.description}"</p>
            </div>
        </div>
    `).join('');
};

const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {

    Promise.all([
        fetch('assets/json/social_links.json').then(res => res.json()),
        fetch('assets/json/skills.json').then(res => res.json()),
        fetch('assets/json/projects.json').then(res => res.json())
    ]).then(([socialLinks, skills, projects]) => {
        SOCIAL_LINKS = socialLinks;
        SKILLS = skills;
        PROJECTS = projects;

        renderSkillsMarquee();
        renderProjects();
        renderSocials();
        initScrollAnimations();
    });
    
    // Set dynamic year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const form = document.getElementById('contact-form');
    if (form) {
        const status = document.getElementById('contact-status');
        const setStatus = (text, ok) => {
            if (!status) return;
            status.textContent = text;
            status.classList.remove('hidden');
            status.classList.toggle('text-cyan-400/70', !!ok);
            status.classList.toggle('text-red-400/80', !ok);
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            if ((data.get('company') || '').toString().trim() !== '') {
                setStatus('Submission blocked.', false);
                return;
            }

            setStatus('Transmitting...', true);

            try {
                const res = await fetch('https://contact.zarscape-abuzar.workers.dev/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: data.get('name'),
                        email: data.get('email'),
                        message: data.get('message'),
                        page: window.location.href
                    })
                });

                if (!res.ok) throw new Error('Request failed');
                form.reset();
                setStatus('Request transmitted.', true);
            } catch {
                setStatus('Transmission failed. Try again later.', false);
            }
        });
    }
});

// Protection
document.addEventListener('contextmenu', e => { if (e.target.tagName === 'IMG') e.preventDefault(); }, false);
document.addEventListener('dragstart', e => { if (e.target.tagName === 'IMG') e.preventDefault(); }, false);
