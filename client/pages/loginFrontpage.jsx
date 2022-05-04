import { randomString } from "../lib/randomString";
import { sha256 } from "../lib/sha256";
import React, { useContext, useEffect, useState } from "react";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import { ApplicationContext } from "../applicationContext";

function LoginButton({ config, label, provider }) {
    async function handleLogin() {
        const {
            authorization_endpoint,
            response_type,
            scope,
            client_id,
            code_challenge_method,
        } = config[provider];

        const state = randomString(50);
        window.sessionStorage.setItem("expected_state", state);

        const parameters = {
            response_type,
            response_mode: "fragment",
            client_id,
            state,
            scope,
            redirect_uri: `${window.location.origin}/login/${provider}/callback`,
        };

        if (code_challenge_method) {
            const code_verifier = randomString(50);
            window.sessionStorage.setItem("code_verifier", code_verifier);
            parameters.code_challenge_method = code_challenge_method;
            parameters.code_challenge = await sha256(code_verifier);
            parameters.domain_hint = "egms.no";
        }

        window.location.href =
            authorization_endpoint + "?" + new URLSearchParams(parameters);
    }

    return (
        <div>
            <button onClick={handleLogin}>{label}</button>
        </div>
    );
}

export function LoginCallback({ reload, config }) {
    const { provider } = useParams();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { registerLogin } = useContext(ApplicationContext);
    useEffect(async () => {
        const { access_token, error, error_description, state, code } =
            Object.fromEntries(
                new URLSearchParams(window.location.hash.substring(1))
            );

        const expected_state = window.sessionStorage.getItem("expected_state");
        if (!state || expected_state !== state) {
            setError("Unexpected state");
            return;
        }

        if (error || error_description) {
            setError(`Error: ${error} (${error_description})`);
            return;
        }

        if (code) {
            const { client_id, token_endpoint } = config[provider];
            const code_verifier = window.sessionStorage.getItem("code_verifier");
            const redirect_uri = `${window.location.origin}/login/${provider}/callback`;
            //Denne må kanskje endres
            const payload = {
                grant_type: "authorization_code",
                code,
                client_id,
                code_verifier,
                redirect_uri,
            };
            const res = await fetch(token_endpoint, {
                method: "POST",
                body: new URLSearchParams(payload),
            });
            if (!res.ok) {
                setError(`Failed to fetch token ${res.status}: ${await res.text()}`);
                return;
            }
            const { access_token } = await res.json();
            await registerLogin(provider, { access_token });
            reload();
            navigate("/front-db");
            return;
        }

        if (!access_token) {
            setError("Missing access_token");
            return;
        }

        await registerLogin(provider, { access_token });
        reload();
        navigate("/front-db");
    }, []);

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    return <h1>Please wait...</h1>;
}


function StartLogin({ config }) {
    return (
        <div>
            <h1>Login</h1>
            <LoginButton
                label={"Login with Google"}
                config={config}
                provider={"google"}
            />
            <LoginButton
                label={"Login with ID-porten"}
                config={config}
                provider={"hk"}
            />
        </div>
    );
}

export function LoginFrontPage({ config, reload }) {
    return (
        <Routes>
            <Route path={"/"} element={<StartLogin config={config} />} />
            <Route
                path={"/:provider/callback"}
                element={<LoginCallback config={config} reload={reload} />}
            />
            <Route path={"*"} element={<StartLogin config={config} />} />
        </Routes>
    );
}

//<Route path={"/endsession"} element={<EndSession reload={reload} />} /> - TRENGER VI DENNE
