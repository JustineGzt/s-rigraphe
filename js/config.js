/* ==========================================================================
   RÉGLAGES DU SITE — c'est le seul fichier à modifier
   ========================================================================== */
window.SITE_CONFIG = {

  /* ---------- Ton entreprise ---------- */
  brand: 'Atelier CréerSon',
  email: 'creerson@proton.me',      // ← adresse qui reçoit les demandes
  phone: '',                         // ex. '06 12 34 56 78' (vide = masqué)
  whatsapp: '',                      // ex. '33612345678' (format international sans +, vide = masqué)
  instagram: '',                     // ex. 'https://instagram.com/tonatelier'
  tiktok: '',
  facebook: '',

  /* ---------- Réception des demandes ---------- */
  // Laisse vide : la maquette se télécharge et l'email du client s'ouvre pré-rempli.
  // Avec un service de formulaire (ex. Formspree, plan avec fichiers), tout t'arrive
  // directement, fichiers compris : 'https://formspree.io/f/xxxxxxx'
  formEndpoint: 'https://formsubmit.co/ajax/918fd802f469b5d569b304e08732003f',   // code FormSubmit lié à creerson@proton.me

  // Lien de paiement d'acompte (Stripe Payment Link, SumUp, PayPal.me…), vide = masqué
  paymentLink: '',

  /* ---------- Tes photos de réalisations ----------
     Mets tes photos dans le dossier images/realisations/ puis ajoute-les ici.
     Tant que la liste est vide, la section n'apparaît pas. */
  realisations: [
    // { src: 'images/realisations/club-foot.jpg', title: 'Maillots FC Ville', tags: 'Sérigraphie · 40 pièces' },
  ],

  /* ---------- Tarifs indicatifs TTC (en €) ---------- */
  articles: {
    tshirt: {
      label: 'T-shirt', base: 9,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      fits: {
        classique: { label: 'Classique', price: 0 },
        oversize:  { label: 'Oversize', price: 4 },
        cintre:    { label: 'Cintré', price: 1 },
        colv:      { label: 'Col V', price: 1 },
        longues:   { label: 'Manches longues', price: 5 },
        heritage:  { label: 'Cotton Heritage', price: 4 },   // coupe oversize, seul modèle brodable
      },
      materials: [
        { id: 'coton',    name: 'Coton peigné',        gsm: '180 g/m²',        desc: 'Doux et polyvalent, le grand classique.', price: 0 },
        { id: 'bio',      name: 'Coton bio',           gsm: '180 g/m² · GOTS', desc: 'Certifié biologique, même douceur.',      price: 2.5 },
        { id: 'heavy',    name: 'Coton épais',         gsm: '240 g/m²',        desc: 'Tombé premium, parfait en oversize.',     price: 4.5 },
        { id: 'sport',    name: 'Polyester technique', gsm: '140 g/m²',        desc: 'Respirant, séchage rapide, idéal sport.', price: 1.5 },
        { id: 'triblend', name: 'Tri-blend',           gsm: '160 g/m²',        desc: 'Effet chiné vintage, ultra doux.',        price: 3 },
      ],
    },
    hoodie: {
      label: 'Sweat à capuche', base: 24,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      fits: { hoodie: { label: 'Sweat à capuche', price: 0 } },
      materials: [
        { id: 'molleton', name: 'Molleton',       gsm: '280 g/m² · 80/20', desc: 'Intérieur gratté, chaud et confortable.', price: 0 },
        { id: 'bio',      name: 'Molleton bio',   gsm: '300 g/m²',         desc: 'Coton bio et polyester recyclé.',          price: 5 },
        { id: 'heavy',    name: 'Molleton épais', gsm: '400 g/m²',         desc: 'Ultra épais, coupe streetwear.',          price: 9 },
      ],
    },
    tote: {
      label: 'Tote bag', base: 5,
      sizes: ['Unique'],
      fits: { tote: { label: 'Tote bag', price: 0 } },
      materials: [
        { id: 'coton',  name: 'Coton naturel', gsm: '140 g/m²', desc: 'Léger et pliable.',     price: 0 },
        { id: 'canvas', name: 'Toile épaisse', gsm: '340 g/m²', desc: 'Solide, tient debout.', price: 2.5 },
        { id: 'bio',    name: 'Coton bio',     gsm: '180 g/m²', desc: 'Certifié biologique.',  price: 1.5 },
      ],
    },
  },

  // perFace = prix par face marquée et par pièce · setup = frais fixes par face (écran, programme de broderie)
  techniques: {
    dtf:         { name: 'Impression DTF', perFace: 6,   setup: 0,  desc: 'Toutes les couleurs, photos et dégradés. Dès 1 pièce.' },
    serigraphie: { name: 'Sérigraphie',    perFace: 2.5, setup: 30, desc: 'Couleurs éclatantes, ultra résistante. Rentable dès 20 pièces.' },
    broderie: {
      name: 'Broderie', perFace: 8, setup: 25, maxCm: 12,
      desc: 'Fil brodé, rendu premium et durable. Uniquement sur le t-shirt Cotton Heritage.',
      // La broderie n'est possible que sur ce modèle, dans ces coloris
      only: { article: 'tshirt', fit: 'heritage' },
      colors: [
        { name: 'Black',         hex: '#0e0e0e' },
        { name: 'Navy Blazer',   hex: '#1b2229' },
        { name: 'Vintage Black', hex: '#363533' },
        { name: 'Vintage White', hex: '#fff9f2' },
        { name: 'White',         hex: '#ffffff' },
      ],
    },
    flocage:     { name: 'Flocage',        perFace: 5,   setup: 0,  desc: 'Noms, numéros et textes en 1 à 2 couleurs. Toucher velours.' },
  },

  // Remise selon la quantité totale
  tiers: [
    { min: 10, off: 0.05 },
    { min: 25, off: 0.12 },
    { min: 50, off: 0.20 },
    { min: 100, off: 0.28 },
  ],
};
