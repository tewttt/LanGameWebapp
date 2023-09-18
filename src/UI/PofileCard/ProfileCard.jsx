import "./profileCard.scss"
import zur from "../../assets/img/1.jpg";

const Profile = () => {
    return (
        <div className="base">
            <div className="car">
                <div  className="car-photo"> 
                    <img src={zur}/>
                    {/* <img src="https://unsplash.it/1000/1000"/> */}
                    {/* <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"/> */}
                </div>
                <div className="car-info">
                    <h2 className="fullname">John</h2>
                    <h3 className="occupation">director</h3>
                </div>
            </div>
           
        </div>
    )
}

export default Profile;