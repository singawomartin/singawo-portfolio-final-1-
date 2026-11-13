
/* ===== EDIT THIS BLOCK: contact details and picture paths ===== */
const CONFIG={
  email:"your.email@example.com",
  github:"https://github.com/",
  linkedin:"https://www.linkedin.com/",
  profilePhoto:"images/profile.jpg",
  aboutPhoto:"images/about.jpg",       // second photo in the About section   // put your photo here (placeholder shows if missing)
  projects:[
    {title:"Garage Management System",type:"Web application",image:"images/projects/garage.jpg",repo:"",
     text:"A web-based system for organising garage operations: customers, vehicles, jobs and invoices, backed by a MySQL database.",
     points:["Customer and vehicle records","Service job tracking","MySQL database integration","Built with PHP, XAMPP and VS Code"],tags:["PHP","MySQL","HTML / CSS / JS"]},
    {title:"Smart Environmental Monitoring",type:"Internet of Things",image:"images/projects/iot.jpg",repo:"",
     text:"An Arduino-based project that reads gas, rain and light sensors, stores the data in MySQL and shows results on a web dashboard.",
     points:["MQ-2 gas, rain and light sensors","Readings stored in MySQL","PHP dashboard for live viewing","Full multi-chapter documentation"],tags:["Arduino","Python","MySQL","PHP"]},
    {title:"Pharmacy Finder System",type:"Health technology",image:"images/projects/pharmacy.jpg",repo:"",
     text:"A project idea to help people connect with pharmacies, with a longer-term direction toward healthcare interoperability and FHIR readiness.",
     points:["Search for nearby pharmacies","API-driven design","Exploring FHIR standards"],tags:["Web Development","APIs","FHIR (learning)"]}
  ]
};
/* ======================================================================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ph=(t,c)=>"data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><rect width='600' height='400' fill='#0b1226'/><rect x='20' y='20' width='560' height='360' fill='none' stroke='#2f7bff' stroke-opacity='.4' stroke-dasharray='8'/><text x='300' y='205' fill='#6aa2ff' font-family='sans-serif' font-size='22' text-anchor='middle'>${t}</text></svg>`);
{const pp=$("#profilePhoto");pp.onerror=()=>{pp.onerror=null;pp.src=ph("YOUR PROFILE PHOTO")};pp.src=CONFIG.profilePhoto||ph("YOUR PROFILE PHOTO")}
{const ap=$("#aboutPhoto");ap.onerror=()=>{ap.onerror=null;ap.src=ph("ABOUT PHOTO")};ap.src=CONFIG.aboutPhoto||ph("ABOUT PHOTO")}
$("#year").textContent=new Date().getFullYear();
$("#emailLink").href="mailto:"+CONFIG.email;$("#emailLink").textContent=CONFIG.email+" ↗";
$("#githubLink").href=CONFIG.github;$("#linkedinLink").href=CONFIG.linkedin;

// theme (remembered when storage is available)
const root=document.documentElement;
function setTheme(t){root.dataset.theme=t;$("#theme").textContent=t==="dark"?"☾":"☀";try{localStorage.setItem("theme",t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem("theme")}catch(e){}
setTheme(saved||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"));
$("#theme").onclick=()=>setTheme(root.dataset.theme==="dark"?"light":"dark");

// mobile menu
$("#menu").onclick=()=>{const o=$("#links").classList.toggle("open");$("#menu").setAttribute("aria-expanded",o)};
$$("#links a").forEach(a=>a.onclick=()=>{$("#links").classList.remove("open");$("#menu").setAttribute("aria-expanded","false")});

// typing effect
const roles=["Computer Science student","networking enthusiast","aspiring security engineer","builder of useful software"];
let ri=0,ci=0,del=false;const tp=$("#typed");
(function type(){const w=roles[ri];tp.textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(type,1500)}
 if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
 ci+=del?-1:1;setTimeout(type,del?30:60)})();

// skills filter
$$("#skillTabs .tab").forEach(b=>b.onclick=()=>{
 $$("#skillTabs .tab").forEach(x=>x.classList.toggle("on",x===b));
 $$("#skillGrid .card").forEach(c=>c.classList.toggle("hide",b.dataset.f!=="all"&&!c.dataset.c.split(" ").includes(b.dataset.f)))});

// projects + modal
const grid=$("#projGrid"),dlg=$("#dlg");
CONFIG.projects.forEach((p,i)=>{
 const b=document.createElement("button");b.className="proj reveal";b.type="button";
 b.innerHTML=`<img src="${p.image||ph("PROJECT IMAGE "+(i+1))}" alt="${p.title} preview" onerror="this.onerror=null;this.src=ph('PROJECT IMAGE ${i+1}')"><div class="body"><div class="top"><span>${p.type.toUpperCase()}</span><span>0${i+1}</span></div><h3>${p.title}</h3><p>${p.text}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div><span class="more">View details →</span></div>`;
 b.onclick=()=>{$("#dlBody").innerHTML=`<img src="${p.image||ph("PROJECT IMAGE "+(i+1))}" alt="" onerror="this.onerror=null;this.src=ph('PROJECT IMAGE ${i+1}')"><div class="in"><p class="eyebrow">${p.type}</p><h3>${p.title}</h3><p>${p.text}</p><ul>${p.points.map(x=>`<li>${x}</li>`).join("")}</ul><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div><div style="display:flex;gap:10px;margin-top:20px">${p.repo?`<a class="btn btn-p" target="_blank" rel="noreferrer" href="${p.repo}">View repository ↗</a>`:""}<button class="btn btn-g" type="button" id="close">Close</button></div></div>`;
  dlg.showModal();$("#close").onclick=()=>dlg.close()};
 grid.appendChild(b)});
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});

// contact form with validation
$("#copyEmail").onclick=async()=>{try{await navigator.clipboard.writeText(CONFIG.email);$("#copyEmail").textContent="Copied ✓"}catch(e){$("#copyEmail").textContent=CONFIG.email}setTimeout(()=>$("#copyEmail").textContent="Copy email address",2000)};
$("#form").addEventListener("submit",e=>{
 e.preventDefault();const f=e.currentTarget;
 const n=f.name.value.trim(),m=f.email.value.trim(),t=f.message.value.trim();
 $("#e1").textContent=n?"":"Please enter your name.";
 $("#e2").textContent=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)?"":"Please enter a valid email.";
 $("#e3").textContent=t.length>=10?"":"Message should be at least 10 characters.";
 if(!n||$("#e2").textContent||$("#e3").textContent)return;
 location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent("Portfolio enquiry from "+n)}&body=${encodeURIComponent(`Name: ${n}\nEmail: ${m}\n\n${t}`)}`;
 $("#note").textContent="Your email app should now open with the message ready. If not, copy my email address and write to me directly.";f.reset()});

// reveal, counters, scroll-spy, progress, back-to-top
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.1});
$$(".reveal").forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;co.unobserve(x.target);
 const n=+x.target.dataset.n;let v=0;const s=setInterval(()=>{v++;x.target.textContent=v+(n>=10?"+":"");if(v>=n)clearInterval(s)},900/n)}));
$$("[data-n]").forEach(el=>co.observe(el));
const secs=$$("main section[id]"),nav=$$("#links a");
addEventListener("scroll",()=>{
 const h=document.documentElement,y=scrollY;
 $("#progress").style.width=(y/(h.scrollHeight-innerHeight)*100)+"%";
 $("#top").classList.toggle("show",y>600);
 let cur="";secs.forEach(s=>{if(y+120>=s.offsetTop)cur=s.id});
 nav.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur))},{passive:true});
$("#top").onclick=()=>scrollTo({top:0});
