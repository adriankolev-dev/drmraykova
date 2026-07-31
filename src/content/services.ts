export type { ServiceContent } from "./services.i18n";
export { getServiceBySlug, getServicesContent } from "./services.i18n";
import { getServicesContent } from "./services.i18n";

/** @deprecated Prefer getServicesContent(locale) */
export const servicesContent = getServicesContent("bg");
