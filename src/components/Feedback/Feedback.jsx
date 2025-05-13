import React, { useState } from 'react';
import Typography from '../Common/Typography';
import Button from '../Common/Button';

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState(''); // new state for contact number
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleInputChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]); // ✅ store selected file
  };

  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      setUsername(''); // Clear username if anonymous
      setContactNumber(''); // Clear contact number if anonymous
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Feedback submitted:', feedbackText);
    console.log('Anonymous:', isAnonymous ? 'Yes' : 'No');
    console.log('Username:', isAnonymous ? 'Anonymous' : username);
    console.log('Contact Number:', isAnonymous ? 'Not Provided' : contactNumber);
    alert('Thank you for your feedback!');
    setFeedbackText('');
    setUsername('');
    setContactNumber(''); // Reset contact number after submit
    setAttachment(null);
  };

  return (
    <div className="bg-gradient-to-r from-white via-blue-500 to-purple-500">
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="p-8 rounded-lg shadow-md w-[90%] max-w-lg">
          <Typography variant="h5" className="font-semibold mb-4 text-gray-800">
            Give us your feedback!
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
                Your Feedback:
              </label>
              <textarea
                id="feedback"
                value={feedbackText}
                onChange={handleInputChange}
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isAnonymous}
                placeholder={isAnonymous ? 'Anonymous' : 'Enter your username'}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Contact Number:
              </label>
              <input
                id="contactNumber"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                disabled={isAnonymous}
                placeholder={isAnonymous ? 'Not Provided' : 'Enter your contact number'}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="attachment" className="block text-gray-700 text-sm font-bold mb-2">
                Add Attachment (optional):
              </label>
              <input
                id="attachment"
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                  file:rounded file:border-0 file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="flex items-center">
              <input
                id="anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
                className="mr-2 leading-tight"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>

            <Button type="submit" variant="primary">
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
