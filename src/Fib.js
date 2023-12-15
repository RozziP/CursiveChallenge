import React, { useState } from 'react';
import './styles/fib.css';

function FibForm() {
  const [formData, _setFormData] = useState({
    input: '',
    working: false,
    result: null,
    error: null
  });

  const setFormData = (newData) => {
    _setFormData({ ...formData, result: null, error: null, ...newData })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ working: true })

    try {
      const response = await fetch(
        'https://lr3iw7y0w9.execute-api.us-east-2.amazonaws.com/production/fib',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: formData.input })
        }
      )

      const data = await response.json();
      console.log(data)

      if (data.body?.result) {
        setFormData({ working: false, result: data.body.result })
      } else {
        setFormData({ working: false, error: data.body.error })
      }

    } catch (error) {
      setFormData({ working: false, error })
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className='content'>
      <a href='https://github.com/RozziP' className='initials'>PR</a>
      <div className='signature'>Peter Rozzi</div>
      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          Enter a number...
        </div>

        <div className='form-group'>
          <input type="text" className='input' value={formData.input} onChange={e => setFormData({ input: e.target.value })} required={true} disabled={formData.working} />
        </div>

        <div className='form-group'>
          <button type="submit" className='button'> SUBMIT </button>
        </div>

      </form>

      { formData.result && <div className='result-box'>The next highest digit of Fibonacci is { formData.result }</div> }
      { formData.error && <div className='error-box'>{ formData.error }</div> }
    </div>
  );
}

export default FibForm;