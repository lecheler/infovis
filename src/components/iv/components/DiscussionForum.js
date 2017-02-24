import React from 'react';
import DisqusThread from 'react-disqus-thread';

const DiscussionForum = React.createClass({
  handleNewComment(comment) {
    /* eslint no-console:0 */
    console.log(comment);
  },

  render() {
    return (
      <div>
        <h1>React Disqus thread component</h1>
        <DisqusThread
          shortname="luke"
          identifier="infovis-research"
          title="React Disqus thread component"
          onNewComment={this.handleNewComment}
        />
      </div>
    );
  }
});

export default DiscussionForum;
