import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import App from "./components/app/App";
import localENMessages from './locales/en.json'
import localESMessages from './locales/es.json'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const locale = (navigator.language || navigator.userLanguage).substring(0, 2);
let messages;
switch (locale) {
    case 'en': messages = localENMessages; break;
    case 'es': messages = localESMessages; break;
    default: messages = localENMessages; break;
}

ReactDOM.render(
    <IntlProvider locale={locale} messages={messages}>
        <App />
    </IntlProvider>
, document.getElementById("root")); // principal component

serviceWorkerRegistration.register();
