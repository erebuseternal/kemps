import './App.css';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GoogleMapReact from 'google-map-react';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

function App() {
  return (
    <Tabs defaultActiveKey="explore" id="uncontrolled-tab-example">
      <Tab eventKey="explore" title="Explore">
        <div style={{ height:'100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={{
              lat: 37.0,
              lng: -122.0
            }}
            zoom={10}
          >
          </GoogleMapReact>
        </div>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Hello
      </Tab>
    </Tabs>
  );
}

export default App;
