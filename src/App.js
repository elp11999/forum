import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import ForumMain from './components/ForumMain';
import ForumTopics from './components/ForumTopics';
import ForumPosts from './components/ForumPosts';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={ForumMain} />
          <Route exact path="/forum" component={ForumMain} />
          <Route exact path="/forum/topic" component={ForumTopics} />
          <Route exact path="/forum/listposts" component={ForumPosts} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
