import axios from "axios";
import { useState } from "react";


const App = () => {

  const [sourceType, setSourceType] = useState('URL');
  const [source, setSource] = useState('');
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');

  const options = {
    method: 'POST',
    url: 'https://api.ai21.com/studio/v1/summarize-by-segment',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer FPxCsR6kPr2nblDQcFKecHOZbbiS8dGp'
    },
    data: { sourceType, source }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios(options);
      console.log(response.data.segments);
      setResponse(response.data.segments);
      setError('');
    } catch (error) {
      setError(error.message || 'An errpr occurred');
      setResponse('');
    }
  }  

  return (
    <>
      <div>
        <h1>Summarize by Segment</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Source Type:
              <select value={sourceType} key={sourceType} onChange={(e) => setSourceType(e.target.value)}>
                <option value="URL">URL</option>
                <option value="TEXT">TEXT</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              {sourceType === 'URL' ? 'URL:' : 'Text:'}
              <input
                type={sourceType === 'URL' ? 'url' : 'text'}
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>

        <div>
          {response && (
            <div>
              <div>
                <h2>Summary</h2>
                <ul>
                  {response.map((segment, index) => (
                    <li key={index}>{segment.summary}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Segment Text</h2>
                <ul>
                  {response.map((segment, index) => (
                    <li key={index}>{segment.segmentText}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Highlights</h2>
                <ul>
                  {response.map((segment, index) => (
                    <li key={index}>
                      {segment.highlights.map((highlight, index) => (
                        <span key={index}>{highlight.text}</span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          {error && (
            <div>
              <h2>Error:</h2>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App