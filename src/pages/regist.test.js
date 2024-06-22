import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Registrieren from './regist';
import '@testing-library/jest-dom/extend-expect';

describe('Registrieren Komponente', () => {
  test('Test der Anwesenheit von Eingabefeldern', () => {
    render(
      <Router>
        <Registrieren />
      </Router>
    );

    const nameInput = screen.getByLabelText('Name:');
    const emailInput = screen.getByLabelText('E-Mail:');
    const passwordInput = screen.getByLabelText('Passwort:');
    const passwordConfirmInput = screen.getByLabelText('Passwort bestätigen:');
    const termsCheckbox = screen.getByLabelText(/Ich habe die Nutzungsbedingungen und die Datenschutzrichtlinie gelesen und akzeptiere sie./i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(termsCheckbox).toBeInTheDocument();
  });

  test('Test der Formularübermittlung mit korrekten Registrierungsdaten', async () => {
    render(
      <Router>
        <Registrieren />
      </Router>
    );

    const nameInput = screen.getByLabelText('Name:');
    const emailInput = screen.getByLabelText('E-Mail:');
    const passwordInput = screen.getByLabelText('Passwort:');
    const passwordConfirmInput = screen.getByLabelText('Passwort bestätigen:');
    const termsCheckbox = screen.getByLabelText(/Ich habe die Nutzungsbedingungen und die Datenschutzrichtlinie gelesen und akzeptiere sie./i);
    const submitButton = screen.getByRole('button', { name: /Registrieren/i });

    fireEvent.change(nameInput, { target: { value: 'Max Mustermann' } });
    fireEvent.change(emailInput, { target: { value: 'max.mustermann@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Passwort123!' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'Passwort123!' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Registration completed')).toBeInTheDocument();
    });
  });

  test('Test der Fehlermeldung bei ungültiger E-Mail-Adresse', async () => {
    render(
      <Router>
        <Registrieren />
      </Router>
    );

    const emailInput = screen.getByLabelText('E-Mail:');
    const submitButton = screen.getByRole('button', { name: /Registrieren/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Bitte geben Sie eine gültige E-Mail-Adresse ein.')).toBeInTheDocument();
    });
  });

  test('Test der Fehlermeldung bei zu kurzem Passwort', async () => {
    render(
      <Router>
        <Registrieren />
      </Router>
    );

    const passwordInput = screen.getByLabelText('Passwort:');
    const passwordConfirmInput = screen.getByLabelText('Passwort bestätigen:');
    const submitButton = screen.getByRole('button', { name: /Registrieren/i });

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwort muss mindestens 8 Zeichen lang sein und mindestens ein Sonderzeichen enthalten.')).toBeInTheDocument();
    });
  });
});
