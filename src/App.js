import React, { Component } from 'react';
import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch';
import theme from './theme';

import Header from './components/Header';
import Results from './components/Results';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTopics: []
    }
  }

  setTopics = (currentTopics) => {
    this.setState({
      currentTopics: currentTopics || [],
    });
  }

  toggleTopic = (topic) => {
    const { currentTopics } = this.state;
    const nextState = currentTopics.includes(topic)
      ? currentTopics.filter(item => item !== topic)
      : currentTopics.concat(topic);
    this.setState({
      currentTopics: nextState,
    });
  }

  render() {
    return (
      <section className="container">
        <ReactiveBase
          app="githubFinder"
          credentials="Dz11ZC5A4:28325b9c-552a-4936-b87d-878071483567"
          type="gitxplore-latest"
          theme={theme}
        >
          <nav className="navbar">
            <div className="title">Git finder</div>
          </nav>
          <div className="flex row-reverse app-container">
            <Header currentTopics={this.state.currentTopics} setTopics={this.setTopics} />
            <div className="results-container">
              <DataSearch
                componentId="repo"
                filterLabel="Search"
                dataField={['name', 'description', 'name.raw', 'fullname', 'owner', 'topics']}
                placeholder="Search Repos"
                autosuggest={false}
                highlightField=""
                iconPosition="left"
                URLParams
                className="data-search-container results-container"
                innerClass={{
                  input: 'search-input',
                }}
              />
              <Results currentTopics={this.state.currentTopics} toggleTopic={this.toggleTopic} />
            </div>
          </div>
        </ReactiveBase>
      </section>
    );
  }
}

export default App;
