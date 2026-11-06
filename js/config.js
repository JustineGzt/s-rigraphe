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

  /* ---------- Prix des articles fournisseur ----------
     Pour un article avec `cost` (ton prix fournisseur TTC, impression d'1 emplacement comprise) :
       prix client / pièce = cost + costFace par emplacement en plus + marge
     (`costBroderie` si la broderie coûte un autre prix). La remise quantité ne s'applique
     qu'à la marge : tu ne vends jamais sous ton coût.
     La livraison s'ajoute à la commande : `premier` pour le 1er article, `suivant` pour chacun des autres.
     Un article peut avoir sa propre `marge` et sa propre `livraison` ; sinon il prend celles ci-dessous.
     Les articles sans `cost` gardent l'ancien calcul (base + technique). */
  marge: 8,                                      // ← ce que tu gagnes par pièce (€), à régler
  livraison: { premier: 4.49, suivant: 1.50 },   // frais d'envoi fournisseur par commande (France, estimation)

  /* ---------- Création du design (option « Mon idée » du studio) ----------
     Le prix s'ajoute une fois à la commande, sans remise quantité.
     `aPartirDe: true` affiche « dès … » : le prix exact est confirmé dans le devis.
     Si tu changes ces prix ou `offerteDes`, mets aussi à jour la FAQ (index.html)
     et la rubrique « Création de visuels » (mentions-legales.html). */
  creation: {
    offerteDes: 10,   // création offerte à partir de ce nombre de pièces
    offres: [
      { id: 'retouche', name: 'Retouche',          desc: 'Nettoyer une image, changer une couleur, améliorer la qualité.', price: 10 },
      { id: 'simple',   name: 'Design simple',     desc: 'Texte stylisé ou composition avec quelques éléments.',           price: 25, defaut: true },
      { id: 'mesure',   name: 'Design sur mesure', desc: 'Illustration ou logo créé à partir de zéro.',                    price: 50, aPartirDe: true },
    ],
  },

  /* ---------- Tarifs indicatifs TTC (en €) ---------- */
  articles: {
    tshirt: {
      label: 'T-shirt', base: 9,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      fits: {
        classique: { label: 'Classique', price: 0 },
        oversize:  { label: 'Oversize', price: 4 },
        cintre:    { label: 'Cintré', price: 1 },
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
    softstyle: {
      label: 'T-shirt Softstyle', model: 'Gildan 64000',
      cost: 13.20, costFace: 6,   // cost : estimation, à remplacer par le vrai prix fournisseur · costFace : estimation prudente
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
      fits: { softstyle: { label: 'Softstyle', price: 0 } },
      materials: [
        { id: 'ringspun', name: 'Coton ring-spun', gsm: '153 g/m²', desc: 'Basique ultra doux et léger, coupe ajustée.', price: 0 },
      ],
      // Emplacements proposés (retire ceux que tu ne veux pas proposer)
      emplacements: ['avant', 'grand-avant', 'arriere', 'grand-arriere', 'etiquette', 'manche-g', 'manche-d'],
      // Coloris du modèle · hex2 = deuxième teinte des coloris chinés (pastille en diagonale)
      colors: [
        { name: 'Black',               hex: '#101010' },
        { name: 'Navy',                hex: '#1b2238' },
        { name: 'Dark Chocolate',      hex: '#3b2a20' },
        { name: 'Purple',              hex: '#4f2a7d' },
        { name: 'Maroon',              hex: '#6b1e30' },
        { name: 'Forest Green',        hex: '#2b3d2c' },
        { name: 'Charcoal',            hex: '#464749' },
        { name: 'Dark Heather',        hex: '#454a54', hex2: '#5d626c' },
        { name: 'Red',                 hex: '#e3202f' },
        { name: 'Royal',               hex: '#2862c6' },
        { name: 'Sapphire',            hex: '#0a78b4' },
        { name: 'Graphite Heather',    hex: '#6a6b6d', hex2: '#828385' },
        { name: 'Military Green',      hex: '#636b4f' },
        { name: 'Irish Green',         hex: '#00a15c' },
        { name: 'Orange',              hex: '#f45b24' },
        { name: 'Tropical Blue',       hex: '#00a3b5' },
        { name: 'Sand',                hex: '#d7c4a2' },
        { name: 'Daisy',               hex: '#ffcf4a' },
        { name: 'Light Blue',          hex: '#bccfe9' },
        { name: 'Sport Grey',          hex: '#c6c7c9', hex2: '#d6d7d9' },
        { name: 'Light Pink',          hex: '#ead9d7' },
        { name: 'Natural',             hex: '#f5ecd7' },
        { name: 'White',               hex: '#ffffff' },
        { name: 'Heather Dark Grey',   hex: '#3d3d3f', hex2: '#6e6e70' },
        { name: 'Heather Red',         hex: '#c6404d', hex2: '#d9707a' },
        { name: 'Heather Heliconia',   hex: '#ee4a7e', hex2: '#f57ea3' },
        { name: 'Heather Indigo',      hex: '#5a6c86', hex2: '#7d8da4' },
        { name: 'Heather Royal',       hex: '#5a7cc2', hex2: '#87a0d4' },
        { name: 'Heather Galapagos',   hex: '#12a59a', hex2: '#56c2b9' },
        { name: 'Heather Coral',       hex: '#f17e6f', hex2: '#f6a79c' },
        { name: 'Heather Irish Green', hex: '#3fae6b', hex2: '#78c897' },
        { name: 'Cornsilk',            hex: '#f7e389', hex2: '#faedb3' },
      ],
    },
    longsleeve: {
      label: 'Haut manches longues', model: 'Gildan 2400',
      cost: 16.82, costFace: 6,   // costFace : estimation prudente, à remplacer par le vrai surcoût fournisseur
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      fits: { longues: { label: 'Manches longues', price: 0 } },
      materials: [
        { id: 'ultracotton', name: 'Ultra Cotton', gsm: '203 g/m²', desc: '100 % coton épais, bords-côtes aux poignets.', price: 0 },
      ],
      emplacements: ['avant', 'grand-avant', 'arriere', 'grand-arriere', 'etiquette'],
      emplacementsBroderie: ['coeur', 'poitrine', 'poignet-d', 'poignet-g'],
      colors: [
        { name: 'Black',          hex: '#101010' },
        { name: 'Navy',           hex: '#1b2238' },
        { name: 'Maroon',         hex: '#6b1e30' },
        { name: 'Forest Green',   hex: '#243a26' },
        { name: 'Red',            hex: '#e3202f' },
        { name: 'Royal',          hex: '#1f4fb0' },
        { name: 'Military Green', hex: '#55573f' },
        { name: 'Indigo Blue',    hex: '#4f6f9a' },
        { name: 'Irish Green',    hex: '#00b35c' },
        { name: 'Sport Grey',     hex: '#9b979c' },
        { name: 'Light Blue',     hex: '#a7c6e6' },
        { name: 'Sand',           hex: '#d6c3a0' },
        { name: 'Light Pink',     hex: '#f4b6cc' },
        { name: 'Ash',            hex: '#e4e4e2' },
        { name: 'White',          hex: '#ffffff' },
      ],
    },
    hoodie18500: {
      label: 'Sweat à capuche Heavy Blend', model: 'Gildan 18500',
      cost: 24.72, costBroderie: 25.64, costFace: 6,   // costFace : estimation prudente, à remplacer
      marge: 18, livraison: { premier: 6.50, suivant: 2 },   // article lourd : port estimé plus élevé
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
      fits: { hoodie: { label: 'Sweat à capuche', price: 0 } },
      materials: [
        { id: 'heavyblend', name: 'Heavy Blend', gsm: '271 g/m² · 50/50', desc: 'Molleton coton/polyester, intérieur gratté, poche kangourou.', price: 0 },
      ],
      emplacements: ['avant', 'arriere', 'etiquette', 'manche-longue-d', 'manche-longue-g'],
      emplacementsBroderie: ['poitrine', 'coeur', 'poignet-g', 'poignet-d'],
      colors: [
        { name: 'Black',            hex: '#101010' },
        { name: 'Navy',             hex: '#1b2238' },
        { name: 'Maroon',           hex: '#4a1a1f' },
        { name: 'Dark Chocolate',   hex: '#3b2a20' },
        { name: 'Forest Green',     hex: '#243a26' },
        { name: 'Purple',           hex: '#4f2580' },
        { name: 'Red',              hex: '#d9182b' },
        { name: 'Charcoal',         hex: '#46474b' },
        { name: 'Royal',            hex: '#1f4fa8' },
        { name: 'Dark Heather',     hex: '#57524d' },
        { name: 'Indigo Blue',      hex: '#3f6190' },
        { name: 'Graphite Heather', hex: '#555b6e' },
        { name: 'Heliconia',        hex: '#ef3f88' },
        { name: 'Carbon Grey',      hex: '#6b6b6b' },
        { name: 'Irish Green',      hex: '#1a9446' },
        { name: 'Orange',           hex: '#f45b24' },
        { name: 'Military Green',   hex: '#7a8460' },
        { name: 'Sport Grey',       hex: '#9e9ba1' },
        { name: 'Carolina Blue',    hex: '#85b2f5' },
        { name: 'Safety Pink',      hex: '#f79aa9' },
        { name: 'Gold',             hex: '#fbab2b' },
        { name: 'Light Blue',       hex: '#a7c8e6' },
        { name: 'Sand',             hex: '#ead5b5' },
        { name: 'Light Pink',       hex: '#f4d3e0' },
        { name: 'Ash',              hex: '#dcdcdc' },
        { name: 'White',            hex: '#ffffff' },
      ],
    },
    toteW101: {
      label: 'Tote bag coloré', model: 'Westford Mill W101',
      cost: 10.84, costFace: 6,   // costFace : estimation prudente · prix broderie inconnu : ajoute costBroderie si différent
      sizes: ['Unique'],
      fits: { toteLong: { label: 'Tote bag', price: 0 } },
      materials: [
        { id: 'coton', name: 'Coton', gsm: '140 g/m²', desc: 'Toile de coton légère, anses longues, se porte à l\'épaule.', price: 0 },
      ],
      techniques: ['dtf', 'broderie'],
      emplacements: ['avant', 'arriere'],
      emplacementsBroderie: ['sac-avant', 'sac-arriere'],
      colors: [
        { name: 'Black',        hex: '#101010' },
        { name: 'French Navy',  hex: '#14202e' },
        { name: 'Burgundy',     hex: '#4d1c2c' },
        { name: 'Classic Red',  hex: '#a0111e' },
        { name: 'Bottle Green', hex: '#0b4a32' },
        { name: 'Orange',       hex: '#fa5a0a' },
        { name: 'Coral',        hex: '#f9604e' },
        { name: 'Mustard',      hex: '#d49b22' },
        { name: 'Light Grey',   hex: '#bdbdbd' },
        { name: 'Pink',         hex: '#f9bdd6' },
        { name: 'Mint',         hex: '#76f3d8' },
        { name: 'Natural',      hex: '#f3ecdc' },
      ],
    },
    toteEC8000: {
      label: 'Tote bag écologique', model: 'Econscious EC8000',
      cost: 15.60, costFace: 6,   // costFace : estimation prudente · prix broderie inconnu : ajoute costBroderie si différent
      sizes: ['Unique'],
      fits: { toteEco: { label: 'Tote bag', price: 0 } },
      materials: [
        { id: 'bio', name: 'Coton bio', gsm: '271 g/m²', desc: 'Toile de coton biologique épaisse, fond à soufflet.', price: 0 },
      ],
      techniques: ['dtg', 'dtf', 'broderie'],
      emplacements: ['avant', 'arriere'],
      emplacementsBroderie: ['sac-avant', 'sac-arriere'],
      colors: [
        { name: 'Black',  hex: '#141414' },
        { name: 'Oyster', hex: '#d6bb94' },
      ],
    },
  },

  // perFace = prix par face marquée et par pièce · setup = frais fixes par face (écran, programme de broderie)
  techniques: {
    dtf:         { name: 'Impression DTF', perFace: 6,   setup: 0,  desc: 'Toutes les couleurs, photos et dégradés. Dès 1 pièce.' },
    dtg:         { name: 'Impression DTG', perFace: 6,   setup: 0,  desc: 'Encre directement dans le coton, toucher invisible. Idéal sur coton clair, dès 1 pièce.' },
    serigraphie: { name: 'Sérigraphie',    perFace: 2.5, setup: 30, desc: 'Couleurs éclatantes, ultra résistante. Rentable dès 20 pièces.' },
    broderie: {
      name: 'Broderie', perFace: 8, setup: 25, maxCm: 12,
      desc: 'Fil brodé, rendu premium et durable. Sur une sélection de t-shirts, manches longues et sweats.',
      // La broderie n'est possible que sur ces modèles (coloris : ceux du modèle, ou la liste ci-dessous s'il n'en a pas)
      only: [{ article: 'tshirt', fit: 'heritage' }, { article: 'softstyle' }, { article: 'longsleeve' }, { article: 'hoodie18500' }, { article: 'toteW101' }, { article: 'toteEC8000' }],
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
