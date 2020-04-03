import React, { MouseEvent } from "react";
import { browser, Runtime } from "webextension-polyfill-ts";
import Port = Runtime.Port;
import { ConsentStatus } from "../background.js/consentStatus";
import { EnrollButton } from "./EnrollButton";
import "photon-colors/photon-colors.css";
import "../components/photon-components-web/index.css";
import "../components/photon-components-web/attributes";
import "../components/tailwind.css";

export interface ConsentFormProps {}

export interface ConsentFormState {
  loading: boolean;
  consentStatus: ConsentStatus;
  userPartOfMarginilizedGroup: null | boolean;
}

export class ConsentForm extends React.Component<
  ConsentFormProps,
  ConsentFormState
> {
  public state = {
    loading: true,
    consentStatus: null,
    userPartOfMarginilizedGroup: null,
  };

  private backgroundContextPort: Port;

  componentDidMount(): void {
    this.backgroundContextPort = browser.runtime.connect(browser.runtime.id, {
      name: "port-from-consent-form",
    });

    // Send a request to gather the current consent status
    this.backgroundContextPort.postMessage({
      requestConsentStatus: true,
    });

    // When we have received consent status, update state to reflect it
    this.backgroundContextPort.onMessage.addListener(
      (m: { consentStatus: ConsentStatus }) => {
        console.log({ m });
        const { consentStatus } = m;
        this.setState({
          loading: false,
          consentStatus,
        });
      },
    );
  }

  cancel(event: MouseEvent) {
    event.preventDefault();
    window.close();
  }

  onEnroll = async () => {
    const consentStatus = "given";
    this.setState({
      loading: false,
      consentStatus,
    });
    this.backgroundContextPort.postMessage({
      updatedConsentStatus: consentStatus,
    });
  };

  report = async (event: MouseEvent) => {
    event.preventDefault();
    window.close();
  };

  handleUserPartOfMarginilizedGroupOptionChange = changeEvent => {
    console.log({ changeEvent });
    this.setState({
      userPartOfMarginilizedGroup: changeEvent.target.value,
    });
  };

  render() {
    return (
      <div className="page-container">
        <header className="header">
          <div className="layout-wrapper">
            <img className="wordmark" src="./img/mozilla.svg" alt="Mozilla" />
          </div>
        </header>
        <div className="banner">
          <div className="layout-wrapper">
            <div className="icon-container">
              <img
                className="icon h-16 m-4 mb-8"
                src="./img/green-extensionsicon.svg"
              />
            </div>
            <h1 className="banner-text">
              Introducing Mozilla's YouTube Regrets Pilot Study
            </h1>
          </div>
        </div>
        <div className="layout-wrapper">
          <section className="program-description">
            <p className="callout">
              Mozilla wants to get better insights into YouTube's problem with
              harmful content and recommendations.
            </p>
            <p>
              In order to achieve this, we need to collect and analyze data
              about YouTube usage statistics. We would like to confirm that you
              are willing to share this information with us. Data collection
              will happen in the background while you use Firefox to browse
              YouTube.
            </p>
            <p>
              <strong>Participation in the study is strictly voluntary.</strong>
            </p>
            <EnrollButton
              loading={this.state.loading}
              consentStatus={this.state.consentStatus}
              onEnroll={this.onEnroll}
            />
          </section>
          <section className="program-instructions">
            <h2 className="program-header">What Will Happen Next</h2>
            <p>
              <strong>If you agree</strong> to participate:
            </p>
            <ol>
              <li>
                A message will be sent to Mozilla to note that you are willing
                to participate in the study. Continue using Firefox as you
                normally would.
              </li>
              <li>
                The study add-on will collect varying information about your
                YouTube browsing behavior, possibly including what YouTube pages
                you visit and how you interact with them.
              </li>
              <li>
                Periodically, we will send aggregated information about your
                YouTube browsing behavior to Mozilla.
              </li>
              <li>
                Whenever you{" "}
                <strong>regret watching a specific YouTube video</strong>, you
                should follow the steps below to report it to our researchers.
              </li>
            </ol>
          </section>
          <section className="program-instructions">
            <h2 className="program-header">Reporting a "YouTube Regret":</h2>
            <ol>
              <li>
                Click the [icon description] icon in the browser bar:
                <br />
                <img src="" />
              </li>
              <li>
                Fill out the form:
                <br />
                <img src="" />
              </li>
              <li>Click “Report”</li>
            </ol>
          </section>
          <section className="program-leaving">
            <h2 className="program-header">Leaving the study</h2>
            <p>Users are welcome to opt out of the study at any point.</p>
            <p>To stop participating in the study:</p>
            <ol>
              <li>
                Type <code>about:addons</code> into the location bar and press{" "}
                <code>Enter</code>.
              </li>
              <li>
                If you see an addon called <code>YouTube Regrets Reporter</code>
                , click <strong>Remove</strong>.
              </li>
              <li>
                Opting out of the study will immediately stop all ongoing data
                collection.
              </li>
            </ol>

            <p>
              Leaving the study will not cause your historic study data to be
              deleted. To request that your shared study data will be deleted,
              ....
            </p>
          </section>
          <section className="program-privacy">
            <h2 className="program-header">Your Privacy</h2>
            <p>
              Mozilla understands the sensitivity of the data that is collected
              and works hard to keep your data private and secure:
            </p>
            <ul>
              <li>
                This data will be linked to a randomly generated ID we only use
                for this particular study. It is used to keep a specific
                user&#39;s data together on the server and helps us improve our
                analysis.
              </li>
              <li>
                No data will be collected from inside Private Browsing windows.
              </li>
              <li>
                Individual data will never be shared publicly or sold. Only a
                small number of researchers will have access to raw data. If we
                share aggregate information from the study, we will disclose it
                in a way that minimizes the risk of participants being
                identified.
              </li>
            </ul>
          </section>
          <section className="program-thanks">
            <h2 className="program-header">
              You Help Make The Internet Healthier
            </h2>
            <p>
              At Mozilla, we pride ourselves on making the internet healthier
              for you, the user! That’s why we need your help.
            </p>
            <p>
              YouTube is one of the most opaque platforms on the market,
              providing researchers and the public with very little data to
              study widespread user-reported problems with harmful content on
              the platform and draw attention to them in an evidence-driven way.
              Mozilla has already brought these concerns forward with YouTube
              and pressured the company to release more data to researchers who
              are trying to understand what content is amplified and pushed down
              by YouTube’s recommendation algorithms.{" "}
            </p>
            <p>
              By participating in this study, you will help us to make better
              decisions on your behalf and shape the future of the Internet!
            </p>
            <EnrollButton
              loading={this.state.loading}
              consentStatus={this.state.consentStatus}
              onEnroll={this.onEnroll}
            />
          </section>
        </div>
        <footer className="footer">
          <img className="mozilla-logo m-auto" src="./img/mozilla.svg" />
        </footer>
      </div>
    );
  }
}
