import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState ('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);

        props.onRegistration(username);
    };



    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>

            <div class="coc-form">
                <div class="coc-block-row">
                    <label class="coc-block-label" for="dateofbirth">Date Of Birth</label>
                    <div class="coc-block">
                        <input class="coc-input" type="date" name="dateofbirth" id="dateofbirth" />
                    </div>
                </div>
            </div>

            <label>
                Birthday:
                <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    )

}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func.isRequired
};