import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../redux/slices/selectedSlice";
import useDataFetching from "../../services/Instance";

export default function GithubChart() {
  const dispatch = useDispatch();
  const { data, loading, error } = useDataFetching();
  const selectedDate = useSelector(state => state.selected.selectedDate);
  const selectedBlock = useSelector(state => state.selected.selectedBlock);

  if (loading) {
    if (error) console.log(error);
    return <div>...</div>;
  }

  //separating by color
  const getColor = item => {
    if (item <= 0) {
      return "#EDEDED";
    } else if (item <= 9) {
      return "#ACD5F2";
    } else if (item <= 19) {
      return "#7FA8C9";
    } else if (item <= 29) {
      return "#527BA0";
    } else if (item >= 30) {
      return "#254E77";
    }
  };

  //counting ("from" and "to") date
  const startDate = new Date("2022-05-31");
  const dateArray = [];
  for (let i = 0; i < 357; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateString = currentDate.toISOString().slice(0, 10);
    dateArray.push(dateString);
  }

  //show selected data
  const handleGetInfo = id => {
    // setSelectedDate([]);
    const value = data[id];
    dispatch(setSelectedDate({ date: id, value }));
  };
  // console.log(selectedDate);
  return (
    <main className="main">
      <ul className="day">
        <li>Mon</li>
        <li>Wen</li>
        <li>Fri</li>
      </ul>

      <div className="container">
        <ul className="month">
          <li>Apr</li>
          <li>May</li>
          <li>June</li>
          <li>July</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
          <li>Jan</li>
          <li>Feb</li>
          <li>March</li>
        </ul>

        <div className="chart">
          {dateArray.map((id, index) => (
            <div
              key={index}
              id={id}
              className={`block ${selectedBlock === id ? "selected" : ""}`}
              onClick={() => handleGetInfo(id)}
              style={{
                backgroundColor: getColor(data[id] || 0),
              }}
            />
          ))}
        </div>

        {selectedDate && (
          <div className="modal">
            <div className="modal-content" key={selectedDate.date}>
              <span className="contribution">
                {selectedDate.value ?? 0} contributions
              </span>
              <span className="date">{selectedDate.date}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
