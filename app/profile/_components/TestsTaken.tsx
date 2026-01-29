import { API_URL } from "@/utils/urlUtils";
import axios from "axios";


const TestsTaken = async () => {
  try {
    const tests = await axios.get(`${API_URL}/test-stats/me`, {
      withCredentials: true,
    });
    console.log(tests.data);
    return <div>tests</div>;
  } catch (error) {
    console.log(error);
    return "error in finding tests";
  }
};

export default TestsTaken;
