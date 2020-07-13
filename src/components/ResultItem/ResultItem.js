//@flow
import * as React from "react";

import "./ResultItem.scss";

type Props = {
  item: Object,
  displayModal: () => void,
  row: Number,
};

const ResultItem = ({ item, displayModal, row }: Props) => (
  <div className="document" style={{ gridRow: row }}>
    <div className="document__content">
      <h2 className="document__title">{item.m_szDocTitle}</h2>
      <div className="document__meta">
        <div className="document__meta-date">
          <i className="far fa-calendar-alt"></i>
          {item.m_szYear}
        </div>
        <div className="document__meta-location">
          <i className="fas fa-map-marker-alt"></i>
          {item.m_szGeo1}
        </div>
      </div>
      <p>{item.m_szDocSumamry}</p>
      <div className="document__button-container">
        <button type="button" onClick={displayModal}>
          Click to expand
        </button>
      </div>
    </div>
  </div>
);

export default ResultItem;
