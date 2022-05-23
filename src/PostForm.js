import React, { Component } from 'react'
import  './PostForm.css'

// SET APIKEY HERE
// apiKey should be set to OpenAI subscription key
var apiKey = "XXX"

export class PostForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         prompt: '',
         responseArray: []
      }
    }
 
    inputHandler = (event) => {
        this.setState({ prompt: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        var data = {
            prompt: this.state.prompt,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
           };
           
        fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
            },
        body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => {
            if (data.choices.length > 0) {
             let response = {
                 prompt: this.state.prompt,
                 response: data.choices[0].text 
                 }
            this.setState({ responseArray: [response].concat(this.state.responseArray)});            }
        });

    }
  render() {
    const {responseArray} = this.state
    const {prompt} = this.state
    return (
      <div>
          <form onSubmit={this.submitHandler}>
            <h1>Got a Prompt?</h1>
            <p>ex: "A song about birds"</p>
              <input type="text" name="prompt" value={prompt} onChange={this.inputHandler}/>
              <button type="submit">SUBMIT</button>
          </form>
          {
          responseArray.length > 0 ? (
        <ul>
            {responseArray.map(result =>
            <li>
                {result.prompt} <br></br>- {result.response}
            </li>)}
        </ul>
    )
    : 
    (null)
    }
      </div>
    )
  }
}

export default PostForm