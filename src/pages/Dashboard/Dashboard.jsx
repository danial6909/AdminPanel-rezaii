import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";
import axiosInstance from "../../utils/axiosInstance";

// Helper function to render a chart
const renderChart = (data, color) => (
  <div className="chart-container">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="time" hide />
        <YAxis
          domain={[0, 100]}
          stroke="#aaa"
          orientation="right"
          tick={{ style: { direction: "ltr", unicodeBidi: "embed" } }}
          tickFormatter={(value) => `\u200E${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#222",
            border: "none",
            borderRadius: "8px",
            direction: "ltr",
          }}
          formatter={(value) => `\u200E${value}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// New helper function to format bytes to a dynamic unit (B, KB, MB, GB)
const formatBytes = (value, sourceUnit = "BYTES", decimals = 2) => {
  const normalizedUnit = sourceUnit.toUpperCase();
  const unitMap = {
    BYTES: 0,
    KB: 1,
    MB: 2,
    GB: 3,
    TB: 4,
  };

  if (value === 0) {
    return "0 Bytes";
  }

  const sourceIndex = unitMap[normalizedUnit];
  if (sourceIndex === undefined) {
    // Return a default value or handle the error gracefully
    console.error(`Invalid source unit: ${sourceUnit}`);
    return "Invalid Unit";
  }

  // First, convert the input value to bytes
  let bytes = value * Math.pow(1024, sourceIndex);

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  // Find the appropriate size unit for the final output
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const Dashboard = () => {
  const [cpuHistory, setCpuHistory] = useState([]);
  const [memHistory, setMemHistory] = useState([]);
  const [currentUsage, setCurrentUsage] = useState({ cpu: 0, mem: 0, disk: 0 });
  const [systemInfo, setSystemInfo] = useState({
    cpuCores: 0,
    memTotal: 0,
    diskTotal: 0,
    networkIn: 0,
    networkOut: 0,
    hls: 0,
    recordings: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/monitoring");
      const data = response.data;
      console.log(response.data);

      setCurrentUsage({
        cpu: data.totalResourcesUsage.cpuUsage,
        mem: data.totalResourcesUsage.memUsagePercent,
        disk: data.totalResourcesUsage.diskUsagePercent,
      });

      setSystemInfo({
        cpuCores: data.totalResourcesCapacity.cpuCores,
        memTotal: data.totalResourcesCapacity.memTotal,
        diskTotal: data.totalResourcesCapacity.diskTotal,
        networkIn: data.totalResourcesUsage.networkIn,
        networkOut: data.totalResourcesUsage.networkOut,
        hls: data.appUsedSpace.hls,
        recordings: data.appUsedSpace.recordings,
      });

      const timestamp = new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setCpuHistory((prevHistory) => {
        const newHistory = [
          ...prevHistory,
          { value: data.totalResourcesUsage.cpuUsage, time: timestamp },
        ];
        return newHistory.slice(-20);
      });

      setMemHistory((prevHistory) => {
        const newHistory = [
          ...prevHistory,
          { value: data.totalResourcesUsage.memUsagePercent, time: timestamp },
        ];
        return newHistory.slice(-20);
      });
    } catch (error) {
      console.error("Failed to fetch monitoring data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h1 className="dashboard-title">داشبورد مانیتورینگ منابع</h1>
        {/* Network Info Cards */}
        <div className="network-cards">
          <div className="network-card">
            <h4 className="network-title network-in">Network In</h4>
            <span className="network-value">
              {formatBytes(systemInfo.networkIn) || "0 Bytes"}/s
            </span>
          </div>
          <div className="network-card">
            <h4 className="network-title network-out">Network Out</h4>
            <span className="network-value">
              {formatBytes(systemInfo.networkOut) || "0 Bytes"}/s
            </span>
          </div>
        </div>
        {/* Main Resource Cards */}
        <div className="resource-cards">
          {/* CPU Usage Card */}
          <div className="resource-card">
            <div className="card-header">
              <h2 className="card-title">مصرف CPU</h2>
              <div className="card-info">
                <div className="usage-value cpu-usage">
                  {currentUsage.cpu.toFixed(1)}%
                </div>
                <div className="usage-detail">
                  Cores: {systemInfo.cpuCores || 0}
                </div>
              </div>
            </div>
            <div className="chart-wrapper">
              {renderChart(cpuHistory, "#34D399")}
            </div>
            <p className="card-description">
              این نمودار، آخرین تغییرات مصرف CPU را در طول زمان نشان می‌دهد.
            </p>
          </div>
          {/* Memory Usage Card */}
          <div className="resource-card">
            <div className="card-header">
              <h2 className="card-title">مصرف Memory</h2>
              <div className="card-info">
                <div className="usage-value mem-usage">
                  {currentUsage.mem.toFixed(1)}%
                </div>
                <div className="usage-detail">
                  Total: {formatBytes(systemInfo.memTotal, 'MB')}
                </div>
              </div>
            </div>
            <div className="chart-wrapper">
              {renderChart(memHistory, "#60A5FA")}
            </div>
            <p className="card-description">
              نمودار بالا روند مصرف حافظه (RAM) را نمایش می‌دهد.
            </p>
          </div>
          {/* Disk Usage Card */}
          <div className="resource-card">
            <div className="card-header">
              <h2 className="card-title">مصرف Disk</h2>
              <div className="card-info">
                <div className="usage-value disk-usage">
                  {currentUsage.disk}%
                </div>
                <div className="usage-detail">
                  Total: {formatBytes(systemInfo.diskTotal, 'GB')}
                </div>
              </div>
            </div>
            {/* Displaying hls and recordings usage */}
            <div className="disk-breakdown-info">
              <p>HLS Usage: {formatBytes(systemInfo.hls)}</p>
              <p>Recordings Usage: {formatBytes(systemInfo.recordings)}</p>
            </div>
            <div className="chart-wrapper disk-chart">
              <div className="circle-chart-container">
                <svg className="circle-chart-svg" viewBox="0 0 100 100">
                  <circle
                    className="circle-background"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="circle-progress"
                    strokeDasharray={`${(currentUsage.disk * 2.51).toFixed(
                      2
                    )}, 251.2`}
                    strokeDashoffset="0"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="circle-value">
                  <span className="circle-percentage">
                    {currentUsage.disk}%
                  </span>
                </div>
              </div>
            </div>
            <p className="card-description">
              این نمودار دایره‌ای میزان مصرف فضای دیسک را نمایش می‌دهد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
