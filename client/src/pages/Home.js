import { Slider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import Stock from '../components/Stock'

function Home() {
  const [companyData, setCompanyData] = useState();
  const [todayData, setTodayData] = useState();
  const [weekHigh, setWeekHigh] = useState();
  const [weekLow, setWeekLow] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const findData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://stockx-backend.onrender.com/api/companyData/:companyName",
        {
          companyName: params.companyName,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        const length = response.data.data.length;
        const todayData = response.data.data[length - 1];
        let weekhigh = 0;
        let weeklow = 9007199254740991;
        for (let i = length - 366; i < length; i++) {
          let val = response.data.data[i];
          if (val.high > weekhigh) {
            weekhigh = val.high;
          }
          if (val.low < weeklow) {
            weeklow = val.low;
          }
        }
        toast.success(response.data.message);
        setCompanyData(response.data.data);
        setWeekHigh(weekhigh);
        setWeekLow(weeklow);
        setTodayData(todayData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Please select Company");
    }
  };
  useEffect(() => {
    findData();
  }, []);
  
  return (
    <div className="details">
      <div className="nav-bar">
        <select
          name="company"
          id="company"
          className="drop-down nav-barRight"
          onChange={(e) => {
            window.location.assign(e.target.value);
          }}
        >
          <option value="selectCompany">Select Company</option>
          <option value="http://localhost:3000/:NSE">NSE</option>
          <option value="http://localhost:3000/:BSE">BSE</option>
          <option value="http://localhost:3000/:ASHOKLEY">ASHOKLEY</option>
          <option value="http://localhost:3000/:CIPLA">CIPLA</option>
          <option value="http://localhost:3000/:RELIANCE">RELIANCE</option>
          <option value="http://localhost:3000/:TATASTEEL">TATA STEEL</option>
          <option value="http://localhost:3000/:EICHERMOTORS">
            EICHER MOTOR
          </option>
        </select>
        <span className="nav-bar">|</span>
        <span className="nav-bar">FUTURE</span>
        <span className="nav-bar">|</span>
        <span className="nav-bar">OPTIONS</span>
      </div>
      {companyData && (
        <div>
          <h2>{todayData.companyName}</h2>
          <div className="line"></div>
        </div>
      )}
      {companyData && (
        <div className="stock-data">
          <div className="stock-data-left">
            <h1>{todayData.close}</h1>
            <div>
              {todayData.close - todayData.open > 0 ? (
                <h4 className="text-success">
                  {" "}
                  <GoTriangleUp />{" "}
                  {(todayData.close - todayData.open).toFixed(2)}(
                  {(
                    ((todayData.close - todayData.open) / todayData.close) *
                    100
                  ).toFixed(2) + "%"}
                  )
                </h4>
              ) : (
                <h4 className="text-danger">
                  <GoTriangleDown />{" "}
                  {(todayData.close - todayData.open).toFixed(2)}(
                  {(
                    ((todayData.close - todayData.open) / todayData.close) *
                    100
                  ).toFixed(2) + "%"}
                  )
                </h4>
              )}
              <p>As on {todayData.date}</p>
            </div>
          </div>
          <div className="stock-data-right">
            <h5>Day Range</h5>
            <div className="stock-data">
              <h5>{todayData.low}</h5>
              <h5>{todayData.high}</h5>
            </div>
            <div className="range">
              <div className="field">
                <div className="value left">L</div>
                <input type="range" min="0" max="200" value="100" steps="1" />
                <div className="value right">R</div>
              </div>
            </div>
            <h5>52 week Range</h5>
            <div className="stock-data">
              <h5>{weekHigh}</h5>
              <h5>{weekLow}</h5>
            </div>
            <div className="range">
              <div className="field">
                <div className="value left">L</div>
                <input type="range" min="0" max="200" value="100" steps="1" />
                <div className="value right">R</div>
              </div>
            </div>
            <h5>Returns</h5>
            <div>
              <select
                name="company"
                id="company"
                className="drop-down nav-barRight"
              >
                <option value="YTD">YTD</option>
              </select>
              <span>
                {(
                  ((todayData.close - weekHigh) / todayData.close) *
                  100
                ).toFixed(2) + "%"}
              </span>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="links-container">
        <ul className="links">
          <li>OVERVIEW</li>
          <li>CHART</li>
          <li>TECHNICALS</li>
          <li>NEWS</li>
          <li>CONTRIBUTION</li>
          <li>COMPONENTS</li>
          <li>FORUM</li>
        </ul>
      </div>
      <hr />
      {companyData && (
        <div className="below-table">
          <table className="tables">
            <tr>
              <td>Open</td>
              <td>{todayData.open}</td>
            </tr>
            <tr>
              <td>Previous Close</td>
              <td>{todayData.adjclose}</td>
            </tr>
            <tr>
              <td>Day High</td>
              <td>{todayData.high}</td>
            </tr>
          </table>
          <table className="tables">
            <tr>
              <td>Day Low</td>
              <td>{todayData.low}</td>
            </tr>
            <tr>
              <td>52 week High</td>
              <td>{weekHigh}</td>
            </tr>
            <tr>
              <td>52 Week High</td>
              <td>{weekLow}</td>
            </tr>
          </table>
        </div>
      )}
      <div className="graph">
        {companyData && <Stock companyData={companyData} />}
      </div>
    </div>
  );
}

export default Home;
