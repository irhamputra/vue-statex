// @ts-ignore
import Vue from "vue";

type Value = string | number | boolean | object | any;

type StoreObject = Record<string, Value | Value[] | Function>;

// helper for excluding properties with type 'never'
type ExcludeMatchingProperties<T, V> = Pick<
  T,
  { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T]
>;

const create = <TStoreObject extends StoreObject>(
  storeObject: TStoreObject
) => {
  const state = Vue.observable(storeObject);

  type StoreKeys = keyof TStoreObject;

  const select = <TSelectedKeys extends StoreKeys>(
    ...keys: TSelectedKeys[]
  ) => {
    type OnlyProvidedKeys = typeof keys[number];

    type State = ExcludeMatchingProperties<
      {
        [key in OnlyProvidedKeys]: TStoreObject[key] extends Function
          ? never
          : TStoreObject[key];
      },
      never
    >;

    type Methods = ExcludeMatchingProperties<
      {
        [key in OnlyProvidedKeys]: TStoreObject[key] extends Function
          ? TStoreObject[key]
          : never;
      },
      never
    >;

    type Result = { state: State; methods: Methods };

    const result: Result = keys.reduce(
      (acc, key) => {
        const propertyValue = state[key];

        if (typeof propertyValue === "function") {
          return {
            ...acc,
            methods: {
              ...acc.methods,
              [key]: propertyValue.bind(state),
            },
          };
        }

        return {
          ...acc,
          state: {
            ...acc.state,
            [key]: propertyValue,
          },
        };
      },
      { state: {} as State, methods: {} as Methods }
    );

    return result;
  };

  return { select };
};

export default create;
