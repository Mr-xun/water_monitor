import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "../styles/notFound.scss";
export default () => {
    return (
        <div id="notfound">
            <img src={require("../assets/imgs/404.png")} alt="" />
            <h2>这个页面不存在</h2>
            <h3>页面可能已经删除、更名或暂时不可用</h3>
            <Link to="/home">
                <Button>返回首页</Button>
            </Link>
        </div>
    );
};
