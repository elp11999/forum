
// Import the React library
import React from "react";
import _ from "lodash";
import queryString from 'query-string';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Book } from "@material-ui/icons";
import "./index.css";

const testData = [
    {
        author: 'mhenderson',
        pid: 0,
        postDate: '06-01-2019 07:12:46 a.m.',
        data: "I recently had to come off of xanax because I became addicted to it. However, it worked so well for me. Vicodin and\nKlonipin have had no effect on my anxiety, which is very strong. Are there any alternative anyone has take that work?\nAlso, I am bi-polar with severe depression and anxiety disorders."
    },    
    {
        author: 'mjciatto',
        pid: 1,
        postDate: '06-02-2019 10:43:19 a.m.',
        data: "I recently had to come off of xanax because I became addicted to it. However, it worked so well for me. Vicodin and\nKlonipin have had no effect on my anxiety, which is very strong. Are there any alternative anyone has take that work?\nAlso, I am bi-polar with severe depression and anxiety disorders."
    }
];


const rawData = testData;

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;

    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};


class ForumTopics extends React.Component {
    constructor() {
      super();
      this.state = {
        data: testData,
        pages: null,
        loading: true
      };
      this.fetchData = this.fetchData.bind(this);
    }
    
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log("Forum Topics: tid=" + values.tid);
    }

    fetchData(state, instance) {
      // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
      // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
      this.setState({ loading: true });
      // Request the data however you want.  Here, we'll use our mocked service we created earlier
      requestData(
        state.pageSize,
        state.page,
        state.sorted,
        state.filtered
      ).then(res => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          data: res.rows,
          pages: res.pages,
          loading: false
        });
      });
    }
    

    render() {
      const { data, pages, loading } = this.state;
      return (
        <React.Fragment>
            <div className="forum-header">                
                <h1>Forum: AutismPocketBook News</h1>
            </div>
            <div className="container">
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
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={[
                    {
                        topic: 'Welcome to AutismPocketBook',
                        author: 'mhenderson',
                        tid: 0,
                        replies: '40',
                        views: 15,
                        lastPost: '08-11-2018 07:12:46 a.m.'
                    }
                    ]}
                    onFetchData={this.fetchData} // Request new data when things change
                    //showPagination={false}
                    //pageSize={data.length}
                    //className="-striped -highlight"
                    //loading={loading} // Display the loading overlay when we need it                    
                    pages={pages} // Display the total number of pages
                    defaultPageSize={10}
                />
            </div>
          </React.Fragment>
      );
    }
  }
  
  export default ForumTopics;