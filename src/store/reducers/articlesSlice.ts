import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authSlice';

export interface ICategory {
  id: string;
  name: string;
}

export interface ISorting {
  id: string;
  name: string;
}

export interface IArticle {
  id: string;
  image: string;
  category: ICategory;
  date: string;
  title: string;
  text: string;
  author: User;
}

const initialSorting: ICategory[] = [
  {
    id: 'ascending',
    name: 'Ascending',
  },
  {
    id: 'descending',
    name: 'Descending',
  },
  {
    id: 'date',
    name: 'Date',
  },
];

interface ArticlesState {
  fullCategories: ICategory[];
  sortingTypes: ICategory[];
  sortingType: string;
  filter: string;
  search: string;
}

const initialState: ArticlesState = {
  fullCategories: [
    {
      name: 'All Categories',
      id: 'all',
    },
  ],
  sortingTypes: initialSorting,
  sortingType: initialSorting[0].id,
  filter: 'all',
  search: ''
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.fullCategories = [...state.fullCategories, ...payload];
    },
    setSortingType: (state, { payload }: PayloadAction<string>) => {
      state.sortingType = payload;
    },
    setFilter: (state, { payload }: PayloadAction<string>) => {
      state.filter = payload;
    },
    setSearch: (state, {payload}: PayloadAction<string>) =>{
      state.search = payload;
    },
  },
});

export const {
  setCategories,
  setSortingType,
  setFilter,
  setSearch,
} = articleSlice.actions;

export default articleSlice.reducer;
