// Import the React library
import React from "react";

// Import React Table
import ReactTable from "react-table";

// Import Material icons
import { Book } from "@material-ui/icons";

// Import React-Table css
import "react-table/react-table.css";

// Import Custom css
import "./index.css";

// Table component
class TopicsTable extends React.Component {
    
    componentDidMount() {
    }

    onChange(evt) {
    }

    render() {
        const { data } = this.props;
        console.log(data);
        return(
            <ReactTable
                columns={[
                {
                    Header: "Topics",
                    accessor: "topics",
                    headerStyle: {textAlign: 'center', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    Cell: row => (
                    <div>
                        <a className="table-icon" href="/"><Book /></a>                    
                        <div className="table-header">
                            <span>
                                <a href={"/forum/listposts?tid=" + row.original.tid}>{row.original.topic}</a>
                            </span>
                            <p className="table-info-text">{"Author: " + row.original.author}</p>
                        </div>
                    </div>
                    ),
                    width: 600
                },
                {
                    Header: "Replies",
                    accessor: "replies",
                    headerStyle: {textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    Cell: row => (
                    <div className="table-cell">
                        <span className="table-info-text">
                            {row.original.replies}
                        </span>
                    </div>
                    ),
                    width: 80
                },
                {
                    Header: "Views",
                    accessor: "views",
                    headerStyle: {textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    Cell: row => (
                    <div className="table-cell">
                        <span className="table-info-text">
                            {row.original.views}
                        </span>
                    </div>
                    ),
                    width: 80
                },
                {
                    Header: "Last Post",
                    accessor: "lastPost",
                    headerStyle: {textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    Cell: row => (
                    <div className="table-cell">
                        <span className="table-info-text">
                            {row.original.lastPost}
                        </span>
                    </div>
                    ),
                    width:238
                }
                ]}
                manual
                data={data}
                defaultPageSize={data.length}
                showPagination={data.length > 5 ? true : false}
                //className="-striped -highlight"
                //loading={loading} // Display the loading overlay when we need it                    
                //pages={pages} // Display the total number of pages
                //onFetchData={this.fetchData} // Request new data when things change
            />
        );
    }
}

export default TopicsTable;