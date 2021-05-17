export function FormCard({ children }) {
    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-img"></div>
                <div className="login-text">
                    <h4>#goodtimesforever</h4>
                    <h3>
                        <b>GOOD</b> <b>Reels</b>
                    </h3>
                    <p>
                        Video library having videos related to watches made from 316L stainless steel, this classic is
                        intended to stay as such and is designed.
                    </p>
                </div>
            </div>
            <div className="login-right">{children}</div>
        </div>
    );
}
