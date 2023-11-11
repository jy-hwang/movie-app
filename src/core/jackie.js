/// Component ///

export class Component {
  constructor(payload = {}) {
    //prettier-ignore
    const {
      tagName = "div",
      state = {},
      props = {},
    } = payload;

    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }

  render() {
    // ...
  }
}

// Router //
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/');
  }

  const routeView = document.querySelector('router-view');

  // http://localhost:1234/#/about?name=jackie
  // #/about?name=jackie
  const [hash, queryString = ''] = location.hash.split('?');

  //prettier-ignore
  const query = queryString
    .split("&")
    .reduce((acc, cur) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {});
  history.replaceState(query, '');

  const currentRoute = routes.find((route) => new RegExp(`${route.path}/?$`).test(hash));

  routeView.innerHTML = '';
  routeView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

// Store //

export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key], //state['message'],
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }
  subscribe(key, cb) {
    //prettier-ignore
    Array.isArray(this.observers[key])
     ? this.observers[key].push(cb)
     : (this.observers[key] = [cb]);
  }
}
