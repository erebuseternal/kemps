import './App.css';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Explore from './Explore';

function App() {
  return (
    <Tabs defaultActiveKey="explore" id="uncontrolled-tab-example">
      <Tab eventKey="explore" title="Explore">
        <Explore />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Hello
      </Tab>
    </Tabs>
  );
}

export default App;
