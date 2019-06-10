//
// DashBoard page
//
// DashBoard.js
//

// Import the React library
import React from "react";
import _ from "lodash";
import { makeData } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Folder } from "@material-ui/icons";


const rawData = makeData();

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

class ForumMain extends React.Component {
  constructor() {
    super();
    // Load local storage
    this.state = {
      data: [],
      pages: null,
      loading: true,
      apbSystem: JSON.parse(localStorage.getItem("apbSystem"))
    };
    this.fetchData = this.fetchData.bind(this);
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
    //const { data, pages, loading } = this.state;
    const { data } = this.state;
    return (
      <React.Fragment>
          <div className="forum-header">                
              <h1>Forum</h1>
          </div>
        <div className="container">
          <ReactTable
            columns={[
              {
                Header: "AutismPocketBook.com",
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
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={[
              {
                  folder: 'AutismPocketBook News',
                  title: 'Website news and updates are posted here.',
                  tid: 0,
                  topics: '40',
                  replies: 15,
                  lastPost: '08-11-2018 07:12:46 a.m.'
              }
            ]}
            onFetchData={this.fetchData} // Request new data when things change
            //className="-striped -highlight"
            showPagination={false}
            pageSize={data.length}
          />
          <ReactTable
            columns={[
              {
                Header: "General",
                accessor: "folder",
                headerStyle: {textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                Cell: row => (
                  <div>
                      <a className="table-icon" href="/"><Folder /></a>                    
                      <div className="table-header">
                          <span>
                              <a href="/">{row.original.folder}</a>
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
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={[
              {
                  folder: 'Nutrition',
                  title: 'Nutrition discussions are posted here.',
                  tid: 1,
                  topics: '10',
                  replies: 5,
                  lastPost: '09-11-2018 11:37:46 p.m.'
              },
              {
                  folder: 'Sleep',
                  title: 'Sleep discussions are posted here.',
                  tid: 2,
                  topics: '22',
                  replies: 7,
                  lastPost: '09-12-2018 08:37:46 p.m.'
              },
              {
                  folder: 'Medications',
                  title: 'Medication discussions are posted here.',
                  tid: 3,
                  topics: '7',
                  replies: 21,
                  lastPost: '06-06-2019 05:37:46 p.m.'
              },
              {
                  folder: 'Excercise',
                  title: 'Excercise discussions are posted here.',
                  tid: 4,
                  topics: '18',
                  replies: 9,
                  lastPost: '06-01-2019 10:10:55 a.m.'
              },
              {
                  folder: 'Behaviour',
                  title: 'Behaviour discussions are posted here.',
                  tid: 5,
                  topics: '66',
                  replies: '120',
                  lastPost: '06-03-2019 06:23:55 a.m.'
              }
            ]}
            //pages={pages} // Display the total number of pages
            //loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            defaultPageSize={data.length}
            showPagination={false}
            //className="-striped -highlight"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ForumMain;