import { Route, Routes, Link } from "react-router-dom";
import App from "./app";
import { AppNew } from "./SvgExample/AppNew";
import Canvas from "./canvas";

const Top = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">React Svg</Link>
                    </li>
                    <li>
                        <Link to="/wc-svg">WebComponet Svg</Link>
                    </li>
                    <li>
                        <Link to="/wc-canvas">WebComponet Canvas</Link>
                    </li>
                    {/* <li><a href="/contact">WebComponet Canvas</a></li> */}
                </ul>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<AppNew />} />
                    <Route path="/wc-svg" element={<App />} />
                    <Route path="/wc-canvas" element={<Canvas />} />

                   
                </Routes>


            </main>
        </div>
    );
    };
export default Top;