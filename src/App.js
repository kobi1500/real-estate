import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Listings from "./components/Listings";
import listingsData from "./data/listingsData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      listingsData,
      city: "All",
      homeType: "All",
      bedrooms: 1,
      min_price: 0,
      max_price: 10000000,
      min_floor_space: 0,
      max_floor_space: 5000,
      elevator: false,
      finished_basement: false,
      gym: false,
      swimming_pool: false,
      filteredData: listingsData,
      populateFormsData: "",
      sortBy: "price-dsc",
      view: "box",
      search: ""
    };
    this.change = this.change.bind(this);
    this.filteredData = this.filteredData.bind(this);
    this.populateForms = this.populateForms.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentWillMount() {
    var listingsData = this.state.listingsData.sort((a, b) => {
      return a.price - b.price;
    });

    this.setState({
      listingsData
    });
  }

  change(e) {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
        this.filteredData();
      }
    );
  }

  changeView(viewName) {
    this.setState({
      view: viewName
    });
  }

  filteredData() {
    var newData = this.state.listingsData.filter(item => {
      return (
        item.price >= this.state.min_price &&
        item.price <= this.state.max_price &&
        item.floorSpace >= this.state.min_floor_space &&
        item.floorSpace <= this.state.max_floor_space &&
        item.rooms >= this.state.bedrooms
      );
    });
    if (this.state.city !== "All") {
      newData = newData.filter(item => {
        return item.city === this.state.city;
      });
    }
    if (this.state.homeType !== "All") {
      newData = newData.filter(item => {
        return item.homeType === this.state.homeType;
      });
    }

    if (this.state.sortBy === "price-dsc") {
      newData = newData.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (this.state.sortBy === "price-asc") {
      newData = newData.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (this.state.search !== "") {
      newData = newData.filter(item => {
        var city = item.city.toLowerCase();
        var searchText = this.state.search.toLowerCase();
        var n = city.match(searchText);

        if (n !== null) {
          return true;
        }
      });
    }

    this.setState({
      filteredData: newData
    });
  }

  populateForms() {
    // city
    var cities = this.state.listingsData.map(item => {
      return item.city;
    });
    cities = new Set(cities);
    cities = [...cities];

    cities = cities.sort();

    // homeType
    var homeTypes = this.state.listingsData.map(item => {
      return item.homeType;
    });
    homeTypes = new Set(homeTypes);
    homeTypes = [...homeTypes];

    homeTypes = homeTypes.sort();
    // bedrooms
    var bedrooms = this.state.listingsData.map(item => {
      return item.rooms;
    });
    bedrooms = new Set(bedrooms);
    bedrooms = [...bedrooms];

    bedrooms = bedrooms.sort();

    this.setState(
      {
        populateFormsData: {
          cities,
          homeTypes,
          bedrooms
        }
      },
      () => {
        console.log(this.state);
      }
    );
  }
  render() {
    return (
      <div>
        <Header />
        <section id="content-area">
          <Filter
            change={this.change}
            globalState={this.state}
            populateAction={this.populateForms}
          />
          <Listings
            listingsData={this.state.filteredData}
            change={this.change}
            globalState={this.state}
            changeView={this.changeView}
          />
        </section>
      </div>
    );
  }
}

export default App;
