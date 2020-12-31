1. How long did you spend on the coding test?
Ans - It took me 2 days to complete the assignment.

2. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
Ans- If I had more time with me spend on this problem statement-
* I would have loved to make UI and UX look better and more interactive.
* Also I would want to include a fallback mechanism using mongodb scheduler which would poll the API for data regularly and keep the collection updated as a backup.
* I would have written more tests for frontside as well as middleware to test the solution thoroughly and have a good coverage.

3. What was the most useful feature that was added to the latest version of your chosen language/framework? Please include a snippet of code that shows how you've used it.
Ans - I really think that ES6 arrow functions are a great addition to the javascript language. They make the code look concise, neat, and less clustered. I have mostly used ES6 arrow functions
for eg-
const App = () => {
    const [data, setData] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        //fetch data from API and keep in store
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:5000/");
            const result = await response.json();
            setLoading(false);
            setData(result.raw_data);
            var states_array = [...new Set(result.raw_data.map ((row) =>  { return (row.detectedstate); } ) )];
            setStates(states_array);
        }
        fetchData();
    },[])

4. How would you track down a performance issue in production? Have you ever had to do this?
Ans - To  crack down a performance issue in production, I would use different size of input data/ API data and check how the performance is changing with respect to the data. In short how scalable it is.

5. List of all the libraries and packages used to complete the assignment
Ans-
For Clientside-

    "@testing-library/jest-dom": "^5.11.6",
    "@testing-library/react": "^11.2.2",
    "@testing-library/user-event": "^12.5.0",
    "bootstrap": "^4.5.3",
    "enzyme": "^3.11.0",
    "enzyme-adapter-react-16": "^1.15.5",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-redux": "^7.1.0-rc.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "react-test-renderer": "^17.0.1",
    "reactstrap": "^8.7.1",
    "recharts": "^1.8.5",
    "redux": "^4.0.0-rc.1",
    "redux-devtools-extension": "^2.13.8",
    "redux-thunk": "^2.3.0",
    "web-vitals": "^0.2.4"

 For server side-

    "config": "^3.3.3",
    "cors": "^2.8.5",
    "create-react-app": "^4.0.1",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.9",
    "node-fetch": "^2.6.1",
    "request": "^2.88.2"
    "concurrently": "^5.3.0",
    "nodemon": "^2.0.6"