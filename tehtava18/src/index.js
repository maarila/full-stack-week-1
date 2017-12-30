import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      votes: []
    };
  }

  haeUusi = () => {
    this.setState({
      selected: this.palautaRandom(0, anecdotes.length)
    });
  };

  palautaRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  aanesta = () => {
    this.setState({
      votes: this.state.votes.concat(this.state.selected)
    });
  };

  haeAanet = (haettava) => {
    return this.state.votes.filter((arvo) => arvo === haettava).length;
  };

  haeSuosituin = () => {
    let suosituin = 0;
    let suosituimmanAanet = 0;

    for (let i = 0; i < anecdotes.length; i++) {
      let aanet = this.haeAanet(i);
      if (aanet > suosituimmanAanet) {
        suosituin = i;
        suosituimmanAanet = aanet;
      }
    }
    return suosituin;
  };

  render() {
    return (
      <div>
        <div>{this.props.anecdotes[this.state.selected]}</div>
        <Votes votes={this.haeAanet(this.state.selected)} />
        <Button handleClick={this.aanesta} nimi="vote" />
        <Button handleClick={this.haeUusi} nimi="next anecdote" />
        <br />
        <h3>Anecdote with most votes:</h3>
        <MostVotes
          anecdote={this.props.anecdotes[this.haeSuosituin()]}
          votes={this.haeAanet(this.haeSuosituin())}
        />
      </div>
    );
  }
}

const Button = ({handleClick, nimi}) => (
  <button onClick={handleClick}>{nimi}</button>
);

const Votes = ({votes}) => <div>has {votes} votes</div>;

const MostVotes = ({anecdote, votes}) => {
  if (votes === 0) {
    return <em>no votes have been given yet</em>;
  }
  return (
    <div>
      {anecdote}
      <br />
      has {votes} votes
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
