import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "https://dpg.gg/test/calendar.json";

export default function GithubChart() {
  const [data, setData] = useState(null);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Fetching data
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

  const keysArray = Object.keys(data);
  const valuesArray = Object.values(data);

  console.log(valuesArray);
  const getColorIntensity = item => {
    if (item <= 1) {
      return "#EDEDED";
    } else if (item >= 1 && item <= 9) {
      return "#ACD5F2";
    } else if (item >= 10 && item <= 19) {
      return "#7FA8C9";
    } else if (item >= 20 && item <= 29) {
      return "#527BA0";
    } else if (item >= 30 && item <= 40) {
      return "#254E77";
    }
  };

  return (
    <main className="main">
      <ul className="day">
        <li>Mon</li>
        <li>Wen</li>
        <li>Fri</li>
      </ul>
      <div className="container ">
        <ul className="month">
          <li>Jan</li>
          <li>Feb</li>
          <li>March</li>
          <li>May</li>
          <li>June</li>
          <li>Jule</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </ul>
        <div className="chart">
          {keysArray.map((key, index) => (
            <div
              key={index}
              id={key}
              className="block"
              style={{
                backgroundColor: getColorIntensity(valuesArray[index]),
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
