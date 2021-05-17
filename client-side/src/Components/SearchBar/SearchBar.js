import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSearch() {
        this.props.onSearch(this.state.text);
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="search-button" onClick={ this.handleSearch }></div>
                <input id="search" name="search" type="text" placeholder="New search..."
                    value={ this.state.text } onChange={ this.handleChange } />
            </div>
        );
    }
}

export default SearchBar;
