import { CognitoUserPool, CookieStorage } from "amazon-cognito-identity-js"; 

const poolData = {
    UserPoolId:"us-east-1_PHSZr0uCX",
    ClientId:"6pu5p720691ge85vuqltn78edj", 
    Storage: new CookieStorage({
        domain: "http://localhost:3000", 
        // secure: true
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CognitoUserPool(poolData); 