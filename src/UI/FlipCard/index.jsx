import "./flipCard.scss"

const FlipCard = () => {
    return (
        <div className="body">
            <div className="ccard">
                <div className="ccard-face ccard-front">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, eaque?</p>
                </div>
                <div className="ccard-face ccard-back">
                    <div className="ccard-back-content">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, exercitationem!</p>
                    </div>
                    <button className="ccard-button">Дэлгэрэнгүй</button>
                </div>
            </div>
        </div>
    )
}
export default FlipCard;