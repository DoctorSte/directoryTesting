import React, {Component} from 'react';
import Airtable from "airtable";
import {connect} from 'react-redux';
import {filterByValue, loadData, filterBySelect, sortByAlphabet, sortByPrice} from "./store";
import Founder from "./Founder";
import "tailwindcss/tailwind.css";
import Select from "react-select";
import {Link} from "react-router-dom";

const sortingOptions = [
  { value: "default", label: "Sort by", disabled: true },
  { value: "alphabet_asc", label: "Name - A-Z" },
  { value: "alphabet_desc", label: "Name - Z-A" }
];

const options = [
    { value: "MARKETING", label: "MARKETING" },
    { value: "TECH", label: "TECH" },
    { value: "DESIGN", label: "DESIGN" },
    { value: "BIZ", label: "BIZ" }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "red" : "black",
    }),
  };

class App extends Component {

    constructor(props) {
        super(props);
        const base = new Airtable({ apiKey: "keynbSweRZKkwmlQX" }).base(
            "appvWRAi4zf0BYTR3"
          );
        base("Looking for Cofounders")
          .select({ view: "Grid view" })
          .eachPage((records, fetchNextPage) => {
            fetchNextPage();
            this.props.state.cofounders =  records;
            this.props.state.filteredCofounders =  records;
            this.props.dispatch(loadData({count: 0}));
          });
      }

    filterByInput(e){
        let input = e.target.value;
        this.props.dispatch(filterByValue({value: input}))
    }

    filterByIam(e){
        let selection = [];
        for(var i=0; i<e.length; i++){
            selection.push(e[i]['value']);
        }
        this.props.state.iamSelectionData = selection;
        this.props.dispatch(filterBySelect())
    }

    filterByLookingFor(e){
        let selection = [];
        for(var i=0; i<e.length; i++){
            selection.push(e[i]['value']);
        }
        this.props.state.lookingForSelectionData = selection;
        this.props.dispatch(filterBySelect())
    }

    sortByInput(e){
        let value = e.value;
        let direction = value.endsWith('asc') ? "asc" : "desc";

        if (value.startsWith('price')){
            this.props.dispatch(sortByPrice({direction}))
        }else {
            this.props.dispatch(sortByAlphabet({direction}));
        }
    }

    render() {
        let founders = this.props.state.filteredCofounders;
        return (
            <div className=" min-h-screen w-full bg-black flex flex-col gap-4 px-40 items-start justify-center text-white">
        <div className="flex justify-between gap-4">
          <h3>Cofounders:</h3>
          <div className="flex gap-4">

          <span className="flex items-center gap-4">
                <Select
                className="min-w-max w-40"
                id="sortingOption"
                styles={customStyles}
                options={sortingOptions}
                defaultValue={sortingOptions[0]}
                isOptionDisabled={(option) => option.disabled}
                onChange={e => {
                    this.sortByInput(e);
                }}
              />
            </span>

            <span className="flex items-center gap-4">
              I&apos;m a:
              <Select
                isMulti
                className="min-w-max w-40"
                id="iam"
                styles={customStyles}
                options={options}
                onChange={e => {
                    this.filterByIam(e);
                }}
              />
            </span>
            <span className="flex items-center gap-4">
              Looking for
              <Select
                isMulti
                className="min-w-max w-40"
                id="lookingFor"
                styles={customStyles}
                options={options}
                onChange={e => {
                    this.filterByLookingFor(e);
                }}
              />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {founders && founders.length && founders.map((founder) => (
            <Founder key={founder.id} founder={founder} />
          ))}
        </div>
        <Link to="/newCofounder">
          <button className="p-4 rounded-md bg-indigo-500 hover:bg-indigo-800 w-40 flex justify-center">
            Add your info
          </button>
        </Link>
</div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps)(App);
