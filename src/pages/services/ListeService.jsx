import { Tab, Tabs } from "react-bootstrap";
import Page from "../../components/Page";
import ListeLub from "src/pages/ficheLubrifiants/ListeLub";
import ListeAcc from "src/pages/ficheAccessoires/ListeAcc";
import ListeLav from "src/pages/ficheLavages/ListeLav";
import "./indexDashboard.css";

export default function ListeService() {
  return (
    <Page title="Autres Services">
      <div
        className="row justify-content-center services"
        style={{ marginTop: "-80px" }}
      >
        <div className="card p-5 col-xs-10 col-sm-10 col-md-10">
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="tabs mb-3"
            style={{ height: "auto", width: "auto" }}
          >
            <Tab eventKey="home" title="Lubrifiants">
              <div style={{ margin: "50px" }}>
                <ListeLub />
              </div>
            </Tab>
            <Tab eventKey="profile" title="Accessoires">
              <div style={{ margin: "50px" }}>
                <ListeAcc />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Page>
  );
}
