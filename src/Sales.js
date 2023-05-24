// import React, { useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart, LinearScale } from 'chart.js';
// import { CategoryScale, BarController, BarElement } from 'chart.js';
// import './Style.css';

// function Sales() {
//   useEffect(() => {
//     Chart.register(CategoryScale, BarController, BarElement);
//   }, []);

//   const salesData = {
//     labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
//     datasets: [
//       {
//         label: "Sales A",
//         data: [500, 750, 900, 650, 1000, 800,200,500,452,1258,2545,147],
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//       {
//         label: "Sales B",
//         data: [700, 600, 800, 950, 1200, 900,456,410,452,410,789,587],
//         backgroundColor: "rgba(192, 75, 192, 0.6)",
//       },
//       {
//         label: "Sales C",
//         data: [300, 550, 700, 450, 800, 700,250,456,215,445,5885,255],
//         backgroundColor: "rgba(192, 192, 75, 0.6)",
//       },
//     ],
//   };

//   return (
//     <div className="form">
//       <h1>Sales Information</h1>
//       <div className="chart-container">
//         <Bar data={salesData} />
//       </div>
//     </div>
//   );
// }

// export default Sales;

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import './Style.css';

function Sales() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState("salesByStore");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, selectedDataset]);

  const fetchData = async () => {
    try {
      // Make API calls or retrieve sales data from a database
      const response = await axios.get("/api/sales", {
        params: {
          startDate: startDate,
          endDate: endDate,
          dataset: selectedDataset,
        },
      });
      
      // Process the fetched data and format it for the chart
      const formattedData = processChartData(response.data);

      // Set the chart data
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const processChartData = (data) => {
    // Process and format the fetched data according to the chart's data structure
    // Example: sales by store
    const formattedData = {
      labels: data.map((item) => item.storeName),
      datasets: [
        {
          label: "Sales",
          data: data.map((item) => item.salesAmount),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    return formattedData;
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  return (
    <div className="form">
      <h1>Sales Dashboard</h1>
      <div className="controls">
        <DatePicker
          selected={startDate}
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
        <select value={selectedDataset} onChange={handleDatasetChange}>
          <option value="salesByStore">Sales by Store</option>
          <option value="salesByRegion">Sales by Region</option>
          <option value="bestSellingStyles">Best Selling Styles</option>
        </select>
      </div>
      <div className="chart-container">
        {chartData && <Bar data={chartData} />}
      </div>
    </div>
  );
}

export default Sales;
