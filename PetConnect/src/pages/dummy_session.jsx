import React, { useState } from 'react';
import useSessionStore from '../store/sessionStore';

const SessionManager = () => {
    const activeEmail = useSessionStore((state) => state.activeEmail);
    const startSession = useSessionStore((state) => state.startSession);
    const killSession = useSessionStore((state) => state.killSession);
    const [selectedEmail, setSelectedEmail] = useState('');

    // Mock list of emails for the dropdown
    const emails = [
        "dilshan@gmail.com",
        "alice.smith@example.com",
        "bob.jones@testmail.com",
        "charlie.brown@mockdomain.org",
        "david.wilson@sample.net",
        "emma.davis@fakemail.io",
        "frank.thomas@demo.com",
        "grace.hall@placeholder.org",
        "henry.clark@testing.com",
        "isabella.martin@examplify.net",
        "jack.lewis@mytestsite.com",
        "karen.moore@example.org",
        "louis.scott@testmail.net",
        "mary.white@mockdomain.com",
        "nathan.harris@sample.org",
        "olivia.lee@fakemail.net",
        "paul.robinson@demo.net",
        "quincy.young@placeholder.com",
        "rachel.king@testing.net",
        "steve.adams@examplify.com",
        "tina.baker@mytestmail.org"
    ];

    const handleEmailChange = (e) => {
        setSelectedEmail(e.target.value);
    };
    
    const handleContinue = () => {
        if (selectedEmail) {
          startSession(selectedEmail);
          console.log(`Starting session with ${selectedEmail}`);
          console.log('Store state after start:', useSessionStore.getState().activeEmail);
        }
    };
    
    const handleKillSession = () => {
        console.log(`Killing session for ${activeEmail}`);
        killSession();
    };

  return (
    <div>
      {/* Dropdown to select an email, disabled if a session is active */}
      <select
        value={selectedEmail}
        onChange={handleEmailChange}
        disabled={activeEmail !== null}
      >
        <option value="">Select an email</option>
        {emails.map((email) => (
          <option key={email} value={email}>
            {email}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-3 mt-3">
        {/* Continue button, always visible, disabled if a session exists or no email is selected */}
        <button
          onClick={handleContinue}
          className="p-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={activeEmail !== null || !selectedEmail}
        >
          Continue
        </button>
        {/* Show active session info and Kill Session button if a session exists */}
        {activeEmail && (
          <div className="flex flex-col gap-3 p-3 rounded-lg border shadow-md">
            <p>Active session: {activeEmail}</p>
            <button className="p-2 bg-red-500 text-white rounded-md" onClick={handleKillSession}>Kill Session</button>
          </div>
        )}
      </div>
    </div>
  );
};

function DummySession() {
  return (
    <div className="w-full min-h-[75vh] flex flex-col gap-3 justify-center items-center">
        <h2 className="text-3xl">Mock Session Demo</h2>
        <SessionManager />
    </div>
  )
}

export default DummySession