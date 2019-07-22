import mergeReducers, { Reducer } from './index';

interface TableType {
  id: number;
  name: string;
}

interface ProjectStructure {
  name: string;
  tables: TableType[];
}

const initialState: ProjectStructure = {
  name: 'Alex',
  tables: [],
};

const reducerTables: Reducer<TableType[]> = (state, { type, name, id }): TableType[] => {
  switch (type) {
    case 'ADD': {
      return [...state, { id, name }];
    }
    case 'REMOVE': {
      return state.filter(t => t.id !== id);
    }
    default: {
      return state;
    }
  }
};

const reducerProject: Reducer<ProjectStructure> = (state, { type, name }): ProjectStructure => {
  switch (type) {
    case 'UPDATE_NAME': {
      return { ...state, name };
    }
    default: {
      return state;
    }
  }
};

const finalReducer = mergeReducers<ProjectStructure>(reducerProject, { tables: reducerTables });

test('Dispatch missing action', () => {
  const newState = finalReducer(initialState, { type: 'MISSING_ACTION_TYPE', name: 'Pippo' });

  expect(initialState).toEqual(newState);
});

test('Dispatch existing action', () => {
  const newState = finalReducer(initialState, { type: 'UPDATE_NAME', name: 'James' });

  expect({ ...initialState, name: 'James' }).toMatchObject(newState);
});

test('Dispatch existing action (sub reducer)', () => {
  const newState = finalReducer(initialState, { type: 'ADD', id: 0, name: 'Table 1' });

  expect({ ...initialState, tables: [{ id: 0, name: 'Table 1' }] }).toMatchObject(newState);
});
