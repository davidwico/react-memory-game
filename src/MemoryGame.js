import React, { Component } from 'react';
import './MemoryGame.css';

class MemoryGame extends Component {
  constructor(props) {
    super(props);
    //Array of memory images
    this.ImagePieces = ['cat', 'cat', 'dog', 'dog', 'horse', 'horse',
    'pig', 'pig', 'snake', 'snake', 'fish', 'fish'];
    this.tempCheckArr = [];
    this.state = {
      showImg: Array(this.ImagePieces.length).fill('hidden'),
      divClick: true,
      compareImgArr: [],
      counter: 0
    }   
    this.checkMatch = this.checkMatch.bind(this);
  }

  //Shuffle memory game images
  componentWillMount() {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    shuffleArray(this.ImagePieces);
  }

  //Check for match function
  checkMatch(key, e) {
    //For later hidding images purposes
    this.tempCheckArr.push(key.toString());

    //Create copy of (compareImgArr) and add img src, for later compare
    const imgSrc = e.target.firstChild.src;
    const compareImgArr = [...this.state.compareImgArr];
    compareImgArr.push(imgSrc);

    //Set current clicked item as 'visible' in main array 'showImg'
    const arr = this.state.showImg
    arr[key] = 'visible';

    //Update state, counter for block user click method
    //after unhidding two pieces
    this.setState({
      showImg: arr,
      compareImgArr: compareImgArr,
      counter: this.state.counter + 1
    });

    //Check if 2 items are clicked - if yes - disable clicking
    if (this.state.counter % 2) {
      this.setState({
        divClick: false
      });
      //Check if pictures are matching
      if (compareImgArr[0] === compareImgArr[1]) {
        this.tempCheckArr = [];
        this.setState({
          compareImgArr: [],
          divClick: true
        });
      } else {
        //If pictures not match turn them back to hidden
        var tempArr = this.state.showImg
        // eslint-disable-next-line
        var firstElement = parseInt(this.tempCheckArr[0]);
        // eslint-disable-next-line
        var secondElement = parseInt(this.tempCheckArr[1]);
        setTimeout(()=>{
          tempArr[firstElement] = 'hidden';
          tempArr[secondElement] = 'hidden';
          this.tempCheckArr = [];
          this.setState({
            showImg: tempArr,
            compareImgArr: [],
            divClick: true
          })
        }, 1500)
      }
    }
  }

  render() {
    return(
      <div>
        <h1>Memory Game</h1>
        <div className="mui-panel wrapper">
          {this.ImagePieces.map((text, i) => {
            return (
              <div key={i} className="modal mui-panel" 
                onClick={this.state.divClick ? (e) => this.checkMatch(i, e) : undefined}>
                  <img style={{visibility: this.state.showImg[i]}} src={'./'+text+'.jpg'}
                  srcSet={'./'+text+'_lrg.jpg 1000w'} key={i} alt="Game Element"/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}


export default MemoryGame;