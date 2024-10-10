import articleReducer, {
  setCategories,
  setSortingType,
  setFilter,
  setSearch,
  ICategory,
  ArticlesState,
} from '../reducers/articlesSlice';

describe('articleSlice reducer', () => {
  const initialState: ArticlesState = {
    fullCategories: [
      {
        name: 'All Categories',
        id: 'all',
      },
    ],
    sortingTypes: [
      { id: 'ascending', name: 'Ascending' },
      { id: 'descending', name: 'Descending' },
      { id: 'date', name: 'Date' },
    ],
    sortingType: 'ascending',
    filter: 'all',
    search: '',
  };

  it('should handle initial state', () => {
    expect(articleReducer(undefined,{type:''})).toEqual(
      initialState
    );
  });

  it('should handle setCategories', () => {
    const newCategories: ICategory[] = [
      { id: '1', name: 'Category1' },
      { id: '2', name: 'Category2' },
    ];

    const nextState = articleReducer(
      initialState,
      setCategories(newCategories)
    );

    expect(nextState.fullCategories).toHaveLength(3);
    expect(nextState.fullCategories[1]).toEqual(newCategories[0]);
    expect(nextState.fullCategories[2]).toEqual(newCategories[1]);
  });

  it('should handle setSortingType', () => {
    const sortingType = 'date';
    const nextState = articleReducer(initialState, setSortingType(sortingType));

    expect(nextState.sortingType).toEqual(sortingType);
  });

  it('should handle setFilter', () => {
    const filter = '1';
    const nextState = articleReducer(initialState, setFilter(filter));

    expect(nextState.filter).toEqual(filter);
  });

  it('should handle setSearch', () => {
    const searchQuery = 'Test';
    const nextState = articleReducer(initialState, setSearch(searchQuery));

    expect(nextState.search).toEqual(searchQuery);
  });
});
