import { Store } from '../core/jackie';
import Images from '../../assets/image/icon-180x180.png';

interface State{
  photo : string
  name : string
  email : string
  github : string
  repository : string
}

export default new Store<State>({
  photo: Images,
  name: 'Jackie / Jae Yeon - Hwang ',
  email: 'devtestkorhjy89@gmail.com',
  github: 'https://github.com/jy-hwang',
  repository: 'https://github.com/jy-hwang/movie-app',
});
