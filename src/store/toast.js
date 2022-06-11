import { toast } from 'react-toastify';

const debug = true;

const toasty = (store) => (next) => (action) => {
  if (debug) console.log('toast: ', action);

  // authRequest
  if (action.type === 'auth/authRequestFailed') {
    toast.error(`Login - ${action.payload}`);
  } else if (action.type === 'auth/authReceived') {
    toast.success(`Login erfolgreich`);
  } else if (action.type === 'auth/loggedOut') {
    toast.success('Logout erfolgreich');
  }
  // event update
  else if (action.type === 'events/eventsUpdated') {
    toast.success('Termin erfolgreich aktualisiert');
  } else if (action.type === 'events/eventsUpdateFailed') {
    toast.error(`Termin Aktualisierung fehlgeschlagen - ${action.payload}`);
  }
  // event create
  else if (action.type === 'events/eventCreated') {
    toast.success('Termin erfolgreich angelegt');
  } else if (action.type === 'events/eventCreateFailed') {
    toast.error(`Termin nicht angelegt - ${action.payload}`);
  }
  // event delete
  else if (action.type === 'events/eventDeleted') {
    toast.success('Termin erfolgreich gelöscht');
  } else if (action.type === 'events/eventDeleteFailed') {
    toast.error(`Termin nicht gelöscht - ${action.payload}`);
  }
  // email sent
  else if (action.type === 'email/emailSended') {
    toast.success(`E-Mail erfolgreich gesendet`);
  } else if (action.type === 'email/emailSentFailed') {
    toast.error(`E-Mail nicht gesendet - ${action.payload}`);
  }
  return next(action);
};

export default toasty;
