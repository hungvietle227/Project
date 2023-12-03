import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  getEmployee,
  getAnimails,
  getOrders,
  getRevenue,
} from "../../src/service/DashBoardService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import OrderTable from "./Order/OrderTable";
import Button from "@mui/material/Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [animails, setAnimails] = useState(0);
  const [employee, setEmployee] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [viewInfo, setViewInfo] = useState(false);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res);
      setRevenue(res);
    });
    getAnimails().then((res) => {
      setAnimails(res);
    });
    getEmployee().then((res) => {
      setEmployee(res);
    });
  }, []);

  return (
    <div style={{ width: "1000px" }}>
      <Space
        size={20}
        direction="vertical"
        style={{
          textAlign: "center",
          marginLeft: "30px",
          marginTop: "20px",
          marginBottom: "60px",
          width: "60%",
        }}
      >
        <Typography.Title level={10} style={{ width: "1000px" }}>
          Dashboard
        </Typography.Title>
        <Space
          direction="horizontal"
          style={{
            width: "900px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Orders"}
            value={orders
              .map((item) => item.totalTicket)
              .reduce((acc, ticket) => acc + ticket, 0)}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Animails"}
            value={animails}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Employee"}
            value={employee}
          />
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={orders
              .map((item) => item.totalPrice)
              .reduce((acc, price) => acc + price, 0)}
          />
        </Space>
        <Space>
          <RecentOrders />

          <DashboardChart />
        </Space>
        <div>
          {viewInfo ? (
            <Button
              style={{ transform: "translate(300px,-300px)" }}
              variant="contained"
              onClick={() => setViewInfo(!viewInfo)}
            >
              Close Info
            </Button>
          ) : (
            <Button
              style={{
                transform: "translate(300px,-300px)",
              }}
              variant="contained"
              onClick={() => setViewInfo(!viewInfo)}
            >
              View Info
            </Button>
          )}
        </div>
      </Space>

      {viewInfo ? (
        <div
          style={{
            width: "900px",
            marginLeft: "400px",
            transform: "translateY(-400px)",
          }}
        >
          <OrderTable />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res);
      setLoading(false);
      console.log(res);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        style={{ width: "300px" }}
        columns={[
          {
            title: "Month",
            dataIndex: "month",
          },
          {
            title: "Quantity",
            dataIndex: "totalTicket",
          },
          {
            title: "Price",
            dataIndex: "totalPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getOrders().then((res) => {
      const labels = res.map((i) => {
        return `Month-${i.month}`;
      });
      const data = res.map((i) => {
        return i.totalPrice;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            height: "1000px",
            backgroundColor: "rgba(255, 0, 0, 10)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <div
      style={{
        width: "800px",
        height: "700px",
        top: "0px",
        transform: "translateX(100px)",
      }}
    >
      <Bar style={{ height: "1000px" }} options={options} data={reveneuData} />
    </div>
  );
}
export default Dashboard;
