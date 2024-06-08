import React, { useState } from 'react';
import Link from 'next/link';

const Registrieren = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');
  const [passwortBestätigung, setPasswortBestätigung] = useState('');
  const [termsAkzeptiert, setTermsAkzeptiert] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwortError, setPasswortError] = useState('');
  const [passwortBestätigungError, setPasswortBestätigungError] = useState('');
  const [termsAkzeptiertError, setTermsAkzeptiertError] = useState('');
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const EMail_validieren = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError('Bitte geben Sie Ihren Namen ein.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Bitte geben Sie Ihre E-Mail-Adresse ein.');
      isValid = false;
    } else if (!EMail_validieren(email)) {
      setEmailError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!passwort) {
      setPasswortError('Bitte geben Sie Ihr Passwort ein.');
      isValid = false;
    } else if (passwort.length < 8 || !/[!@#$%^&*]/.test(passwort)) {
      setPasswortError('Passwort muss mindestens 8 Zeichen lang sein und mindestens ein Sonderzeichen enthalten.');
      isValid = false;
    } else {
      setPasswortError('');
    }

    if (passwort !== passwortBestätigung) {
      setPasswortBestätigungError('Die Passwörter stimmen nicht überein.');
      isValid = false;
    } else {
      setPasswortBestätigungError('');
    }

    if (!termsAkzeptiert) {
      setTermsAkzeptiertError('Bitte akzeptieren Sie die Geschäftsbedingungen.');
      isValid = false;
    } else {
      setTermsAkzeptiertError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('/api/regist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            passwort,
            termsAkzeptiert,
          }),
        });
        if (!response.ok) {
          throw new Error('Die Netzwerkantwort war nicht in Ordnung');
        }
        setRegistrationCompleted(true);
      } catch (error) {
        console.error('Beim fetch operation ist ein Problem aufgetreten :', error);
      }
    } else {
      alert('Bitte alle Felder korrekt ausfüllen.');
    }
  };
  const containerStyle = {
    backgroundColor: '#f0f7ff',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // تعبئة ارتفاع الشاشة بالكامل
  };
  
  const titleStyle = {
    color: 'blue',
  };
  
  const inputStyle = {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid blue',
  };
  
  const errorStyle = {
    color: 'red',
  };
  
  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  
  const linkStyle = {
    color: 'blue',
  };
  
  return (
    <div style={containerStyle}>
    <h1 style={titleStyle}>Registrieren</h1>
    <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name" style={titleStyle}>Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          {nameError && <p style={errorStyle}>{nameError}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={titleStyle}>E-Mail:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          {emailError && <p style={errorStyle}>{emailError}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={titleStyle}>Passwort:</label>
          <input type="password" id="password" value={passwort} onChange={(e) => setPasswort(e.target.value)} required style={inputStyle} />
          {passwortError && <p style={errorStyle}>{passwortError}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="passwordBestätigung" style={titleStyle}>Passwort bestätigen:</label>
          <input type="password" id="passwordBestätigung" value={passwortBestätigung} onChange={(e) => setPasswortBestätigung(e.target.value)} required style={inputStyle} />
          {passwortBestätigungError && <p style={errorStyle}>{passwortBestätigungError}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="termsAkzeptiert" style={titleStyle}>
            <input type="checkbox" id="termsAkzeptiert" checked={termsAkzeptiert} onChange={(e) => setTermsAkzeptiert(e.target.checked)} required />
            Ich habe die Nutzungsbedingungen und die Datenschutzrichtlinie gelesen und akzeptiere sie.
          </label>
          {termsAkzeptiertError && <p style={errorStyle}>{termsAkzeptiertError}</p>}
        </div>
        <button type="submit" style={buttonStyle}>Registrieren</button>
      </form>
      {registrationCompleted && (
        <p style={titleStyle}>
          Sie haben bereits ein Konto?{' '}
          <Link href="/login">
            <a style={linkStyle}>Anmelden</a>
          </Link>
        </p>
      )}
    </div>
  );
  
};

export default Registrieren;