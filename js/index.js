import { getLoginStatus } from '../util/login.js';
const result = getLoginStatus(); 
result.then(res => {
    console.log(res.json())
})