export interface Action {
  [key: string]: any;
}

export type Reducer<T> = (state: T, action: Action) => T;

export type Mapping<T> = Partial<{
  [K in keyof T]: Reducer<T[K]>;
}>;

function mergeReducers<T>(mainReducer: Reducer<T>, mapping: Mapping<T>): Reducer<T> {
  const mappingEntries = Object.entries<Reducer<any>>(mapping);

  return (oldState: T, action: Action): T => {
    let newState = mainReducer(oldState, action);

    // If true then main reducer completed with default state (no action matched)
    if (oldState === newState) {
      let found = false;

      // Start loop over subreducers
      mappingEntries.forEach(([key, innerReducer]) => {
        if (found) return;

        const oldStateInner = (oldState as any)[key];

        const newStateInner = innerReducer(oldStateInner, action);

        // If true the action didn't have trigger this reducer, return to try with next
        if (oldStateInner === newStateInner) return;

        // if false then update state property with new subreducer result
        newState = { ...newState, [key]: newStateInner };

        found = true;
      });
    }

    return newState;
  };
}

export default mergeReducers;
