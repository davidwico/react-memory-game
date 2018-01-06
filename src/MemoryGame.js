import React, { Component } from 'react';
import './MemoryGame.css';

//Array of memory images
const ImagePieces = ['cat', 'cat', 'dog', 'dog', 'horse', 'horse',
 'pig', 'pig', 'snake', 'snake', 'fish', 'fish'];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let tempCheckArr = [];

class MemoryGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImg: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden',
       'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
      divClick: true,
      compareImgArr: [],
      counter: 0
    }
    this.checkMatch = this.checkMatch.bind(this);
  }

  //Shuffle memory game images
  componentWillMount() {
    shuffleArray(ImagePieces);
  }

  //Check for match function
  checkMatch(key, e) {

    //For later hidding images purposes
    tempCheckArr.push(key.toString());

    //Add image src to state (compareImgArr), for later compare
    const imgSrc = e.target.firstChild.src;
    const compareImgArr = this.state.compareImgArr;

    compareImgArr.push(imgSrc);

    //Counter for block user click memory after unhidding two pieces
    this.setState({
      compareImgArr: compareImgArr,
      counter: this.state.counter + 1
    });

    //Set current clicked item as 'visible' in main array 'showImg'
    const arr = this.state.showImg
    arr[key] = 'visible';
    this.setState({
      showImg: arr
    });

    //Check if 2 items are clicked - if yes - disable clicking
    if (this.state.counter % 2) {
      this.setState({
        divClick: false
      });

      //Check if pictures are matching
      if (this.state.compareImgArr[0] === this.state.compareImgArr[1]) {
        tempCheckArr = [];
        this.setState({
          compareImgArr: [],
          divClick: true
        });
      } else {
        //If pictures not match take them back to hidden
        var tempArr = this.state.showImg
        var firstElement = parseInt(tempCheckArr[0]);
        var secondElement = parseInt(tempCheckArr[1]);
        setTimeout(()=>{
          tempArr[firstElement] = 'hidden';
          tempArr[secondElement] = 'hidden';
          tempCheckArr = [];
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
          {ImagePieces.map((text, i) => {
            return (
              <div key={i} className="modal mui-panel" 
                onClick={this.state.divClick ? (e) => this.checkMatch(i, e) : undefined}>
                  <img style={{visibility: this.state.showImg[i]}} src={'./'+text+'.jpg'}
                  srcSet={'./'+text+'_lrg.jpg 1000w'} key={i} alt="Game Element"></img>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}


export default MemoryGame;