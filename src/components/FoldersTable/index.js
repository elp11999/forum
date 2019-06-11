// Import the React library
import React from "react";

// Import React Table
import ReactTable from "react-table";

// Import Material icons
import { Folder } from "@material-ui/icons";


// Import React-Table css
import "react-table/react-table.css";

// Import Custom css
import "./index.css";

// Table component
class FoldersTable extends React.Component {
    
    componentDidMount() {
    }

    onChange(evt) {
    }

    render() {
        const { data } = this.props;
        //console.log(data);
        return(
            <ReactTable
                columns={[
                    {
                        Header: data.category,
                        accessor: "folder",
                        headerStyle: {textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                        Cell: row => (
                        <div>
                            <a className="table-icon" href="/"><Folder /></a>                    
                            <div className="table-header">
                                <span>
                                    <a href={"/forum/topic?tid=" + row.original.tid}>{row.original.folder}</a>
                                </span>
                                <p className="table-info-text">{row.original.title}</p>
                            </div>
                        </div>
                        ),
                        width: 600
                    },
                    {
                        Header: "Topics",
                        accessor: "topics",
                        headerStyle: {textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                        Cell: row => (
                        <div className="table-cell">
                            <span className="table-info-text">
                                {row.original.topics}
                            </span>
                        </div>
                        ),
                        width: 70
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
                        width: 248
                    }
                ]}
                manual
                data={data.topics}
                defaultPageSize={data.topics.length}
                showPagination={false}
                //pageSize={data.length}
                //className="-striped -highlight"
                //loading={loading} // Display the loading overlay when we need it                    
                //pages={pages} // Display the total number of pages
                //onFetchData={this.fetchData} // Request new data when things change
            />
        );
    }
}

export default FoldersTable;