import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NewCofounder extends Component {
    render() {
        return (
            <div className="flex flex-col justify-center items-center ">
                <button>
                <Link to="/">Back</Link>
                </button>
                <iframe
                className="airtable-embed"
                src="https://airtable.com/embed/shrLb79cCszcBQvsa?backgroundColor=purple"
                frameBorder="0"
                width="100%"
                height="1700"
                ></iframe>
            </div>
        )
    }
}
export default NewCofounder;