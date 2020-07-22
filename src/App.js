import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    const MAX_VERTICAL = 19.9;

    let horizontal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = [];

    let tmp = 0;
    for(let i = 1; i <= MAX_VERTICAL; i = (i*10 + 0.1*10) / 10) {
      result[tmp] = [];
      if (!(i % 1)) 
        result[tmp].push(i +'.0');
      else 
        result[tmp].push(i);
      tmp++;
    }
    this.logs = result;

    result.forEach((value,index) => {
      horizontal.forEach((val,idx) => {
        value[idx + 1] = Math.log10(value[0] + '' + val).toFixed(4);
      })
    });

    this.horizontal = horizontal.map((val,idx) => (
      <th key={idx}>{val}</th>
    ));

    this.result = result.map((value,index) => (
      <tr key={index}>
        {
          value.map((val,idx) => (
            <td key={idx} id={index + ',' + idx}>
              {val}
            </td>
          ))
        }
      </tr>
    ));
  }

  componentWillMount() {
    this.setState({
      horizontal: this.horizontal,
      result: this.result,
      searchNum: 0,
      logs: this.logs,
      highlight: [0, 0]
    });
  }

  keybordInput(e) {
    if (e.key == 'Enter') {
      this.state.searchNum = e.target.value;
      this.highlightTable(this);
    }
  }

  highlightTable(e) {
    try {
      if (e.state.highlight_tag.className == "highlight")
        e.state.highlight_tag.className = "";
    } catch (err) {

    }
    // console.log(e.props)
    let tmp = e.state.searchNum.match(/.+\../);
    // console.log(tmp)

    if(tmp == null)
      return console.log('입력값 오류')

      if(tmp.input.replace(tmp[0], '') == '' || tmp.input.replace(tmp[0], '') >= 10)
        return console.log('범위 오류')
      
    



    let filter;
    e.state.logs.forEach((val, idx) => {
      if (val[0] == tmp[0])
        filter = idx;
    })
    if (filter == undefined){
      return console.log('검색 결과값이 없습니다.')
    } else {
      e.state.highlight = [filter, parseInt(tmp.input.replace(tmp[0], '')) + 1];
    }

    console.log(e.state.highlight)
    e.state.highlight_tag = document.getElementById(e.state.highlight[0] + ',' + e.state.highlight[1]);
    e.state.highlight_tag.className = "highlight";
    document.querySelector("[id = '" + e.state.highlight[0] + ',' + e.state.highlight[1] + "']").scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  render() {
    return (
      <div className="App">
        <input type="text" onKeyPress={this.keybordInput.bind(this)} placeholder="소수점 두 자리까지의 수를 입력하세요"></input>
        <table>
          <th></th>
          { this.horizontal }
          { this.result }
        </table>
      </div>
    )
  }
}

export default App;
