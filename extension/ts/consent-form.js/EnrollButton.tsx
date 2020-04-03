import React, { MouseEvent } from "react";
import { ConsentStatus } from "../background.js/consentStatus";
import Modal from "react-modal";
import Radio from "../components/photon-components-web/photon-components/Radio";
import Button from "../components/photon-components-web/photon-components/Button";

const customStyles = {
  overlay: {
    backgroundColor: "rgb(0,0,0,0.5)",
  },
  content: {
    color: "black",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#app");

export interface EnrollButtonProps {
  loading: boolean;
  consentStatus: ConsentStatus;
  onEnroll: () => void;
}

export interface EnrollButtonState {
  modalIsOpen: boolean;
  userPartOfMarginilizedGroup: null | "yes" | "no" | "prefer-not-to-answer";
  userOver18: null | "yes" | "no";
}

export class EnrollButton extends React.Component<
  EnrollButtonProps,
  EnrollButtonState
> {
  public state = {
    loading: true,
    modalIsOpen: false,
    consentStatus: null,
    userPartOfMarginilizedGroup: null,
    userOver18: null,
  };

  onEnroll = async (event: MouseEvent) => {
    event.preventDefault();
    this.closeModal();
    this.props.onEnroll();
  };

  handleUserPartOfMarginilizedGroupOptionChange = changeEvent => {
    this.setState({
      userPartOfMarginilizedGroup: changeEvent.target.value,
    });
  };

  handleUserOver18OptionChange = changeEvent => {
    console.log("changeEvent.target.value", changeEvent.target.value);
    this.setState({
      userOver18: changeEvent.target.value,
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    if (this.props.loading) {
      return null;
    }

    return (
      (this.props.consentStatus !== "given" && (
        <div>
          <Button
            className="enroll-button h-20 btn rounded-lg items-center"
            onClick={this.openModal}
          >
            Enroll in the study
          </Button>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2>First, a few questions</h2>

            <div>
              <p>
                Do you consider yourself to be part of a marginalized group?
              </p>
              <ul className="list-none">
                <li className="mb-2">
                  <Radio
                    name="user_over_18"
                    value="yes"
                    label="Yes"
                    checked={this.state.userPartOfMarginilizedGroup === "yes"}
                    onChange={
                      this.handleUserPartOfMarginilizedGroupOptionChange
                    }
                  />
                </li>
                <li className="mb-2">
                  <Radio
                    name="user_over_18"
                    value="no"
                    label="No"
                    checked={this.state.userPartOfMarginilizedGroup === "no"}
                    onChange={
                      this.handleUserPartOfMarginilizedGroupOptionChange
                    }
                  />
                </li>
                <li className="mb-2">
                  <Radio
                    name="user_over_18"
                    value="prefer-not-to-answer"
                    label="I prefer not answer"
                    checked={
                      this.state.userPartOfMarginilizedGroup ===
                      "prefer-not-to-answer"
                    }
                    onChange={
                      this.handleUserPartOfMarginilizedGroupOptionChange
                    }
                  />
                </li>
              </ul>
            </div>

            <div>
              <p>Are you over 18 years old?</p>
              <ul className="list-none">
                <li className="mb-2">
                  <Radio
                    name="user_over_18"
                    value="yes"
                    label="Yes"
                    checked={this.state.userOver18 === "yes"}
                    onChange={this.handleUserOver18OptionChange}
                  />
                </li>
                <li className="mb-2">
                  <Radio
                    name="user_over_18"
                    value="no"
                    label="No"
                    checked={this.state.userOver18 === "no"}
                    onChange={this.handleUserOver18OptionChange}
                  />
                </li>
              </ul>
            </div>

            <Button
              className="enroll-button h-20 btn rounded-lg items-center"
              disabled={this.state.userOver18 !== "yes"}
              onClick={this.onEnroll}
            >
              Enroll in the study
            </Button>
          </Modal>
        </div>
      )) || (
        <button className="enroll-button enrolled">
          You've enrolled.
          <br />
          Welcome!
          <br />
          <small>(Feel free to close this window)</small>
        </button>
      )
    );
  }

  onFoo = (checked: boolean) => {
    event.preventDefault();
    console.log({ event });
  };
}
