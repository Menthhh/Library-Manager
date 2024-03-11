import donateQr from "../../assets/donateQr.jpg";

import "./donate.css";

const Donate = () => {
    return (
        <div className="donate">
            <h1>Donate</h1>
            <img src={donateQr} alt="donateQr" className="donatePic" />
        </div>
    );
};




export default Donate;
