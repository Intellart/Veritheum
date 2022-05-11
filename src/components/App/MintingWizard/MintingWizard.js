import React from 'react';
import Selectbox from '../Selectbox/Selectbox';
import './MintingWizard.scss';

type State = {
  stepNumber: number,
  step1Answer: string,
  step2Anser: string,
  step3Answer: string,
}

class MintingWizard extends React.Component {
  constructor() {
    super();

    this.state = {
      stepNumber: 1,
      step1Answer: '',
      step2Answer: '',
      step3Answer: '',
    };
  }

  nextStep = () => {
    this.setState({ stepNumber: this.state.stepNumber + 1 });
  };

  previousStep = () => {
    this.setState({ stepNumber: this.state.stepNumber - 1 });
  };

  handleSelect = (event: Event, stepNumber: string) => {
    const stepAnswer = event.target.value;

    switch (stepNumber) {
      case 1:
        this.setState({ step1Answer: stepAnswer });
        break;
      case 2:
        this.setState({ step2Answer: stepAnswer });
        break;
      case 3:
        this.setState({ step3Answer: stepAnswer });
        break;
      default:
        return;
    }
  };

  render () {
    const { stepNumber } = this.state;

    return (
      <div className="minting-wizard">
        <div className="column short">
          <div className="steps-graphic-wrapper">
            <div className={`step ${stepNumber === 1 ? 'active' : ''} ${stepNumber > 1 ? 'done' : ''}`}>1</div>
            <div className={`step ${stepNumber === 2 ? 'active' : ''} ${stepNumber > 2 ? 'done' : ''}`}>2</div>
            <div className={`step ${stepNumber === 3 ? 'active' : ''} ${stepNumber > 3 ? 'done' : ''}`}>3</div>
          </div>
        </div>
        <div className="column long">
          <div className="step-counter">
            Step {stepNumber} of 3
          </div>
          {stepNumber === 1 && (
            <>
              <div className="step-title">
                Lorem ipsum dolor sit amet?
              </div>
              <div className="step-question">
                Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
              </div>
              <div className="minting-wizard-content">
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question1"
                      value="Integer tincidunt"
                      onChange={(e) => this.handleSelect(e, 1)}
                    />
                    Integer tincidunt
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question1"
                      value="Cras dapibus"
                      onChange={(e) => this.handleSelect(e, 1)}
                    />
                    Cras dapibus
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question1"
                      value="Vivamus elementum"
                      onChange={(e) => this.handleSelect(e, 1)}
                    />
                    Vivamus elementum
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </>
          )}
          {stepNumber === 2 && (
            <>
              <div className="step-title">
                Maecenas tempus, tellus eget?
              </div>
              <div className="step-question">
                Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.
              </div>
              <div className="minting-wizard-content">
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question2"
                      value="Blandit vel"
                      onChange={(e) => this.handleSelect(e, 2)}
                    />
                    Blandit vel
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question2"
                      value="Luctus pulvinar"
                      onChange={(e) => this.handleSelect(e, 2)}
                    />
                    Luctus pulvinar
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question2"
                      value="Hendrerit id"
                      onChange={(e) => this.handleSelect(e, 2)}
                    />
                    Hendrerit id
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </>
          )}
          {stepNumber === 3 && (
            <>
              <div className="step-title">
                Quisque rutrum. Aenean imperdiet?
              </div>
              <div className="step-question">
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
              </div>
              <div className="minting-wizard-content">
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question3"
                      value="Sed consequat"
                      onChange={(e) => this.handleSelect(e, 3)}
                    />
                    Sed consequat
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question3"
                      value="Donec pede justo"
                      onChange={(e) => this.handleSelect(e, 3)}
                    />
                    Donec pede justo
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="radio-button">
                  <label>
                    <input
                      type="radio"
                      className="button-only"
                      name="Question3"
                      value="Aenean massa"
                      onChange={(e) => this.handleSelect(e, 3)}
                    />
                    Aenean massa
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </>
          )}
          <div className="minting-wizard-footer">
            <button className={stepNumber === 1 ? 'hide' : ''} onClick={this.previousStep}>Back</button>
            {stepNumber < 3 && <button onClick={this.nextStep}>Next</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default MintingWizard;
