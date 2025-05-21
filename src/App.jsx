import Signup from './components/Signup'
import { BrowserRouter } from 'react-router-dom';
import "./index.css";

const isStandalone = !window.__POWERED_BY_HOST__; 

const App = () => {
    const content = (
        <div>
            <Signup />
        </div>
    );

    return isStandalone ? <BrowserRouter>{content}</BrowserRouter> : content;
};

export default App;