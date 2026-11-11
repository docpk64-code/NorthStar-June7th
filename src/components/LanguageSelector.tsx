import { useEffect, useState } from 'react';
import {
  activeLanguage, changeLanguage, enabledLanguages, isWebsiteLanguage, languages, supportsTranslation,
  translationProjectKey,
} from '../utils/websiteLanguage';
import './languageSelector.css';

type TranslationEvent = 'initialized' | 'languageChanged';

type TranslationClient = {
  initialize: (options: {
    api_key: string;
    auto_switch: boolean;
    hide_switcher: boolean;
    wait_transition: boolean;
  }) => void;
  on: (event: TranslationEvent, handler: () => void) => void;
  off: (event: TranslationEvent, handler: () => void) => void;
  getCurrentLang: () => string;
  switchTo: (language: string) => void;
};

let clientPromise: Promise<TranslationClient> | undefined;
let initialized = false;

function loadTranslationClient() {
  if (!clientPromise) {
    clientPromise = new Promise<TranslationClient>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.weglot.com/weglot.min.js';
      script.async = true;
      script.onload = () => {
        const client = (window as Window & { Weglot?: TranslationClient }).Weglot;
        if (client) resolve(client);
        else reject(new Error('Translation service did not initialize.'));
      };
      script.onerror = () => reject(new Error('Translation service could not load.'));
      document.head.append(script);
    });
  }
  return clientPromise;
}

export default function LanguageSelector() {
  const language = activeLanguage();
  const available = Boolean(translationProjectKey && supportsTranslation(window.location.pathname));
  const [status, setStatus] = useState<'ready' | 'loading' | 'error'>(language === 'en' ? 'ready' : 'loading');

  useEffect(() => {
    if (!translationProjectKey || !available || language === 'en') return;
    const projectKey = translationProjectKey;
    let disposed = false;
    let client: TranslationClient | undefined;
    const target = languages[language].providerCode;
    const timeout = window.setTimeout(() => setStatus('error'), 12000);

    function onLanguageChanged() {
      if (!disposed && client?.getCurrentLang() === target) {
        window.clearTimeout(timeout);
        document.documentElement.lang = language;
        setStatus('ready');
      }
    }

    function onInitialized() {
      if (client?.getCurrentLang() === target) onLanguageChanged();
      else client?.switchTo(target);
    }

    loadTranslationClient().then(service => {
      if (disposed) return;
      client = service;
      service.on('languageChanged', onLanguageChanged);
      service.on('initialized', onInitialized);
      if (!initialized) {
        initialized = true;
        service.initialize({ api_key: projectKey, auto_switch: false, hide_switcher: true, wait_transition: false });
      }
    }).catch(() => {
      if (!disposed) {
        window.clearTimeout(timeout);
        setStatus('error');
      }
    });

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      client?.off('initialized', onInitialized);
      client?.off('languageChanged', onLanguageChanged);
    };
  }, [available, language]);

  if (!available) return null;

  return (
    <div className="ns-language-control" translate="no" data-wg-notranslate>
      <select
        className="ns-language-selector"
        aria-label={languages[language].label}
        value={language}
        onChange={event => {
          const selected = event.currentTarget.value;
          if (!isWebsiteLanguage(selected)) return;
          try {
            changeLanguage(selected);
          } catch {
            setStatus('error');
          }
        }}
      >
        {enabledLanguages.map(code => (
          <option key={code} lang={code} value={code}>{languages[code].name}</option>
        ))}
      </select>
      {status !== 'ready' && <span className="ns-language-status" role="status">
        {status === 'loading' ? 'Translating…' : 'Translation unavailable.'}
      </span>}
    </div>
  );
}
