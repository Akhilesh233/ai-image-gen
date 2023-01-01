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
        alert('Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system. Please change your prompt.');
        console.log(error.response.status);
        console.log(error.response.data);
        removeSpinner();
      } else {
        console.log(error.message);
        removeSpinner();
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
            <input type='text' placeholder='A white siamese cat sitting on the beach looking at the sun.' onChange={(e) => setPrompt(e.target.value)} required/><br />
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
