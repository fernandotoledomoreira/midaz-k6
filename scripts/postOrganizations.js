import http from 'k6/http';
import { check, sleep } from 'k6';

const LEDGER_URI = "http://localhost:3000/v1/organizations"
const AUTH_URI = "http://localhost:8080/api/login/oauth/access_token";
const CLIENT_ID = "9670e0ca55a29a466d31";
const CLIENT_SECRET = "dd03f916cacf4a98c6a413d9c38ba102dce436a9";
const USERNAME = "user_john";
const PASSWORD = "Lerian@123";

export const options = {
    stages: [
        { duration: '3s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 0 },
    ],
};

export function setup() {
    const authUri = AUTH_URI;
    const credentialsPayload = JSON.stringify({
        "grant_type": "password",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "username": USERNAME,
        "password": PASSWORD
    });

    const params = {
        headers: { "Content-Type": "application/json" },
    };

    let res = http.post(authUri, credentialsPayload, params);
    check(res, { "Login bem-sucedido": (r) => r.status === 200 });

    let token = JSON.parse(res.body).access_token;
    return token;

}

export default function (token) {
    const ledgerUri = LEDGER_URI;
    const payload = JSON.stringify({
        "legalName": "test company",
        "doingBusinessAs": "The ledger.io",
        "legalDocument": "78425230000190",
        "status": {
            "code": "ACTIVE",
            "description": "Ledger Test"
        },
        "address": {
            "line1": "Avenida Paulista, 1234",
            "line2": "CJ 203",
            "zipCode": "01310916",
            "city": "East Taylor",
            "state": "VI",
            "country": "TG"
        },
        "metadata": {
            "chave": "metadata_chave",
            "bitcoin": "1GD8jg4kcHomS6QiAMXt9UajSqXn",
            "boolean": true,
            "double": 10.5,
            "int": 1
        }
    });

    console.log(payload)

    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    const res = http.post(ledgerUri, payload, params);
    check(res, { 'Status 201': (r) => r.status === 201 });

    sleep(1);
}