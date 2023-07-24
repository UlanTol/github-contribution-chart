import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "https://dpg.gg/test/calendar.json";

export default function GithubChart() {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
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
    } else if (item => 30) {
      return "#254E77";
    }
  };

  //counting from and to date
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
    setSelectedDate([]);
    const value = data[id];
    setSelectedDate([{ date: id, value }]);
    setSelectedBlock(id);
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

        {selectedDate.length > 0 && selectedBlock && (
          <div className="modal">
            {selectedDate.map(item => (
              <div className="modal-content" key={item.date}>
                <span className="contribution">
                  {item.value ?? 0} contributions
                </span>
                <span className="date">{item.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
