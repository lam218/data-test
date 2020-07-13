import React from "react";
import "./App.scss";

import ResultListContainer from "./containers/ResultList/ResultListContainer";

type State = {
  showModal: boolean,
  modalData: Object
};

class App extends React.PureComponent<{}, State> {
  constructor() {
    super();
    this.state = {
      showModal: false,
      modalData: {},
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(doc) {
    document.getElementsByTagName("body")[0].style.overflow = doc
      ? "hidden"
      : "auto";
    this.setState({
      showModal: doc !== undefined,
      modalData: doc ? doc : {},
    });
  }

  render() {
    const { showModal, modalData } = this.state;
    return (
      <div className="app">
        {showModal && <div className="overlay"></div>}
        <header className="app-header">
          Lucy Murray code test
        </header>
        <ResultListContainer
          toggleModal={this.toggleModal}
          showModal={showModal}
          modalData={modalData}
        />
      </div>
    );
  }
}

export default App;
