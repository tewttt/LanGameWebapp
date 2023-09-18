import "./DigitalClock.scss"

const DigitalClock = () => {
    return (
        <div className="base">
            <div className="clockk">
                <div className="hours">
                    <div className="hours__tens">
                        <div className="number">0</div>
                        <div className="number">1</div>
                        <div className="number">2</div>
                    </div>
                    <div className="hours__units">
                        <div className="number">0</div>
                        <div className="number">1</div>
                        <div className="number">2</div>
                        <div className="number">3</div>
                        <div className="number">4</div>
                        <div className="number">5</div>
                        <div className="number">6</div>
                        <div className="number">7</div>
                        <div className="number">8</div>
                        <div className="number">9</div>
                    </div>
                </div>
                <div className="minutes">
                    <div className="minutes__tens">
                        <div className="number">0</div>
                        <div className="number">1</div>
                        <div className="number">2</div>
                        <div className="number">3</div>
                        <div className="number">4</div>
                        <div className="number">5</div>
                    </div>
                    <div className="minutes__units">
                        <div className="number">0</div>
                        <div className="number">1</div>
                        <div className="number">2</div>
                        <div className="number">3</div>
                        <div className="number">4</div>
                        <div className="number">5</div>
                        <div className="number">6</div>
                        <div className="number">7</div>
                        <div className="number">8</div>
                        <div className="number">9</div>
                    </div>
                </div>
                <div className="seconds">
                    <div className="seconds__tens">
                        <div className="number">0</div>
                        <div className="number">1</div>
                        <div className="number">2</div>
                        <div className="number">3</div>
                        <div className="number">4</div>
                        <div className="number">5</div>
                    </div>
                    <div className="seconds__units">
                        <div className="number">0</div>
                        <div className="number">1</div>
                        <div className="number">2</div>
                        <div className="number">3</div>
                        <div className="number">4</div>
                        <div className="number">5</div>
                        <div className="number">6</div>
                        <div className="number">7</div>
                        <div className="number">8</div>
                        <div className="number">9</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DigitalClock;