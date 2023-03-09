import "./widget.css";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceWalletOutLinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { Book, Handshake } from "@mui/icons-material";
import { openexternal } from "../../renderer";

const Widget = ({ type }) => {
    let data;


    switch (type) {
        case "user":
            data = {
                title: "PROFESSEUR",
                isMoney: false,
                link: "voir les professeurs",
                icon: (
                    <PersonOutlineOutlined
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: " rgba(218,165,32,0.2)",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "SUPPORT",
                isMoney: true,
                link: "contacter les support de l'application",
                linkurl: "https://ngdream.com",
                icon: (
                    <Handshake className="icon"
                        style={{
                            color: "green",
                            backgroundColor: " rgba(0,128,0,0.2)",
                        }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "DOCS",
                isMoney: true,
                link: "learn how to use",
                linkurl: "https://ngdream.com",
                icon: (
                    <Book className="icon"
                        style={{
                            color: "purple",
                            backgroundColor: " rgba(128,0,128,0.2)",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney}</span>
                <button onClick={(e) => { openexternal(e, data.linkurl) }}><span className="link">{data.link}</span></button>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUp />
                </div>
                {data.icon}
            </div>

        </div>
    );

}

export default Widget