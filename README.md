# Simple Vue Reactivity Clone

This repository contains a simple implementation of Vue's reactivity system using vanilla JavaScript. It showcases the basic concepts of reactivity, including `ref`, `reactive`, and `watchEffect`. This project aims to provide a foundational understanding of how Vue handles reactivity under the hood.

## Features

- **ref**: Create a reactive reference to a primitive value.
- **reactive**: Convert an object into a reactive object using JavaScript proxies.
- **watchEffect**: Automatically runs a function whenever reactive dependencies change

## Installation

To get started with this project, clone the repository to your local machine:

```bash
git clone https://github.com/bubu-bin/vue-reactivity.git
cd your-repository-directory
```

## Usage

Open the `index.html` file in a web browser to see the reactivity system in action. You can interact with the reactive counter by clicking the increment and decrement buttons.

### JavaScript Reactivity System

The JavaScript file `reactivity.js` implements the reactivity system. Here is a brief overview of each function:

- **getSubscribersForProperty**: Manages dependency tracking per property.
- **track**: Registers an effect as a dependent of a reactive property.
- **trigger**: Triggers all registered effects when the reactive property changes.
- **watchEffect**: Sets up a reactive effect that automatically updates when its dependencies change.
- **reactive**: Creates a reactive proxy for a given object.
- **ref**: Creates a reactive reference for a primitive value.

Following data structures have been used:
- **targetMap**: A `WeakMap` that holds each target object (e.g., a reactive object or ref) as keys. Each key points to a `depsMap`.
- **depsMap**: A `Map` that associates each property of the target object with a dependency set (`dep`).
- **dep**: A `Set` that contains all effects (functions) that depend on the specific property.
