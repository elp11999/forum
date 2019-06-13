
// Import the React library
import React from "react";

// Import Lodash library
import _ from "lodash";

// Import QueryString library
import queryString from 'query-string';

// Import Table component
import TopicsTable from  "../TopicsTable";

// Import Table component
import NewForumTopic from  "../NewForumTopic";

// Import Custom css
import "./index.css";

const testData = {
      folder: "AutismPocketBook News",
      topics : [        
        {
          title: 'Welcome to AutismPocketBook',
          author: 'mhenderson',
          tid: 0,
          replies: '40',
          views: 15,
          lastPost: '06-10-2019 07:12:46 a.m.'
        },                
        {
          title: 'Forum has been added',
          author: 'mhenderson',
          tid: 1,
          replies: '2',
          views: 5,
          lastPost: '06-11-2019 07:12:46 a.m.'
        }
      ]
};

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
        showNewTopic: false,
        pages: null,
        loading: true
      };
      this.fetchData = this.fetchData.bind(this);
    }
    
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log("Forum Topics: tid=" + values.tid);
    }

    handleNewTopicOnClick = (evt) => {
      console.log("ForumTopics: New button clicked.");      
      this.setState({showNewTopic: true});
    }

    handleNewTopicOnSaveClick = (evt) => {
      console.log("ForumTopics: New Topic save clicked.");      
      this.setState({showNewTopic: false});
    }

    handleONewTopicOnCancelClick = (evt) => {
      console.log("ForumTopics: New Topic cancel clicked.");      
      this.setState({showNewTopic: false});
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
      //console.log(data);
      return (
        <React.Fragment>
            <div className="forum-header">
                <img className="forum-image" src="/Forum1.png" alt="forum"></img>                 
                <h1 className="forum-title">Forum: {data.folder}</h1>              
                <button className="post-button" onClick={this.handleNewTopicOnClick}>New Topic</button>
            </div>
            <div className="container">
              <TopicsTable data={data.topics} />
            </div>
            <div className="forum-header">              
              <button className="post-button" onClick={this.handleNewTopicOnClick}>New Topic</button>
            </div>
            
            <NewForumTopic 
              open={this.state.showNewTopic}
              onSave={this.handleNewTopicOnSaveClick}
              onCancel={this.handleONewTopicOnCancelClick}
            />
          </React.Fragment>
      );
    }
  }
  
  export default ForumTopics;