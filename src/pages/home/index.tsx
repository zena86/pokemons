import { Component } from 'react';
import SearchBar from '../../components/searchBar';
import SearchResult from '../../components/searchResults';

const items = [
  {
    name: 'Leonard Rogers',
    email: 'egestas@justonecante.org',
  },
  {
    name: 'Walker Pace',
    email: 'erat.eget.tincidunt@idsapienCras.org',
  },
  {
    name: 'Lance Mcintyre',
    email: 'Nam.ligula@quamvel.net',
  },
  {
    name: 'Rudyard Conway',
    email: 'sit@nunc.org',
  },
  {
    name: 'Chadwick Oneal',
    email: 'laoreet@dictum.edu',
  },
  {
    name: 'Isaiah Kent',
    email: 'diam.dictum@lobortisquam.co.uk',
  },
  {
    name: 'Griffith Perkins',
    email: 'congue@acfermentumvel.ca',
  },
  {
    name: 'Lawrence Wheeler',
    email: 'ac.libero@Duisac.org',
  },
  {
    name: 'Preston Walker',
    email: 'egestas.rhoncus@eudui.co.uk',
  },
  {
    name: 'Simon Brewer',
    email: 'nunc.sed@Fuscediamnunc.co.uk',
  },
];

class Home extends Component {
  state = {
    pokemons: items,
    filteredPokemons: [],
    term: '',
  };

  filterList = (text: string) => {
    const filteredList = items.filter((item) => {
      return item.name.toLowerCase().search(text.toLowerCase()) !== -1;
    });
    this.setState({ ...this.state, filteredPokemons: filteredList });
  };

  componentDidMount() {
    const term = localStorage.getItem('term');
    if (term) {
      this.filterList(term);
    } else {
      this.setState({ ...this.state, filteredPokemons: items });
    }
  }

  render() {
    return (
      <>
        <SearchBar onFormSubmit={this.filterList} />
        <SearchResult pokemons={this.state.filteredPokemons} />
      </>
    );
  }
}

export default Home;
