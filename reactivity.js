let activeEffect = null;

const targetMap = new WeakMap();

function getSubscribersForProperty(target, key) {
  let depsMap;
  let dep;

  // Target has not been registered before
  if (!targetMap.has(target)) {
    dep = new Set();
    depsMap = new Map();
    depsMap.set(key, dep);
    targetMap.set(target, depsMap);
    return dep;
  }

  depsMap = targetMap.get(target);

  // Key for target has not been registered before
  if (!depsMap.has(key)) {
    dep = new Set();
    depsMap.set(key, dep);
    return dep;
  }

  return depsMap.get(key);
}

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key);
    effects.add(activeEffect);
  }
}

function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key);
  effects.forEach((effect) => effect());
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
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return true;
    },
  });
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, "value");
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(refObject, "value");
    },
  };

  return refObject;
}
