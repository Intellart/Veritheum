import React from 'react';
import Selectbox from '../Selectbox/Selectbox';
import './MintingWizard.scss';

type State = {
  stepNumber: number,
}

class MintingWizard extends React.Component {
  constructor() {
    super();

    this.state = {
      stepNumber: 1,
    };
  }

  nextStep = () => {
    this.setState({ stepNumber: this.state.stepNumber + 1 });
  };

  previousStep = () => {
    this.setState({ stepNumber: this.state.stepNumber - 1 });
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
