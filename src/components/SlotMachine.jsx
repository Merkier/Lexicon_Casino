import React from 'react';
import './SlotMachine.css';

class SlotMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slot1: '❓',
      slot2: '❓',
      slot3: '❓',
      isSpinning: false,
      message: 'Symbol x2 Victory. x3 Jackpot!', // We'll store a little feedback message here (win/lose).
      credits: 100, 
      stake: 10
    };

    // Symbols to randomly choose from
    this.symbols = [
      '🪄', '🧲', '🦑', '🦂', '🔮', '🧠',
      '💎', '🌪️', '☄️', '💥', '👾', '🤯'
    ];

  }

  getRandomSymbol = () => {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  };

// Check the result of the spin
checkWinCondition = () => {
  const { slot1, slot2, slot3, stake, credits } = this.state;
  
  if (slot1 === slot2 && slot2 === slot3) {
    this.setState({
      message: 'JACKPOT!!!',
      credits: credits + (stake * 4),
    });
  } 
  else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
    this.setState({
      message: 'You Win!',
      credits: credits + (stake * 2),
    });
  } 
  else {
    this.setState({
      message: 'Try Again!',
    });
  }
};

incrementStake = () => {
  const { stake } = this.state;
  this.setState({stake: stake + 5})
};

decrementStake = () => {
  const { stake } = this.state;
  this.setState({stake: stake - 5})
};


spin = () => {
  if (this.state.isSpinning || this.state.credits <= 0 || this.state.stake > this.state.credits || this.state.stake <= 0) return;
  const { stake, credits } = this.state;
  this.setState({ credits: credits - stake })
  this.setState({ isSpinning: true, message: '. . .' });

  //separate interval for each reel
  const reelInterval1 = setInterval(() => {
    this.setState({ slot1: this.getRandomSymbol() });
  }, 100);
  const reelInterval2 = setInterval(() => {
    this.setState({ slot2: this.getRandomSymbol() });
  }, 100);
  const reelInterval3 = setInterval(() => {
    this.setState({ slot3: this.getRandomSymbol() });
  }, 100);

  const stop1 = 1000 + Math.random() * 100; 
  const stop2 = 1500 + Math.random() * 100; 
  const stop3 = 2000 + Math.random() * 100; 
 
  // Stop reel 1
  setTimeout(() => {
    clearInterval(reelInterval1);   
    this.setState({ slot1: this.getRandomSymbol() });
  }, stop1);


  setTimeout(() => {
    clearInterval(reelInterval2); 
    this.setState({ slot2: this.getRandomSymbol() });
  }, stop2);


  setTimeout(() => {
    clearInterval(reelInterval3);
    this.setState({ slot3: this.getRandomSymbol() }, () => {

      this.setState({ isSpinning: false }, () => {
        // Now check if they matched
        this.checkWinCondition();
      });
    });
  }, stop3);
};

  render() {
    const { slot1, slot2, slot3, isSpinning, message, credits, stake } = this.state;
    return (
      <div className="machineContainer">
    
        <div className="slots">
          <span className="slot">{slot1}</span>
          <span className="slot">{slot2}</span>
          <span className="slot">{slot3}</span>
        </div>
        <p className="result-message">{message}</p>
        <div className="bottomRow">
  {/* Credits Section */}
  <div className="creditsSection">
    <p className="sectionLabel">Credits</p>
    <div className="credit-message">{credits}</div>
  </div>

  {/* Stake Section */}
<div class="stakeSection">
  <p class="sectionLabel">Stake</p>
  <div class="stakes-message">{stake}</div>
  <button className="stakebuttons" onClick={this.decrementStake}>-</button>
  <button className="stakebuttons" onClick={this.incrementStake}>+</button>
</div>


        <button
          onClick={this.spin}
          disabled={isSpinning}
          className="spinbutton"
        >
          {isSpinning ? 'Spin' : 'Spin'}
        </button>
      </div>
    </div>
    );
    
  }
}

export default SlotMachine;
