import axios from 'axios'; // Import Axios

// Function to get data to the server
const TestSubmitDataDashboardGet = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/submitData');
    console.log('Get Response:', response.data);
    console.log("line 11")
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    console.log("line 14")
  }
};

// Function to post data to the server
const TestSubmitDataDashboardPost = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/api/submitData', data);
    console.log('POST Response:', response.data);
    console.log("line 11")
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    console.log("line 14")
  }
};

export { TestSubmitDataDashboardGet, TestSubmitDataDashboardPost}