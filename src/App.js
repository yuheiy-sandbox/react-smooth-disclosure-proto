import React, { Component } from 'react';
import SmoothDisclosure from './SmoothDisclosure'

class Section extends Component {
  static defaultProps = {
    defaultOpen: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpened: props.defaultOpen,
    }
  }

  onClickToggle = () => {
    this.setState(({isOpened}) => ({isOpened: !isOpened}))
  }

  render() {
    const {heading, children, defaultOpen, ...disclosureProps} = this.props
    const {isOpened} = this.state

    return <section>
      <h2>
        <button type="button" onClick={this.onClickToggle}>
          {heading}
        </button>
      </h2>
      <SmoothDisclosure {...disclosureProps} isOpened={isOpened}>
        {children}
        <p><a href="#" tabIndex={!isOpened && '-1'}>link</a></p>
        <button type="button" tabIndex={!isOpened && '-1'} onClick={this.onClickToggle}>
          toggle
        </button>
      </SmoothDisclosure>
    </section>
  }
}

const App = () => (
  <div>
    <Section heading="default close">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
    </Section>
    <Section heading="default open" defaultOpen={true}>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
    </Section>
    <Section heading="with props" closedHeight={16+(16*1.5*4)+16+(16*1.5*1.5)}>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe odit fugit, fuga nulla est obcaecati quo, corporis sunt ex quisquam asperiores voluptates excepturi nostrum laborum sed delectus? Commodi, mollitia veniam.</p>
    </Section>
  </div>
)

export default App;
