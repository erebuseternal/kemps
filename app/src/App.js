import './App.css';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function App() {
  return (
    <Tabs defaultActiveKey="explore" id="uncontrolled-tab-example">
      <Tab eventKey="explore" title="Explore">
        Hello
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Hello
      </Tab>
    </Tabs>
  );
}

export default App;
