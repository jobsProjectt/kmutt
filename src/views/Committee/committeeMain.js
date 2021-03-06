import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { date2Thai } from "../CustomFunction";
import { useHistory } from "react-router-dom";

import "./committee.css";

const { Search } = Input;
const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const CommitteeMain = () => {
  const history = useHistory();

  const [LoadingTable, setLoadingTable] = useState(false);
  const [LoadingSearch, setLoadingSearch] = useState(false);
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState([]);
  const [Title, setTitle] = useState("");

  const columns = [
    {
      title: <div style={title}>เลขที่</div>,
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "80px",
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: <div style={title}>ชื่อ-นามสกุล</div>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div style={title}>ตำแหน่ง</div>,
      dataIndex: "position",
      key: "position",
    },
    {
      title: <div style={title}>ระดับ</div>,
      dataIndex: "level",
      key: "level",
    },
    {
      title: <div style={title}>สังกัด</div>,
      dataIndex: "division",
      key: "division",
    },
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "status",
      key: "status",
      //   width: "50px",
      render: (text, row, index) => {
        const success = row.status === "success" ? true : false;
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "center",
            }}
            className={success ? "btnCommitteeDisable" : "btnCommittee"}
            onClick={
              success ? null : () => history.push(`/committee/${row.no}`)
            }
          >
            {`${success ? "ประเมินแล้ว" : "ประเมิน"}`}
          </div>
        );
      },
    },
  ];

  const search = (value) => {
    setLoadingSearch(true); // loading ปุ่ม search  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true); // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว

    const regex = new RegExp(value.toString().toUpperCase(), "g");
    const find = filter.filter(({ name }) => {
      const upper = name.toString().toUpperCase();
      return upper.match(regex);
    });
    setdata(find); // set Data ใส่ตาราง
    setLoadingSearch(false);
    setLoadingTable(false);
  };

  const LoadData = () => {
    // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true);
    // set Data ใส่ตาราง
    setdata([
      {
        no: "1",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "2",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "3",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "4",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "5",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "6",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "success",
      },
    ]);
    // set Data ไว้ filter
    setfilter([
      {
        no: "1",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "2",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "3",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "4",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "5",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "wait",
      },
      {
        no: "6",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        level: "xxxxxx",
        division: "xxxxxx",
        status: "success",
      },
    ]);
    // set Title
    setTitle(
      `${date2Thai("2020-01-01", true)} - ${date2Thai("2020-07-01", true)}`
    );
    setLoadingTable(false);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div className="justify-center align-center">
      <div className="row wrap window-height">
        <div className="col-xs-12 col-sm-12">
          <label
            style={{ fontWeight: "bold", fontSize: "26px", color: "black" }}
          >
            การประเมินรอบปีงบประมาณ {Title}
          </label>
          <div className="row no-gutter  mb-3">
            <div className="col-sm-6">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                รายชื่อพนักงานที่ต้องประเมิน
              </label>
            </div>
            <div className="col-sm-6 text-sm-right ">
              <Search
                className="committeeInput"
                placeholder="ค้นหารายชื่อพนักงาน"
                loading={LoadingSearch}
                style={{ width: "80%" }}
                onSearch={search}
              />
            </div>
          </div>
          {/* ********************************** */}
          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="committeeTable"
            columns={columns}
            dataSource={data}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              locale: { items_per_page: "/ หน้า" },
            }}
            loading={{
              spinning: LoadingTable,
              tip: "กำลังโหลด...",
              size: "large",
            }}
            locale={{ emptyText: "ไม่มีข้อมูล" }}
            scroll={{ y: 500 }}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default CommitteeMain;
