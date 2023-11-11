import { Component } from '../core/jackie';
import Images from '../../assets/image/icon-36x36.png';

export default class TheHeader extends Component {
  constructor(props) {
    super({
      tagName: 'header',
      state: {
        menues: [
          {
            name: 'Search',
            href: '#/',
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988',
          },
          {
            name: 'About',
            href: '#/about',
          },
        ],
      },
    });
    window.addEventListener('popstate', () => {
      this.render();
    });
  }

  render() {
    this.el.innerHTML = /* html */ `
      <a href="#/" class="logo">
        <span>OMDbAPI.com</span>
      </a>
      <nav>
        <ul>
        ${this.state.menues
          .map((menu) => {
            const href = menu.href.split('?')[0];
            const hash = location.hash.split('?')[0];
            const isActive = href === hash;
            return /* html */ `
              <li>
                <a class="${isActive ? 'active' : ''}" href="${menu.href}">
                  ${menu.name}
                </a>
              </li>>

        `;
          })
          .join('')}

        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src=${Images} alt="">
      </a>
    `;
  }
}
