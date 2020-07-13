//@flow

import React from "react";
import "./ResultList.scss";

import axios from "axios";
import ResultItem from "../../components/ResultItem";
import Modal from "../../components/Modal";

type Props = {
  showModal: Boolean,
  toggleModal: (Object) => void,
  modalData: Object,
};
type State = {
  data: Array,
  page: number,
  isLoading: boolean,
  inputValue: string,
  hasReachedEnd: boolean,
  sort: string,
};

const API_URL = 'https://data-test-lm.herokuapp.com';

class ResultListContainer extends React.PureComponent<Props, State> {
  constructor() {
    super();
    this.state = {
      data: [],
      page: 1,
      isLoading: true,
      inputValue: "",
      hasReachedEnd: false,
      sort: "m_szDocID-asc",
    };
    this.getData = this.getData.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.sortData = this.sortData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const { inputValue, page, sort } = this.state;

    const sortType = sort.split("-")[0];
    const sortDirection = sort.split("-")[1];

    axios
      .get(
        `${API_URL}/data?q=${inputValue}&_page=${page}&_sort=${sortType}&_order=${sortDirection}`
      )
      .then((item) => {
        this.setState({
          data: item.data,
          isLoading: false,
          hasReachedEnd: item.data.length < 10,
        });
      });
  }
  loadMore() {
    const { page, data, inputValue, sort } = this.state;
    const sortType = sort.split("-")[0];
    const sortDirection = sort.split("-")[1];
    this.setState({
      page: page + 1,
      isLoading: true,
    });
    axios
      .get(
        `${API_URL}/data?_page=${
          page + 1
        }&q=${inputValue}&_sort=${sortType}&_order=${sortDirection}`
      )
      .then((item) => {
        this.setState({
          data: [...data, ...item.data],
          isLoading: false,
          hasReachedEnd: item.data.length < 10,
        });
      });
  }
  onChange(e: Object) {
    this.setState({
      inputValue: e.target.value    
    });
    setTimeout(
      function (vm) {
        vm.searchValue();
      },
      300,
      this
    );
  }
  searchValue() {
    this.setInitialState();
    this.getData();
  }
  sortData(e: Object) {
    this.setState({
      sort: e.target.value,
    });
    this.setInitialState();
    this.getData();
  }
  setInitialState() {
    this.setState({
      page: 1,
      isLoading: true,
      data: [],
    });
  }

  render() {
    const { data, isLoading, hasReachedEnd, inputValue } = this.state;
    const { toggleModal, showModal, modalData } = this.props;
    return (
      <div className="result-list">
        <div className="search-bar">
          <input
            className="search-bar__input"
            type="text"
            placeholder="Search term here"
            onChange={(e) => this.onChange(e)}
          />
          <div className="search-bar__dropdown dropdown">
            <label className="dropdown__label" htmlFor="sort">
              Sort
            </label>
            <div className="dropdown__container">
              <select
                defaultValue="m_szDocID-asc"
                name="sort"
                id="sort"
                onChange={(e) => this.sortData(e)}
              >
                <option value="m_szDocID-asc" disabled></option>
                <option value="m_szYear-asc">Year - Low to High</option>
                <option value="m_szYear-desc">Year - High to Low</option>
                <option value="m_szDocTitle-asc">Title - A-Z</option>
                <option value="m_szDocTitle-desc">Title - Z-A</option>
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
        {showModal && (
          <Modal doc={modalData} closeModal={() => toggleModal()} />
        )}

        <div className="document-container">
          {data.map((doc, i) => (
            <ResultItem
              key={doc.m_szDocID}
              item={doc}
              row={i + 1}
              displayModal={() => toggleModal({doc: Object})}
            />
          ))}
          {isLoading && (
            <div className="document-container__loading">
              <i className="loading-spinner fas fa-spinner fa-spin"></i>
            </div>
          )}

          {!isLoading && !hasReachedEnd && (
            <div
              className="document-container__button-container"
              style={{ gridRow: data.length + 1 }}
            >
              <button type="button" onClick={this.loadMore}>
                Load more
              </button>
            </div>
          )}
          {!isLoading && data.length === 0 && (
            <h2 className="document-container__no-results">
              We can't seem to find anything with search term {inputValue}
            </h2>
          )}
        </div>
      </div>
    );
  }
}

export default ResultListContainer;
