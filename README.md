# Vue-Statex

a dead simple state management library for VueJS (typescript support)

#### Initial store

```js
// store.js
import createStore from "vue-statex";
import { Store } from "./models";

const store = createStore({
  count: 0,

  setCount(payload: number) {
    this.count++;
  },
});

export { store };
export default store();
```

#### Usage in VueJS

```vue
<script>
import store from "./store";

export default {
  provide() {
    return {
      store,
    };
  },
};
</script>
```
