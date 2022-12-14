import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import './App.scss';

function App() {

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl ] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();
    try {
      showSpinner();
      const res = await openai.createImage({
        prompt,
        n: 1,
        size: "256x256",
      });
      const imageUrl = res.data.data[0].url;
      setImageUrl(imageUrl);
      removeSpinner();
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='project-form'>
          <div className="form-title">
            Generate a unique image using DALL·E<br />
            <div className='title'>
              Describe the Image
            </div>
          </div>
          <form id='image-form' onSubmit={generateImage}>
            <input type='text' placeholder='Give a description of the image. Eg:- A white siamese cat' onChange={(e) => setPrompt(e.target.value)} required/><br />
            <button type='submit'>Generate</button>
          </form>
        </div>
      </header>
      <div className='image-container'>
        {
          imageUrl
          ? <img className='image' src={imageUrl} alt='' />
          : <></>
        }
      </div>
      <div className="spinner"></div>
    </div>
  );
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

export default App;
