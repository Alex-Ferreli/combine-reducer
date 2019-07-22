<h1 align="center">Welcome to combine-reducer 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/combine-reducer.svg">
</p>

> Utility function to combine more reducers, assigned to single properties of state object.

## Why
Sometimes reducer can become too long, with too much actions in a single switch statement.

This utility function is usefull to split reducer in multiple small reducers and assign them to single object property, making complex properties (array, object, etc) isolated with their single reducers.

Actions need to be `UNIQUE` across all reducers to make it work like the initial giant reducer.

It can be used with any reducers, so it work well with both Redux and reducers used with `useReducer` hook.

## Example
```ts
interface ArrayType {
  id: number;
  name: string;
}

interface StateType {
  name: string;
  tables: ArrayType[];
}

const initialState: StateType = {
  name: 'Alex',
  tables: [],
};

const subReducer: Reducer<ArrayType[]> = (state, { type, name, id }): ArrayType[] => {
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

const mainReducer: Reducer<StateType> = (state, { type, name }): StateType => {
  switch (type) {
    case 'UPDATE_NAME': {
      return { ...state, name };
    }
    default: {
      return state;
    }
  }
};

const finalReducer = mergeReducers<StateType>(mainReducer, { tables: subReducer });

// Trigger main reducer action
finalReducer(initialState, { type: 'UPDATE_NAME', name: 'Pippo' });

// Trigger sub reducer action (to change tables property)
finalReducer(initialState, { type: 'ADD', name: 'Test', id: 1 });

// Using with useReducer
const SimpleComponent = () => {
  const [state, dispatch] = useReducer(finalReducer, initialState);
  
  dispatch({ type: 'UPDATE_NAME', name: 'Pippo' });
  
  dispatch({ type: 'ADD', name: 'Test', id: 1 });
}
```

## Author

👤 **Alex Ferreli**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_