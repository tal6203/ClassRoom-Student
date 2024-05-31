import React from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { filterSearch } from './action';


class SearchBar extends React.Component {
    state = {
        search_from_input: {
            searchTerm: '',
            searchOption: ''
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            search_from_input: {
                ...prevState.search_from_input,
                [name]: value
            }
        }), () => {
            const { searchTerm, searchOption } = this.state.search_from_input;
            const search = { searchTerm, searchOption };
            this.props.onSearch(search);
        });

    }


    render() {
        return (
            <div >
                <div className="search-bar ">
                    <i className="material-icons">search</i>
                    <div className="col s6">
                        <select className="browser-default" name="searchOption"
                            onChange={this.handleChange}
                            required>
                            <option value="">Filter By...</option>
                            <option value="id">ID Class:</option>
                            <option value="number_of_students">Number of Students:</option>
                            <option value="class_avg">Average:</option>
                            <option value="class_type">Class Type:</option>
                        </select>
                    </div>
                    <div>
                        <input
                            name="searchTerm"
                            type="text"
                            placeholder="Search..."
                            value={this.state.search_from_input.searchTerm }
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (store_state, current_props) => {
    return {
        ...current_props, classes: store_state.classes
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (search) => dispatch(filterSearch(search))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);