import React from "react";
import logo from "../resources/logo.png";
import "../resources/default.layout.css";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("Lab-Management-User"));

  const items = [
    {
      key: "1",
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("Lab-Management-User");
            navigate("/login");
          }}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ color: "#212121" }}
          />
          <span className="userName"> Logout</span>
        </li>
      ),
    },
  ];

  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center no-print">
        <div>
          <h1 className="logo">📈 Finance Management</h1>
        </div>

        <div>
          {user && (
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <Button className="primary no-print">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="xl"
                  style={{ color: "#fff" }}
                />
                <span className="userName"> {user.name}</span>
              </Button>
            </Dropdown>
          )}
        </div>
      </div>

      <div className="content">
        <div className="logoContainer">
          <img className="logoImage" src={logo} alt="logo" />
        </div>

        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
