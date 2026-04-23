const sessions = [
  { 
    id: 1, 
    tip: 'Natal Chart Reading', 
    durata: '60 min', 
    pret: '150 RON',
    descriere: 'O analiză completă a hărții natale — personalitate, puncte forte, provocări și drumul vieții.',
    include: ['Analiza Soarelui, Lunii și Ascendentului', 'Carieră și ambiții', 'Relații și compatibilitate', 'Teme de creștere personală']
  },
  { 
    id: 2, 
    tip: 'Transit Reading', 
    durata: '45 min', 
    pret: '100 RON',
    descriere: 'Aflați ce înseamnă mișcările planetare actuale pentru viața voastră în acest moment.',
    include: ['Tranzite majore actuale', 'Oportunități și provocări', 'Timing pentru decizii importante']
  },
  { 
    id: 3, 
    tip: 'Relationship Synastry', 
    durata: '90 min', 
    pret: '200 RON',
    descriere: 'Compatibilitatea dintre două hărți natale — ideal pentru cupluri, prieteni sau parteneri de afaceri.',
    include: ['Analiza compatibilității', 'Puncte de armonie și tensiune', 'Cum să navigați diferențele']
  }
];

module.exports = {
  getAll: () => sessions,
  findById: (id) => sessions.find(s => s.id === parseInt(id))
};