import React, { Component, Fragment } from 'react';
import Gnb from 'pages/Gnb';
import PhoneForm from 'components/PhoneForm';

class Home extends Component {
  id = 0
  state = {
    information: []
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        id: this.id++,
        ...data // 전개연산자
      })
    })
  }

  render() {
    const { information } = this.state;
    return (
      <Fragment>
        <h2>React Home</h2>
        <Gnb />
        <PhoneForm
          onCreate={this.handleCreate}
        />
        {
          Object.keys(information).length > 0 &&
          information.map((obj, i) => { return <li key={i}>{JSON.stringify(obj)}</li> })
        }
      </Fragment>
    )
  }
}

export default Home;