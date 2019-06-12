//
// DashBoard page
//
// ForumFolders.js
//

// Import the React library
import React from "react";

// Import Lodash library
import _ from "lodash";

// Import Table component
import FoldersTable from  "../FoldersTable";

// Import Custom css
import "./index.css";

const testData = [
  {
      category: "AutsimPocketBook.com",
      folders : [        
        {
          title: 'AutismPocketBook News',
          description: 'Website news and updates are posted here.',
          tid: 0,
          topics: '40',
          replies: 15,
          lastPost: '08-11-2018 07:12:46 a.m.'
        }
      ]
  },
  {
      category: "General",
      folders : [
        {
            title: 'Nutrition',
            description: 'Nutrition discussions are posted here.',
            tid: 0,
            topics: '10',
            replies: 5,
            lastPost: '09-11-2018 11:37:46 p.m.'
        },
        {
            title: 'Sleep',
            description: 'Sleep discussions are posted here.',
            tid: 1,
            topics: '22',
            replies: 7,
            lastPost: '09-12-2018 08:37:46 p.m.'
        },
        {
            title: 'Medications',
            description: 'Medication discussions are posted here.',
            tid: 2,
            topics: '7',
            replies: 21,
            lastPost: '06-06-2019 05:37:46 p.m.'
        },
        {
            title: 'Excercise',
            description: 'Excercise discussions are posted here.',
            tid: 3,
            topics: '18',
            replies: 9,
            lastPost: '06-01-2019 10:10:55 a.m.'
        },
        {
            title: 'Behaviour',
            description: 'Behaviour discussions are posted here.',
            tid: 4,
            topics: '66',
            replies: '120',
            lastPost: '06-03-2019 06:23:55 a.m.'
        },
        {
            title: 'Therapy',
            description: 'Therapy discussions are posted here.',
            tid: 5,
            topics: '66',
            replies: '120',
            lastPost: '06-03-2019 06:23:55 a.m.'
        }
      ]
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

class ForumFolders extends React.Component {
  constructor() {
    super();
    // Load local storage
    this.state = {
      data: testData,
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
    let key = 1;
    return (
      <React.Fragment>
          <div className="forum-header">
              <img className="forum-image" src="/Forum1.png" alt="forum"></img>             
              <h1 className="forum-title">Forum</h1>
          </div>
        <div className="container"> 
          {data.map(cellData => (
            <FoldersTable data={cellData} key={key++}/>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ForumFolders;