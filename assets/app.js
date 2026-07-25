const roles = [
  {
    name: "Killian “Kill” Cook’em",
    billing: "The action-comedy anchor",
    image: "assets/art/kill-warrior.webp",
    quote: "Freedom tastes better charbroiled.",
    desc: "A former Navy SEAL turned White House executive chef: enormous, charismatic, disciplined and genuinely gifted in the kitchen. Cooking is how he cares for people. Violence is what he uses when someone interrupts dinner.",
    promise: "Physical comedy with real heart, explosive action and a franchise-leading hero.",
  },
  {
    name: "President Daniels",
    billing: "The underestimated wartime president",
    image: "assets/art/president-daniels.webp",
    quote: "I didn’t become President to negotiate with livestock.",
    desc: "Athletic, relaxed and politically instinctive. Daniels lets opponents mistake his humour for stupidity—then becomes the most difficult man in the room to intimidate. Kill’s closest friend, workout partner and fiercest gambling rival.",
    promise: "Deadpan comedy, command presence and action-star physicality.",
    sheet: true,
  },
  {
    name: "Agent Steele",
    billing: "The lethal straight arrow",
    image: "assets/art/steele.webp",
    quote: "I’m surrounded by heavily armed children.",
    desc: "A highly disciplined Secret Service agent who begins as the exhausted adult in the room and evolves into Kill’s principal combat partner—and the most dangerous blackjack player at 21Zero.",
    promise: "Tactical authority, dry comedy and an unexpected appetite for risk.",
  },
  {
    name: "Admiral Baa",
    billing: "The theatrical galactic tyrant",
    image: "assets/art/baa.webp",
    quote: "I do not negotiate. I provide opportunities to agree.",
    desc: "A narcissistic goat-like supreme commander who moves from Shakespearean grandeur to childish outrage in seconds. Baa is hilarious, musically theatrical and still a genuine threat.",
    promise: "A full-volume villain: physical, vocal, musical, absurd and frightening in equal measure.",
  },
];

const body = document.body;
const gate = document.getElementById("gate");
const presentation = document.getElementById("presentation");
const accessForm = document.getElementById("access-form");
const accessInput = document.getElementById("access-password");
const accessError = document.getElementById("access-error");
const accessKey = "kc-film-access-v3";

function unlock() {
  sessionStorage.setItem(accessKey, "yes");
  body.classList.remove("locked");
  gate.hidden = true;
  presentation.removeAttribute("aria-hidden");
  window.scrollTo(0, 0);
}

if (sessionStorage.getItem(accessKey) === "yes") unlock();
else {
  presentation.setAttribute("aria-hidden", "true");
  window.setTimeout(() => accessInput.focus(), 50);
}

accessForm.addEventListener("submit", event => {
  event.preventDefault();
  if (accessInput.value.trim().toLowerCase() === "cookedup") {
    accessError.hidden = true;
    unlock();
  } else {
    accessError.hidden = false;
    accessInput.focus();
    accessInput.select();
  }
});

const nav = document.getElementById("nav");
function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 28); }
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach(node => observer.observe(node));

const roleImageWrap = document.getElementById("role-image-wrap");
const roleImage = document.getElementById("role-image");
const roleBilling = document.getElementById("role-billing");
const roleName = document.getElementById("role-name");
const roleQuote = document.getElementById("role-quote");
const roleDesc = document.getElementById("role-desc");
const rolePromise = document.getElementById("role-promise");
const roleTabs = [...document.querySelectorAll("[data-role]")];

roleTabs.forEach(button => button.addEventListener("click", () => {
  const index = Number(button.dataset.role);
  const role = roles[index];
  roleTabs.forEach(tab => tab.classList.toggle("active", tab === button));
  roleImage.src = role.image;
  roleImage.alt = `${role.name} concept art`;
  roleImageWrap.classList.toggle("character-sheet", Boolean(role.sheet));
  roleBilling.textContent = role.billing;
  roleName.textContent = role.name;
  roleQuote.textContent = `“${role.quote}”`;
  roleDesc.textContent = role.desc;
  rolePromise.textContent = role.promise;
}));

const modal = document.getElementById("materials-modal");
const closeModal = document.getElementById("close-modal");
const returnPresentation = document.getElementById("return-presentation");
let lastFocused = null;

function showModal(event) {
  lastFocused = event.currentTarget;
  modal.hidden = false;
  body.classList.add("modal-open");
  closeModal.focus();
}

function hideModal() {
  modal.hidden = true;
  body.classList.remove("modal-open");
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll(".open-modal").forEach(button => button.addEventListener("click", showModal));
closeModal.addEventListener("click", hideModal);
returnPresentation.addEventListener("click", hideModal);
modal.addEventListener("mousedown", event => {
  if (event.target === modal) hideModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) hideModal();
});
