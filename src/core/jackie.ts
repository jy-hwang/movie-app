/// Component ///

interface ComponentPayload{
  tagName?:string,
  props?:{
    [key:string]:unknown
  },
  state?:{
    [key:string]:unknown
  }
}

export class Component {
public el
public props
public state


  constructor(payload:ComponentPayload = {}) {
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
interface Route{
  path:string
  component:typeof Component
}
type Routes = Route[];
function routeRender(routes: Routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/');
  }

  const routeView = document.querySelector('router-view');

  // http://localhost:1234/#/about?name=jackie
  // #/about?name=jackie
  const [hash, queryString = ''] = location.hash.split('?');

interface Query{
  [key:string]:string
}

  //prettier-ignore
  const query = queryString
    .split("&")
    .reduce((acc, cur) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {} as Query);
  history.replaceState(query, '');

  const currentRoute = routes.find((route) => new RegExp(`${route.path}/?$`).test(hash));
if(routeView){
  routeView.innerHTML = '';
  currentRoute && routeView.append(new currentRoute.component().el);
}

  window.scrollTo(0, 0);
}

export function createRouter(routes : Routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

// Store //
interface StoreObservers{
  [key:string] : SubscribeSallback[]
}
interface SubscribeSallback{
  (arg : unknown) :void
}
export class Store<S> {
  public state = {} as S;
  private observers = {} as StoreObservers;
  constructor(state:S) {
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
  subscribe(key:string, cb:SubscribeSallback) {
    //prettier-ignore
    Array.isArray(this.observers[key])
     ? this.observers[key].push(cb)
     : (this.observers[key] = [cb]);
  }
}
