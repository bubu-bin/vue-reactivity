let activeEffect = null;

const dep = new Set();

function track() {
  if (activeEffect) {
    dep.add(activeEffect);
  }
}

function trigger() {
  dep.forEach((effect) => effect());
}

const watchEffect = (update) => {
  const effect = () => {
    activeEffect = effect;
    update();
    activeEffect = null;
  };

  effect();
};

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track();
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger();
      return true;
    },
  });
}

const product = reactive({ quantity: 5, price: 10 });
let total = 0;

watchEffect(() => {
  total = product.price * product.quantity;
  console.log("new total: ", total);
});

product.price = 20;
