import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      palautteet: []
    };
  }

  kirjaaPalaute = (palautteenArvo) => {
    return () => {
      this.setState({palautteet: this.state.palautteet.concat(palautteenArvo)});
    };
  };

  etsiPalaute = (palautteenArvo) =>
    this.state.palautteet.filter((arvo) => arvo === palautteenArvo).length;

  keskiarvo = () => {
    if (this.state.palautteet.length > 0) {
      return (
        this.state.palautteet.reduce((a, b) => a + b) /
        this.state.palautteet.length
      );
    }
  };

  positiivisia = () =>
    this.etsiPalaute(1) / this.state.palautteet.length * 100 + " %";

  render() {
    return (
      <div>
        <h2>Anna palautetta:</h2>
        <Button handleClick={this.kirjaaPalaute(1)} nimi="hyvä" />
        <Button handleClick={this.kirjaaPalaute(0)} nimi="neutraali" />
        <Button handleClick={this.kirjaaPalaute(-1)} nimi="huono" />
        <h2>Statistiikkaa:</h2>
        <Statistics
          hyva={this.etsiPalaute(1)}
          neutraali={this.etsiPalaute(0)}
          huono={this.etsiPalaute(-1)}
          keskiarvo={this.keskiarvo()}
          positiivisia={this.positiivisia()}
        />
      </div>
    );
  }
}

const Button = ({handleClick, nimi}) => (
  <button onClick={handleClick}>{nimi}</button>
);

const Statistics = ({hyva, neutraali, huono, keskiarvo, positiivisia}) => {
  if (hyva + neutraali + huono === 0) {
    return <em>Yhtään palautetta ei ole vielä annettu.</em>;
  }

  return (
    <table>
      <tbody>
        <Statistic rivi="hyvä" arvo={hyva} />
        <Statistic rivi="neutraali" arvo={neutraali} />
        <Statistic rivi="huono" arvo={huono} />
        <Statistic rivi="keskiarvo" arvo={keskiarvo} />
        <Statistic rivi="positiivisia" arvo={positiivisia} />
      </tbody>
    </table>
  );
};

const Statistic = ({rivi, arvo}) => {
  return (
    <tr>
      <td>{rivi}:</td>
      <td>{arvo}</td>
    </tr>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
