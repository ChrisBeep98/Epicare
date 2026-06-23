import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provee el locale por defecto y carga los mensajes para que useTranslations funcione en el sandbox
  return {
    locale: 'es',
    messages: (await import('../../messages/es.json')).default
  };
});
