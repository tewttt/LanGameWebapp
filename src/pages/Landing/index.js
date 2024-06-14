import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import LandingContext from "../../context/LandingContext";
import pattern from "../../assets/logo/backgroundSmall.png"
import logo from "../../assets/logo/Typo Logo SVG Blue.svg"
import zur1 from '../../assets/Group1.png'
import zur2 from '../../assets/Group2.png'
import zur3 from '../../assets/Group3.png'
import zur4 from '../../assets/Group4.png'
import vector from "../../assets/Vector 10.png"
import { FaFacebook } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export default function Landing() {
  const ctx = useContext(LandingContext);
  const history = useHistory();

  const signup = () => {
    history.push("/signup");
  };
 const login = () => {
    history.push("/login");
  };
  return (
    <div className="flex flex-col w-screen h-full text-baseBlack bg-white px-6 md:px-20 lg:px-44" 
         style={{backgroundImage: `url(${pattern})`}}
        >
        <section className="flex flex-row justify-between items-center py-4">
            <img src={logo} className="w-[200px] md:w-[300px] aspect-auto"/>
            <button 
                onClick={login}
                className="bg-baseBlue1 text-white w-[150px] h-[50px] rounded-2xl">
                Нэвтрэх
            </button>  
        </section>

        <section className="flex flex-col justify-center items-center lg:flex-row w-full mt-8 lg:mb-14 ">
            <div className="w-full lg:w-1/2 px-4">
                <p className=" text-center lg:text-start text-[48px] sm:text-[72px] lg:text-[96px] font-bold text-baseBlue1">{ctx?.landing?.landing?.headTitle}</p>
                <p className="my-2 px-10 sm:text-[24px] lg:text-[40px] lg:px-0">{ctx?.landing?.landing?.headText}</p>
                <button 
                    onClick={signup}
                    className="bg-baseBlue1 w-full lg:w-[200px] text-white py-4 px-8 mt-8 rounded-xl">
                    БҮРТГҮҮЛЭХ
                </button>
            </div>
            <img src={ctx?.photo?.sentPhoto} className="w-full lg:w-[50%] aspect-auto my-10"/>
        </section>

        <section className="flex flex-col lg:flex-row w-full justify-between items-center my-20 text-white">
            <div className="w-[300px] h-[220px] p-4 lg:w-[450px] lg:h-[400px] flex flex-col justify-between lg:mr-4 my-2 lg:my-0 bg-baseBlue1 rounded-3xl lg:py-20 lg:px-8">
                <p className="font-bold text-[22px] lg:text-[28px] text-center">{ctx?.landing?.landing?.question1Title}</p>
                <p className="my-3 text-center">{ctx?.landing?.landing?.question1Text}</p>
            </div>
            <div className="w-[300px] h-[220px] p-4 lg:w-[450px] lg:h-[400px] flex flex-col justify-between lg:mr-4 my-2 lg:my-0 bg-baseBlue1 rounded-3xl lg:py-20 lg:px-8">
                <p className="font-bold text-[22px] lg:text-[28px] text-center">{ctx?.landing?.landing?.question2Title}</p>
                <p className="text-center my-3">{ctx?.landing?.landing?.question2Text}</p>
            </div>
            <div className="w-[300px] h-[220px] p-4 lg:w-[450px] lg:h-[400px] flex flex-col justify-between lg:mr-4 my-2 lg:my-0 bg-baseBlue1 rounded-3xl lg:py-20 lg:px-8">
                <p className="font-bold text-[22px] lg:text-[28px] text-center">{ctx?.landing?.landing?.question3Title}</p>
                <p className="text-center my-3">{ctx?.landing?.landing?.question3Text}</p>
            </div>
        </section>
        {/* lesson */}
        <section className="flex flex-col mt-8 mb-20 justify-center">
            <p className="text-baseBlue1 text-center font-bold text-[30px] lg:text-[50px] mb-10">{ctx?.landing?.landing?.lessonTitle}</p>
            <div className="flex flex-col lg:flex-row w-full">
                <video 
                    className="flex w-full lg:w-[630px] aspect-auto"
                    src={ctx?.video?.sentVideo}  
                    type="video/mp4" controls>
                </video>
                <div className="text-white flex flex-col justify-between lg:text-[24px] w-full lg:ml-6">
                    <div className="bg-baseBlue1 w-full flex flex-row rounded-2xl px-6 items-center my-2 lg:my-0">
                        <img src={zur1} className="w-10 aspect-auto"/>
                        <img src={vector} className=" w-1 mx-6"/>
                        <p>ШИНЭ ҮГ</p>
                    </div>
                    <div className="bg-baseBlue1 w-full flex flex-row rounded-2xl px-6 items-center my-2 lg:my-0">
                        <img src={zur2} className="w-10 aspect-auto"/>
                        <img src={vector} className=" w-1 mx-6"/>
                        <p>СОНСГОЛ</p>
                    </div>
                    <div className="bg-baseBlue1 w-full flex flex-row rounded-2xl px-6 items-center my-2 lg:my-0">
                        <img src={zur3} className="w-10 aspect-auto"/>
                        <img src={vector} className=" w-1 mx-6"/>
                        <p>ДҮРЭМ</p>
                    </div>
                    <div className="bg-baseBlue1 w-full flex flex-row rounded-2xl px-6 items-center my-2 lg:my-0">
                        <img src={zur4} className="w-10 aspect-auto"/>
                        <img src={vector} className=" w-1 mx-6"/>
                        <p>ОРЧУУЛГА</p>
                    </div>
                    
                </div>
            </div>
        </section>
        {/* game */}
        <section className="flex flex-col mt-8 lg:mb-20 justify-center lg:mx-40">
            <p className="text-baseBlue1 text-center font-bold text-[30px] lg:text-[50px] mb-10">{ctx?.landing?.landing?.gameTitle}</p>
            <div className="flex flex-col lg:flex-row w-full">
                 <video 
                    className="flex lg:h-[600px] aspect-auto"
                    src={ctx?.gameVideo?.gameVideo}  
                    type="video/mp4" controls>
                </video>
                <div className="text-baseBlack flex flex-col justify-center lg:pl-36 lg:text-[24px] w-full lg:ml-6">
                    <p className="font-bold text-[20px] lg:text-[48px] lg:mb-10 mt-6 lg:mt-0">{ctx?.landing?.landing?.gameHeadline}</p>
                    <p className="mt-2 lg:w-[550px] ">{ctx?.landing?.landing?.gameText}</p>
                </div>
            </div>
        </section>
        {/* ads */}
        <section className="flex flex-col mt-8 mb-20 justify-center lg:mx-40">
            <p className="text-baseBlue1 text-center font-bold text-[30px] lg:text-[50px] mb-10">{ctx?.landing?.landing?.adsTitle}</p>
            <div className="flex flex-col lg:flex-row w-full">
                 <video 
                    className="flex lg:h-[600px] aspect-auto"
                    src={ctx?.adsVideo?.adsVideo} 
                    type="video/mp4" controls>
                </video>
                <div className="text-baseBlack flex flex-col justify-center lg:pl-36 lg:text-[24px] w-full lg:ml-6">
                    <p className="font-bold text-[20px] lg:text-[48px] mt-6 lg:mb-10">{ctx?.landing?.landing?.adsHeadline}</p>
                    <p className="mt-2 lg:w-[550px">{ctx?.landing?.landing?.adsText}</p>
                </div>
            </div>
        </section>
        {/* price */}
        <section className="my-10 lg:mt-20 lg:mb-32 flex flex-col lg:flex-row lg:mx-40 justify-between">
            <button 
                onClick={signup}
                className="bg-baseBlue1 text-[30px] w-full lg:w-[300px] text-white py-4 px-8 my-2 rounded-xl">
                БҮРТГҮҮЛЭХ
            </button>
            <div>
                <p className="text-baseBlue1 font-bold text-[28px] lg:text-[40px]">{ctx?.landing?.landing?.paymentTitle}</p>
                <p className="text-[20px] lg:text-[30px] ">{ctx?.landing?.landing?.paymentText}</p>
            </div>
        </section>
        {/* footer */}
        <section className="flex flex-col my-8 justify-center lg:px-12">
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex items-center my-1 justify-between">
                    <div className="flex flex-row items-center">
                        <FaFacebook size={20} className="text-helpGreen mr-4"/>
                        <p className="font-bold text-[18px] ">{ctx?.landing?.landing?.facebook}</p>
                    </div>
                    <a  href={ctx?.landing?.landing?.facebookLink} target="_blank" rel="image" 
                        className="bg-helpGreen rounded-xl w-[150px] p-2 text-center ml-3">
                        Facebook visit 
                    </a>
                </div>
                <div className="flex items-center justify-between my-1 ">
                    <div className="flex flex-row items-center">
                        <FiInstagram size={20} className="text-helpGreen mr-4"/>
                        <p className="font-bold text-[18px]">{ctx?.landing?.landing?.instagram}</p>
                    </div>
                    <a  href={ctx?.landing?.landing?.instagramLink} target="_blank" rel="image" 
                    className="bg-helpGreen rounded-xl w-[150px] p-2 text-center ml-3"
                    >
                        Instagram visit 
                    </a>
                </div>
                <div className="flex items-center my-1">
                    <MdEmail size={20} className="text-helpGreen mr-4"/>
                    <p className="font-bold text-[18px]  my-1">{ctx?.landing?.landing?.email}</p>
                </div>
            </div>
            <p className="mt-10 mb-20 text-center">{ctx?.landing?.landing?.other}</p>
        </section>
        
    </div>
  
  );
}

 