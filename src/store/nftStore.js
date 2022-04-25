// @flow

type Nft = {
  id: number,
  category_id: number,
  tradeable: boolean,
  nft_collection_id: number,
  price: number,
  author: string,
  owner_id: number,
  endorsers: Array,
  verified: boolean,
  likes: Array,
  tags: Array,
  name: string,
  description: string,
}

const initialState = [
  {
    id: 1,
    category_id: 1,
    tradeable: true,
    nft_collection_id: null,
    price: 13.36,
    author: 'John Doe',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'CAMAP: Artificial neural networks unveil the role of codon arrangement in modulating MHC-I peptides presentation',
    description: null,
  },
  {
    id: 2,
    category_id: 2,
    tradeable: false,
    nft_collection_id: null,
    price: 20.12,
    author: 'Mark Smith',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Enhanced four-wave mixing from multi-resonant silicon dimer-hole membrane metasurfaces',
    description: null,
  },
  {
    id: 3,
    category_id: 3,
    tradeable: true,
    nft_collection_id: null,
    price: 5.70,
    author: 'Joe Hall',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'Supramolecular strategies in artificial photosynthesis',
    description: null,
  },
  {
    id: 4,
    category_id: 2,
    tradeable: false,
    nft_collection_id: null,
    price: 11.11,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'Fermi surface transformation at the pseudogap critical point of a cuprate superconductor',
    description: null,
  },
  {
    id: 5,
    category_id: 3,
    tradeable: false,
    nft_collection_id: null,
    price: 32.03,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'The Hitchhikers guide to biocatalysis: recent advances in the use of enzymes in organic synthesis',
    description: null,
  },
  {
    id: 6,
    category_id: 1,
    tradeable: true,
    nft_collection_id: null,
    price: 10.50,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid systems',
    description: null,
  },
  {
    id: 7,
    category_id: 2,
    tradeable: true,
    nft_collection_id: null,
    price: 4.34,
    author: 'Bob Harrison',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid systems',
    description: null,
  },
  {
    id: 8,
    category_id: 3,
    tradeable: true,
    nft_collection_id: null,
    price: 19.38,
    author: 'Bob Harrison',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Design of molecular water oxidation catalysts with earth-abundant metal ions',
    description: null,
  },
  {
    id: 9,
    category_id: 1,
    tradeable: true,
    nft_collection_id: null,
    price: 13.36,
    author: 'John Doe',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'CAMAP: Artificial neural networks unveil the role of codon arrangement in modulating MHC-I peptides presentation',
    description: null,
  },
  {
    id: 10,
    category_id: 2,
    tradeable: false,
    nft_collection_id: null,
    price: 20.12,
    author: 'Mark Smith',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Enhanced four-wave mixing from multi-resonant silicon dimer-hole membrane metasurfaces',
    description: null,
  },
  {
    id: 11,
    category_id: 3,
    tradeable: true,
    nft_collection_id: null,
    price: 5.70,
    author: 'Joe Hall',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'Supramolecular strategies in artificial photosynthesis',
    description: null,
  },
  {
    id: 12,
    category_id: 2,
    tradeable: false,
    nft_collection_id: null,
    price: 11.11,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'Fermi surface transformation at the pseudogap critical point of a cuprate superconductor',
    description: null,
  },
  {
    id: 13,
    category_id: 3,
    tradeable: false,
    nft_collection_id: null,
    price: 32.03,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'The Hitchhikers guide to biocatalysis: recent advances in the use of enzymes in organic synthesis',
    description: null,
  },
  {
    id: 14,
    category_id: 1,
    tradeable: true,
    nft_collection_id: null,
    price: 10.50,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid systems',
    description: null,
  },
  {
    id: 15,
    category_id: 2,
    tradeable: true,
    nft_collection_id: null,
    price: 4.34,
    author: 'Bob Harrison',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid systems',
    description: null,
  },
  {
    id: 16,
    category_id: 3,
    tradeable: true,
    nft_collection_id: null,
    price: 19.38,
    author: 'Bob Harrison',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Design of molecular water oxidation catalysts with earth-abundant metal ions',
    description: null,
  },
  {
    id: 17,
    category_id: 1,
    tradeable: true,
    nft_collection_id: null,
    price: 13.36,
    author: 'John Doe',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'CAMAP: Artificial neural networks unveil the role of codon arrangement in modulating MHC-I peptides presentation',
    description: null,
  },
  {
    id: 18,
    category_id: 2,
    tradeable: false,
    nft_collection_id: null,
    price: 20.12,
    author: 'Mark Smith',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Enhanced four-wave mixing from multi-resonant silicon dimer-hole membrane metasurfaces',
    description: null,
  },
  {
    id: 19,
    category_id: 3,
    tradeable: true,
    nft_collection_id: null,
    price: 5.70,
    author: 'Joe Hall',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'Supramolecular strategies in artificial photosynthesis',
    description: null,
  },
  {
    id: 20,
    category_id: 2,
    tradeable: false,
    nft_collection_id: null,
    price: 11.11,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'Fermi surface transformation at the pseudogap critical point of a cuprate superconductor',
    description: null,
  },
  {
    id: 21,
    category_id: 3,
    tradeable: false,
    nft_collection_id: null,
    price: 32.03,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: false,
    likes: null,
    tags: null,
    name: 'The Hitchhikers guide to biocatalysis: recent advances in the use of enzymes in organic synthesis',
    description: null,
  },
  {
    id: 22,
    category_id: 1,
    tradeable: true,
    nft_collection_id: null,
    price: 10.50,
    author: 'Jane Smith',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid systems',
    description: null,
  },
  {
    id: 23,
    category_id: 2,
    tradeable: true,
    nft_collection_id: null,
    price: 4.34,
    author: 'Bob Harrison',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid systems',
    description: null,
  },
  {
    id: 24,
    category_id: 3,
    tradeable: true,
    nft_collection_id: null,
    price: 19.38,
    author: 'Bob Harrison',
    owner_id: 1,
    endorsers: null,
    verified: true,
    likes: null,
    tags: null,
    name: 'Design of molecular water oxidation catalysts with earth-abundant metal ions',
    description: null,
  },
];

export type State = {
  nfts: Nft,
};

export const types: { ... } = {};

export const selectors = {
  getNfts: (state: ReduxState): Nft => state.nfts,
};

export const actions: { ... } = {};

export const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    default:
      return state || {};
  }
};
